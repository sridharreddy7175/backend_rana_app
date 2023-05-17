import { MovieModel } from '../models/movie-model';
import * as mongoose from 'mongoose';
import { ResponseInterceptor } from "../utillities/response-interceptor";
import { appConfig } from "../../config/appConfig";

export class MovieController {
    movieModel: typeof MovieModel;
    responseInterceptor: ResponseInterceptor;
   
  
    constructor() {
      this.movieModel = MovieModel;
      this.responseInterceptor = new ResponseInterceptor();
    }

async createMovie(req,res){
    try{
        const movieData: any = req.body;
        if(!movieData.title){
            this.responseInterceptor.errorResponse(res, 400, 'title is Required', '');
        }
        if(!movieData.storyLine){
            this.responseInterceptor.errorResponse(res, 400, 'storyline is Required', '');
        }
        if(!movieData.director){
            this.responseInterceptor.errorResponse(res, 400, 'director is Required', '');
        }
        if(!movieData.type){
            this.responseInterceptor.errorResponse(res, 400, 'type is Required', '');
        }
        if(!movieData.releseDate){
            this.responseInterceptor.errorResponse(res, 400, 'releseDate is Required', '');
        }
        if(!movieData.genres){
            this.responseInterceptor.errorResponse(res, 400, 'genres is Required', '');
        }
        if(!movieData.tags){
            this.responseInterceptor.errorResponse(res, 400, 'tags is Required', '');
        }
        if(!movieData.cast){
            this.responseInterceptor.errorResponse(res, 400, 'cast is Required', '');
        }
        if(!movieData.poster){
            this.responseInterceptor.errorResponse(res, 400, 'poster is Required', '');
        }
        if(!movieData.trailer){
            this.responseInterceptor.errorResponse(res, 400, 'trailer is Required', '');
        }
        if(!movieData.imbRating){
            this.responseInterceptor.errorResponse(res, 400, 'imbRating is Required', '');
        }
        if(!movieData.language){
            this.responseInterceptor.errorResponse(res, 400, 'language is Required', '');
        }
        let newMovie=await new this.movieModel({
            title:movieData.title,
            storyLine:movieData.storyLine,
            director:movieData.director,
            type:movieData.type,
            releseDate:movieData.releseDate,
            genres:movieData.genres,
            tags:movieData.tags,
            cast:movieData.cast,
            poster:movieData.poster,
            trailer:movieData.trailer,
            video:movieData.video,
            imbRating:movieData.imbRating,
            language:movieData.language
        })
        newMovie=await newMovie.save();
        return this.responseInterceptor.successResponse(req, res, null, 'Successfully Created', { movie_id: newMovie._id });


    }
    catch(err){
      return this.responseInterceptor.errorResponse(res, 400, 'Server error', err);

    }
}

async moviesList(req,res){
   try {
    let currentOffset = 0;
    let pageLimit:any;
    if (req.query.limit) {
     pageLimit = Number(req.query.limit)
 }
 if (req.query.pageno) {
     currentOffset = pageLimit * (req.query.pageno - 1)
 }
  const result=await this.movieModel.find().limit(pageLimit).skip(currentOffset)
 return this.responseInterceptor.successResponse(req, res, 200, 'Data found', result);
   }
   catch(err){
    return this.responseInterceptor.errorResponse(res, 500, 'Server error', err);
   }
}


}