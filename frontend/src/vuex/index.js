import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            loginAccount: null
        }
    },

    mutations: {
        setLoginAccount(state, value) {
            state.loginAccount = value
        }
    },

    actions: {
        loginAccount(context, account) {
            context.commit('setLoginAccount', account)
        },

        logoutAccount(context) {
            context.commit('setLoginAccount', null)
        }
    }
})

export default store