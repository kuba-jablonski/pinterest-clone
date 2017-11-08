import Vue from 'vue';
import Router from 'vue-router';
import AddPin from '@/components/AddPin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/pin/new',
      name: 'AddPin',
      component: AddPin,
    },
  ],
});
