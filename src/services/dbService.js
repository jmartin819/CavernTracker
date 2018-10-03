import api from '@/services/api'

export default {
  fetchHeroesFromOpenDota () {
    return api().get('https://api.opendota.com/api/heroes')
  },
  fetchUserFromDB (uid) {
    return api().get('api/user/' + uid)
  }
}
