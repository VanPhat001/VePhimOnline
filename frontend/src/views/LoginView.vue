<template>
    <div class="login-view d-flex justify-content-center">
        <form class="m-5 w-75 border rounded p-5" @submit.prevent="loginAccount">
            <h3>Đăng nhập</h3>

            <div class="row mt-3">
                <div class="col">
                    <label for="login-username">Tài khoản</label>
                    <input type="text" class="form-control w-100" id="login-username" v-model="username">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <label for="login-password">Mật khẩu</label>
                    <input type="password" class="form-control w-100" id="login-password" v-model="password">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <button class="btn py-2 px-4 btn-primary" type="submit">Đăng nhập</button>
                    <button class="btn py-2 px-4 btn-secondary ml-1" type="reset">Huỷ</button>
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
            username: 'vanphat12',
            password: '12345678'
        }
    },


    methods: {
        loginAccount() {
            serviceProvider.getAccount(this.username, this.password)
                .then((response) => {
                    console.log(response)

                    if (response.length > 0) {
                        const account = response[0]
                        // alert('Đăng nhập thành công!!!')

                        this.$store.dispatch('loginAccount', account)
                        this.$router.push({ name: 'home'})
                    }
                    else {
                        alert('Tài khoản không tồn tại!!!')
                    }
                })
                .catch(err => console.log(err))
        }
    }
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