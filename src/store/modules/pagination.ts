/* 分页 */
import setters from '../setters/pagination'
/**
 * vuex for pagination
 * structor for state
 */
/**
 * 状态 状态结构体
 */
interface State {
  handleSizeChange: any;
  handleCurrentChange: any;
  currentPage: number;
  pageSizes: number[];
  pageSize: number;
  total: number;
}
/**
 * vuex for pagination
 * entity for state
 */
/**
 * 状态 初始化
 */
const state = {
  handleCurrentChange: (currentPage: number): void => {
    console.log(currentPage)
  },
  handleSizeChange: (pageSize: number): void => {
    console.log(pageSize)
  },
  currentPage: 1,
  pageSizes: [5, 10, 20, 50, 100],
  pageSize: 5,
  total: 0
}
/**
 * vuex for pagination.ts
 * getters for state
 */
/**
 * 状态 Getters
 */
const getters = {
  getCurrentPage: (state: State, getters: number) => {
    return state.currentPage
  },
  getPageSizes: (state: State, getters: number[]) => {
    return state.pageSizes
  },
  getPageSize: (state: State, getters: number) => {
    return state.pageSize
  },
  getTotal: (state: State, getters: number) => {
    return state.total
  }
}
/**
 * vuex for pagination.ts
 * actions for state
 */
/**
 * 状态 异步调用
 */
const actions = {

}
/**
 * vuex for pagination.ts
 * mutations for state
 */
/**
 * 状态 同步调用
 */
const mutations = {
  [setters.SET_HANDLE_CURRENT_CHANGE] (state: any, res: any) {
    state.handleCurrentChange = res
  },
  [setters.SET_HANDLE_SIZE_CHANGE] (state: any, res: any) {
    state.handleSizeChange = res
  },
  [setters.SET_CURRENT_PAGE] (state: any, res: number) {
    state.currentPage = res
  },
  [setters.SET_PAGE_SIZES] (state: any, res: number[]) {
    state.pageSizes = res
  },
  [setters.SET_PAGE_SIZE] (state: any, res: number) {
    state.pageSize = res
  },
  [setters.SET_TOTAL] (state: any, res: number) {
    state.total = res
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
