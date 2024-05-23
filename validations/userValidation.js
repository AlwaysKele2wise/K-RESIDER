






exports.authValidation = (req, res, next) => {
 const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
   
 })


const validateOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
};



 const result = formatResult(schema.validate())
}