<script>
import { login } from "@/api";
import { generateMenu } from "@/assets/js/menu.js";

export default {
  name: "LoginPage",
  data: function () {
    return {
      loginForm: {
        username: "lvyuqian",
        password: "123456"
      },
      rules: {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 此处原本有验证码校验, 但是使用有问题未解决, 这里将其删除了
          login(this.loginForm).then(({ data }) => {
            if (data.code === 200) {
              this.$store.commit("login", data.data);
              generateMenu();
              this.$router.push({ path: "/" });
              this.$message.success(data.message);
              this.$refs.ruleForm.resetFields();
            } else {
              this.$message.error(data.message);
            }
          });
        } else {
          this.$message.success("用户名/密码不能为空");
        }
      });
    }
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">管理员登录</div>
      <el-form status-icon :model="loginForm" :rules="rules" ref="ruleForm" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="用户名"
                    @keyup.enter.native="login"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont el-icon-mymima" show-password
                    placeholder="密码"
                    @keyup.enter.native="login"/>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../style/index.less";
</style>
