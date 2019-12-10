const express = require('express')
require('./db/mongoose')
const movieRouter = require('./routers/movie')

const app = express()

app.use(express.json())
app.use(movieRouter)


module.exports = app