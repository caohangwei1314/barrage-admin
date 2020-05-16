<template>
  <div class="app-container" id="CreateNews">
    <h1>{{title}}</h1>
    <video :src="videoUrl" controls="controls">
    your browser does not support the video tag
    </video>
  </div>
</template>

<style scoped>
.app-container{
  width: 640px;
  margin:0 auto;
}
</style>

<script>
import { API_IP } from '@/utils/request'
export default {
  name: 'CreateNews',
  data() {
    return {
      loading: true,
      form: {
        name: '',
        email: '',
        address: '',
        balance: 0
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      ip: API_IP,
      videoUrl: '',
      data: {},
      title: ''
    }
  },
  methods: {
    init() {
      this.title = this.$router.currentRoute.query.title
      this.videoUrl = this.GLOBAL.oss + this.$router.currentRoute.query.videoUrl
    }
  },
  created() {
    this.init()
  }
}
</script>
