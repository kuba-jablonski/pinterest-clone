import firebase from 'firebase';
import _ from 'lodash';

export default {
  state: {
    pins: [],
    pinFilter: 'all',
  },
  mutations: {
    CREATE_PINS_LIST: (state, pins) => {
      state.pins = pins;
    },
    DELETE_PIN: (state, id) => {
      state.pins = _.omit(state.pins, id);
    },
    ADD_LIKE: (state, id) => {
      state.pins[id].likesCount += 1;
    },
    SET_PIN_FILTER: (state, filter) => {
      state.pinFilter = filter;
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
      newPinRef.set(_.assign(pin, {
        id: newPinRef.key,
        author: {
          uid: firebase.auth().currentUser.uid,
          displayName: firebase.auth().currentUser.displayName,
        },
        createdAt: Date.now(),
        likesCount: 0,
      }));
    },
    deletePin: ({ commit }, id) => {
      const pin = firebase.database().ref('pins').child(id);
      pin.remove();
      commit('DELETE_PIN', id);
    },
    addLike: ({ commit }, id) => {
      /* eslint-disable no-param-reassign */
      const pinRef = firebase.database().ref('pins').child(id);
      const uid = firebase.auth().currentUser.uid;
      pinRef.transaction((pin) => {
        if (pin) {
          if (!pin.likes) {
            pin.likes = {};
          }
          if (!pin.likes[uid]) {
            pin.likesCount += 1;
            pin.likes[uid] = true;
            commit('ADD_LIKE', id);
          }
        }
        return pin;
      });
    },
    setPinFilter: ({ commit }, filter) => {
      commit('SET_PIN_FILTER', filter);
    },
  },
  getters: {
    pins: (state, getters) => {
      const pins = _.values(state.pins).reverse();

      if (state.pinFilter === 'user') {
        return pins.filter(pin => pin.author.uid === getters.userId);
      } else if (state.pinFilter === 'all') {
        return pins;
      }

      return pins.filter(pin => pin.author.uid === state.pinFilter);
    },
  },
};
