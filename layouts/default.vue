<template>
  <div>
    <AppHeader/>
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
      const target = e.key === 'ArrowLeft' || 'ArrowRight' ? e.key : null
      if (target) {
        this.$store.commit('setKey', target)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 1rem;
}
</style>
