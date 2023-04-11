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
                    displayName: 'Movie List'
                },
                {
                    name: 'add-movie',
                    displayName: 'Add Movie'
                },
                {
                    name: 'add-showtime',
                    displayName: 'Add Showtime'
                },
                {
                    name: 'statistic',
                    displayName: 'Statistic'
                },
            ],
        }
    },

    computed: {
        routerName() {
            return this.$route.name
        }
    },

    methods: {
        classObject(name) {
            return name == this.routerName ? {'btn-primary': true} : {'btn-secondary': true}
        }
    }
}
</script>