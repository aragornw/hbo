import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/managerapi/login/login',
    method: 'post',
    data
  })
}
export function refreshToken(data) {
  return request({
    url: '/managerapi/login/refreshToken',
    method: 'get',
    params:{data},
    hideLoading:true
  })
}

export function getInfo(token) {
  return request({
    url: '/managerapi/user/info',
    method: 'get',
    params: { token }
  })
}
//POST /api/v1/login/getDbUserInfo
export function getDbUserInfo() {
  return request({
    url: '/managerapi/login/getDbUserInfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/managerapi/user/logout',
    method: 'post'
  })
}
//POST /api/v1/systemUser/getSystemUserByToken
export function updateSystemUserPassWordByToken(data) {
  return request({
    url: '/managerapi/systemUser/updateSystemUserPassWordByToken',
    method: 'post',
    data
  })
}

//POST /api/v1/systemUser/getSystemUserByToken
export function getUserInfo() {
  return request({
    url: '/managerapi/systemUser/getSystemUserByToken',
    method: 'get',
  })
}
//POST /api/v1/systemUser/updateSystemUserHeadImage
export function updateSystemUserHeadImage(data) {
  return request({
    url: '/managerapi/systemUser/updateSystemUserHeadImage',
    method: 'post',
    data
  })
}
//POST /api/v1/systemUser/uploadHeadPic
export function uploadHeadPic() {
  return request({
    url: '/managerapi/systemUser/uploadHeadPic',
    method: 'post',
  })
}

//POST /api/v1/systemUser/saveSystemUser
export function saveUser(data) {
  return request({
    url: '/managerapi/systemUser/save',
    method: 'post',
    data
  })
}

//POST /api/v1/systemUser/updateSystemUser
export function updateUser(data) {
  return request({
    url: '/managerapi/systemUser/update',
    method: 'post',
    data
  })
}

//POST /api/v1/systemUser/updateSystemUserByToken
export function updateSystemUserByToken(data) {
  return request({
    url: '/managerapi/systemUser/updateSystemUserByToken',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/managerapi/systemUser/getList',
    method: 'get',
    params: { ...data }
  })
}
export function getListUser(data) {
  return request({
    url: '/managerapi/systemUser/getPageList',
    method: 'get',
    params: { ...data }
  })
}
//GET /api/v1/systemUser/getListIsEnableByUserIdentity
export function getListIsEnableByUserIdentity(data) {
    return request({
        url: '/managerapi/systemUser/getListIsEnableByUserIdentity',
        method: 'get',
        params: { ...data }
    })
}
export function getUserListIsEnable(data) {
  return request({
    url: '/managerapi/systemUser/getListIsEnable',
    method: 'get',
    params: { ...data }
  })
}
export function getListIsEnableUser(data) {
  return request({
    url: '/managerapi/systemUser/getListIsEnableUser',
    method: 'get',
    params: { ...data }
  })
}

//GET /api/v1/systemUser/getListIsEnableUserIdEntity
export function getListIsEnableUserIdEntity(data) {
  return request({
    url: '/managerapi/systemUser/getListIsEnableUserIdEntity',
    method: 'get',
    params: { ...data }
  })
}
//GET /api/v1/systemUser/getListToShopUser
export function getListToShopUser(data) {
  return request({
    url: '/managerapi/systemUser/getListToShopUser',
    method: 'get',
    params: { ...data }
  })
}
//GET /api/v1/systemUser/deleteSystemUser
export function deleteUser(data) {
  return request({
    url: '/managerapi/systemUser/deleteById',
    method: 'post',
    data
  })
}

//POST /api/v1/systemUser/updateSystemUserIsEnable
export function updateSystemUserIsEnable(data) {
  return request({
    url: '/managerapi/systemUser/updateSystemUserIsEnable',
    method: 'post',
    data
  })
}

//POST /api/v1/systemUser/updateSystemUserPassWord
export function updateSystemUserPassWord(data) {
  return request({
    url: '/managerapi/systemUser/updateSystemUserPassWord',
    method: 'post',
    data
  })
}

