import setters from '../setters/movie'
class Movie {
  //  唯一键标识
  id: number;
  //  电影名称
  movie_name: string;
  //  电影时长
  duration: string;
  //  导演
  director: string;
  //  演员
  actor: string;
  //  国家
  country: string;
  //  公司
  company: string;
  constructor (){
    this.id = 0
    this.movie_name = ''
    this.director = ''
    this.duration = ''
    this.actor = ''
    this.country = ''
    this.company = ''
  }
}
interface State {
  movie: Movie
}
const state = {
  movie:{
    id: 0,
    movie_name : '',
    director : '',
    duration : '',
    actor : '',
    country : '',
    company : ''
  }
}
/**
 * 状态 Getters
 */
const getters = {
  getMovieId: (state: State, getters: number) => {
    return state.movie.id
  },
  getMovieName: (state: State, getters: string) => {
    return state.movie.movie_name
  },
  getMovieDirector: (state: State, getters: string) => {
    return state.movie.director
  },
  getMovieDuration: (state: State, getters: string) => {
    return state.movie.duration
  },
  getMovieActor: (state: State, getters: string) => {
    return state.movie.actor
  },
  getMovieCountry: (state: State, getters: string) => {
    return state.movie.country
  },
  getMovieCompany: (state: State, getters: string) => {
    return state.movie.company
  },
  getMovie: (state: State, getters: any) => {
    return state.movie
  },
}
const actions = {
}
const mutations = {
  [setters.SET_MOVIE_ID](state: any, res: number) {
    state.movie.id = res
  },
  [setters.SET_MOVIE_NAME](state: any, res: string) {
    state.movie.movie_name = res
  },
  [setters.SET_MOVIE_ACTOR](state: any, res: string) {
    state.movie.actor = res
  },
  [setters.SET_MOVIE_COMPANY](state: any, res: string){
    state.movie.company = res
  },
  [setters.SET_MOVIE_COUNTRY](state: any, res: string){
    state.movie.country = res
  },
  [setters.SET_MOVIE_DIRECTOR](state: any, res: string){
    state.movie.director = res
  },
  [setters.SET_MOVIE_DURATION](state: any, res: string){
    state.movie.duration = res
  },
  [setters.SET_MOVIE](state: any, res: any){
    state.movie = res
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}