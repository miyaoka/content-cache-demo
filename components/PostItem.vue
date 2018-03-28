<template>
  <article class="postItem">
    <header>
      <h2 class="title">{{post.title}}</h2>
      <a
        :href="post.url"
        target="_blank"
        rel="noopener"
      >[issue link]</a>
    </header>
    <div class="body">
      <div ref="marked">
        <vue-markdown
          class="marked"
          :source="post.body"
          :anchorAttributes="{
            target: '_blank',
            rel: 'noopener'
          }"
        />
      </div>
    </div>
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
.postItem {
  border: 1px solid $clr-b;
  border-radius: 1rem;
  padding: 1rem;
  overflow: hidden;
}
header {
  background: $clr-w-d;
  margin: -1rem -1rem 1rem -1rem;
  padding: 0.5rem;
}
.body {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 1rem;

  textarea {
    display: block;
    width: 100%;
    height: 10rem;
  }
}
</style>
