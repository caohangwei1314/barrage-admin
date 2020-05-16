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
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
       <el-table-column label="标题" align="center" width="450">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row.id)">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="类别编号" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.classId }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column class-name="status-col" label="番剧图片" width="200" align="center">
        <template slot-scope="scope">
          <img
            :src="GLOBAL.oss+scope.row.image"
            width="100px"
            height="100px"
            @click="handlePictureCardPreview(scope.row.pic)"/>
          <el-dialog :visible.sync="dialogVisible">
            <animeVideo :url="scope.row.videoUrl" :title="scope.row.title"></animeVideo>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="第几集" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总硬币数" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.totalCoin }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否会员专享" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isVip === 0 ? '否' : '是' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上架时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.upperTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleSelect(scope.row)">查看</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除
          </el-button>
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
import { IMG_URL } from '@/utils/request'
import * as animeSeries from '@/api/animeSeries'
export default {
  name: 'product',
  data() {
    return {
      loading: true,
      product: [],
      total: 0,
      listQuery: {
        animeId: '',
        limit: 1,
        size: 10,
        search: ''
      },
      dialogVisible: false,
      dialogImageUrl: '',
      imgUrl: IMG_URL
    }
  },
  components: [
    'animeVideo'
  ],
  methods: {
    handlePictureCardPreview(url) {
      this.dialogImageUrl = this.imgUrl + url
      this.dialogVisible = true
    },
    handleSelect(row) {
      this.$router.push({ path: '/animeManage/video?title=' + row.title + '&videoUrl=' + row.videoUrl })
    },
    handleUpdate(id) {
      this.$router.push({ path: '/animeManage/animeSeriesUpdate?animeId=' + this.$router.currentRoute.query.id + '&id=' + id })
    },
    handleDelete(id) {
      this.$confirm('此操作将删除该集数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        animeSeries.deleted(id)
          .then((result) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.listQuery.limit = 1
            this.listQuery.size = 10
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
      animeSeries.pageSearch(this.$router.currentRoute.query.id, this.listQuery.limit, this.listQuery.size, this.listQuery.search).then(result => {
        this.product = result.data.records
        this.total = result.data.total
        this.listQuery.limit = result.data.size
        this.listQuery.page = result.data.current
      })
    },
    handleCreate() {
      this.$router.push({ path: '/animeManage/animeSeriesCreate?animeId=' + this.$router.currentRoute.query.id })
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
      animeSeries.page(this.$router.currentRoute.query.id, this.listQuery.limit, this.listQuery.size)
        .then((result) => {
          this.product = result.data.records
          this.total = result.data.total
          this.listQuery.limit = result.data.size
          this.listQuery.page = result.data.current
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
