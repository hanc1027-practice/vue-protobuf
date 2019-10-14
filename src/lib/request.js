import axios from 'axios'
import protoRoot from '@/proto/proto'
import protobuf from 'protobufjs'

const httpService = axios.create({
    timeout: 45000,
    method: 'post',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/octet-stream'
    },
    responseType: 'arraybuffer'
})

// 請求體message
const PBMessageRequest = protoRoot.lookup('framework.PBMessageRequest')
// 響應體的message
const PBMessageResponse = protoRoot.lookup('framework.PBMessageResponse')

const apiVersion = '1.0.0'
const token = 'my_token'

function getMessageTypeValue(msgType) {
    const PBMessageType = protoRoot.lookup('framework.PBMessageType')
    const ret = PBMessageType.values[msgType]
    return ret
}

// 將請求資料encode成二進位制，encode是proto.js提供的方法
function transformRequest(data) {
    return PBMessageRequest.encode(data).finish()
}

function isArrayBuffer(obj) {
    return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
}

function transformResponseFactory(responseType) {
    return function transformResponse(rawResponse) {
        // 判斷response是否是arrayBuffer
        if (rawResponse == null || !isArrayBuffer(rawResponse)) {
            return rawResponse
        }
        try {
            const buf = protobuf.util.newBuffer(rawResponse)
            // decode響應體
            const decodedResponse = PBMessageResponse.decode(buf)
            if (decodedResponse.messageData && responseType) {
                const model = protoRoot.lookup(responseType)
                decodedResponse.messageData = model.decode(decodedResponse.messageData)
            }
            return decodedResponse
        } catch (err) {
            return err
        }
    }
}

/**
 * 
 * @param {*} msgType 接口名稱
 * @param {*} requestBody 請求體參數
 * @param {*} responseType 返回值
 */
function request(msgType, requestBody, responseType) {
    // 得到api的枚举值
    const _msgType = getMessageTypeValue(msgType)

    // 構造公共請求體:PBMessageRequest
    const reqData = {
        timeStamp: new Date().getTime(),
        type: _msgType,
        version: apiVersion,
        messageData: requestBody, // 加密後的請求参數
        token: token
    }

    // 將物件序列化成請求體例項
    const req = PBMessageRequest.create(reqData)

    // 這裡用到axios的配置項：transformRequest和transformResponse
    // transformRequest 發起請求時，呼叫transformRequest方法，目的是將req轉換成二進位制
    // transformResponse 對返回的資料進行處理，目的是將二進位制轉換成真正的json資料
    return httpService.post('/api', req, {
        transformRequest,
        transformResponse: transformResponseFactory(responseType)
    }).then(({ data, status }) => {
        // 對請求做處理
        if (status !== 200) {
            const err = new Error('伺服器異常')
            throw err
        }
        console.log(data)
    }, (err) => {
        throw err
    })
}

// 在request下新增一個方法，方便用於處理請求參數
request.create = function (protoName, obj) {
    const pbConstruct = protoRoot.lookup(protoName)
    return pbConstruct.encode(obj).finish()
}

export default request
