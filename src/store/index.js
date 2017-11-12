import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import pins from './modules/pins';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: null,
    uid: null,
    navbar: true,
  },
  mutations: {
    TOGGLE_NAV: (state) => {
      state.navbar = !state.navbar;
    },
    SET_AUTH_STATE: (state, authState) => {
      state.authenticated = authState;
    },
    SET_USER_ID: (state, uid) => {
      state.uid = uid;
    },
  },
  actions: {
    watchAuthState: ({ commit }) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('SET_AUTH_STATE', true);
          commit('SET_USER_ID', user.uid);
        } else {
          commit('SET_AUTH_STATE', false);
          commit('SET_USER_ID', null);
        }
      });
    },
  },
  getters: {
    navbar: state => state.navbar,
    authenticated: state => state.authenticated,
    userId: state => state.uid,
  },
  modules: { pins },
});
