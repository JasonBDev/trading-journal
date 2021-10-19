import { createStore } from 'vuex'

export default createStore({
  state() { 
    return {
      auth_status: false,
      name: ''
    }
  },
  mutations: {
    setAuth(state, payload){
      state.auth_status = payload
    },
    setName(state, payload){
      state.name = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
