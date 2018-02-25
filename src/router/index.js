import Vue from 'vue'
import Router from 'vue-router'
import Notebook from '@/components/Notebook/Notebook'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Notebook',
      component: Notebook
    }
  ]
})
