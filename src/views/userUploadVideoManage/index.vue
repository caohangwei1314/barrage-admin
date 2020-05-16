<template>
  <div class="app-container">
    <el-table
      :data="users"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="视频标题" width="220">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row.name)">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="视频简介" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleSelect(scope.row.id)">查看</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">通过</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="margin-top:10px;">
      <el-pagination
        v-show="total>0"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import * as users from '@/api/users'
import * as contribution from '@/api/contribution'

export default {
  name: 'Users',
  data() {
    return {
      loading: true,
      users: [],
      total: 0,
      // usersClasses: [
      //   { key: 0, display_name: '全部' },
      //   { key: 1, display_name: '老师' },
      //   { key: 2, display_name: '学生' }
      // ],
      listQuery: {
        limit: 10,
        page: 1,
        classId: 0,
        name: ''
      },
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    handleUpdate(row) {
      const uploadVideo = {
        id: row.id,
        status: 1
      }
      contribution.update(uploadVideo).then(result => {
        if (result.code === 0) {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          setTimeout(() => {
            this.$router.go(0)
          }, 1000)
        } else {
          this.$message({
            type: 'error',
            message: '更新失败'
          })
        }
      })
    },
    handleSelect(id) {
      this.$router.push({ path: '/userUploadVideoManage/update?id=' + id })
    },
    handleDelete(row) {
      const uploadVideo = {
        id: row.id,
        status: 2
      }
      contribution.update(uploadVideo).then(result => {
        if (result.code === 0) {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          setTimeout(() => {
            this.$router.go(0)
          }, 1000)
        } else {
          this.$message({
            type: 'error',
            message: '更新失败'
          })
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      if (this.listQuery.classId === '0') {
        this.listQuery.classId = null
      }
      this.getList()
    },
    handleCreate() {
      this.$router.push({ name: 'CreateUser' })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    getList() {
      this.loading = true
      users.selectUserUploadVideoList(this.listQuery)
        .then((result) => {
          if (result.code === 0) {
            this.users = result.data
            this.total = result.data.totalCount
            this.loading = false
          } else {
            this.$message.error('未检索到内容')
          }
        })
    }
  },
  created() {
    this.getList()
  },
  filters: {
    formatDate(val) {
      const date = new Date(val)
      const year = date.getFullYear()
      const month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
      const day = date.getDate() > 9 ? date.getDate() - 1 : `0${date.getDate()}`
      return `${year}-${month}-${day} `
    }
  }
}
</script>

