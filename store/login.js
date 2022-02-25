import axios from 'axios'

export const state = () => ({
  modalLogin: false,
  isLogin: true,
  isRegister: false,
  isReset: false,
  userLogged: null,
});

export const getters = {
  modalLogin(state) {
    return state.modalLogin
  },
  isLogin(state) {
    return state.isLogin
  },
  isRegister(state) {
    return state.isRegister
  },
  isReset(state) {
    return state.isReset
  },
  userLogged(state) {
    return state.userLogged
  },
};

export const mutations = {
  SET_MODAL_LOGIN(state, data) {
    state.modalLogin = data;
  },
  SET_ISLOGIN(state, data) {
    state.isLogin = data;
  },
  SET_ISREGISTER(state, data) {
    state.isRegister = data;
  },
  SET_ISRESET(state, data) {
    state.isReset = data;
  },

  SET_USER(state, user) {
    state.userLogged = user
    if (user) {
      axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  },

};

export const actions = {
  SET_MODAL_LOGIN({
    commit
  }, modalLogin) {
    commit("SET_MODAL_LOGIN", modalLogin);
  },
  SET_ISLOGIN({
    commit
  }, isLogin) {
    commit("SET_ISLOGIN", isLogin);
  },
  SET_ISREGISTER({
    commit
  }, isRegister) {
    commit("SET_ISREGISTER", isRegister);
  },
  SET_ISRESET({
    commit
  }, isReset) {
    commit("SET_ISRESET", isReset);
  },
  SET_USER(state, user) {
    state.userLogged = user
    if (user) {
      axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  },

};
