<template>
    <div class="movie-card d-inline-block w-25 p-1">
        <div class="card w-100">
            <img :src="movie.Phim_poster" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title limit-2-rows">{{ movie.Phim_ten }}</h5>

                <div class="row">
                    <div class="col p-1">
                        <router-link :to="{name: 'book-ticket', params: { sc_id: movie.SC_id }}" class="btn btn-primary w-100">Đặt vé</router-link>
                    </div>
                    <div class="col p-1">
                        <router-link :to="{ name: 'movieInfo', params: { movieId: movie.Phim_id, sc_id: movie.SC_id } }"
                            class="btn btn-primary w-100">Chi
                            tiết</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        pMovieInfo: {
            type: Object,
            default: null,
            required: true
        }
    },

    computed: {
        movie() {
            return this.pMovieInfo
        }
    }
}
</script>


<style lang="scss" scoped>
.limit-2-rows {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 3rem;
}
</style>