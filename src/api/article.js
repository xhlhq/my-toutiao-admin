import request from '@/utils/request'

//获取文章
export const getArticles = params => {
    return request({
        methods:'GET',
        url:'/mp/v1_0/articles',
        params
    })
}
//获取频道
export const getArticleChannels = () => {
    return request({
        methods: 'GET',
        url: '/mp/v1_0/channels'
    })
}
//删除文章
export const deleteArticle = articleId => {
    return request({
        methods: 'DELETE',
        //传递一个文章id对文章定位，用于删除该文章
        url: `/mp/v1_0/articles/${articleId}`
    })
}