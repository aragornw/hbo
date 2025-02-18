import request from '@/utils/request'

export function getList(path,data) {
    return request({
        url: path.indexOf('managerapi')!=-1?path:'/managerapi'+path,
        method: 'get',
        params: { ...data },
        hideLoading:true
    })
}
export function getASCMList(data) {
    return request({
        url:'/ascm-command-data',
        method: 'post',
        data,
        hideLoading:true
    })
}
