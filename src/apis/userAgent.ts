import config from '@/apis/config'
import axios from 'axios'
const entity = {
  entity: 'UserInfo',
  path: '/UserInfo'
}
export default {
  userHasRegistered: (nickname: string, success: any): void => {
    axios({
      /* METHOD POST */
      method: 'POST',
      /* URI */
      url: config.url + entity.path + '/UserHasRegistered.php',
      /* DATA */
      data: { nickname: nickname },
      /* HEADERS */
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      success(res)
    })
  },
  userRegister: (payload: any, success: any): void => {
    config.InsertOne(entity, payload, success)
  },
  userLogin: (payload: any, success: any): void => {
    axios({
      /* METHOD POST */
      method: 'POST',
      /* URI */
      url: config.url + entity.path + '/userLogin',
      /* DATA */
      data: payload,
      /* HEADERS */
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      success(res)
    })
  }
}