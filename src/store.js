import Vue from 'vue'
import Vuex from 'vuex'
import DBService from '@/services/dbService'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    user: null,
    error: null,
    token: sessionStorage.getItem('accessToken') || '',
    heroes: [],
    stats: {
      'userStats': {},
      'matchStats': {}
    },
    LSuser: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setHeroes (state, payload) {
      state.heroes = payload
    },
    setStats (state, payload) {
      state.stats = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLocalStorageUser(state, payload) {
      state.LSuser = payload
      console.log(payload.stsTokenManager)
      sessionStorage.accessToken = payload.access
      sessionStorage.refreshToken = payload.refresh
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async refreshHeroesFromOpenDota ({ commit }) {

      const response = await DBService.fetchHeroesFromOpenDota().catch((error) => {
        console.log('Error fetching from OpenDota')
        commit('setError','Error fetching from OpenDota')
      });
      
      let heroes = response.data
      commit('setHeroes', heroes)
    },
    async getUserStatsFromOpenDota ({ commit }, payload) {

      const response = await DBService.fetchUserStatsFromOpenDota(payload.steamID).catch((error) => {
        console.log('Error fetching from OpenDota')
        commit('setError','Error fetching from OpenDota')
      });

      let stats = response.data
      console.log(stats)
      commit('setStats', stats)
    },
    signUserIn ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            // console.log(user.user)
            // commit('setLocalStorageUser', {
            //   'access': user.user.stsTokenManager.accessToken, 
            //   'refresh': user.user.stsTokenManager.refreshToken
            // })
            dispatch('getUserFromDB', { 'uid': user.user.uid, 'email': user.user.email })
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    logout ({ commit }) {
      commit('setLoading', true)
      firebase.auth().signOut()
        .then(() => {
          commit('setLoading', false)
          commit('setUser', null)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    clearError ({ commit }) {
      commit('clearError')
    },
    async getUserFromDB ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then( idToken => {
        DBService.fetchUserFromDB(payload.uid, idToken).then(response => {
          let userObj = response.data
          // console.log(response.data)
          userObj.email = payload.email
          userObj.firebaseid = payload.uid

          dispatch('getUserStatsFromOpenDota', { 'steamID': userObj.steamID})

          // console.log('in function')
          commit('setUser', userObj)
          commit('setLoading', false)
        }).catch((error) => {
          console.log('Error fetching user from DB')
          commit('setError','Error fetching user from DB')
        });
      }).catch(function(error) {
        console.log('Error fetching user from DB')
        commit('setError','Error fetching user from DB')
      });
    },
    async updateUser ({ commit }, payload) {
      const response = await DBService.updateUser(payload.user).catch((error) => {
        console.log('Error updating user from DB')
        commit('setError','Error updating user from DB')
      });
      
      let userObj = response
      console.log(response)
      // commit('setUser', userObj)
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    heroes (state) {
      return state.heroes
    },
    stats (state) {
      return state.stats
    },
    token: state => {
      return state.token
    },
    LSuser: state => {
      return state.LSuser
    },
    isAuthenticated: state => !!state.token
  }
})
