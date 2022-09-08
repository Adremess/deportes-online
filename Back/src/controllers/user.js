require("dotenv").config({ path: "../../.env" })
const mongoose = require("mongoose");
const userSchema = require("../db/models/userModel");
const jwt = require("jsonwebtoken");
const { transporter, mailOptions } = require("../Utils/nodemailer");

class User {
  constructor(collection) {
    this.collection = collection;
  }

  async findOne(usr) {
    const model = mongoose.model(this.collection);
    const user = await model.find({ username: usr });
    if (user.length === 0) return false;
    return user;
  };

  async create({ username, firstName, lastName, dateOfBirth, gender, dni, email, street, city, phoneNumber, password }) {
    try {
      const newUser = new userSchema({
        username,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        dni,
        email,
        address: {
          street,
          city
        },
        phoneNumber,
        password: await userSchema.encryptPassword(password)
      });
      //generate userToken
      const userToken = jwt.sign({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }, process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        });
      //Assign token to document
      newUser.verToken = userToken;
      //Send confirmation link to user email
      const confirmationLink = `http://localhost:${process.env.PORT}/activar-cuenta/${userToken}`;
      transporter.sendMail(mailOptions(confirmationLink, newUser.email, "activation"));
      const res = await newUser.save();
      return res;
    }
    catch (err) {
      console.log(err);
    }
  };

  async findAll() {
    const model = mongoose.model(this.collection);
    const user = await model.find();
    if (user.length === 0) return false;
    return user;
  };

  delete() { };

  update() { };
};

module.exports = new User('users');
