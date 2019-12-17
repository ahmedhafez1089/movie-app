const express = require('express')
const router = new express.Router()

const UserController = require('../controllers/user.controller')

router.post('/users', UserController.createUser)
router.post('/users/login', UserController.loginUser)
router.post('/users/logout', UserController.logout)
router.get('/users/me', UserController.getUser)

module.exports = router