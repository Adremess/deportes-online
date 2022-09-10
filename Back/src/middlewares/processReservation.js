const reservationController = require("../controllers/reservation");
const userController = require("../controllers/user");
const mongoose = require("mongoose");
const reservationPricesSchema = require("../db/models/PricesModel");
const { transporter, reservationMailOptions } = require("../Utils/nodemailer");

const formatPrice = (price) => `$${price / 100}`;

async function processReservation(req, res, next) {
  try {
    let { username, date, time, paymentMethod, id } = req.body;
    const pricingModel = reservationPricesSchema;
    const resInfo = await pricingModel.find({ id });
    let { court, sport, price } = resInfo[0];
    
    // Format price before including into Database.
    const formatedPrice = formatPrice(price);
    let reservation = await reservationController.create({ username, date, time, paymentMethod, sport, court, totalPrice: formatedPrice });
    const user = await userController.findOne(username);
    if (!user) return res.send({ message: "user not found" });
    
    if (user[0].reservations.lenght === 0) user[0].reservations = [reservation._id];
    if (!user[0].reservations.includes(reservation._id)) user[0].reservations.push(reservation._id);
    transporter.sendMail(reservationMailOptions(username, user[0].email, date, time, sport, court, formatedPrice));
    // Save user with new reservation added to array.
    await user[0].save();
    // Send to Stripe payment Gateway
    if (reservation.paymentMethod === "Card") {
      const session = await reservationController.pay(resInfo[0]);
      res.send({ session: session.url });
    }
    else {
      res.send({ url: "http://localhost:3000/success" });
    }
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = processReservation;
