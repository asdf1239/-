<template>
  <el-col :span="20">
    <el-row>
      <el-col :span="5">
        <h3>工作人员信息</h3>
      </el-col>
      <el-col :span="5">
       <el-button @click="add" style="margin-block-start: 0.6rem;" type="primary" icon="el-icon-document-add">添加</el-button>
      </el-col>
      <el-col :span="10">
        
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :element-loading-text="loadingText"
      :element-loading-spinner="loadingSpinner"
      :element-loading-background="loadingBackground"
      :data="tableData.filter(data => filter(data))"
      style="width: 100%"
    >
      <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
      <el-table-column label="昵称/用户名" prop="nickname"></el-table-column>
      <el-table-column label="头像" prop="avatar">
        <template slot-scope="scope">
          <img :src="scope.row.avatar">
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender">
        <template slot-scope="scope">
          {{scope.row.gender == 1? '男':'女'}}
        </template>
      </el-table-column>
      <el-table-column label="生日" prop="birthday"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            @input="tableKeyChange($event,scope)"
            v-model="tableKey"
            size="mini"
            placeholder="请输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-col>
</template>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapActions, mapGetters } from 'vuex'
import config from '@/apis/config'
import axios from 'axios'
export default {
  /* 准备工作 */
  /* 页面初始化,相当于Onload函数 */
  mounted () {
    this.$store.commit('pagination/SET_CURRENT_PAGE', 1)
    this.$store.commit('pagination/SET_PAGE_SIZE', 5)
    this.$store.commit('pagination/SET_TOTAL', 0)
    config.GetPageInfo(this.entity, { pageNum: 1, pageSize: 5, key: '', role: 1 }, this.success)
  },
  computed: mapState({
    ...mapGetters('loading', {
      loading: 'getLoading',
      loadingText: 'getLoadingText',
      loadingSpinner: 'getLoadingSpinner',
      loadingBackground: 'getLoadingBackground'
    }),
    ...mapGetters('pagination', {
      currentPage: 'getCurrentPage',
      pageSizes: 'getPageSizes',
      pageSize: 'getPageSize',
      total: 'getTotal'
    }),
    ...mapGetters('movie', {
      movie: 'getMovie'
    }),
    ...mapGetters('editor', {
      action: 'getEditorAction'
    })
  }),
  data () {
    return {
      key: '',
      tableKey: '',
      tableData: [],
      entity: {
        entity: 'UserInfo',
        path: '/UserInfo'
      }
    }
  },
  methods: {
    /* 数据库搜索关键字 */
    keyChange (e) {
      this.key = e
      config.GetPageInfo(this.entity, { pageNum: 1, pageSize: this.pageSize, key: this.key , role: 1 }, this.success)
    },
    /* 表格搜索关键字 */
    tableKeyChange (e) {
      this.tableKey = e
    },
    /* 新增 */
    add () {
      //  新增action 置为 0
      this.$store.commit('editor/SET_EDITOR_ACTION', 0)
      this.$router.push({ path: '/People/Editing' })
    },
    /* 成功 */
    success (res) {
      this.$store.commit('loading/SET_LOADING', true)
      this.$store.commit('pagination/SET_CURRENT_PAGE', res.data.pageNum)
      this.$store.commit('pagination/SET_PAGE_SIZE', res.data.pageSize)
      this.$store.commit('pagination/SET_TOTAL', res.data.total)
      this.tableData = res.data.list
      setTimeout(() => this.lodingHide(), 1000)
    },
    /* 隐藏加载 */
    lodingHide () {
      this.$store.commit('loading/SET_LOADING', false)
    },
    /* 页面显示行数改变 */
    handleSizeChange (pageSize) {
      this.$store.commit('pagination/SET_PAGE_SIZE', pageSize)
      config.GetPageInfo(this.entity, { pageNum: 1, pageSize: pageSize, key: '',role: 1 }, this.success)
    },
    /* 当前页数改变 */
    handleCurrentChange (currentPage) {
      this.$store.commit('pagination/SET_CURRENT_PAGE', currentPage)
      config.GetPageInfo(this.entity, { pageNum: currentPage, pageSize: this.pageSize, key: '',role: 1 }, this.success)
    },
    /* 编号 */
    indexMethod (index) {
      return (this.currentPage - 1) * this.pageSize + 1 + index
    },
    /* 编辑 */
    handleEdit (index, row) {
      this.$store.commit('user/SET_USER', row)
      //  编辑action 置为 1
      this.$store.commit('editor/SET_EDITOR_ACTION', 1)
      this.$router.push({ path: '/People/Editing' })
    },
    /* 删除 */
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该工作人员信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        config.DeleteOne(this.entity, { id: row.id }, () => {
          config.GetPageInfo(this.entity, { pageNum: this.currentPage, pageSize: this.pageSize, key: '',role: 1 }, this.success)
          this.$notify({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /* 表内搜素 */
    filter (data) {
      return !this.tableKey || data.movie_name.toLowerCase().includes(this.tableKey.toLowerCase())
    }
  }
}
</script>
