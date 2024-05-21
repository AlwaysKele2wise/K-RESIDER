    const express = require("express")
    const contactsRouter = require("../routes/contacts")


    module.exports = (app) =>{
        // set cors 
        // console.log("my line is working")
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers", 
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );

        if (req.method === "OPTIONS") {
            req.header("Access-Control-Allow-Methods", "PUT, GET, PATCH, DELETE");
            return res.status(200).json({});
        }

        next();
    });

    app.use(express.urlencoded({ extended: true}));
    app.use(express.json({ limit: '100mb'}));

    const version = "/api/v1";

    
    app.use(`${version}/contacts`, contactsRouter);
    // app.use('${version}/auths', contactsRouter);

    app.get("/", (req, res, next) => {
        res.json({ status: true, message: "RESIDER-K1 health check passed"});
    });

    // app.use("error");
    }