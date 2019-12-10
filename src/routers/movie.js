const express = require('express')
const request = require('request');
const Movie = require('../models/movie')
const Credit = require('../models/credit')
const router = new express.Router()

const apiKey = '38b114a997ec654bd7933e888cbf4921'

router.get('/movie/:id', async (req,res) => {
    const movieID = req.params.id
    
    try {
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`

        await request({ url : apiUrl , json : true},(error,response) =>{
            if(error){
                res.status(500).send(error)
            } else{
                if(response.body.status_code === 34){
                   return res.status(404).send(response.body)
                } else if(response.body.status_code === 7){
                    return res.status(401).send(response.body)
                }

                const movie = new Movie(response.body)

                if(Movie.checkMovieExit(response.body.id)){
                    movie.save()
                }
                
                res.send(response.body)
            }
          });
    } catch (e) {
        res.status(500).send()        
    }

})

router.get('/movie/:id/credits', async (req,res) => {
    const movieID = req.params.id
     
     try {
         const apiUrl = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}&language=en-US`
 
         await request({ url : apiUrl , json : true},(error,response) =>{
             if(error){
                 res.status(500).send(error)
             } else{
                 if(response.body.status_code === 34){
                    return res.status(404).send(response.body)
                 } else if(response.body.status_code === 7){
                     return res.status(401).send(response.body)
                 }

                 const credit = new Credit(response.body)

                 if(Credit.checkMovieExitINCredits(response.body.id)){
                    credit.save()
                 }
                
                 res.send(response.body)
             }
           });
     } catch (e) {
         res.status(500).send()        
    }
})

module.exports = router