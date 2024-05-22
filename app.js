const express = require("express");
// const mongoose = require("mongoose");
require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/handlers");

const { PORT } = require("./config/envConfig");


const app = express()
//const PORT = process.env.PORT || 4000

require("./operations/routes")(app)
require("./operations/db")(app)

//const db = process.env.db;




app.use(notFound);
app.use(errorHandler);



app.listen(PORT, () => {
    console.log("Resider app listening on port:" + PORT)
})