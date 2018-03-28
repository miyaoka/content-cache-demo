<template>
  <header>
    <h1><nuxt-link to="/">Home</nuxt-link></h1>
  </header>
</template>

<script>
export default {
  computed: {
    repoOwner() {
      return process.env.GH_REPO_OWNER
    },
    repoName() {
      return process.env.GH_REPO_NAME
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background: $clr-w-d;
  a {
    color: $clr-b-l;
  }
  h1 {
    margin: 0.5rem;
    font-size: 1rem;
  }
}
</style>
