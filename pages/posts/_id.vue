<template>
  <div>
    <nav class="prev-next">
      <nuxt-link
        v-if="prev"
        :to="{
          name: 'posts-id',
          params: {
            id: prev.number
          }
        }"
      >←newer</nuxt-link>
      <nuxt-link
        v-if="next"
        class="next"
        :to="{
          name: 'posts-id',
          params: {
            id: next.number
          }
        }"
      >older→</nuxt-link>
    </nav>
    <h3 class="title">Issue: {{data.number}}</h3>
    <PostItem
      :post="data"
    />
  </div>
</template>

<script>
import PostItem from '~/components/PostItem.vue'

let watchHandler

export default {
  components: {
    PostItem
  },
  async asyncData({ app, payload, store, params }) {
    if (payload) return payload

    const d = await app.$contents.getData()
    const num = Number(params.id)
    const i = d.findIndex((item) => item.number === num)
    return {
      data: d[i],
      prev: d[i - 1],
      next: d[i + 1]
    }
  },
  mounted() {
    watchHandler = this.$store.watch(this.$store.getters.key, (key) => {
      const target = key.key === 'ArrowLeft' ? this.prev : this.next
      if (target) {
        $nuxt.$router.push({ name: 'posts-id', params: { id: target.number } })
      }
    })
  },
  destroyed() {
    // remove watch handler
    watchHandler()
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
.prev-next {
  display: flex;
  justify-content: space-between;
  .next {
    margin-left: auto;
  }
}
</style>
