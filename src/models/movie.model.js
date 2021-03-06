const mongoose = require('mongoose')
const download = require('image-downloader')
const fs = require('fs')

const movieSchema = new mongoose.Schema({
    id : {
        type : Number ,
        required : true ,
        unique : true 
    },
    title : {
        type : String 
    },
    adult : {
        type : Boolean 
    },
    backdrop_path : {
        type : String 
    },
    belongs_to_collection : [{
    }],
    budget : {
        type : Number
    },
    genres : [{
    }],
    homepage : {
        type : String
    },
    imdb_id : {
        type : String
    },
    original_language : {
        type : String
    },
    original_title : {
        type : String
    },
    overview : {
        type : String
    },
    popularity : {
        type : Number
    },
    poster_path : {
        type : String
    },
    production_companies : [{
    }],
    production_countries : [{
    }],
    release_date : {
        type : String
    },
    revenue : {
        type : Number
    },
    runtime : {
        type : Number
    },
    spoken_languages : [{
    }],
    status : {
        type : String
    },
    tagline : {
        type : String
    },
    video : {
        type : Boolean
    },
    vote_average  : {
        type : Number
    },
    vote_count : {
        type : Number
    }
})

movieSchema.virtual('credits', {
    ref : 'Credit' ,
    localField : 'id' ,
    foreignField : 'id'
})

movieSchema.statics.checkMovieExit = async (movieID) => {
    const movie = await Movie.findOne({ id : movieID })

    if(movie){
        throw new Error('Unable to save movie')
    }

    return true
}

movieSchema.pre('save', async function(next) {
    const movie = this

    const posterPath = process.env.POSTER_PATH_URL + movie.poster_path

    const options = {
       url: posterPath,
       dest: process.env.POSTER_PATH
     }

     try {
       const { filename, image } = await download.image(options)
       movie.poster_path = filename
     } catch (e) {
       console.error(e)
     }

    next()
})

movieSchema.post('save', function(next) {
    const movie = this
    var movies = []
    const movieAdd = {
        id : movie.id ,
        title  :movie.title
    }
    const fileLog = process.env.LOG_FILE

    try {
        var logMovies = fs.readFileSync(fileLog)
        movies = JSON.parse(logMovies)
      } catch (e) {
      }
    
    var duplicateMovies = movies.filter((_movie) => _movie.title === movie.title)

    if (duplicateMovies.length === 0) {
        movies.push(movieAdd);
        fs.writeFileSync(fileLog, JSON.stringify(movies));
      }
    
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie