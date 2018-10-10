'use strict'
const Request = require("request")

const db = require('../db')

var usersRef = db.collection('users')

exports.fetchUserByID = function (req, res) {

  let odRequestString = 'https://api.opendota.com/api/players/' + req.body.userID
  Request.get(odRequestString, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
    res.send(JSON.parse(body))
  });

}