"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieSchema = void 0;
const Joi = require('joi');
exports.movieSchema = Joi.object({
    title: Joi.string().trim().regex(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/).required(),
    views: Joi.string().trim(),
    storyline: Joi.string().trim(),
});
//# sourceMappingURL=movie-schema.js.map