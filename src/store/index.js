import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navbar: true,
  },
  mutations: {
    TOGGLE_NAV: (state) => {
      state.navbar = !state.navbar;
    },
  },
  getters: {
    navbar: state => state.navbar,
  },
});
