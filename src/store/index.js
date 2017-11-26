import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import pins from './modules/pins';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navbar: true,
    modal: {
      show: false,
      image: null,
    },
    mainComponent: 'app-pins',
    activeTab: 'pins',
  },
  mutations: {
    TOGGLE_NAV: (state) => {
      state.navbar = !state.navbar;
    },
    TOGGLE_MODAL: (state, image) => {
      state.modal.show = !state.modal.show;
      state.modal.image = image;
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
    toggleModal: ({ commit }, image = null) => {
      commit('TOGGLE_MODAL', image);
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
    modal: state => state.modal,
    mainComponent: state => state.mainComponent,
    activeTab: state => state.activeTab,
  },
  modules: { user, pins },
});
