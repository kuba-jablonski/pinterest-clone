import Vue from 'vue';
import Router from 'vue-router';
import AddPin from '@/components/AddPin';
import Pins from '@/components/Pins';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pins',
      component: Pins,
    },
    {
      path: '/pin/new',
      name: 'AddPin',
      component: AddPin,
    },
  ],
});
