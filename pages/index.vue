<template>
  <section>
    <h3 class="title">IssueList: ({{nodes.length}})</h3>
    <PostListItem
      v-for="post in nodes"
      :key="post.id"
      :post="post"
      class="post"
    />
  </section>
</template>

<script>
import PostListItem from '~/components/PostListItem.vue'

export default {
  components: {
    PostListItem
  },
  async asyncData({ app, payload, store }) {
    if (payload) return { nodes: payload }

    const nodes = await app.$contents.getAll()
    return {
      nodes
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
.post {
  margin-top: 1rem;
}
</style>
