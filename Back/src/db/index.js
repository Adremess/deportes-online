require("dotenv").config();
const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  async (err) => {
    if (err) throw Error(err);
    else console.log('Connect db');
  });

module.exports = connection;
