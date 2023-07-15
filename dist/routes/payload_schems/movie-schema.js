"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieSchema = void 0;
const Joi = require('joi');
exports.movieSchema = Joi.object({
    title: Joi.string().trim().regex(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/).required(),
    numViews: Joi.number().trim(),
    storyline: Joi.string().trim(),
    director: Joi.string().trim(),
    releseDate: Joi.string().trim(),
    genres: Joi.string().trim(),
    // tags:
    // cast:
    // poster:
    // trailer:
    // video:
    // imbRating:
    // language:
});
//# sourceMappingURL=movie-schema.js.map