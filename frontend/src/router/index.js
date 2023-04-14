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
		path: '/ticket/storage',
		name: 'ticket-storage',
		component: () => import('../views/TicketStorageView.vue')
	},
	{
		path: '/admin',
		name: 'admin',
		component: () => import('../views/AdminView.vue'),
		redirect: { name: 'movie-list' },
		children: [
			{
				path: 'movie/list',
				name: 'movie-list',
				component: () => import('../views/MovieListView.vue')
			},
			{
				path: 'add/movie',
				name: 'add-movie',
				component: () => import('../views/AddMovieView.vue')
			},
			{
				path: 'add/showtime',
				name: 'add-showtime',
				component: () => import('../views/AddShowtimeView.vue')
			},
			{
				path: 'statistic',
				name: 'statistic',
				component: () => import('../views/StatisticView.vue')
			}
		]
	},
	{
		path: '/:movieId/ticket/book',
		name: 'book-ticket',
		component: () => import('../views/BookTicketView.vue')
	},
	{
		path: '/:movieId',
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
