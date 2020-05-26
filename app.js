const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const keys = require('./config/keys')

const app = express()
require('./models/User')
require('./models/Trail')
const authRoutes = require('./routes/authRoutes')
const trailRoutes = require('./routes/trailRoutes')

try {
  mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('connected to database...')
} catch (err) {
  console.log('connection to database failed' + err)
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  )
  next()
})

app.use('/auth', authRoutes)
app.use('/trails', trailRoutes)

module.exports = app
