import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: null,
    navbar: true,
  },
  mutations: {
    TOGGLE_NAV: (state) => {
      state.navbar = !state.navbar;
    },
    SET_AUTH_STATE: (state, authState) => {
      state.authenticated = authState;
    },
  },
  actions: {
    watchAuthState: ({ commit }) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('SET_AUTH_STATE', true);
        } else {
          commit('SET_AUTH_STATE', false);
        }
      });
    },
  },
  getters: {
    navbar: state => state.navbar,
  },
});
