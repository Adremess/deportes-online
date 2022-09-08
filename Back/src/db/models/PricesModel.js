const mongoose = require("mongoose");

const reservationPricesSchema = new mongoose.Schema({
    id: String,
    court: String,
    sport: String,
    price: String,
}, { collection: "ReservationPrices" })

module.exports = new mongoose.model('ReservationPrices', reservationPricesSchema);