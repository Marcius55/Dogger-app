import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import CreatePage from '../pages/CreatePage.vue'
import EditPage from '../pages/EditPage.vue'
import DetailsPage from '../pages/DetailsPage.vue'
import AboutPage from '../pages/AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePage
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditPage,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/details/:id',
    name: 'details',
    component: DetailsPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
