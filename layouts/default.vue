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
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 1rem;
}
</style>
