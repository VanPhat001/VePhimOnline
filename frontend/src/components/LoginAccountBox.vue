<template>
    <div class="login-account-box dropdown">
        <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            <span class="mr-2 font-weight-bold">{{ loginAccount.CN_hoTen }}</span>
            <img width="36" class="rounded-circle" :src="loginAccount.CN_avatar" alt="">
        </button>
        <div class="dropdown-menu">
            <router-link v-if="loginAccount.CN_phanQuyen === 'admin'" :to="{name: 'home'}" class="dropdown-item">Trang quản trị</router-link>
            <router-link :to="{name: 'home'}" class="dropdown-item">Chỉnh sửa hồ sơ</router-link>
            <div class="dropdown-divider"></div>
            <router-link :to="{name: 'home'}" @click="logoutAccount" class="dropdown-item">Đăng xuất</router-link>
        </div>
    </div>
</template>


<script>
export default {
    computed: {
        loginAccount() {
            return this.$store.state.loginAccount
        }
    },

    methods: {
        logoutAccount() {
            this.$store.dispatch('logoutAccount')
        }
    },
}
</script>


<style lang="scss" scoped>
.dropdown-menu {
    left: unset;
    right: 0;
}
</style>