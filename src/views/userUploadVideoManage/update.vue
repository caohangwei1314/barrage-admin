<template>
  <div class="app-container" id="CreateNews">
    <h1>{{data.title}}</h1>
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
import * as users from '@/api/users'
import * as contribution from '@/api/contribution'
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
      data: {}
    }
  },
  methods: {
    init() {
      contribution.detail(this.$router.currentRoute.query.id).then(result => {
        this.videoUrl = this.GLOBAL.oss + result.data.videoUrl
        this.data = result.data
      })
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.updateUsers()
        } else {
          return false
        }
      })
    },
    updateUsers() {
      users.update(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push({ name: 'Users' })
        })
    },
    getData() {
      this.loading = true
      users.queryById(this.$route.params.id)
        .then((result) => {
          this.form = result.data
          this.loading = false
        })
    }
  },
  created() {
    this.init()
  }
}
</script>
