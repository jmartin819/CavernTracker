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

  let totals = {'kills': 0, 'deaths': 0, 'assists': 0}
  for(let i = 0; i < matchStats.length; i++) {
    // console.log(match)
    totals.kills += matchStats[i].kills
    totals.deaths += matchStats[i].deaths
    totals.assists += matchStats[i].assists
  }
  // console.log(totals)
  // console.log(matchStats.length)
  let averages = {'kills': (totals.kills / matchStats.length).toFixed(2), 'deaths': (totals.deaths / matchStats.length).toFixed(2), 'assists': (totals.assists / matchStats.length).toFixed(2)}
  console.log(averages)

  let returnObj = {"userStats": userStats, "matchStats": matchStats, "averages": averages}

  res.send(returnObj)
}