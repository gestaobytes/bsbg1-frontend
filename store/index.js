import axios from 'axios'
export const state = () => ({
    user: {}
})

export const mutations = {
    setUser(state, user) {
        state.user = user
        if (user) {
            axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    },
}