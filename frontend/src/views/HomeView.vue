<template>
    <div class="home-view">
            <template v-for="movie in movies">
                <MovieCard :p-movie-info="movie" :p-image="''"></MovieCard>
            </template>
    </div>
</template>


<script>
import servicesProvider from '../services'
import MovieCard from '../components/MovieCard.vue'


export default {
    data() {
        return {
           movies: []
        }
    },

    components: {
        MovieCard
    },

    methods: {
        formatDate(date) {
            return date.toISOString().split('T')[0]
        }
    },

     created() {
        // const curr = new Date
        // let firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
        // let lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6))
        // firstday = this.formatDate(firstday)
        // lastday = this.formatDate(lastday)

        const firstday = '2023-1-1'
        const lastday = '2024-1-1'
        servicesProvider.getAllSuatChieuByDate(firstday, lastday)
            .then(data => {
                this.movies = data
            })
            .catch(err => {
                console.log(err);
            })
    }
}
</script>


<style lang="scss" scoped>
    
</style>