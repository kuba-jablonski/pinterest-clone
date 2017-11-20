import Vue from 'vue';
import firebase from 'firebase';
import { VueMasonryPlugin } from 'vue-masonry';
import App from './App';
import store from './store';

Vue.use(VueMasonryPlugin);
Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyDQCJjd9w7YVGKtiRwAS0SIq8ZPaqW5gnQ',
  authDomain: 'pinterest-clone-93d4d.firebaseapp.com',
  databaseURL: 'https://pinterest-clone-93d4d.firebaseio.com',
  projectId: 'pinterest-clone-93d4d',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
