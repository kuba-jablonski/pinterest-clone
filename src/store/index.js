import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import pins from './modules/pins';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navbar: false,
  },
  mutations: {
    TOGGLE_NAV: (state) => {
      state.navbar = !state.navbar;
    },
  },
  getters: {
    navbar: state => state.navbar,
  },
  modules: { user, pins },
});
