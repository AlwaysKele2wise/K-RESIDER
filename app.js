const express = require("express");

const app = express()
const PORT = process.env.PORT || 4000

require("./operations/routes")(app)





app.listen(PORT, () => {
    console.log("Resider app listening on port:" + PORT)
})