<template>
    <div class="add-show-time-view">

        <form @submit.prevent="">

            <input type="text" class="my-4 w-100 p-2 form-control" placeholder="Nhập mã phim..." required>

            <div class="row">
                <div class="col">

                    <div class="row mt-3">
                        <div class="col">
                            <label>Chọn phòng</label>

                            <select name="cars" id="cars" class="custom-select" v-model="showtime.roomId" required>
                                <template v-for="(room, index) in rooms" :key="index">
                                    <option :value="room.Phong_id">
                                        Rạp "{{ room.Rap_id }}" -
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
                    <img src="https://cdn-icons-png.flaticon.com/512/3934/3934107.png" alt=".." class="w-100">
                </div>
            </div>
        </form>

    </div>
</template>


<script>
import serviceProvider from '../services';

export default {
    data() {
        return {
            rooms: [],
            showtime: {
                roomId: null,
                movieId: null,
                dateTimeStart: null,
                dateTimeEnd: null,
                price: null
            }
        }
    },

    created() {
        serviceProvider.getAllPhong()
            .then(response => {
                this.rooms = response
            })
            .catch(err => console.log(err))
    }
}
</script>


<style lang="scss" scoped></style>