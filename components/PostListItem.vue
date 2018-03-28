<template>
  <article class="postItem">
    <nuxt-link :to="{
      name: 'posts-id',
      params: {
        id: post.number
      }
    }">{{post.title}}</nuxt-link>
  </article>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import PostItem from '~/components/PostItem.vue'

export default {
  components: {
    VueMarkdown
  },
  props: {
    post: { type: Object, required: true }
  }
}
</script>

<style lang="scss" scoped>

</style>
