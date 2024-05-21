const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/handlers");

const app = express()
const PORT = process.env.PORT || 4000

require("./operations/routes")(app)
//require("./operations/db")(app)

const db = process.env.db;


mongoose.set('strictQuery', false);

mongoose
  .connect(db)
  .then(() => console.log("kele2wiseDevDB connected successfully...."));



app.use(notFound);
app.use(errorHandler);



app.listen(PORT, () => {
    console.log("Resider app listening on port:" + PORT)
})