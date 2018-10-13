'use strict'
const Request = require("request")

exports.fetchUserByID = async function (req, res) {

  let responseObj = {}

  let odMatchStats = 'https://api.opendota.com/api/players/' + req.params.steamID + '/matches?significant=0&game_mode=23'
  const response1 = await Request.get(odMatchStats, (error, response, body) => {
    if(error) {
      return console.dir(error);
    }
    console.log("setting timeout")
    setTimeout(function() {
      console.log("in timeout")
    //  console.log("Response Object")
    //  console.log(responseObj)
    //  res.send(responseObj)
    }, 5000);
    //let temp = JSON.parse(body)
    //console.log("temp")
    //console.log(temp)
    return JSON.parse(body)
  });
  //let temp = JSON.parse(response1.data)
  console.log("response")
  console.log(response1)
  responseObj.matchStats = response1.body

  let odRequestString = 'https://api.opendota.com/api/players/' + req.params.steamID
  let odUserInfo = {}
  const response2 = await Request.get(odRequestString, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    return JSON.parse(body)
 
  });
  responseObj.userStats = response2.data


  


  //Calculations Below

  // after all above
  // res.send

}