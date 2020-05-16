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
      <el-table-column label="发送用户" align="center" width="200">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.author }}</span>
        </template>
      </el-table-column>
       <el-table-column label="弹幕内容" align="center" width="200">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.text }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送时间" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除
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
import * as danmaku from '@/api/danmaku'
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
    handleUpdate(id) {
      this.$router.push({ path: `/animeManage/update?id=${id}` })
    },
    handleDelete(id) {
      this.$confirm('此操作将删除该弹幕, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        danmaku.deleted(id)
          .then((result) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleFilter() {
      this.listQuery.limit = 1
      danmaku.page(this.listQuery).then(result => {
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
      danmaku.page(this.listQuery)
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
