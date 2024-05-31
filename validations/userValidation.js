// const express = require("express");
const Joi = require("joi");
const STATUSCODE = require("../utils/statuscodes");
const { formatResult } = require("../utils/formatResult");





exports.authValidation = (req, res, next) => {
 const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // googleToken: Joi.string(),
    // facebookToken: Joi.string(),
    // twitterToken: Joi.string(),
    // linkedinToken: Joi.string(),
    // instagramToken: Joi.string(),
   
 })

const validateOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
};


 const result = formatResult(schema.validate(req.body, validateOptions));
 if (result.error)
    return res.status(StatusCodes.BAD_REQUEST).json({
        error: {
            msg: result.message,
        },
    });
    next();
};

