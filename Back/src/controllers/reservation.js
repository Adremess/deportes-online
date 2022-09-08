require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const reservationSchema = require("../db/models/reservationModel");
const stripe = require("stripe")("sk_test_51LcIHQE1aPuiC7C6lKHAWWBh6jmektKy8qPn2AIEKCrxIDsep9mqvGqSKrceSGN3V3CSBILALJMLcze2tEbBcKuY002MPpZHgh");

class Reservation {
  constructor(collection) {
    this.collection = collection;
  }

  async findById(id) {
    try {
      const model = mongoose.model(this.collection);
      const user = await model.findById(id);
      if (!user) return false;
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  async create({ username, date, time, paymentMethod, sport, court, totalPrice }) {
    const newRes = new reservationSchema({
      username,
      date,
      time,
      paymentMethod,
      sport,
      court,
      totalPrice,
    })
    const res = await newRes.save();
    return res;
  };

  async pay({ court, sport, price }) {
    try {
      let name = `Cancha: ${court} Deporte: ${sport}`;
      let unit_amount = price;
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'ars',
              product_data: {
                name,
              },
              unit_amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONT_URI}/success`,
        cancel_url: `http://localhost:${process.env.PORT}/error`,
      });
      return session;
    } catch (err) {
      console.log(err);
    }
  }

  async findByUsername(userN) {
    const model = mongoose.model(this.collection);
    const reservations = await model.find({ username: userN });
    if (reservations.length === 0) return false;
    return reservations;
  };

  async findByDate(ReceivedDate) {
    const model = mongoose.model(this.collection);
    const reservations = await model.find({ date: ReceivedDate });
    if (reservations.length === 0) return false;
    return reservations;
  };

  async delete(id) {
    const model = mongoose.model(this.collection);
    const deletedReservation = await model.findOneAndDelete({ _id: id })
    return deletedReservation;
  };
  update() { };
};

module.exports = new Reservation('reservas');
