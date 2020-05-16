<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:20px">
      <el-input v-model="listQuery.search" placeholder="标题" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <!-- <el-select v-model="listQuery.classId" placeholder="类别" clearable class="filter-item" style="width: 180px">
        <el-option v-for="item in productsClasses" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 1px;" type="success" icon="el-icon-edit" @click="handleCreate">增加</el-button>
    </div>

    <el-table
      :data="product"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="弹幕id" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="头像" width="200" align="center">
        <template slot-scope="scope">
          <img
            :src="GLOBAL.oss+scope.row.avatar"
            width="100px"
            height="100px"/>
        </template>
      </el-table-column>
      <el-table-column label="账号" align="center" width="200">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
       <el-table-column label="昵称" align="center" width="200">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="等级" align="center" width="200">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 0 ? '普通用户' : scope.row.status === 1 ? '内容审核员' : '系统管理员' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限操作" align="center" width="450" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdateStatus(scope.row.id,0)">普通用户
          </el-button>
          <el-button size="mini" type="warning" @click="handleUpdateStatus(scope.row.id,1)">内容审核员
          </el-button>
          <el-button size="mini" type="danger" @click="handleUpdateStatus(scope.row.id,2)">系统管理员
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="margin-top:10px;">
      <el-pagination
        v-show="total>0"
        :current-page="listQuery.limit"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.size"
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
import { IMG_URL } from '@/utils/request'
import * as users from '@/api/users'
export default {
  name: 'product',
  data() {
    return {
      loading: true,
      product: [],
      total: 0,
      listQuery: {
        size: 10,
        limit: 1,
        orderColumn: 'id',
        orderDesc: 'asc',
        search: ''
      },
      dialogVisible: false,
      dialogImageUrl: '',
      imgUrl: IMG_URL
    }
  },
  methods: {
    handlePictureCardPreview(url) {
      this.dialogImageUrl = this.imgUrl + url
      this.dialogVisible = true
    },
    handleUpdateStatus(i, s) {
      const user = {
        id: i,
        status: s
      }
      users.updateUser(user).then(result => {
        this.getList()
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      users.page(this.listQuery).then(result => {
        this.product = result.data.records
        this.total = result.data.total
        this.listQuery.size = result.data.size
        this.listQuery.limit = result.data.current
      })
    },
    handleCreate() {
      console.log(1)
      this.$router.push({ name: 'CreateAnime' })
    },
    handleSelect(id) {
      this.$router.push({ path: '/animeManage/series?id=' + id })
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    getList() {
      users.page(this.listQuery)
        .then((result) => {
          this.product = result.data.records
          this.total = result.data.total
          this.listQuery.size = result.data.size
          this.listQuery.limit = result.data.current
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>
