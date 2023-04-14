<template>
    <div class="admin-view">
        <template v-for="(link, index) in links" :key="index">
            <router-link :to="{name: link.name}" class="btn mr-1 px-3" :class="classObject(link.name)">{{ link.displayName }}</router-link>
        </template>
       

        <router-view></router-view>
    </div>
</template>


<script>

export default {
    data() {
        return {
            links: [
                {
                    name: 'movie-list',
                    displayName: 'Danh sách phim'
                },
                {
                    name: 'add-movie',
                    displayName: 'Thêm phim'
                },
                {
                    name: 'add-showtime',
                    displayName: 'Thêm suất chiếu'
                },
                {
                    name: 'statistic',
                    displayName: 'Thống kê'
                },
            ],
        }
    },

    computed: {
        routerName() {
            return this.$route.name
        },

        loginAccount() {
            return this.$store.state.loginAccount
        }
    },

    methods: {
        classObject(name) {
            return name == this.routerName ? {'btn-primary': true} : {'btn-secondary': true}
        }
    },

    created() {
        if (this.loginAccount?.CN_phanQuyen !== 'admin') {
            this.$router.push({ name: 'home' })
        }
    }
}
</script>