import setters from '../setters/ticket'
class Ticket {
  //  唯一键标识
  id: number;
  //  用户ID
  user_id: number;
  //  安排ID
  arrange_id: number;
  //  价格
  price: number;
  constructor () {
    this.id = 0
    this.user_id = 0
    this.arrange_id = 0
    this.price = 0
  }
}
/**
 * 状态结构体
 */
interface State {
  ticketInfo: Ticket;
}
const state = {
  ticketInfo: {
    id: 0,
    user_id: 0,
    arrange_id: 0,
    price: 0
  }
}
/**
 * 状态 Getters
 */
const getters = {
  getTicketInfoId: (state: State, getters: number) => {
    return state.ticketInfo.id
  },
  getTicketInfoUserId: (state: State, getters: number) => {
    return state.ticketInfo.user_id
  },
  getTicketInfoArrangeId: (state: State, getters: number) => {
    return state.ticketInfo.arrange_id
  },
  getTicketInfoPrice: (state: State, getters: number) => {
    return state.ticketInfo.price
  }
}
  /**
   * vuex for ticket
   * mutations for state
   */
  const actions = {
  }
  const mutations = {
    [setters.SET_TICKET_INFO_ID] (state: any, res: number) {
      state.ticketInfo.id = res
    },
    [setters.SET_TICKET_INFO_ARRANGE_ID] (state: any, res: number){
      state.ticketInfo.arrange_id = res
    },
    [setters.SET_TICKET_INFO_USER_ID] (state: any, res: number){
      state.ticketInfo.user_id = res
    },
    [setters.SET_TICKET_INFO_PRICE] (state: any, res: number){
      state.ticketInfo.price = res
    }
  }
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  