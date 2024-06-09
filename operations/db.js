const winston = require("winston");
const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI  = require("../config/envConfig");
const db = MONGODB_URI


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'app.log' })
    ]
});


mongoose.set('strictQuery', false);


module.exports = function() {
mongoose.connect(process.env.MONGODB_URI)
  .then(() => logger.info(`kele2wiseDevDB connected successfully....`));
}








// const { createLogger, transports, format } = require ("winston");

// const logger = createLogger({
//   level: "info",
//   format: format.json(),
//   transports: [
//     new transports.File({ filename: "logs/app.log", level: "info" }),
//     new transports.Console({level: "debug"})
//   ]
// });

// // logger.info("Application started");
// // logger.debug("Debug message");

