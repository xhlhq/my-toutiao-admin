import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


//模块引入
const LoginIndex = () => import(/* webpackChunkName: 'loginIndex' */ '@/views/login/index')

const routes = [
  {
    path:'',
    redirect: '/login'
  },
  {
    path:'/login',
    name:'login',
    component: LoginIndex
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
