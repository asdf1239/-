import setters from '../setters/editor'

/* 状态类 */
/**
 * vuex for editor
 * structor for state
 */
/**
 * 状态结构体
 */
interface State {
  action: number;
}
// action = 0  添加
// action = 1  编辑
const state = {
  action: 0
}
/**
 * vuex for editor
 * getters for state
 */
/**
 * 状态 Getters
 */
const getters = {
  getEditorAction: (state: State, getters: any) => {
    return state.action
  }
}
/**
 * vuex for editor
 * actions for state
 */
/**
 * 状态 异步调用
 */
const actions = {
}
/**
 * vuex for editor
 * mutations for state
 */
/**
 * 状态 同步调用
 */
const mutations = {
  [setters.SET_EDITOR_ACTION] (state: any, res: number) {
    state.action = res
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
