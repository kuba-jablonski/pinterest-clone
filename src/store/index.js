import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import pins from './modules/pins';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navbar: false,
    mainComponent: 'app-pins',
  },
  mutations: {
    TOGGLE_NAV: (state) => {
      state.navbar = !state.navbar;
    },
    SET_MAIN_COMPONENT: (state, componentName) => {
      state.mainComponent = componentName;
    },
  },
  actions: {
    setMainComponent: ({ commit }, componentName) => {
      commit('SET_MAIN_COMPONENT', componentName);
    },
  },
  getters: {
    navbar: state => state.navbar,
    mainComponent: state => state.mainComponent,
  },
  modules: { user, pins },
});
