<template>
  <div>
    <AppHeader class="header"/>
    <div class="main">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'

export default {
  components: {
    AppHeader
  },
  mounted() {
    window.addEventListener('keydown', this.onKeyDown)
  },
  methods: {
    onKeyDown(e) {
      const target =
        e.key === 'ArrowLeft' || e.key === 'ArrowRight' ? e.key : null
      console.log(target)
      if (target) {
        this.$store.commit('setKey', target)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$header-height: 2.5rem;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  overflow: hidden;
}
.main {
  margin: 1rem;
  margin-top: calc(2rem + #{$header-height});
}
</style>
