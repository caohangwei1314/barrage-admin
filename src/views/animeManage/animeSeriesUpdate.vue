<template>
  <div class="app-container" id="CreateNews">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="缩略图" prop="image">
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
              <el-form-item
                label="视频内容" prop="videoUrl"
            >
                <el-upload
                    class="upload-demo"
                    drag
                    action="http://localhost:8090/file/upload"
                    :on-success="videoHandleAvatarSuccess"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
                <video v-if="videoUrl" :src="videoUrl"  controls="controls"></video>
                <div class="reset-img" v-if="videoUrl !== ''">
                    <label data-v-15325571="" for="file_input" @click="clearVideo()"><i data-v-15325571=""></i>&nbsp;重新选择</label>
                </div>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="第几集" prop="number">
              <el-input v-model="form.number"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="是否上架" prop="isUpper">
              <el-input v-model="form.isUpper"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="上架时间" prop="upperTime">
              <el-date-picker
                v-model="form.upperTime"
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
            <el-form-item label="是否是会员专享" prop="isVip">
              <el-input v-model="form.isVip"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="updateAnimeSeries">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as animeSeries from '@/api/animeSeries'
import { API_IP } from '@/utils/request'
export default {
  name: 'CreateProducts',
  data() {
    return {
      form: {
        title: '',
        isVip: '',
        image: '',
        number: '',
        upperTime: '',
        isUpper: '',
        videoUrl: '',
        animeId: ''
      },
      fileList: [],
      imageList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      ip: API_IP,
      imageUrl: '',
      videoUrl: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    videoHandleAvatarSuccess(res, file) {
      this.videoUrl = this.GLOBAL.oss + res.data
      this.form.videoUrl = res.data
    },
    init() {
      animeSeries.detail(this.$router.currentRoute.query.id).then(result => {
        this.form = result.data
        this.imageUrl = this.GLOBAL.oss + result.data.image
        if (result.data.isVip === 'true') {
          this.form.isVip = '是'
        } else {
          this.form.isVip = '否'
        }
        if (result.data.isUpper === 'true') {
          this.form.isUpper = '是'
        } else {
          this.form.isUpper = '否'
        }
        if (result.data.videoUrl !== '' && result.data.videoUrl !== null) {
          this.videoUrl = this.GLOBAL.oss + result.data.videoUrl
        }
      })
    },
    clearVideo() {
      this.videoUrl = ''
      this.form.videoUrl = ''
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
    updateAnimeSeries() {
      if (this.form.isVip === '是') {
        this.form.isVip = 1
      } else {
        this.form.isVip = 0
      }
      if (this.form.isUpper === '是') {
        this.form.isUpper = 1
      } else {
        this.form.isUpper = 0
      }
      this.form.animeId = this.$router.currentRoute.query.animeId
      animeSeries.update(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '创建成功!'
          })
          this.$router.push({ path: '/animeManage/series?id=' + this.$router.currentRoute.query.animeId })
        })
    }
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
