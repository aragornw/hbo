import request from '@/utils/request'


export let uploadResourcePicUrl='/managerapi/upload/uploadResourcePic'

//POST /api/v1/upload/uploadPic
export function uploadPic(data) {
  return request({
    url: '/managerapi/upload/uploadPic',
    method: 'post',
    data
  })
}
