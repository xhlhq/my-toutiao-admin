import axios from 'axios'
import JsonBigInt from 'json-bigint'

//创建一个axios实例
const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/',

    //自定义后端返回的原始字符串
    transformResponse: [function (data){
        try {
            return JsonBigInt.parse(data)
        } catch (err) {
            return data
        }
    }]
})

//请求拦截器
request.interceptors.request.use(
    //所有请求会经过这里
    function(config){

        //可以在这里拦截所有请求，统一给他们设置token值
        //获取本地存储的数据（token）
        const user = JSON.parse(window.localStorage.getItem('user'))
        if(user){
            config.headers.Authorization = `Bearer ${user.token}`
        }

        return config
},
    //请求失败会经过这里
    function(err){
        return Promise.reject(err)
})

export default request