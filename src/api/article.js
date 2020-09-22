import request from '@/utils/request'

export const getArticles = params => {
    return request({
        methods:'GET',
        url:'/mp/v1_0/articles',
        params
    })
}
export const getArticleChannels = () => {
    return request({
        methods: 'GET',
        url: '/mp/v1_0/channels'
    })
}