import { createStore } from 'vuex'
import { UserModule } from "./User"

export default createStore({
  state: {},

  //functions taht affedt state
  mutations: {},
  
  //functions that you call, that call mutations
  actions: {},
  modules: {
    User: UserModule,
  }
})
