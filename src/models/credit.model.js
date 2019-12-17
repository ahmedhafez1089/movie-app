const mongoose = require('mongoose')

const creditSchema = new mongoose.Schema({
    id : {
        type : mongoose.Schema.Types.Number , 
        required : true ,
        ref : 'Movie' 
    },
    cast : [{
    }],
    crew : [{
    }]
})

creditSchema.statics.checkMovieExitINCredits = async (movieID) => {
    const movie = await Credit.findOne({ id : movieID })

    if(movie){
        throw new Error('Unable to save credits')
    }

    return true
}

const Credit = mongoose.model('Credit', creditSchema)

module.exports = Credit