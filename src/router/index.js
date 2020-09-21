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

//导航守卫，所有的路由都会经过这里，可以用来拦截页面
//to：到哪去（路由）
//from：从哪里
//next：放行方法
router.beforeEach((to, from, next) => {
  //判断是否登录，可以判断本地存贮中是否有登录是保存的数据
  const user = JSON.parse(window.localStorage.getItem('user'))
  if(to.path !== '/login'){
    //判断是否登录
    if(user){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
  //next()
})

export default router
