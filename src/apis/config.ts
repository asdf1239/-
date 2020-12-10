import axios from 'axios'
interface Entity {
  entity: string;
  path: string;
}
/**
 * 服务器地址
 */
const host = 'localhost'
/**
 * 端口
 */
const port = '8081'

/**
 * 协议
 */
const protocol ='http'
/**
 * 链接地址
 */
const url: string = protocol + '://' + host + ':' + port + '/cinema'
//接口
export default {
  url: url,
  UpdateOne: (entity: Entity, payload: any, success: any): void => {
    if(entity === undefined || payload === undefined){
      return
    }
    axios({
      /* METHOD POST */
      method: 'POST',
      /* URI */
      url: url + entity.path + '/UpdateOne.php',
      /* DATA */
      data: payload,
      /* HEADER */
      headers : {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      /* 更新成功 */
      success(res)
    })
  },
  InsertOne: (entity: Entity, payload: any, success: any): void => {
    console.log(payload)
    if(entity === undefined || payload === undefined){
      return
    }
    axios({
      /* METHOD POST */
      method: 'POST',
      /* URI */
      url: url + entity.path + '/InsertOne.php',
      /* DATA */
      data: payload,
      /* HEADER */
      headers : {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      success(res)
    })
  },
  DeleteOne: (entity: Entity, payload: any, success: any): void => {
    if(entity === undefined || payload === undefined){
      return
    }
    axios({
      /* METHOD POST */
      method: 'POST',
      /* URI */
      url: url + entity.path + '/DeleteOne.php',
      /* DATA */
      data: payload,
      /* HEADER */
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res =>{
      success(res)
    })
  },
  GetPageInfo: (entity: Entity, payload: any, success: any): void => {
    if (entity === undefined || payload === undefined) {
      return
    }
    axios({
      /* METHOD POST */
      method: 'POST',
      /* URI */
      url: url + entity.path + '/GetPageInfo.php',
      /* DATA */
      data: payload,
      /* HEADERS */
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      /* 查询成功 */
      success(res)
    })
  }
}
