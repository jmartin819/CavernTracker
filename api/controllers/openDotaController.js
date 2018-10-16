'use strict'
const rp = require('request-promise')
const db = require('../db')
var usersRef = db.collection('users')

async function processPlayerInfo(steamId, matchStats, userStats) {

  console.log(userStats)
  console.log("match stats length: ", matchStats.length)

  let totals = {'kills': 0, 'deaths': 0, 'assists': 0}
  for(let i = 0; i < matchStats.length; i++) {
    // console.log(match)
    totals.kills += matchStats[i].kills
    totals.deaths += matchStats[i].deaths
    totals.assists += matchStats[i].assists
  }
  // console.log(totals)
  // console.log(matchStats.length)
  totals.games =(matchStats.length)
  let avgObj = {'kills': (totals.kills / matchStats.length).toFixed(2), 'deaths': (totals.deaths / matchStats.length).toFixed(2), 'assists': (totals.assists / matchStats.length).toFixed(2)}

  usersRef.where('steamID', '==', steamId).get()
  .then(snapshot => {
    snapshot.forEach(userDoc => {

      let userObj = userDoc.data()

      userObj.averages = avgObj
      userObj.totals = totals

      console.log(userDoc.data())
      
      userDoc.ref.update(userObj).then(ref => {

        // let userObj = req.body
        // OD_userinfo = OD.fetchUserByID(req.params.uid)

        console.log('Updated document with ID: ', ref);
      });
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  return ({"averages": avgObj, "totals": totals})
}

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

  let calcObj = await processPlayerInfo(req.params.steamID, matchStats, userStats)

  console.log(calcObj)

  let returnObj = {"userStats": userStats, "matchStats": matchStats, "averages": calcObj.averages, "totals": calcObj.totals}

  res.send(returnObj)
}