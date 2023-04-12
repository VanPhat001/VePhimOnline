<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand" href="#">Trang chủ</router-link>

        <input type="text" class="form-control mx-5" placeholder="Nhập tên phim cần tìm..." v-model="searchText">

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
    data() {
        return {
            searchText: this.$store.state.navbarSearchText,
        }
    },

    watch:   {
        searchText(newValue) {
            this.$store.commit('setNavbarSearchText', newValue)
        }
    },

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