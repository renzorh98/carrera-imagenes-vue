
export default {
    namespaced: true,
    state: {
        token: null
    },
    mutations: {
        LOGIN(state, data){
            localStorage.token = data;
            state.token = data;
        },
        LOGOUT(state){
            localStorage.removeItem('token');
            state.token = null
        }
    },
    actions: {
        setToken({commit}, token){
            commit("LOGIN", token)
        },
        removeToken({commit}){
            commit("LOGOUT")
        }

    },
    getters: {
      getToken:(state) =>{
          return state.token
      }
    }
}