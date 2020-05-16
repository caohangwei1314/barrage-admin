<template>
  <div class="app-container" id="CreateNews">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="番剧封面" prop="image">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8090/file/upload"
          :show-file-list="false"
          :limit="1"
          list-type="picture"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="番剧名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="总集数" prop="count">
              <el-input v-model="form.count"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="是否需要会员观看" prop="isVip">
              <el-input v-model="form.isVip"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="上架时间" prop="upperSelfTime">
              <el-date-picker
                v-model="form.upperSelfTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd hh:mm:dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="番剧更新时间" prop="videoUpdateTime">
              <el-date-picker
                v-model="form.videoUpdateTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd hh:mm:dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="是否完结" prop="isOver">
              <el-input v-model="form.isOver"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="番剧简介" prop="description">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="番剧简介"
                v-model="form.description">
              </el-input>
            </el-form-item>
          </div>
        </el-col>
       </el-row>
       <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="角色声优" prop="roleSound">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="角色声优"
                v-model="form.roleSound">
              </el-input>
            </el-form-item>
          </div>
        </el-col>
       </el-row>
       <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="STAFF" prop="staff">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="STAFF"
                v-model="form.staff">
              </el-input>
            </el-form-item>
          </div>
        </el-col>
       </el-row>
      <el-form-item>
        <el-button type="primary" @click="updateAnime">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as anime from '@/api/anime'
import { API_IP } from '@/utils/request'
export default {
  name: 'CreateProducts',
  data() {
    return {
      form: {
        name: '',
        isVip: '',
        image: '',
        description: '',
        count: '',
        staff: '',
        roleSound: '',
        upperSelfTime: '',
        videoUpdateTime: ''
      },
      fileList: [],
      imageList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      ip: API_IP,
      imageUrl: ''
    }
  },
  methods: {
    init() {
      anime.detail(this.$router.currentRoute.query.id).then(result => {
        this.form = result.data
        this.imageUrl = this.GLOBAL.oss + result.data.image
        if (result.data.isVip === 'true') {
          this.form.isVip = '是'
        } else {
          this.form.isVip = '否'
        }
        if (result.data.isOver === 'true') {
          this.form.isOver = '是'
        } else {
          this.form.isOver = '否'
        }
      })
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = this.GLOBAL.oss + res.data
      this.form.image = res.data
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.createdProduct()
        } else {
          return false
        }
      })
    },
    updateAnime() {
      if (this.form.isVip === '是') {
        this.form.isVip = 1
      } else {
        this.form.isVip = 0
      }
      if (this.form.isOver === '是') {
        this.form.isOver = 1
      } else {
        this.form.isOver = 0
      }
      anime.update(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '创建成功!'
          })
          this.$router.push({ name: 'animes' })
        })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .avatar-uploader .el-upload {

    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
