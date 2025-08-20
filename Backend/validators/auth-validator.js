const joi = require("joi");

//creating an object schema for validation
const signupSchema = joi.object({
    name: joi.string().min(3).max(10).required(),
    email: joi.string().min(5).email().required(),
    phone: joi.string().pattern(/^[6-9]\d{9}$/).required().messages({ 'string.pattern.base': 'Phone number must be a valid 10-digit Indian mobile number' }),
    password: joi.string().min(6).required(),
})


const loginSchema = joi.object({
    email: joi.string().min(5).email().required(),
    password: joi.string().min(6).required(),
})


module.exports = { signupSchema, loginSchema };