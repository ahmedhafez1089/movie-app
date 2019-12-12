const fetch = require("node-fetch")
const Movie = require('../models/movie.model')
const Credit = require('../models/credit.model')

const apiKey = '38b114a997ec654bd7933e888cbf4921'

const getMovieDetails = async function (req, res, next) {
    const movieID = req.params.id
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`

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

const getMovieCredits = async function (req, res, next) {
    const movieID = req.params.id
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}&language=en-US`

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

module.exports = {
    getMovieDetails , 
    getMovieCredits
}
