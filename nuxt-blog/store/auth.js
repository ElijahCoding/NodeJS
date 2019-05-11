export const state = () => ({
    token: null
})

export const mutations = {
    setToken(state, token) {
        state.token = token
    },

    clearToken(state) {
        state.token = null
    }
}

export const actions = {
    async login({ commit, dispatch }, formData) {
        try {
          const { token } = await this.$axios.$post(`/api/auth/admin/login`, formData)
          dispatch('setToken', token)
        } catch (e) {
          commit('setError', e, { root: true })
          throw e
        }
    },

    setToken({ commit }, token) {
        this.$axios.setToken(token, 'Bearer')
        commit('setToken', token)
    },

    logout ({ commit }) {
        this.$axios.setToken(false)
        commit('clearToken')
    },

    async createUser ({ commit }, formData) {
        try {
            await this.$axios.$post('/api/auth/admin/create', formData)
        } catch (e) {
            commit('setError', e, { root: true })
            throw e
        }
    },

    autoLogin () {
        const cookieStr = process.browser
        ? document.cookie
        : this.app.context.req.headers.cookie

        console.log(cookieStr);
    }
}

export const getters = {
    isAuthenticated: state => Boolean(state.token),
    token: state => state.token
}
