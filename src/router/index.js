import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:userId',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/User.vue'),
    children: [
      {
        path: '',
        name: 'Catalog',
        component: () => import(/* webpackChunkName: "catalog" */ '../views/user/Catalog.vue')
      },
      {
        path: 'collection',
        name: 'Collection',
        component: () => import(/* webpackChunkName: "collection" */ '../views/user/Collection.vue')
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import(/* webpackChunkName: "upload" */ '../views/user/Upload.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router