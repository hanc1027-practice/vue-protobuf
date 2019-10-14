// /api/student.js 定義介面的檔案
import request from '@/lib/request'

// params是object型別的請求引數
// school.PBStudentListReq 是定義好的請求體model
// school.PBStudentListRsp 是定義好的響應model
// getStudentList 是介面名稱
export function getStudentList (params) {
const req = request.create('school.PBStudentListReq', params)
return request('getStudentList', req, 'school.PBStudentListRsp')
}