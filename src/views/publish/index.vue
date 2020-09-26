<template>
  <div class="publish-index">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章发布</el-breadcrumb-item>
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
                <el-button type="primary" @click="onSubmit">立即发表</el-button>
                <el-button>存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels } from '@/api/article'
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
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      loadChannels(){
          getArticleChannels().then(res => {
              //console.log('res',res)
              this.channels = res.data.data.channels
              //console.log('channels:',this.channels)
          })
      }
    }
}
</script>

<style>

</style>