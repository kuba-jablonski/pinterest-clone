import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import pins from './modules/pins';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navbar: true,
    mainComponent: 'app-pins',
    activeTab: 'pins',
  },
  mutations: {
    TOGGLE_NAV: (state) => {
      state.navbar = !state.navbar;
    },
    SET_MAIN_COMPONENT: (state, componentName) => {
      state.mainComponent = componentName;
    },
    SET_ACTIVE_TAB: (state, tab) => {
      state.activeTab = tab;
    },
  },
  actions: {
    toggleNav: ({ commit }) => {
      commit('TOGGLE_NAV');
    },
    setMainComponent: ({ commit }, componentName) => {
      commit('SET_MAIN_COMPONENT', componentName);
    },
    setActiveTab: ({ commit }, tab) => {
      commit('SET_ACTIVE_TAB', tab);
    },
  },
  getters: {
    navbar: state => state.navbar,
    mainComponent: state => state.mainComponent,
    activeTab: state => state.activeTab,
  },
  modules: { user, pins },
});
