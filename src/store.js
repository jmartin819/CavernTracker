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
    heroes: [],
    stats: []
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
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async refreshHeroesFromOpenDota ({commit}) {
      const response = await DBService.fetchHeroesFromOpenDota()
      let heroes = response.data
      commit('setHeroes', heroes)
    },
    async getUserStatsFromOpenDota ({commit}, payload) {
      const response = await DBService.fetchUserStatsFromOpenDota(payload.userID)
      let stats = response.data
  //    console.log(stats)
      commit('setStats', stats)
    },
    signUserIn ({commit, dispatch}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            console.log('login worked')
            // console.log(user)
            commit('setUser', user.user)
            dispatch('getUserFromDB', {'uid': user.user.uid, 'email': user.user.email})
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
    logout ({commit}) {
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
    clearError ({commit}) {
      commit('clearError')
    },
    async getUserFromDB ({commit}, payload) {
      const response = await DBService.fetchUserFromDB(payload.uid)
      let userObj = this.getters.user
      console.log(response.data)
      userObj["dbData"] = response.data

      console.log("in function")
      commit('setUser', userObj)
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
    }
  }
})
