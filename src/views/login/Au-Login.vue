<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">管理员登录</div>
      <el-form status-icon :model="loginForm" :rules="rules" ref="ruleForm" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="用户名"
            @keyup.enter.native="login" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont el-icon-mymima" show-password placeholder="密码"
            @keyup.enter.native="login" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api'
import { generateMenu } from '@/assets/js/menu.js'
export default {
  data: function () {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
      }
    }
  },
  methods: {
    login () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 此处原本有验证码校验, 但是使用有问题未解决, 这里将其删除了
          // let param = new URLSearchParams()
          // param.append('username', this.loginForm.username)
          // param.append('password', this.loginForm.password)
          login(this.loginForm).then(({ data }) => {
            if (data.code === 200) {
              this.$store.commit('login', data.data)
              generateMenu()
              this.$message.success(data.message)
              this.$router.push({ path: '/' })
            } else {
              this.$message.error(data.message)
            }
          }).catch(({ message }) => {
            console.log(message);
          })
          this.$refs.ruleForm.resetFields()
        } else {
          this.$refs.ruleForm.resetFields()
          this.$message.success('用户名/密码不能为空')
          return false
        }
      })
    }
  }
}
</script>

<style lang='css' scoped>
.login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: url(https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg?w=1480&t=st=1683356942~exp=1683357542~hmac=0e87131b95ef2248ce0b6bffe5d039da67bc3698b22e42a4c8eac39c17a7fb36) no-repeat 100%/cover;
}

.login-card {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  padding: 170px 60px 180px;
  width: 350px;
}

.login-title {
  color: #303133;
  font-weight: bold;
  font-size: 1rem;
}

.login-form {
  margin-top: 1.2rem;
}

.login-card button {
  margin-top: 1rem;
  width: 100%;
}
</style>
