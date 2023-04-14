<template>
    <div class="book-ticket-view" v-if="data.phim">
        <div class="row">
            <div class="col-9">
                <template v-for="(rap, index) in data.raps" :key="index">
                    <button class="btn mr-1 mt-1" @click="setSelectRapIndex(index)"
                        :class="{ 'btn-primary': index == selectRapIndex, 'btn-secondary': index != selectRapIndex }">
                        {{ rap.Rap_ten }}
                    </button>
                </template>


                <table class="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên phòng</th>
                            <th scope="col">Ngày chiếu</th>
                            <th scope="col">Bắt đầu</th>
                            <th scope="col">Kết thúc</th>
                            <th scope="col">Giá vé</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="suatChieuRender.length == 0">
                            <td colspan="6">
                                <h4 class="text-center text-secondary">Chưa có thông tin</h4>
                            </td>
                        </tr>

                        <tr v-for="(suatChieu, index) in suatChieuRender" :key="index">
                            <th class="align-middle"> {{ index + 1 }} </th>
                            <td class="align-middle" scope="row"> {{ data.phongs.get(suatChieu.Phong_id).Phong_ten }} </td>
                            <td class="align-middle">{{ formatDateTime(suatChieu.SC_batDau).date }}</td>
                            <td class="align-middle">{{ formatDateTime(suatChieu.SC_batDau).time }}</td>
                            <td class="align-middle">{{ formatDateTime(suatChieu.SC_ketThuc).time }}</td>
                            <td class="align-middle">{{ formatCurrency(suatChieu.SC_gia) }}</td>
                            <td class="align-middle text-right"><button class="btn btn-primary"
                                    @click="onShowModal(index)">Đặt vé</button></td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div class="col-3">
                <div class="content">
                    <img :src="data.phim.Phim_poster" class="w-100" alt="">
                    <h5 class="text-center my-3">{{ data.phim.Phim_ten }}</h5>
                    <p><b>Thể loại:</b> {{ data.phim.Phim_theLoai }}</p>
                    <p><b>Độ tuổi:</b> Từ {{ data.phim.Phim_doTuoi }} trở lên</p>
                    <p><b>Mô tả:</b> {{ data.phim.Phim_moTa }}</p>
                </div>
            </div>
        </div>

        <ModalByTicket v-if="showModal" :p-ghes="data.ghes" :p-trang-thais="data.trangthais" :p-suat-chieu="selectSuatChieu"
            :p-gia-ghes="data.giaGhes" @on-close-modal="onCloseModal"></ModalByTicket>
    </div>
</template>



<script>
import servicesProvider from '../services'
import ModalByTicket from '../components/ModalByTicket.vue'
import utils from '../utils/public.util';

export default {
    components: {
        ModalByTicket
    },

    data() {
        return {
            data: {
                phim: null,
                suatChieus: [],
                ghes: [],
                giaGhes: new Map(),
                phongs: new Map(),
                raps: [],
                trangthais: new Map(),
            },
            selectRapIndex: -1,
            selectSuatChieu: null,
            suatChieuRender: [],
            showModal: false
        }
    },

    methods: {
        formatCurrency: utils.formatCurrency,

        onShowModal(index) {
            // console.log(index)
            // console.log(this.suatChieuRender[index])
            this.selectSuatChieu = this.suatChieuRender[index]
            this.showModal = true
        },

        onCloseModal() {
            this.showModal = false
        },

        getCurrentTimeString() {
            const date = new Date()
            const currentString = date.getFullYear() + '-' +
                ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
                ('00' + date.getDate()).slice(-2) + ' ' +
                ('00' + date.getHours()).slice(-2) + ':' +
                ('00' + date.getMinutes()).slice(-2) + ':' +
                ('00' + date.getSeconds()).slice(-2)
            return currentString
        },

        getTrangThaiKey(gheId, suatChieuId) {
            return gheId + '_' + suatChieuId
        },

        fillDataForSuatChieuRender(rapId) {
            const phongDisplay = []
            this.data.phongs.forEach(phong => {
                if (phong.Rap_id == rapId) {
                    phongDisplay.push(phong.Phong_id)
                }
            })
            // console.log({ phongDisplay })

            const suatChieuRender = []
            this.data.suatChieus.map(suatChieu => {
                for (let i = 0; i < phongDisplay.length; i++) {
                    const phongId = phongDisplay[i]
                    if (phongId == suatChieu.Phong_id) {
                        suatChieuRender.push(suatChieu)
                        break
                    }
                }
            })
            // console.log({ suatChieuRender });

            this.suatChieuRender = suatChieuRender
        },

        setSelectRapIndex(index) {
            this.selectRapIndex = index

            const rapId = this.data.raps[index].Rap_id
            this.fillDataForSuatChieuRender(rapId)
        },

        formatDateTime(date) {
            const temp = new Date(date)
            return {
                date: temp.toLocaleDateString('vi-VN'),
                time: temp.toLocaleTimeString('vi-VN')
            }
        },

        addTestData() {
            // test data begin
            for (let i = 0; i < 8; i++)
                this.data.raps.push(this.data.raps[0])

            for (let i = 0; i < 30; i++)
                this.data.suatChieus.push(this.data.suatChieus[0])
            // test data end
        }
    },

    created() {
        servicesProvider.getPhimInfoToBookTicket(this.$route.params.movieId, this.getCurrentTimeString())
            .then(response => {
                response.giaGheResult.forEach(item => {
                    this.data.giaGhes.set(item.GG_loai, item)
                })

                response.phongResult.forEach(item => {
                    this.data.phongs.set(item.Phong_id, item)
                })

                response.trangThaiResult.forEach(item => {
                    const key = this.getTrangThaiKey(item.Ghe_id, item.SC_id)
                    this.data.trangthais.set(key, item)
                })

                this.data.ghes = response.gheResult
                this.data.suatChieus = response.suatChieuResult
                this.data.raps = response.rapResult
                this.data.suatChieus = response.suatChieuResult
                this.data.phim = response.phimResult[0]

                // this.addTestData()

                console.log(response)
                console.log(this.data)

                this.setSelectRapIndex(0)
            })
            .catch(err => console.log(err))
    },
}
</script>


<style lang="scss" scoped>
.content {
    position: sticky;
    position: -webkit-sticky;
    top: 100px;
}

table {
    tbody {
        tr:hover {
            background-color: #e9ecef;
        }
    }
}
</style>