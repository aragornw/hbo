import request from '@/utils/request'

//GET /api/v1/systemScheduleJob/getList
export function getScheduleJobList(data) {
  return request({
    url: '/managerapi/systemScheduleJob/getList',
    method: 'get',
    params: { ...data }
  })
}

//GET /api/v1/systemScheduleJob/startJob
export function startJob(data) {
  return request({
    url: '/managerapi/systemScheduleJob/startJob',
    method: 'get',
    params: { ...data }
  })
}

//GET /api/v1/systemScheduleJob/stopJob
export function stopJob(data) {
  return request({
    url: '/managerapi/systemScheduleJob/stopJob',
    method: 'get',
    params: { ...data }
  })
}

//GET /api/v1/systemScheduleJob/removeJob
export function removeJob(data) {
  return request({
    url: '/managerapi/systemScheduleJob/removeJob',
    method: 'get',
    params: { ...data }
  })
}

//GET /api/v1/systemScheduleJob/deleteSystemScheduleJob
export function deleteJob(data) {
  return request({
    url: '/managerapi/systemScheduleJob/deleteById',
    method: 'post',
    data
  })
}
//GET /api/v1/systemScheduleJob/deleteSystemScheduleJob
export function rightNowExec(data) {
  return request({
    url: '/managerapi/systemScheduleJob/rightNowExec',
    method: 'get',
    params: { ...data }
  })
}
//post /api/v1/systemScheduleJob/modifyTime
export function modifyTime(data) {
  return request({
    url: '/managerapi/systemScheduleJob/modifyTime',
    method: 'post',
    data
  })
}
//POST /api/v1/systemScheduleJob/updateSystemScheduleJobIsEnable
export function updateSystemScheduleJobIsEnable(data) {
  return request({
    url: '/managerapi/systemScheduleJob/updateSystemScheduleJobIsEnable',
    method: 'post',
    data
  })
}
//POST /api/v1/systemScheduleJob/saveSystemScheduleJob
export function saveSystemScheduleJob(data) {
  return request({
    url: '/managerapi/systemScheduleJob/save',
    method: 'post',
    data
  })
}
//POST /api/v1/systemScheduleJob/updateSystemScheduleJob
export function updateSystemScheduleJob(data) {
  return request({
    url: '/managerapi/systemScheduleJob/update',
    method: 'post',
    data
  })
}
