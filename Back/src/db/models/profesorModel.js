// const mongoose = require("mongoose");

// const profesorSchema = new mongoose.Schema({
//   first_name: {
//     type: String,
//     required: true
//   },
//   last_name: {
//     type: String,
//     required: true
//   },
//   birth_date: {
//     type: Date,
//     required: true
//   },
//   dni: {
//     type: Number,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   adress: {
//     street: {
//       type: String,
//       required: true
//     },
//     city: {
//       type: String,
//       required: true
//     },
//     zipcode: {
//       type: Number,
//       required: true
//     }
//   },
//   role: {
//     type: String,
//     required: true
//   },
//   rating: {
//     type: Number,
//     required: true
//   },
//   phone: {
//     type: Number,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// module.exports = new mongoose.model('profesores', profesorSchema);