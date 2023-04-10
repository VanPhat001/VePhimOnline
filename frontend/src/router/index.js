import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue')
  }, 
  {
    path: '/:sc_id/ticket/book',
    name: 'book-ticket',
    component: () => import('../views/BookTicketView.vue')
  },
  {
    path: '/:sc_id/:movieId',
    name: 'movieInfo',
    component: () => import('../views/MovieView.vue')
  },
  {
    path: '/profile/edit',
    name: 'edit-profile',
    component: () => import('../views/EditProfileView.vue')
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
