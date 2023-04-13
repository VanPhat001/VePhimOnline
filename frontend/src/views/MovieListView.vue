<template>
    <div class="movie-list-view">

        <input @keyup="findMovies(searchText)" type="text" class="form-control my-4 w-100 p-2" placeholder="Nhập tên phim..." v-model="searchText">

        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th nowrap="nowrap" scope="col" class="text-center">#</th>
                    <th nowrap="nowrap" scope="col">Poster</th>
                    <th nowrap="nowrap" scope="col">Tên</th>
                    <th nowrap="nowrap" scope="col">Độ tuổi</th>
                    <th nowrap="nowrap" scope="col">Thể loại</th>
                    <th nowrap="nowrap" scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(movie, index) in moviesRender" :key="index">
                    <th class="align-middle" scope="row">
                        <p class="text-center">{{ index + 1 }}.</p>
                        <p>(id={{ movie.Phim_id }})</p>
                    </th>
                    <td class="align-middle">
                        <img :src="movie.Phim_poster" alt=".." height="90">
                    </td>
                    <td class="align-middle">
                        {{ movie.Phim_ten }}
                    </td>
                    <td class="align-middle text-center">
                        {{ movie.Phim_doTuoi }}
                    </td>
                    <td class="align-middle text-center">
                        {{ movie.Phim_theLoai }}
                    </td>
                    <td class="align-middle text-right">
                        <router-link :to="{ name: 'add-showtime', query: { movieId: movie.Phim_id } }" class="btn btn-primary">Thêm suất chiếu</router-link>
                    </td>
                </tr>

            </tbody>
        </table>

    </div>
</template>
<script>
import serviceProvider from '../services';

export default {
    data() {
        return {
            moviesRender: [],
            movies: [],
            searchText: '',
            timeOutId: null
        }
    },

    methods: {
        findMovies(text) {
            clearTimeout(this.timeOutId)

            this.timeOutId = setTimeout(() => {
                const reg =  new RegExp(text.trim().split(' ').join('|'), 'i') 
                this.moviesRender = []
                this.movies.forEach(movie => {
                    if (reg.test(movie.Phim_ten)) {
                        this.moviesRender.push(movie)
                    }
                })
            }, 500);
        }
    },

    created() {
        serviceProvider.getAllPhim()
            .then(result => {
                this.movies = result
                this.moviesRender = result
            })
            .catch(err => console.log(err))
    }
}
</script>
<style lang="scss" scoped></style>