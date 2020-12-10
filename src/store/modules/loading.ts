/* 加载中 */
import setters from '@/store/setters/loading'
/**
 * vuex for loading.ts
 * structor for state
 */
/**
 * 状态 状态结构体
 */
interface State {
  loading: boolean;
  loadingText: string;
  loadingSpinner: string;
  loadingBackground: string;
}
/**
 * vuex for loading.ts
 * entity for state
 */
/**
 * 状态 初始化
 */
const state = {
  loading: true,
  loadingText: '加载中',
  loadingSpinner: 'el-icon-loading',
  loadingBackground: 'rgba(0, 0, 0, 0.8)'
}
/**
 * vuex for loading.ts
 * getters for state
 */
/**
 * 状态 Getters
 */
const getters = {
  getLoading: (state: State, getters: any) => {
    return state.loading
  },
  getLoadingText: (state: State, getters: any) => {
    return state.loadingText
  },
  getLoadingSpinner: (state: State, getters: any) => {
    return state.loadingSpinner
  },
  getLoadingBackground: (state: State, getters: any) => {
    return state.loadingBackground
  }
}
/**
 * vuex for loading.ts
 * actions for state
 */
/**
 * 状态 异步调用
 */
const actions = {
}
/**
 * vuex for loading.ts
 * mutations for state
 */
/**
 * 状态 同步调用
 */
const mutations = {
  [setters.SET_LOADING] (state: any, res: boolean) {
    state.loading = res
  },
  [setters.SET_LOADING_BACKGROUND] (state: any, res: string) {
    state.loadingBackground = res
  },
  [setters.SET_LOADING_SPINNER] (state: any, res: string) {
    state.loadingSpinner = res
  },
  [setters.SET_LOADING_TEXT] (state: any, res: string) {
    state.loadingText = res
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
