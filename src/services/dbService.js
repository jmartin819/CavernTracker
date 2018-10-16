import api from '@/services/api'

export default {
  fetchHeroesFromOpenDota () {
    return api().get('https://api.opendota.com/api/heroes')
  },
  fetchUserStatsFromOpenDota (steamID) {
    // console.log('https://api.opendota.com/api/players/' + steamID + '/matches?significant=0&game_mode=23')
    return api().get('api/opendota/' + steamID)
  },
  fetchUserFromDB (uid, token) {
    return api().get('api/auth/' + uid, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  updateUser (user) {
    return api().post('/api/user/' + user.firebaseid, user)
  },
  fetchAllUsersFromDB () {
    return api().get('/api/users/')
  }
}
