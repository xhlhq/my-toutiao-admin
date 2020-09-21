<template>
  <el-container class="container">
    <el-aside class="aside" width="auto">
        <app-aside class="aside-menu" :iscollapse="isCollapse"/>
    </el-aside>
    <el-container>
        <el-header class="header">
            <div>
                <i 
                :class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}"
                @click="isCollapse=!isCollapse"></i>
                <span>我的博客管理页面</span>
            </div>
            <el-dropdown>
                <div class="avatar-wrap">
                    <img :src="user.photo" alt="">
                    <span>{{user.name}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item @click.native='onLogout'>退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-main class="main">
            <router-view/>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import AppAside from './components/aside'
import { requestUserProfile } from '@/api/user'
export default {
    name:'LayoutIndex',
    components: {
        AppAside
    },
    data(){
        return {
            user: {},
            isCollapse: false
        }
    },
    created () {
        //组件初始化，获取用户资料
        this.loadUserProfile()
    },
    methods: {
        loadUserProfile(){
            requestUserProfile().then(res => {
                this.user = res.data.data
            })
        },
        onLogout(){
            this.$confirm('是否确认退出后台?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            // //清除用户存在localStorage中的数据
            window.localStorage.removeItem('user')
            // //跳转到登录页面
            this.$router.push('/login')
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消退出'
            })          
            })
            
        }
    }
}
</script>

<style scoped lang="less">
.container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.aside {
    background-color: #343E3D;
    box-shadow: 1px 0 3px rgba(32, 50, 65, 0.5);
    .aside-menu {
        height: 100%;
    }
}
.header {
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar-wrap {
        display: flex;
        align-items: center;
        img {
            width: 32px;
            height: 32px;
            margin-right: 3px;
            border-radius: 50%;
        }
    }
}
.main {
    background-color: #F1F9F4;
}
</style>