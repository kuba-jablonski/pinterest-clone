import firebase from 'firebase';
import _ from 'lodash';

export default {
  state: {
    pins: [],
  },
  mutations: {
    CREATE_PINS_LIST: (state, pins) => {
      state.pins = pins;
    },
  },
  actions: {
    fetchPins: ({ commit }) => {
      firebase.database().ref('pins')
        .once('value', (snap) => {
          commit('CREATE_PINS_LIST', snap.val());
        });
    },
    savePin: (context, pin) => {
      const newPinRef = firebase.database().ref('pins').push();
      newPinRef.set(pin);
    },
  },
  getters: {
    pins: state => _.values(state.pins).reverse(),
  },
};
