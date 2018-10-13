'use strict'
const rp = require('request-promise')

exports.fetchUserByID = async function (req, res) {

  let responseObj = {}

  let req_matchStats = {
    uri: 'https://api.opendota.com/api/players/' + req.params.steamID + '/matches?significant=0&game_mode=23',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
  }

  let req_userStats = {
    uri: 'https://api.opendota.com/api/players/' + req.params.steamID,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
  }


  let matchStats = await rp(req_matchStats)
  let userStats = await rp(req_userStats)

  let returnObj = {"userStats": userStats, "matchStats": matchStats}
  res.send(returnObj)

  /*

  async function getMatchStats () {
    let query1 = 'https://api.opendota.com/api/players/' + req.params.steamID + '/matches?significant=0&game_mode=23'
    let responseMatchStats = await Request.get(query1, (error, response, body) => {
      if(error) {
        return console.dir(error);
      }
      // console.log(body)
      return JSON.parse(body)
    });
    let matchStats = responseMatchStats

    let query2 = 'https://api.opendota.com/api/players/' + req.params.steamID
    const responseUserStats = await Request.get(query2, (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
      // console.log(body)
      return JSON.parse(body)
    });
    let userStats = responseUserStats

    return({"userStats": userStats, "matchStats": matchStats})
  }

  getMatchStats().then(result => {
    console.log(result.userStats)
    console.log(result.matchStats)
    res.send(result)
  })
  */
}