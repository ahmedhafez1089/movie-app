const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    id : {
        type : Number ,
        required : true ,
        unique : true 
    },
    title : {
        type : String ,
        required :true ,
    },
    adult : {
        type : Boolean ,
        required : true
    },
    backdrop_path : {
        type : String ,
        required : true
    },
    belongs_to_collection : {
        type : String
    },
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

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie