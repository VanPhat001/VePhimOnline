<template>
    <div class="add-show-time-view">

        <form @submit.prevent="addShowtime" v-if="cinemas">

            <input @keyup="fillMovie" type="text" class="my-4 w-100 p-2 form-control" placeholder="Nhập mã phim..."
                v-model="showtime.movieId" required>

            <div class="row">
                <div class="col">

                    <div class="row mt-3">
                        <div class="col">
                            <label>Chọn phòng</label>

                            <select name="cars" id="cars" class="custom-select" v-model="showtime.roomId" required>
                                <template v-for="(room, index) in rooms" :key="index">
                                    <option :value="room.Phong_id">
                                        Rạp "{{ cinemas.get(room.Rap_id).Rap_ten  }}" -
                                        Phòng "{{ room.Phong_ten }}"
                                    </option>
                                </template>
                            </select>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col">
                            <label>Thời gian bắt đầu</label>
                            <input type="datetime-local" class="form-control" v-model="showtime.dateTimeStart" required>
                        </div>

                        <div class="col">
                            <label>Thời gian kết thúc</label>
                            <input type="datetime-local" class="form-control" v-model="showtime.dateTimeEnd" required>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col">
                            <label>Giá</label>
                            <input type="number" class="form-control" min="0" v-model="showtime.price" required>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col">
                            <button class="btn btn-primary px-5">Cập nhật</button>
                        </div>
                    </div>
                </div>

                <div class="col-4">
                    <img :src="movie?.Phim_poster || defaultImage" alt=".." class="w-100">
                </div>
            </div>
        </form>

    </div>
</template>


<script>
import serviceProvider from '../services'

export default {
    data() {
        return {
            rooms: [],
            cinemas: null,
            movie: null,
            showtime: {
                roomId: null,
                movieId: null,
                dateTimeStart: null,
                dateTimeEnd: null,
                price: null
            },
            timeOutId: null
        }
    },

    computed: {
        defaultImage() {
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
        }
    },

    methods: {
        convertToDateTimeString(dateTime) {
            const date = new Date(dateTime)
            const currentString = date.getFullYear() + '-' +
                ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
                ('00' + date.getDate()).slice(-2) + ' ' +
                ('00' + date.getHours()).slice(-2) + ':' +
                ('00' + date.getMinutes()).slice(-2) + ':' +
                ('00' + date.getSeconds()).slice(-2)
            return currentString
        },

        fillMovie() {
            clearTimeout(this.timeOutId)
            this.timeOutId = setTimeout(() => {
                serviceProvider.getPhimById(this.showtime.movieId)
                    .then(response => {

                        if (response.length > 0) {
                            this.movie = response[0]
                        }
                        else {
                            this.movie = null
                        }

                    })
                    .catch(err => console.log(err))
            }, 500)
        },

        addShowtime() {

            if (!(this.movie && this.movie.Phim_id == this.showtime.movieId)) {
                alert('Mã phim không hợp lệ!!!')
                return
            }

            if (this.showtime.dateTimeStart >= this.showtime.dateTimeEnd) {
                alert('Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc!!!')
                return
            }

            const data = {
                Phong_id: this.showtime.roomId,
                Phim_id: this.showtime.movieId,
                SC_batDau: this.convertToDateTimeString(this.showtime.dateTimeStart),
                SC_ketThuc: this.convertToDateTimeString(this.showtime.dateTimeEnd),
                SC_gia: this.showtime.price,
            }
            console.log(data)

            serviceProvider.insertSuatChieu(data)
                .then(response => {
                    console.log(response)
                    alert('Thêm suất chiếu thành công!!!')
                    // this.$router.push({ name: 'home' })
                })
                .catch(err => {
                    if (err.response.status == 500) {
                        alert('Đã có suất chiếu có trùng (mã phim, mã phòng, thời gian bắt đầu) !!!')
                    }
                })


        }
    },

    created() {
        const tasks = [
            serviceProvider.getAllRap(),
            serviceProvider.getAllPhong()
        ]

        Promise.all(tasks)
            .then(([raps, phongs]) => {
                const map = new Map()
                raps.forEach(rap => {
                    map.set(rap.Rap_id, rap)
                })

                this.cinemas = map
                this.rooms = phongs
            })
            .catch(err => console.log(err))

        const movieId = this.$route.query.movieId
        if (movieId) {
            this.showtime.movieId = movieId
            this.fillMovie()
        }
    }
}
</script>


<style lang="scss" scoped></style>