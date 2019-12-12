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
        belongs_to_collection : {
            type : String
        }
    }],
    budget : {
        type : Number
    },
    genres : [{
        genre : {
            type : String
        }
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
        production_company : {
            type : String
        }
    }],
    production_countries : [{
        production_country : {
            type : String
        }
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
        spoken_language : {
            type : String
        }
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

    const posterPath = 'http://image.tmdb.org/t/p/w1280' + movie.poster_path

    const options = {
       url: posterPath,
       dest: 'D:/projects-nodejs/movie-app/public/movies-img/poster'
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
    const fileLog = 'D:/projects-nodejs/movie-app/log.json'

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