export const UserModule = {
  namespaced: true,

  state: {
    user: null,
  },

  //functions taht affedt state
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }
  },
  
  //functions that you call, that call mutations
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user)
    }
  },
}