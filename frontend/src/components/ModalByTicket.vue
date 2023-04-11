<template>
    <div class="model-by-ticket">
        <div class="background-full-screen" @click="onCloseModal"></div>

        <div class="box rounded w-75 bg-light">
            <h4 class="my-2">Đặt chỗ</h4>

            <table class="w-100">
                <tr v-for="iPos in maxRow">
                    <td v-for="jPos in maxCol">
                        <button class="btn w-100 one-line" :class="gheStateClassString(iPos, jPos)" @click="setSelectGhe(iPos, jPos)">
                            {{ String.fromCharCode(iPos + 64) }}{{ jPos }}
                        </button>
                    </td>
                </tr>
            </table>

            <hr>

            <div class="row">
                <div class="col">
                    <p><b>Giá phim:</b> {{ suatChieu.SC_gia }}&#8363;</p>
                    <template v-if="selectGheInfo.row != -1">
                        <p><b>Giá ghế:</b>
                            {{  getGiaGhe( getGhe(selectGheInfo.row, selectGheInfo.col).GG_loai ) }}&#8363;
                            ({{  getGhe(selectGheInfo.row, selectGheInfo.col).GG_loai }})
                        </p>
                        <p><b>Vị trí:</b> {{ String.fromCharCode(selectGheInfo.row + 65) }}{{ selectGheInfo.col + 1}}</p>
                    </template>
                </div>

                <div class="col" v-if="selectGheInfo.row != -1">
                    <p><b>Tổng tiền:</b> {{ suatChieu.SC_gia +  getGiaGhe( getGhe(selectGheInfo.row, selectGheInfo.col).GG_loai ) }}&#8363;</p>
                    <button @click.prevent="bookTicket" class="btn btn-primary px-5">Đặt vé</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import serviceProvider from '../services'

export default {
    emits: ['onCloseModal'],

    props: {
        pGhes: { type: Array, default: [], required: true },
        pGiaGhes: {type: Map, required: true},
        pTrangThais: { type: Map, required: true},
        pSuatChieu: { type: Object, required: true}
    },

    data() {
        return {
            selectGheInfo: {
                row: -1,
                col: -1
            }
        }
    },

    computed: {
        ghes() {
            const data = [...this.pGhes]
            return this.sortByRowCol(data)
        },

        trangThais() {
            return this.pTrangThais
        },

        suatChieu() {
            return this.pSuatChieu
        },

        giaGhes() {
            return this.pGiaGhes
        },

        loginAccount() {
            return this.$store.state.loginAccount
        },

        maxRow() {
            let max = 'A'
            this.ghes.forEach(ghe => {
                if (ghe.Ghe_hang > max) {
                    max = ghe.Ghe_hang
                }
            })
            return max.charCodeAt(0) - 'A'.charCodeAt(0) + 1
        },

        maxCol() {
            let max = 0
            this.ghes.forEach(ghe => {
                if (ghe.Ghe_cot > max) {
                    max = ghe.Ghe_cot
                }
            })
            return max
        }
    },

    methods: {
        onCloseModal() {
            this.$emit('onCloseModal')
        },

        sortByRowCol(ghes) {
            return ghes.sort((a, b) => {
                return  a.Ghe_hang >= b.Ghe_hang || a.Ghe_cot >= b.Ghe_cot
            })
        },

        getTrangThaiKey(gheId, suatChieuId) {
            return gheId + '_' + suatChieuId
        },

        getGhe(row, col) {
            return this.ghes[row * this.maxCol + col]
        },

        getGiaGhe(loaiGhe) {
            return this.giaGhes.get(loaiGhe).GG_gia
        },

        gheStateClassString(iPos, jPos) {
            if (iPos == this.selectGheInfo.row + 1 && jPos == this.selectGheInfo.col + 1)  {
                return { 'btn-primary': true }
            }
            const state = this.gheState(iPos, jPos)
            return state == 0 ? {'btn-secondary': true} : {'btn-success': true}
        },

        gheState(iPos, jPos) {
            const ghe = this.ghes[(iPos-1)*this.maxCol + jPos - 1]
            const key = this.getTrangThaiKey(ghe.Ghe_id, this.suatChieu.SC_id)
            const state = this.trangThais.get(key).TT_trangThai
            return state
        },

        setSelectGhe(iPos, jPos) {
            if (this.gheState(iPos, jPos) == 1) {
                alert('Vị trí đã được chọn')
                return
            }

            this.selectGheInfo = {
                row: iPos - 1,
                col: jPos - 1
            }
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

        bookTicket() {
            const data = {
                Ve_thoiGianDat: this.getCurrentTimeString(),
                CN_id: this.loginAccount.CN_id,
                Ghe_id: this.getGhe(this.selectGheInfo.row, this.selectGheInfo.col).Ghe_id,
                SC_id: this.suatChieu.SC_id
            }
            console.log('book', data)

            serviceProvider.insertVe(data)
                .then(data => {
                    alert('Đặt vé thành công!!!')
                    this.$router.push({name: 'home'})
                })
                .catch(err => {
                    console.log(err)
                    alert('Có lỗi xảy ra, hãy thử lại thao tác này sau...')
                })
        }
    }
}
</script>


<style lang="scss" scoped>
.model-by-ticket {
    position: fixed;
    inset: 0;
    display: flex;

    .background-full-screen {
        position: absolute;
        inset: 0;
        z-index: -1;
        background-color: rgba(0, 0, 0, 0.233);
    }

    .box {
        margin: auto;
        padding: 63px;
    }
}
</style>