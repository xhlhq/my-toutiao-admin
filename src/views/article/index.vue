<template>
  <div class="article-index">
    <el-card class="filter-card">
    <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <!-- 筛选表单 -->
    <el-form ref="form" :model="form" label-width="60px" size="mini">
        <el-form-item label="状态：">
            <el-radio-group v-model="filterStatus">
            <el-radio label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
            <el-select v-model="channelId" placeholder="请选择">
            <el-option 
            label="全部" 
            :value="null"
            ></el-option>
            <el-option 
            v-for="(item,index) in channels"
            :label="item.name" 
            :value="item.id"
            :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期：">
            <el-date-picker
            v-model="rangDate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
            </el-date-picker>
        </el-form-item>
        
        <!-- 每次查询都重新加载文章 -->
        <el-form-item>
            <!-- button的click事件会默认传参，对重新加载文章产生影响 -->
            <el-button type="primary" 
            :disabled="loading"
            @click="loadArticles(1)">查询</el-button>
        </el-form-item>
    </el-form>
    </el-card>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        总共有{{totalPage}}条数据
    </div>
        <!-- 内容展示表格 -->
    <el-table
    :data="articleData"
    stripe
    class = "list-table"
    style="width: 100%"
    v-loading="loading">
    <el-table-column
        prop="date"
        label="封面"
        width="180">
        <template slot-scope="scope">
            <img class="article-cover" 
            v-if="scope.row.cover.images[0]"
            :src="scope.row.cover.images[0]" alt="封面">
            <!-- <img :src="scope.row.images" alt=""> -->
            <img 
            class="article-cover"
            v-else 
            src="~@/assets/img/2.jpg" alt="默认封面">
        </template>
    </el-table-column>
    <el-table-column
        prop="title"
        label="标题"
        width="180">
    </el-table-column>
    <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
            <el-tag 
            :type="articleStatus[scope.row.status].type">
            {{articleStatus[scope.row.status].text}}</el-tag>
            <!-- <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="info" v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 2">审核成功</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="info" v-else-if="scope.row.status === 4">已删除</el-tag> -->
        </template>
    </el-table-column>
    <el-table-column
        prop="pubdate"
        label="发布时间">
    </el-table-column>
    <el-table-column
        label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          circle
          type="primary"
          icon="el-icon-edit"
          @click="$router.push('/publish?id='+scope.row.id)"
          ></el-button>
        <el-button
          size="mini"
          type="danger"
          circle
          icon="el-icon-delete"
          @click="onDeleteArticle(scope.row.id)"
          ></el-button>
      </template>
    </el-table-column>
    </el-table>
        <!-- 分页 -->
        <!-- 总页码：totalPage
        pageSize每页数目 -->
    <el-pagination
        layout="prev, pager, next"
        background
        :total="totalPage" 
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync = "currentPage"
        @current-change="onCurrentChange">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'

export default {
    name:'ArticleIndex',
    data() {
      return {
        form: {
          date1: '',
          type: [],
        },
        articleData: [],//用于接收请求到的文章对象
        articleStatus: [
            {status:0,text:'草稿',type:''},
            {status:1,text:'待审核',type:'info'},
            {status:2,text:'审核通过',type:'success'},
            {status:3,text:'审核失败',type:'danger'},
            {status:4,text:'已删除',type:'info'}
        ],
        totalPage: 0,//总页数
        pageSize: 15, //每页数据个数
        filterStatus: null, //筛选文章的状态
        channels: [], //文章频道
        channelId: null,//查询文章的频道
        rangDate: [],//开始时间与结束时间
        loading: true,//加载
        currentPage: 1,//当前的页码
      }
    },
    methods: {
      loadArticles(page = 1){
          //展示加载中
          this.loading = true
          getArticles({
              page: page,
              per_page: this.pageSize,
              status: this.filterStatus,
              channel_id: this.channelId,
              begin_pubdate: this.rangDate ? this.rangDate[0] : null,
              end_pubdate: this.rangDate ? this.rangDate[1] : null,
          }).then(res => {
              //console.log('getArticle:',res);
              //   this.articleData = res.data.data.results
              //   this.totalPage = res.data.data.total_count
              const {results, total_count: totalPage} = res.data.data
              this.articleData = results
              this.totalPage = totalPage

              //关闭加载loading
              this.loading = false
          })
      },
      onCurrentChange(page){
          //console.log(page)
          this.loadArticles(page)
      },
      loadChannels(){
          getArticleChannels().then(res => {
              //console.log('channels:',res)
              this.channels = res.data.data.channels
          })
      },
      onDeleteArticle(articleId){
            this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                deleteArticle(articleId.toString()).then(res => {
                    // console.log(articleId.toString())
                    // console.log(res)

                    //删除完成，重新加载数据
                    this.loadArticles(this.currentPage)
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            })          
            })
          //找数据接口       
          //封装请求方法
          //删除请求调用
          //处理响应结果
      }
      
    },
    created () {
        this.loadArticles(1)
        this.loadChannels()
    }
}
</script>

<style scoped lang="less">
.filter-card {
    margin-bottom: 30px;
}
.list-table {
    margin-bottom: 20px;
    .article-cover {
        width: 50px;
        background-size: cover;
    }
}
</style>