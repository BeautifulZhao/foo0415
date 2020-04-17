import Vue from 'vue'
import Router from 'vue-router'

import System from '../components/System'
import Region from '../components/Region'
import Camera from '../components/Camera'

Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/system'
  },
  {
    path: '/system',
    component: System
  },
  {
    path: '/region',
    component: Region
  },
  {
    path: '/camera',
    component: Camera
  },
]

const router = new Router({
  routes
})

export default router