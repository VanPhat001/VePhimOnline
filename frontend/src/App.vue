<template>
  <header>
    <Navbar ></Navbar>
  </header>

  <main>
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>


<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  },

  mounted() {
    const headerHeight = document.querySelector('header').clientHeight
    document.querySelector('main').style.marginTop = (headerHeight + 16) + 'px'
  }
}
</script>


<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
</style>