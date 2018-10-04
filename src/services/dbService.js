import api from '@/services/api'

export default {
  fetchHeroesFromOpenDota () {
    return api().get('https://api.opendota.com/api/heroes')
  },
  fetchUserStatsFromOpenDota (userID) {
    console.log('https://api.opendota.com/api/players/' + userID + '/matches?significant=0&game_mode=23')
    return api().get('https://api.opendota.com/api/players/' + userID + '/matches?significant=0&game_mode=23')
  },
  fetchUserFromDB (uid) {
    return api().get('api/user/' + uid)
  }
}
