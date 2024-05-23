const winston = require("winston");
const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGODB_URI





mongoose.set('strictQuery', false);



module.exports = function() {
mongoose.connect(db)
  .then(() => winston.info(`kele2wiseDevDB connected successfully....`));
}

