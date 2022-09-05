import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import Test from  '../components/Test'
import Login from '../views/LoginView/index'
import Recognition from '../views/MeetingView/beforeRecognition'
import Manger from '../views/HomeView/MangerView'
import addView from '../views/HomeView/addUserView'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/zego',
    name: 'zego',
    component: () => import('../views/MeetingView/index')
  },
  {
    path: '/recognition',
    name: 'recognition',
    component: Recognition
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '/manger',
    component: Manger
  },
  {
    path: '/add',
    component: addView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
