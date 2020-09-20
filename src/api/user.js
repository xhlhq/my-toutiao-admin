import request from '@/utils/request'
export const requestLogin = data => {
    const a = request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: data
    })
    return a
}