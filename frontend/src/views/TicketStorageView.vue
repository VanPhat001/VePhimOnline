<template>
    <div class="ticket-storage" v-if="data">

        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Mã vé</th>
                    <th scope="col">Tên phim</th>
                    <th scope="col">Ngày chiếu</th>
                    <th scope="col" class="text-center">Thời gian bắt đầu</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index">
                    <th scope="row">{{ item.Ve_id }}</th>
                    <td>{{ item.Phim_ten }}</td>
                    <td>{{ formatDate(item.SC_batDau) }}</td>
                    <td class="text-center">{{ formatTime(item.SC_batDau) }}</td>
                </tr>

            </tbody>
        </table>

    </div>
</template>


<script>
import serviceProvider from '../services'

export default {
    data() {
        return {
            data: null
        }
    },

    methods: {
        formatDate(dateTimeString) {
            const m = new Date(dateTimeString);
            const dateString =
                m.getUTCFullYear() + "/" +
                ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" +
                ("0" + m.getUTCDate()).slice(-2) + " "
            return dateString
        },

        formatTime(dateTimeString) {
            const m = new Date(dateTimeString)
            const dateString =
                ("0" + m.getUTCHours()).slice(-2) + ":" +
                ("0" + m.getUTCMinutes()).slice(-2) + ":" +
                ("0" + m.getUTCSeconds()).slice(-2)
            return dateString
        }
    },

    created() {
        const { CN_id } = this.$store.state.loginAccount
        serviceProvider.getTicketStorage(CN_id)
            .then(response => {
                console.log(response);
                this.data = response
            })
            .catch(error => console.log(error))
    }
}
</script>


<style lang="scss" scoped></style>