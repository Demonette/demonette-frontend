import Vue from 'vue';
import Router from 'vue-router';
import Search from '@/components/Search';
import About from '@/components/About';
import Contacts from '@/components/Contacts';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts,
    },
  ],
});
