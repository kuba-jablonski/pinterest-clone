import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: null,
    uid: null,
    navbar: true,
    pins: [],
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
    SAVE_PINS: (state, pins) => {
      state.pins = pins;
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
    fetchPins: ({ commit }) => {
      firebase.database().ref('pins').once('value', (snap) => {
        commit('SAVE_PINS', snap.val());
      });
    },
  },
  getters: {
    navbar: state => state.navbar,
    authenticated: state => state.authenticated,
    userId: state => state.uid,
    pins: state => state.pins,
  },
});