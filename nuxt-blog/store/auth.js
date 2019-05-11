import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

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
        Cookies.set('jwt-token', token)
    },

    logout ({ commit }) {
        this.$axios.setToken(false)
        commit('clearToken')
        Cookies.remove('jwt-token')
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

        const cookies = Cookie.parse(cookieStr || '') || {}
        const token = cookies['jwt-token']


    }
}

export const getters = {
    isAuthenticated: state => Boolean(state.token),
    token: state => state.token
}
