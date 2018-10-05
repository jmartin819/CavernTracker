'use strict'

module.exports = function (app) {
  var user = require('../controllers/userController')

  /*
  app.route('/').get(function (req, res) {
    res.send('Welcome')
  })
  */
  app.route('/api/user/:uid')
    .get(user.userCheck)
}
