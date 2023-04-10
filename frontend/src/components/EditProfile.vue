<template>
    <div class="edit-profile">
        <form @submit.prevent="updateAccountProfile">

            <div class="row mt-5">
                <div class="col">
                    <h2>Chỉnh sửa hồ sơ</h2>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col">
                    <label for="">Họ tên</label>
                    <input type="text" required v-model="editAccount.CN_hoTen">
                </div>
            
                <div class="col">
                    <label for="">Thành phố</label>
                    <input type="text" required v-model="editAccount.CN_thanhPho">
                </div>
            </div>

            <div class="row mt-3">
                <div class="col">
                    <label for="">Ngày sinh</label>
                    <input type="date" required v-model="editAccount.CN_ngaySinh">
                </div>
           
                <div class="col">
                    <label for="">Số điện thoại</label>
                    <input type="text" required v-model="editAccount.CN_sdt">
                </div>
            </div>

            <div class="row mt-3">
                <div class="col">
                    <label for="">Tài khoản</label>
                    <input type="text" required disabled v-model="editAccount.CN_userName">
                </div>
            </div>

            <div class="row mt-3">
                <div class="col">
                    <label for="">Mật khẩu</label>
                    <input type="password" required v-model="editAccount.CN_passWord">
                </div>
            </div>

            <!-- <div class="row mt-3">
                <div class="col">
                    <label for="">Xác nhận mật khẩu</label>
                    <input type="password" required>
                </div>
            </div> -->

            <div class="row mt-4">
                <div class="col">
                    <button type="submit" class="btn px-4 btn-primary">Lưu thay đổi</button>
                    <button type="button" @click="goBack" class="btn px-4 btn-secondary ml-2">Quay lại</button>
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
            editAccount: null
        }
    },

    computed: {
        loginAccount() {
            return this.$store.state.loginAccount
        }
    },

    methods: {
        formatDate(date) {
            return date.toISOString().split('T')[0]
        },

        goBack() {
            this.$router.go(-1)
        },

        updateAccountProfile() {
            serviceProvider.updateAccount(this.editAccount.CN_id, {
                name: this.editAccount.CN_hoTen, 
                city: this.editAccount.CN_thanhPho, 
                dateOfBirth: this.editAccount.CN_ngaySinh, 
                sername: this.editAccount.CN_userName, 
                password: this.editAccount.CN_passWord, 
                phoneNumber: this.editAccount.CN_sdt, 
                role: this.editAccount.CN_phanQuyen, 
                avata: this.editAccount.CN_avatarr,
            })
            .then(response => {
                console.log(response)
                this.$store.commit('setLoginAccount', this.editAccount)
                this.$router.push({ name: 'home' })
            })
            .catch(err => console.log(err))
        }
    },

    created() {
        this.editAccount = {...this.loginAccount}
        const date = this.editAccount.CN_ngaySinh
        this.editAccount.CN_ngaySinh = this.formatDate(new Date(date))
    },
}
</script>


<style lang="scss" scoped>
label {
    display: block;
}

input {
    width: 100%;
}
</style>