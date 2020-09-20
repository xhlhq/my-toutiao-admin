import request from '@/utils/request'

//用户登录验证
export const requestLogin = data => {
    const a = request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: data
    })
    return a
}

//获取用户个人信息
export const requestUserProfile = () => {
    //获取本地存储的数据（token）
    //const user = JSON.parse(window.localStorage.getItem('user'))
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile'
        //请求授权
        // headers: {
        //     Authorization: `Bearer ${user.token}`
        // }
    })
}