import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import pagination from './modules/pagination'
import editor from './modules/editor'
import movie from './modules/movie'
import user from './modules/user'
import hall from './modules/hall'
import arrangement from './modules/arrangement'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loading,
    pagination,
    editor,
    movie,
    user,
    hall,
    arrangement
  }
})
