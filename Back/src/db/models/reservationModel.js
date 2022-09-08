const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
    {
        username: String,
        date: String,
        time: String,
        paymentMethod: String,
        sport: String,
        court: String,
        totalPrice: String
    },
    {
        timestamps: true,
        collection: 'reservas'
    }

);

module.exports = new mongoose.model('reservas', reservationSchema);