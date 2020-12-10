import setters from '../setters/user'
class User{
  //  唯一键标识
  nickname: string;
  //  用户ID
  id: number;
  //  头像
  avatar: string;
  //  性别
  gender: number;
  //  生日
  birthday: string;
  //  电话
  phone: string;
  //  密码
  password: string;
  //  角色
  role: number;
  constructor () {
    this.avatar = ''
    this.birthday = ''
    this.gender = 0
    this.id = 0
    this.nickname = ''
    this.password = ''
    this.phone = ''
    this.role = 0
  }
}
/**
 * 状态结构体
 */
interface State {
  userInfo: User;
}
/**
 * 
 */
const state = {
  userInfo: {
    nickname: '',
    avatar: '',
    gender: 0,
    birthday: '',
    phone: '',
    password: '',
    id: 0,
    role: 0
  }
}
/**
 * 状态 Getters
 */
const getters = {
  getUserInfoNickname: (state: State, getters: string) => {
    return state.userInfo.nickname
  },
  getUserInfoAvatar: (state: State, getters: string) => {
    return state.userInfo.avatar
  },
  getUserInfoGender: (state: State, getters: number) => {
    return state.userInfo.gender
  },
  getUserInfoBirthday: (state: State, getters: string) => {
    return state.userInfo.birthday
  },
  getUserInfoPhone: (state: State, getters: string) => {
    return state.userInfo.phone
  },
  getUserInfoPassword: (state: State, getters: string) => {
    return state.userInfo.password
  },
  getUserInfoId: (state: State, getters: number) => {
    return state.userInfo.id
  },
  getUserInfoRole: (state: State, getters: number) => {
    return state.userInfo.role
  },
  getUser: (state: State, getters: number) => {
    return state.userInfo
  }
} 
/**
 * vuex for user
 * mutations for state
 */
const actions = {
}
const mutations = {
  [setters.SET_USER_INFO_AVATAR] (state: any, res: number) {
    state.userInfo.avatar = res
  },
  [setters.SET_USER_INFO_BIRTHDAY] (state: any, res: string) {
    state.userInfo.birthday = res
  },
  [setters.SET_USER_INFO_GENDER] (state: any, res: number) {
    state.userInfo.gender = res
  },
  [setters.SET_USER_INFO_ID] (state: any, res: number) {
    state.userInfo.id = res
  },
  [setters.SET_USER_INFO_NICKNAME] (state: any, res: string) {
    state.userInfo.nickname = res
  },
  [setters.SET_USER_INFO_PASSWORD] (state: any, res: string) {
    state.userInfo.password = res
  },
  [setters.SET_USER_INFO_PHONE] (state: any, res: string) {
    state.userInfo.phone = res
  },
  [setters.SET_USER_INFO_ROLE] (state: any, res: number) {
    state.userInfo.role = res
  },
  [setters.SET_USER] (state: any, res: User){
    state.userInfo = res
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}