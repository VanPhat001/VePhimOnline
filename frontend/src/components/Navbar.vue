<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand" href="#">Trang chủ</router-link>

        <template v-if="loginAccount">
            <LoginAccountBox class="ml-auto"></LoginAccountBox>
        </template>
        <template v-else>
            <router-link :to="{ name: 'login' }" class="btn btn-primary ml-auto">Đăng nhập</router-link>
            <router-link :to="{ name: 'register' }" class="btn btn-primary ml-1">Đăng ký</router-link>
        </template>
    </nav>
</template>


<script>
import LoginAccountBox from './LoginAccountBox.vue'
export default {
    components: {
        LoginAccountBox
    },

    computed: {
        loginAccount() {
            return this.$store.state.loginAccount
        }
    }
}
</script>


<style lang="scss" scoped></style>