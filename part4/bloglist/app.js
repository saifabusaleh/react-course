const blogRouter = require('./controller/blog')
const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })


app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogRouter)

module.exports = app