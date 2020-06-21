import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clubs: [],
    city: '',
    activity: ''
  },
  mutations: {
    mutationAddClubs(state, payload) {
      state.clubs = payload;
    },
    mutationFilterCity(state, payload) {
      state.city = payload;
    },
    mutationFilterActivity(state, payload) {
      state.activity = payload;
    }
  },
  actions: {
    actionAddClubs(context, payload) {
      context.commit('mutationAddClubs', payload)
    },
    actionFilterCity(context, payload) {
      context.commit('mutationFilterCity', payload)
    },
    actionFilterActivity(context, payload) {
      context.commit('mutationFilterActivity', payload)
    }
  },
  getters: {
    getStoreClubs(state) {
      return state.clubs
    },
    getStoreCity(state) {
      return state.city
    },
    getStoreActivity(state) {
      return state.activity
    }

  },
  modules: {

  }
})
