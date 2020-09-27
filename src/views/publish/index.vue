<template>
  <div class="publish-index">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="form" :model="article" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="article.content"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <el-radio-group v-model="article.cover.type">
                <el-radio label="单图"></el-radio>
                <el-radio label="三图"></el-radio>
                <el-radio label="无图"></el-radio>
                <el-radio label="自动"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select v-model="article.channel_id" placeholder="请选择频道">
                <el-option 
                v-for="(item,index) in channels" 
                :key="index"
                :label="item.name" 
                :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(false)">立即{{ $route.query.id ? '修改' : '发布' }}</el-button>
                <el-button @click="onSubmit(true)">存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle, editArticle, getArticle } from '@/api/article'
export default {
    name:'PublishIndex',
    data() {
      return {
        article: {
            title: '', //标题
            content: '', //内容
            cover: {
                type: 0,//封面类型 -1-自动，0-无图，1-1张，3-3张
                iamges: []//图片地址
            },
            channel_id: null //频道id
        },
        channels: [] //文章频道列表
      }
    },
    created () {
        this.loadChannels()

        //判断是修改文章还是发布文章
        if(this.$route.query.id){
            this.loadEditArticle()
        }
    },
    methods: {
        //发布文章
      onSubmit(draft = false) {
        //找到数据接口
        //封装请求方法
        //请求提交表单
        //判断发布文章时是处在修改操作还是处在发布操作
        if(this.$route.query.id){
            //执行修改操作
            editArticle(this.$route.query.id,this.article,draft).then(res => {
                this.$message({
                    message: `${draft ? '存入草稿' : '修改'}成功`,
                    type: 'success'
                })
                //跳转到文章页面
                this.$router.push('/article')
            })
            
        }else{
            addArticle(this.article,draft).then(res => {
            //console.log(res)
                this.$message({
                    message: `${draft ? '存入草稿' : '发布'}成功`,
                    type: 'success'
                })
                //跳转到文章页面
                this.$router.push('/article')
            })
        }
        //处理响应结果
      },
      loadChannels(){
          getArticleChannels().then(res => {
              //console.log('res',res)
              this.channels = res.data.data.channels
              //console.log('channels:',this.channels)
          })
      },
      loadEditArticle(){
          getArticle(this.$route.query.id).then(res => {
              this.article = res.data.data
          })
      }
    }
}
</script>

<style>

</style>