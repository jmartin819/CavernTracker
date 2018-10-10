'use strict'

module.exports = function (app) {
  var user = require('../controllers/userController')
  var od = require('../controllers/openDotaController')

  /*
  app.route('/').get(function (req, res) {
    res.send('Welcome')
  })
  */
  app.route('/api/user/:uid')
    .get(user.userCheck)

  app.route('/api/profile/:uid')
    .get(od.fetchUserByID)
}
