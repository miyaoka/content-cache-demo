<template>
  <section>
    <h3 class="title">IssueList: ({{totalCount}})</h3>
    <PostListItem
      v-for="post in nodes"
      :key="post.id"
      :post="post"
      class="post"
    />
    <no-ssr>
      <infinite-loading @infinite="loadMore" ref="infiniteLoading">
        <span slot="no-results">
          no more articles
        </span>
        <span slot="no-more">
          no more articles
        </span>
      </infinite-loading>
    </no-ssr>
  </section>
</template>

<script>
import PostListItem from '~/components/PostListItem.vue'

const perPage = 200
let limit = perPage

export default {
  components: {
    PostListItem
  },
  async asyncData({ app, payload, store }) {
    const allNodes = (payload ? payload : await app.$contents.getAll()).map(
      (n) => ({ id: n.id, title: n.title, number: n.number })
    )
    return {
      totalCount: allNodes.length,
      nodes: allNodes.slice(0, limit)
    }
  },
  methods: {
    async loadMore($state) {
      const allNodes = await this.$contents.getAll()
      limit += perPage
      this.nodes = allNodes.slice(0, limit)
      limit < allNodes.length ? $state.loaded() : $state.complete()
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
