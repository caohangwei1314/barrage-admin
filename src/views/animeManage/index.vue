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
       <el-table-column label="番剧名" align="center" width="200">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row.id)">{{ scope.row.name }}</span>
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
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="总集数" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总播放量" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.totalPlay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总追番人数" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.totalFollow }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总弹幕数" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.totalDanmaku }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否会员专享" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isVip === 0 ? '否' : '是' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上架时间" widthT="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.upperSelfTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleSelect(scope.row.id)">查看</el-button>
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
import * as anime from '@/api/anime'
export default {
  name: 'product',
  data() {
    return {
      loading: true,
      product: [],
      total: 0,
      listQuery: {
        limit: 10,
        page: 1,
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
      this.$confirm('此操作将删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        anime.deleted(id)
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
      this.listQuery.page = 1
      anime.pageSearch(this.listQuery.page, this.listQuery.limit, this.listQuery.orderColumn, this.listQuery.orderDesc, this.listQuery.search).then(result => {
        this.product = result.data.records
        this.total = result.data.total
        this.listQuery.limit = result.data.size
        this.listQuery.page = result.data.current
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
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    getList() {
      anime.page(this.listQuery.page, this.listQuery.limit, this.listQuery.orderColumn, this.listQuery.orderDesc)
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
