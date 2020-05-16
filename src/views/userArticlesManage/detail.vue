<template>
    <div style="width:70%;margin:0 auto;">
        <h1>{{data.title}}</h1>
        <div v-html="data.articlesContent"></div>
    </div>
</template>

<script>
import * as articles from '@/api/articles'
export default {
  data() {
    return {
      data: {}
    }
  },
  methods: {
    init() {
      articles.detail(this.$router.currentRoute.query.id).then(result => {
        this.data = result.data
      })
    }
  },
  created() {
    this.init()
  }
}
</script>