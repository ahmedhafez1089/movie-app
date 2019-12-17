const express = require('express')
const router = new express.Router()

const MovieController = require('../controllers/movie.controller')

router.get('/movie/:id', MovieController.getMovieDetails)

router.get('/movie/:id/credits', MovieController.getMovieCredits)

router.get('/movieCredits/:id', MovieController.getMovieWithCreditsDetails)

module.exports = router