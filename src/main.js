import Vue from 'vue';
import App from './app.vue';
import Vuex from 'vuex';
import './../node_modules/bulma/css/bulma.css';
import VueRouter from 'vue-router';

import foo from './pages/foo.vue';
import Details from './pages/card.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/foo', name: 'foo', component: foo },
  { path: '/details', name: 'Details', component: Details }
];

const router = new VueRouter({
  routes,
  mode: process.env.NODE_ENV !== 'production' ? 'history' : 'hash'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
