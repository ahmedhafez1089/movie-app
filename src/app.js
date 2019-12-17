const express = require('express')
const redis = require('redis')
require('./db/mongoose')
const movieRouter = require('./routers/movie.router')
const userRouter = require('./routers/user.router')


const client  = redis.createClient()

client.on('connect', function(){
    console.log('Connected to Redis...')
})

const app = express()

app.use(express.json())
app.use(movieRouter)
app.use(userRouter)


module.exports = app