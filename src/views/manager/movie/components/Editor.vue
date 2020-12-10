<template>
  <el-col :span="20">
    <el-card class="box-card" body-style="height:100%">
      <el-row>
        <el-col :span="10">
          <h2>{{editorAction === 0 ? '添加' : '编辑'}}电影信息</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form label-width="80px" :model="movie">
            <el-form-item label="电影">
              <el-input @input="updateName" :value="movie.movie_name"></el-input>
            </el-form-item>
            <el-form-item label="时长">
              <el-input @input="updateDuration" :value="movie.duration"></el-input>
            </el-form-item>
            <el-form-item label="导演">
              <el-input @input="updateDirector" :value="movie.director"></el-input>
            </el-form-item>
            <el-form-item label="演员">
              <el-input @input="updateActor" :value="movie.actor"></el-input>
            </el-form-item>
            <el-form-item label="国家">
              <el-input @input="updateCountry" :value="movie.country"></el-input>
            </el-form-item>
            <el-form-item label="公司">
              <el-input @input="updateCompany" :value="movie.company"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-button @click="confirm" type="success">确认</el-button>
          <el-button @click="cancel" type="warning">取消</el-button>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</template>
<script>
import config from '@/apis/config'
import { mapState, mapGetters } from 'vuex'
export default {
  computed: mapState({
    ...mapGetters('movie', {
      movie: 'getMovie'
    }),
    ...mapGetters('editor', {
      editorAction: 'getEditorAction'
    })
  }),
  mounted () {
    console.log(this.movie)
  },
  data () {
    return {
      entity: {
        entity: 'MovieInfo',
        path: '/MovieInfo'
      }
    }
  },
  methods: {
    updateName (e) {
      this.$store.commit('movie/SET_MOVIE_NAME', e)
    },
    updateDuration (e) {
      this.$store.commit('movie/SET_MOVIE_DURATION', e)
    },
    updateDirector (e) {
      this.$store.commit('movie/SET_MOVIE_DIRECTOR', e)
    },
    updateActor (e) {
      this.$store.commit('movie/SET_MOVIE_ACTOR', e)
    },
    updateCountry (e) {
      this.$store.commit('movie/SET_MOVIE_COUNTRY', e)
    },
    updateCompany (e) {
      this.$store.commit('movie/SET_MOVIE_COMPANY', e)
    },
    success (res) {
      if (res.data) {
        this.$notify({
          title: '成功',
          message: '编辑成功',
          type: 'success'
        })
        this.$router.push({ path: '/Movie/Selecting' })
      } else {
        this.$notify({
          title: '失败',
          message: '编辑失败',
          type: 'error'
        })
      }
    },
    confirm () {
      if (this.editorAction === 0) {
        config.InsertOne(this.entity, this.movie, this.success)
      } else {
        config.UpdateOne(this.entity, this.movie, this.success)
      }
    },
    cancel () {
      this.$store.commit('movie/SET_MOVIE', {})
      this.$router.push({ path: '/Movie/Selecting' })
    }
  }
}
</script>
