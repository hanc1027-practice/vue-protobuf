import request from '@/lib/request'

// params是object型別的請求引數
// school.PBStudentListReq 是定義好的請求體model
// school.PBStudentListRsp 是定義好的響應model
// getStudentList 是介面名稱
export function getStudentList (params) {
const req = request.create('PBStudentListReq', params)
return request('getStudentList', req, 'school.PBStudentListRsp')
}

// 後面如果再新增介面直接以此類推
export function getStudentById (id) {
// const req = ...
// return request(...)
}