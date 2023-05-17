const Joi = require('joi');

export const movieSchema=Joi.object({
    title: Joi.string().trim().regex(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/).required(),
    views: Joi.string().trim(),
    storyline: Joi.string().trim(),

 
})