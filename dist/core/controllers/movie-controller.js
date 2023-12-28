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
                console.log("req---------", movieData);
                console.log("sridhar-->", req.file.path);
                if (!movieData.title) {
                    this.responseInterceptor.errorResponse(res, 400, "title is Required", "");
                }
                if (!movieData.storyLine) {
                    this.responseInterceptor.errorResponse(res, 400, "storyline is Required", "");
                }
                if (!movieData.director) {
                    this.responseInterceptor.errorResponse(res, 400, "director is Required", "");
                }
                if (!movieData.type) {
                    this.responseInterceptor.errorResponse(res, 400, "type is Required", "");
                }
                if (!movieData.releseDate) {
                    this.responseInterceptor.errorResponse(res, 400, "releseDate is Required", "");
                }
                if (!movieData.genres) {
                    this.responseInterceptor.errorResponse(res, 400, "genres is Required", "");
                }
                if (!movieData.tags) {
                    this.responseInterceptor.errorResponse(res, 400, "tags is Required", "");
                }
                if (!movieData.cast) {
                    this.responseInterceptor.errorResponse(res, 400, "cast is Required", "");
                }
                // if (!movieData.poster) {
                //   this.responseInterceptor.errorResponse(
                //     res,
                //     400,
                //     "poster is Required",
                //     ""
                //   );
                // }
                if (!movieData.trailer) {
                    this.responseInterceptor.errorResponse(res, 400, "trailer is Required", "");
                }
                if (!movieData.imbRating) {
                    this.responseInterceptor.errorResponse(res, 400, "imbRating is Required", "");
                }
                if (!movieData.language) {
                    this.responseInterceptor.errorResponse(res, 400, "language is Required", "");
                }
                let GenresSet = movieData.genres
                    .toString()
                    .split(",")
                    .map((genre) => genre.trim());
                let TagsSet = movieData.tags
                    .toString()
                    .split(",")
                    .map((tag) => tag.trim());
                let LanuageSet = movieData.language
                    .toString()
                    .split(",")
                    .map((language) => language.trim());
                let CastSet = movieData.cast
                    .toString()
                    .split(",")
                    .map((cast) => cast.trim());
                let newMovie = yield new this.movieModel({
                    title: movieData.title,
                    storyLine: movieData.storyLine,
                    director: movieData.director,
                    type: movieData.type,
                    releseDate: movieData.releseDate,
                    genres: GenresSet,
                    tags: TagsSet,
                    cast: CastSet,
                    poster: req.file.originalname,
                    trailer: movieData.trailer,
                    video: movieData.video,
                    imbRating: movieData.imbRating,
                    language: LanuageSet,
                });
                newMovie = yield newMovie.save();
                return this.responseInterceptor.successResponse(req, res, null, "Movie Successfully Created", { movie_id: newMovie._id });
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 400, "Server error", err);
            }
        });
    }
    // async moviesList(req, res) {
    //   try {
    //     let currentOffset = 0;
    //     let pageLimit: any;
    //     if (req.query.limit) {
    //       pageLimit = Number(req.query.limit);
    //     }
    //     if (req.query.pageno) {
    //       currentOffset = pageLimit * (req.query.pageno - 1);
    //     }
    //     let result: any;
    //     result = await this.movieModel
    //       .find()
    //       .sort("-createdAt")
    //       .limit(pageLimit)
    //       .skip(currentOffset);
    //      if(req.query.datatype?.toLowerCase() === 'top'){
    //       result=await this.movieModel.find().sort({ numViews: -1 })
    //      }
    //     return this.responseInterceptor.successResponse(
    //       req,
    //       res,
    //       200,
    //       "Data found",
    //       result
    //     );
    //   } catch (err) {
    //     return this.responseInterceptor.errorResponse(
    //       res,
    //       500,
    //       "Server error",
    //       err
    //     );
    //   }
    // }
    moviesList(req, res) {
        var _a;
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
                // Build query based on search term
                const searchQuery = {};
                if (req.query.search) {
                    searchQuery.title = { $regex: req.query.search, $options: "i" }; // Case-insensitive regex search
                }
                let result;
                result = yield this.movieModel
                    .find(searchQuery)
                    .limit(pageLimit)
                    .skip(currentOffset);
                if (((_a = req.query.datatype) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "top") {
                    result = yield this.movieModel.find().sort({ numViews: -1 });
                }
                return this.responseInterceptor.successResponse(req, res, 200, "Data found", result);
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Server error", err);
            }
        });
    }
    fetchMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const movie = yield this.movieModel.findById(id);
                //update number of views
                yield this.movieModel.findByIdAndUpdate(id, {
                    $inc: { numViews: 1 },
                }, { new: true });
                res.json(movie);
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Server error", err);
            }
        });
    }
}
exports.MovieController = MovieController;
//# sourceMappingURL=movie-controller.js.map