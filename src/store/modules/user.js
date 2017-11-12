import firebase from 'firebase';

export default {
  state: {
    authenticated: null,
    uid: null,
  },
  mutations: {
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
    authenticated: state => state.authenticated,
    userId: state => state.uid,
  },
};
