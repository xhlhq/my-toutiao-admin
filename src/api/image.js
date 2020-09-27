//素材接口
import request from '@/utils/request'


//上传用户图片素材
export const uploadImage = data => {
    return request({
        methods: 'POST',
        url: '/mp/v1_0/user/images',
        data
    })
}