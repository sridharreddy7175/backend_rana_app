"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const movie_model_1 = require("../models/movie-model");
const response_interceptor_1 = require("../utillities/response-interceptor");
class MovieController {
    constructor() {
        this.movieModel = movie_model_1.MovieModel;
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
    }
    createMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieData = req.body;
                if (!movieData.title) {
                    this.responseInterceptor.errorResponse(res, 400, 'title is Required', '');
                }
                if (!movieData.storyLine) {
                    this.responseInterceptor.errorResponse(res, 400, 'storyline is Required', '');
                }
                if (!movieData.director) {
                    this.responseInterceptor.errorResponse(res, 400, 'director is Required', '');
                }
                if (!movieData.type) {
                    this.responseInterceptor.errorResponse(res, 400, 'type is Required', '');
                }
                if (!movieData.releseDate) {
                    this.responseInterceptor.errorResponse(res, 400, 'releseDate is Required', '');
                }
                if (!movieData.genres) {
                    this.responseInterceptor.errorResponse(res, 400, 'genres is Required', '');
                }
                if (!movieData.tags) {
                    this.responseInterceptor.errorResponse(res, 400, 'tags is Required', '');
                }
                if (!movieData.cast) {
                    this.responseInterceptor.errorResponse(res, 400, 'cast is Required', '');
                }
                if (!movieData.poster) {
                    this.responseInterceptor.errorResponse(res, 400, 'poster is Required', '');
                }
                if (!movieData.trailer) {
                    this.responseInterceptor.errorResponse(res, 400, 'trailer is Required', '');
                }
                if (!movieData.imbRating) {
                    this.responseInterceptor.errorResponse(res, 400, 'imbRating is Required', '');
                }
                if (!movieData.language) {
                    this.responseInterceptor.errorResponse(res, 400, 'language is Required', '');
                }
                let newMovie = yield new this.movieModel({
                    title: movieData.title,
                    storyLine: movieData.storyLine,
                    director: movieData.director,
                    type: movieData.type,
                    releseDate: movieData.releseDate,
                    genres: movieData.genres,
                    tags: movieData.tags,
                    cast: movieData.cast,
                    poster: movieData.poster,
                    trailer: movieData.trailer,
                    video: movieData.video,
                    imbRating: movieData.imbRating,
                    language: movieData.language
                });
                newMovie = yield newMovie.save();
                return this.responseInterceptor.successResponse(req, res, null, 'Successfully Created', { movie_id: newMovie._id });
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 400, 'Server error', err);
            }
        });
    }
    moviesList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let currentOffset = 0;
                let pageLimit;
                if (req.query.limit) {
                    pageLimit = Number(req.query.limit);
                }
                if (req.query.pageno) {
                    currentOffset = pageLimit * (req.query.pageno - 1);
                }
                const result = yield this.movieModel.find().limit(pageLimit).skip(currentOffset);
                return this.responseInterceptor.successResponse(req, res, 200, 'Data found', result);
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, 'Server error', err);
            }
        });
    }
}
exports.MovieController = MovieController;
//# sourceMappingURL=movie-controller.js.map