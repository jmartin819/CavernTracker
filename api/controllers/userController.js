'use strict'

var mongoose = require('mongoose')
var User = mongoose.model('userModel')

exports.userCheck = function (req, res) {
  console.log('req.params')
  console.log(req.params)
  let query = {}
  query['firebaseid'] = req.params.uid
  User.findOne(query, function (err, user) {
    if (err || typeof user === 'undefined') {
      console.log(err.message)
      res.send(err)
    }
    // console.log(iosapps);
    // console.log('found: ' + user.length)
    if (user === null || user.length === 0) {
      let newUser = new User({
        'firebaseid': req.params.uid,
        'usertype': 'client',
        'authorizedApps': []
      })

      newUser.save((err, user) => {
        if (err) {
          console.error(err)
          res.send(err)
        }
        console.log('newuser')
        console.log(user)
        res.send(user)
      })
    } else {
      console.log('existinguser')
      console.log(user)
      res.send(user)
    }
  })
}
