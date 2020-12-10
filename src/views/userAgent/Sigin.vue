<template>
  <div class="sigin">
    <h1>注册</h1>
    <el-row>
      <el-col :span="8">
        <div style="min-height:1px;" class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <el-form
            label-position="left"
            :model="register"
            status-icon
            :rules="rules"
            ref="register"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="nickname">
              <el-input v-model="register.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="register.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="register.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('register')">注册</el-button>
              <el-button type="danger" @click="resetForm('register')">重置</el-button>
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
import { mapState, mapActions, mapGetters } from 'vuex'
import { Notification } from 'element-ui'
import api from '@/apis/config'
import userAgent from '@/apis/userAgent'
export default {
  data () {
    const validLoginName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('账号不能为空'))
      }
      const success = (res) => {
        if (res.data.userHasRegistered) {
          callback(new Error('该账号已被使用'))
        } else {
          Notification({
            message: '恭喜你,账号可用！',
            type: 'success'
          })
          callback()
        }
      }
      setTimeout(() => {
        userAgent.userHasRegistered(value, success)
      }, 1000)
    }
    const validPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.register.checkPass !== '') {
          this.$refs.register.validateField('checkPass')
        }
        callback()
      }
    }
    const validCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.register.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validNickname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('昵称不能为空'))
      } else {
        callback()
      }
    }
    return {
      register: {
        nickname: '',
        password: '',
        checkPass: ''
      },
      rules: {
        nickname: [{ validator: validLoginName, trigger: 'blur' }],
        password: [{ validator: validPassword, trigger: 'blur' }],
        checkPass: [{ validator: validCheckPass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const success = (res) => {
            Notification({
              message: '恭喜你,注册成功！',
              type: 'success'
            })
          }
          userAgent.userRegister(this.register, success)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
