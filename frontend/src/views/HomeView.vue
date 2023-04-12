<template>
    <div class="home-view movie-list">
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
                // for (let i = 0; i < 10; i++) {
                //     this.movies.push(this.movies[3])
                // }
            })
            .catch(err => {
                console.log(err);
            })
    }
}
</script>


<style lang="scss" scoped>
.movie-list {
    display: flex;
    flex-wrap: wrap;

    .movie-card {
        flex: 0 0 calc(100% /4);
        // width: calc(100% / 4);
        display: inline-block;
        padding: 12px 4px 4px;
    }
}
</style>