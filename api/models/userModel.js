'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  firebaseid: {
    type: String
  },
  usertype: {
    type: String
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, { collection: 'users' })

module.exports = mongoose.model('userModel', userSchema)
