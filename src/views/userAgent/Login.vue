<template>
  <div class="login">
    <h1>登录</h1>
    <el-row>
      <el-col :span="8">
        <div style="min-height:1px;" class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <el-form
            label-position="left"
            :model="login"
            status-icon
            :rules="rules"
            ref="login"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="loginName">
              <el-input type="text" v-model="login.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="login.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('login')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.login >>> .is-success > .el-form-item__content > .el-input > .el-input__inner {
  border: 1px solid #0DBC79;
}
.login >>> .el-icon-circle-check{
  color: #0DBC79;
}
</style>
<script>
import api from '@/apis/config'
import userAgent from '@/apis/userAgent'
import { mapState, mapActions, mapGetters } from 'vuex'
import { Notification } from 'element-ui'
export default {
  data () {
    const validLoginName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    const validPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      login: {
        nickname: '',
        password: ''
      },
      rules: {
        nickname: [{ validator: validLoginName, trigger: 'blur' }],
        password: [{ validator: validPassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.$store.state)
        if (valid) {
          const success = (res) => {
            if (res.data !== '') {
              this.$store.commit('session/SET_SESSION_INFO', res.data)
              if (res.data.role === 1) {
                this.$router.push({ path: '/customerAddress/Selecting' })
              } else {
                this.$router.push({ path: '/productionInfo/Selecting' })
              }
              Notification({
                message: '登录成功',
                type: 'success'
              })
            } else {
              Notification({
                message: '用户名或密码不正确',
                type: 'error'
              })
            }
          }
          api.requestLogin(this.login, success)
        } else {
          Notification({
            message: '请将表单填写完整！',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>
