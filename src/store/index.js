import { createStore } from 'vuex'
import VuexPersistence from "vuex-persist";
import tokenState from "@/store/tokenState";
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tokenState
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
    }).plugin,
  ],
})
