<template>
    <div class="add-movie-view">

        <div class="row">
            <div class="col-7">

                <form @submit.prevent="insertMovie">
                    <div class="row mt-4">
                        <div class="col">
                            <label for="">Tên</label>
                            <input type="text" v-model="movie.name" required>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col">
                            <label for="">Poster</label>
                            <input type="text" v-model="movie.poster" required>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col">
                            <label for="">Thể loại</label>
                            <input type="text" v-model="movie.category" required>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col">
                            <label for="">Mô tả</label>
                            <textarea type="text" row="3" v-model="movie.description" required></textarea>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col">
                            <label for="">Giới hạn độ tuổi</label>
                            <input type="number" min="0" v-model="movie.limitAge" required>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col">
                            <button type="submit" class="btn btn-primary px-5">Thêm</button>
                        </div>
                    </div>
                </form>

            </div>
            <div class="col">
                <img :src="movie.poster" alt="..." class="w-100">
            </div>
        </div>

    </div>
</template>


<script>
import serviceProvider from '../services'

export default {
    data() {
        return {
            movie: {
                name: '',
                limitAge: 0,
                description: '',
                category: '',
                poster: ''
            }
        }
    },

    computed: {
        defaultPoster() {
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
        }
    },

    methods: {
        insertMovie() {
            const data = {
                Phim_ten: this.movie.name,
                Phim_doTuoi: this.movie.limitAge,
                Phim_moTa: this.movie.description,
                Phim_theLoai: this.movie.category,
                Phim_poster: this.movie.poster
            }

            serviceProvider.insertPhim(data)
            .then(data => {
                alert('Thêm phim thành công!')
                Object.keys(this.movie).map(key => {
                    this.movie[key] = ''
                })
                this.movie.poster = this.defaultPoster
            })
            .catch(err => {
                alert('Có lỗi xảy ra, thực hiện thao tác này sau...')
                console.log(err)
            })
        }
    },

    created() {
        this.movie.poster = this.defaultPoster
    }
}
</script>


<style lang="scss" scoped>
input {
    width: 100%;
}

textarea {
    width: 100%;
    resize: vertical;
}

label {
    display: block;
}
</style>