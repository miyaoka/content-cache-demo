<template>
  <div>
    <nuxt-link
      v-if="prev"
      :to="{
        name: 'posts-id',
        params: {
          id: prev.number
        }
      }"
    >prev</nuxt-link>
    <nuxt-link
      v-if="next"
      :to="{
        name: 'posts-id',
        params: {
          id: next.number
        }
      }"
    >next</nuxt-link>
    <h3 class="title">Post</h3>
    <PostItem
      :post="data"
    />
  </div>
</template>

<script>
import PostItem from '~/components/PostItem.vue'

export default {
  components: {
    PostItem
  },
  async asyncData({ app, payload, store, params }) {
    if (payload) return payload
    console.log('id: nopayload')

    const { prev, data, next } = await app.$contents.getByNumber(
      Number(params.id)
    )
    return {
      prev,
      data,
      next
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>
