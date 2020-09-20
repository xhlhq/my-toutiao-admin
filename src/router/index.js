import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


//模块引入
const LoginIndex = () => import(/* webpackChunkName: 'loginIndex' */ '@/views/login/index')
const LayoutIndex = () => import(/* webpackChunkName: 'layoutIndex' */ '@/views/layout/index')
const HomeIndex = () => import(/* webpackChunkName:  'homeIndex'*/ '@/views/home/index')

const routes = [
  {
    path:'',
    redirect: '/login'
  },
  {
    path:'/login',
    name:'login',
    component: LoginIndex
  },
  {
    path:'/',
    //当有一个默认子路由的时候，就不要设置name
    //name:'layout',
    component: LayoutIndex,
    children: [
      {
        path: '',//path为空，会作为父路由的默认子路由
        name: 'home',
        component: HomeIndex
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
