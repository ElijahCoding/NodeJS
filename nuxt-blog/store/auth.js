export const state = () => ({
    token: null
})

export const mutations = {
    setToken(state, token) {
        state.token = token
    }
}

export const actions = {
    async login({commit, dispatch}, formData) {
        try {
          const token = await new Promise((resolve, reject) => {
            setTimeout(() => resolve('mock-token'), 2000)
          })
          dispatch('setToken', token)
        } catch (e) {
          commit('setError', e, {root: true})
          throw e
        }
    },

    setToken({ commit }, token) {
        commit('setToken', token)
    }
}

export const getters = {
    isAuthenticated: state => Boolean(state.token)
}
