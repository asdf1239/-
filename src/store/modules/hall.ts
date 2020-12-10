import setters from '../setters/hall'
class HallInfo {
  //  唯一键标识
  id: number;
  //  名称
  name: string;
  //  座位
  total_seat: string;
  constructor() {
    this.id = 0
    this.name = ''
    this.total_seat = ''
  }
}
/**
 * 状态结构体
 */
interface State {
  hallInfo: HallInfo
}
const state = {
  hallInfo: {
    id: 0,
    name: '',
    total_seat: 0
  }

}
/**
 * 状态 Getters
 */
const getters = {
  getHallInfoId: (state: State, getters: number) => {
    return state.hallInfo.id
  },
  getHallInfoName: (state: State, getters: string) => {
    return state.hallInfo.name
  },
  getHallInfoTotalSeat: (state: State, getters: string) => {
    return state.hallInfo.total_seat
  },
  getHallInfo: (state: State, getters: HallInfo) => {
    return state.hallInfo
  }
}
/**
 * vuex for hall
 * actions for state
 */
const actions = {
}
/**
 * vuex for actions
 * mutations for state
 */
/**
 * 状态 同步调用
 */
const mutations = {
  [setters.SET_HALL_ID](state: any, res: number) {
    state.hallInfo.id = res
  },
  [setters.SET_HALL_NAME](state: any, res: string) {
    state.hallInfo.name = res
  },
  [setters.SET_TOTAL_SEAT](state: any, res: number) {
    state.hallInfo.total_seat = res
  },
  [setters.SET_HALL](state: any, res: HallInfo) {
    state.hallInfo = res
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}