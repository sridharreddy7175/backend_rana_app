const Joi = require('joi');

export const userSchema=Joi.object({
    name: Joi.string().trim().regex(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/).required(),
    email: Joi.string().trim().regex(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,20}$/).required(),
    password: Joi.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?!.*\s).{8,}$/).required(),
    phone:Joi.string().trim().required().regex( /^[5-9]\d{9}$/),
    role:Joi.string().trim()
})