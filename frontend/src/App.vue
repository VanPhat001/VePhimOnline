<template>
	<header>
		<Navbar></Navbar>
	</header>

	<main>
		<div class="container py-4">
			<router-view></router-view>
		</div>
	</main>
</template>


<script>
import Navbar from './components/Navbar.vue'
import serviceProvider from './services';

export default {
	components: {
		Navbar
	},

	created() {
		const logginAccountId = localStorage.getItem('loginAccount')
		if (logginAccountId) {
			serviceProvider.getAccountById(logginAccountId)
				.then(response => {
					// console.log(response)
					if (response.length > 0) {
						const account = response[0]
						this.$store.dispatch('loginAccount', account)
					}
				})
				.catch(err => console.log(err))
		}
	},

	mounted() {
		const headerHeight = document.querySelector('header').clientHeight
		document.querySelector('main').style.marginTop = (headerHeight + 16) + 'px'
	}
}
</script>


<style lang="scss" scoped>

header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;
}
</style>