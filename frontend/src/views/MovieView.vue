<template>
    <div class="movie-view">
        <template v-if="movie">
            <div class="row">
                <div class="col-3">
                    <img class="w-100" :src="movie.Phim_poster" alt="...">
                </div>
                <div class="col-9">
                    <h3>{{ movie.Phim_ten }}</h3>
                    <br>
                    <p><span class="font-weight-bold">Độ tuổi giới hạn:</span> <span> Từ {{ movie.Phim_doTuoi }} trở lên</span></p>
                    <hr>
                    <p><span class="font-weight-bold">Thể loại:</span> <span>{{ movie.Phim_theLoai }}</span></p>
                    <hr>
                    <p><span class="font-weight-bold">Mã phim:</span> <span>{{ movie.Phim_id }}</span></p>
                    <hr>
                    <router-link class="btn btn-primary px-5" :to="{name: 'book-ticket', params: { movieId: movie.Phim_id }}">Đặt vé</router-link>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col"> 
                    <p>{{ movie.Phim_moTa }}</p>    
                </div>
            </div>
        </template>

    </div>
</template>


<script>
import serviceProvider from '../services'

export default {
    computed: {
        movieId() {
            return this.$route.params.movieId
        }
    },

    data() {
        return {
            movie: null
        }
    },

    created() {
        console.log(this.movieId);
        serviceProvider.getPhimById(this.movieId)
            .then(response => {
                console.log(response);
                this.movie = response[0]
            })
            .catch(err => console.log(err))
    }
}
</script>