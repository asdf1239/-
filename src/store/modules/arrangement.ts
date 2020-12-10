import setters from "../setters/arrangement";

class Arrangement {
  //  唯一键标识
  id: number;
  //  电影名称
  movie_id: number;
  //  大厅信息
  hall_id: number;
  //  开始时间
  start_time: Date;
  //  结束时间
  stop_time: Date;
  //  卖出座位
  sold_seat: number;
  //  
  price: number;
  constructor() {
    this.id = 0
    this.movie_id = 0
    this.hall_id = 0
    this.start_time = new Date()
    this.stop_time = new Date()
    this.sold_seat = 0
    this.price = 0
  }
}
/**
 * 状态结构体
 */
interface State {
  arrangement: Arrangement
}
const state = {
  arrangement: {
    id: 0,
    movie_id: 0,
    hall_id: 0,
    start_time: new Date(),
    stop_time: new Date(),
    sold_seat: 0,
    price: 0
  }

}
/**
 * 状态 Getters
 */
const getters = {
  getArrangementId: (state: State, getters: number) => {
    return state.arrangement.id
  },
  getArrangementMovieId: (state: State, getters: number) => {
    return state.arrangement.movie_id
  },
  getArrangementHallId: (state: State, getters: number) => {
    return state.arrangement.hall_id
  },
  getArrangementStartTime: (state: State, getters: Date) => {
    return state.arrangement.start_time
  },
  getArrangementStopTime: (state: State, getters: Date) => {
    return state.arrangement.stop_time
  },
  getArrangementSoldSeat: (state: State, getters: number) => {
    return state.arrangement.sold_seat
  },
  getArrangementPrice: (state: State, getters: number) => {
    return state.arrangement.price
  },
  getArrangement: (state: State, getters: any) => {
    return state.arrangement
  }
}
/**
 * vuex 
 */
const actions = {
}
const mutations = {
  [setters.SET_ARRANGEMENT_HALL_ID](state: any, res: number) {
    state.arrangement.hall_id = res
  },
  [setters.SET_ARRANGEMENT_ID](state: any, res: number) {
    state.arrangement.id = res
  },
  [setters.SET_ARRANGEMENT_MOVIE_ID](state: any, res: number) {
    state.arrangement.movie_id = res
  },
  [setters.SET_ARRANGEMENT_SOLD_SEAT](state: any, res: number) {
    state.arrangement.sold_seat = res
  },
  [setters.SET_ARRANGEMENT_START_TIME](state: any, res: any) {
    state.arrangement.start_time = res
  },
  [setters.SET_ARRANGEMENT_STOP_TIME](state: any, res: any) {
    state.arrangement.stop_time = res
  },
  [setters.SET_ARRANGEMENT_PRICE](state: any, res: number) {
    state.arrangement.price = res
  },
  [setters.SET_ARRANGEMENT](state: any, res: any) {
    state.arrangement = res
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
