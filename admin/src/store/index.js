import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    docked: true,
    navHide: false,
    drOpen: true,
    cTitle: 'Index'

  },

  mutations: {
    DOCKED: (state, val) => (state.docked = val),
    NAVHIDE: (state, val) => (state.navHide = val),
    DROPEN: (state, val) => (state.drOpen = val),
    CTITLE: (state, val) => (state.cTitle = val)

  },

  actions: {
    // valAction: ({commit}, val) => commit('VAL', val),

  },

  getters: {
    // getVal: state => state.val,

  }
})
