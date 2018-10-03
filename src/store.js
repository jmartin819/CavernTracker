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
    heroes: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setHeroes (state, payload) {
      state.heroes = payload
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
    signUserIn ({commit, dispatch}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            console.log('login worked')
            // console.log(user)
            commit('setUser', user.user)
            // dispatch('getUserFromDB', {'uid': user.user.uid, 'email': user.user.email})
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
      let userObj = response.data
      userObj.email = payload.email
      console.log('userobj', userObj)
      commit('setUser', response.data)
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
    }
  }
})
