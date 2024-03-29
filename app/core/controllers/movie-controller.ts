import { MovieModel } from "../models/movie-model";
import { ResponseInterceptor } from "../utillities/response-interceptor";

export class MovieController {
  movieModel: typeof MovieModel;
  responseInterceptor: ResponseInterceptor;

  constructor() {
    this.movieModel = MovieModel;
    this.responseInterceptor = new ResponseInterceptor();
  }

  async createMovie(req, res) {
    try {
      const movieData: any = req.body;
      console.log("req---------", movieData);
      console.log("sridhar-->", req.file.path);
      if (!movieData.title) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "title is Required",
          ""
        );
      }
      if (!movieData.storyLine) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "storyline is Required",
          ""
        );
      }
      if (!movieData.director) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "director is Required",
          ""
        );
      }
      if (!movieData.type) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "type is Required",
          ""
        );
      }
      if (!movieData.releseDate) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "releseDate is Required",
          ""
        );
      }
      if (!movieData.genres) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "genres is Required",
          ""
        );
      }
      if (!movieData.tags) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "tags is Required",
          ""
        );
      }
      if (!movieData.cast) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "cast is Required",
          ""
        );
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
        this.responseInterceptor.errorResponse(
          res,
          400,
          "trailer is Required",
          ""
        );
      }
      if (!movieData.imbRating) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "imbRating is Required",
          ""
        );
      }
      if (!movieData.language) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "language is Required",
          ""
        );
      }

      let GenresSet: string[] = movieData.genres
        .toString()
        .split(",")
        .map((genre: string) => genre.trim());
      let TagsSet: string[] = movieData.tags
        .toString()
        .split(",")
        .map((tag: string) => tag.trim());
      let LanuageSet: string[] = movieData.language
        .toString()
        .split(",")
        .map((language: string) => language.trim());
      let CastSet: string[] = movieData.cast
        .toString()
        .split(",")
        .map((cast: string) => cast.trim());

      let newMovie = await new this.movieModel({
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
      newMovie = await newMovie.save();
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Movie Successfully Created",
        { movie_id: newMovie._id }
      );
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        400,
        "Server error",
        err
      );
    }
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

  async moviesList(req, res) {
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
      const searchQuery: any = {};
      if (req.query.search) {
        searchQuery.title = { $regex: req.query.search, $options: "i" }; // Case-insensitive regex search
      }

      let result: any;

      result = await this.movieModel
        .find(searchQuery)
        .limit(pageLimit)
        .skip(currentOffset);

      if (req.query.datatype?.toLowerCase() === "top") {
        result = await this.movieModel.find().sort({ numViews: -1 });
      }

      return this.responseInterceptor.successResponse(
        req,
        res,
        200,
        "Data found",
        result
      );
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Server error",
        err
      );
    }
  }

  async fetchMovie(req, res) {
    const { id } = req.params;
    try {
      const movie = await this.movieModel.findById(id);
      //update number of views
      await this.movieModel.findByIdAndUpdate(
        id,
        {
          $inc: { numViews: 1 },
        },
        { new: true }
      );
      res.json(movie);
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Server error",
        err
      );
    }
  }
}
