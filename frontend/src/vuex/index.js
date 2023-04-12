import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            loginAccount: null,
            navbarSearchText: ''
        }
    },

    mutations: {
        setLoginAccount(state, value) {
            state.loginAccount = value
        },

        setNavbarSearchText(state, value) {
            state.navbarSearchText = value
        }
    },

    actions: {
        loginAccount(context, account) {
            context.commit('setLoginAccount', account)
            localStorage.setItem('loginAccount', account.CN_id)
        },

        logoutAccount(context) {
            context.commit('setLoginAccount', null)
            localStorage.removeItem('loginAccount')
        }
    }
})

export default store