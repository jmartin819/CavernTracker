// Turbo Doto
// Copyright No Salt Studios 2018

var express = require('express')
var dotenvcfg = require('dotenv').config()
var app = express()
var port = process.env.PORT || 8081
// var mongoose = require('mongoose')
// var user = require('./api/models/userModel')
var bodyParser = require('body-parser')
// var db = require('./api/db')
var path = require('path')
const cors = require('cors')
const environment = process.env.NODE_ENV || 'development'

console.log('Running in env ' + environment)
// console.log(process.env)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('connect-history-api-fallback')())
app.use(bodyParser.json())
app.use(cors())

var routes = require('./api/routes/appRoutes')
routes(app)

app.use(express.static(path.join(__dirname, '/dist')))

app.listen(port)

console.log('RESTful API online at ' + port)
