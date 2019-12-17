const fetch = require("node-fetch")
const Movie = require('../models/movie.model')
const Credit = require('../models/credit.model')
const auth = require('../middleware/auth')

const apiKey = process.env.API_KEY
const apiPath = process.env.API_PATH
const apiLanguage = process.env.API_LANGUAGE

const getMovieDetails = async function (req, res, next) {
    const user = await auth.auth(req, res)

    if(user){
        const movieID = req.params.id
    const apiUrl = apiPath + movieID + '?api_key=' + apiKey + '&language=' + apiLanguage

    try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        
        if(json.status_code === 34){
            return res.status(404).send(json)
         } else if(json.status_code === 7){
             return res.status(401).send(json)
         }

          const movie = new Movie(json)

         if(Movie.checkMovieExit(json.id)){
             movie.save()
         }
         
         res.send(json)
      } catch (e) {
        res.status(500).send() 
      }

    }
}

const getMovieCredits = async function (req, res, next) {
    const movieID = req.params.id
    const apiUrl = apiPath + movieID + '/credits?api_key=' + apiKey + '&language=' + apiLanguage

    try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        
        if(json.status_code === 34){
            return res.status(404).send(json)
         } else if(json.status_code === 7){
             return res.status(401).send(json)
         }
         
         const credit = new Credit(json)

         if(Credit.checkMovieExitINCredits(json.id)){
            credit.save()
         }
                 
         res.send(json)
      } catch (e) {
        res.status(500).send() 
      }
}

const getMovieWithCreditsDetails = async function (req, res, next) {
    try {
        const movie = await Movie.findOne({ id : req.params.id })
        await movie.populate({ path : 'credits' }).execPopulate()        
        res.send(movie.credits)
    } catch (e) {
        res.status(500).send()
    }

}

module.exports = {
    getMovieDetails , 
    getMovieCredits ,
    getMovieWithCreditsDetails
}
