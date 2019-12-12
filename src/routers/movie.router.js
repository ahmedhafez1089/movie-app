const express = require('express')
const router = new express.Router()

const MovieController = require('../controllers/movie.controller')

const apiKey = '38b114a997ec654bd7933e888cbf4921'

router.get('/movie/:id', MovieController.getMovieDetails)

router.get('/movie/:id/credits', MovieController.getMovieCredits)

module.exports = router