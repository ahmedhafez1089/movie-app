const express = require('express')
const request = require('request');
const fetch = require("node-fetch");
const axios = require("axios");
const Movie = require('../models/movie')
const Credit = require('../models/credit')
const router = new express.Router()

const apiKey = '38b114a997ec654bd7933e888cbf4921'

router.get('/movie/:id', async (req,res) => {
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

})

router.get('/movie/:id/credits', async (req,res) => {
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

})

module.exports = router