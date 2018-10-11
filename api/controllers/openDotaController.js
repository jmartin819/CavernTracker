'use strict'
const Request = require("request")

exports.fetchUserByID = function (req, res) {

  let odRequestString = 'https://api.opendota.com/api/players/' + req.params.steamID
  let odUserInfo = {}
  Request.get(odRequestString, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
    res.send(JSON.parse(body))
  });

  //template for adding other calls to open dota to return more info about the user
  /*
  let odRequestString = 'https://api.opendota.com/api/players/' + req.params.steamID
  Request.get(odRequestString, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
    // res.send(JSON.parse(body))
  });
  */
  //calculations

  // after all above
  // res.send

}