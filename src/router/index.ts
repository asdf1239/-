import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Sigin',
    name: 'Sigin',
    component: () => import('../views/userAgent/Sigin.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/userAgent/Login.vue')
  },
  {
    path: '/Movie/Selecting',
    name: 'Movie/Selecting',
    component: () => import('../views/manager/movie/actions/Selecting.vue')
  },
  {
    path: '/Movie/Editing',
    name: 'Movie/Editing',
    component: () => import('../views/manager/movie/actions/Editing.vue')
  },
  {
    path: '/People/Selecting',
    name: 'People/Selecting',
    component: () => import('../views/manager/people/actions/Selecting.vue')
  },
  {
    path: '/People/Editing',
    name: 'People/Editing',
    component: () => import('../views/manager/people/actions/Editing.vue')
  },
  {
    path: '/VIP/Selecting',
    name: 'VIP/Selecting',
    component: () => import('../views/manager/vip/actions/Selecting.vue')
  },
  {
    path: '/VIP/Editing',
    name: 'VIP/Editing',
    component: () => import('../views/manager/vip/actions/Editing.vue')
  },
  {
    path: '/Hall/Selecting',
    name: 'Hall/Selecting',
    component: () => import('../views/manager/hall/actions/Selecting.vue')
  },
  {
    path: '/Hall/Editing',
    name: 'Hall/Editing',
    component: () => import('../views/manager/hall/actions/Editing.vue')
  },
  {
    path: '/Seat/Selecting',
    name: 'Seat/Selecting',
    component: () => import('../views/manager/seat/actions/Selecting.vue')
  },
  {
    path: '/Seat/Editing',
    name: 'Seat/Editing',
    component: () => import('../views/manager/seat/actions/Editing.vue')
  },
  {
    path: '/Arrange/Selecting',
    name: 'Arrange/Selecting',
    component: () => import('../views/manager/arrangement/actions/Selecting.vue')
  },
  {
    path: '/Arrange/Editing',
    name: 'Arrange/Editing',
    component: () => import('../views/manager/arrangement/actions/Editing.vue')
  },
  {
    path: '/Ticket/Selecting',
    name: 'Ticket/Selecting',
    component: () => import('../views/customer/ticket/actions/Selecting.vue')
  },
  {
    path: '/Ticket/Editing',
    name: 'Ticket/Editing',
    component: () => import('../views/customer/ticket/actions/Editing.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
