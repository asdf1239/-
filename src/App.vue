<template>
  <div id="app">
    <div id="nav">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="menu($event)"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">电影管理系统</el-menu-item>
        <el-menu-item index="2">登录</el-menu-item>
        <el-menu-item index="3">注册</el-menu-item>
        <el-menu-item index="4">系统中心</el-menu-item>
        <el-menu-item index="5">工作中心</el-menu-item>
        <el-menu-item index="6">用户中心</el-menu-item>
      </el-menu>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import axios from "axios";
export default {
  mounted() {},
  methods: {
    menu(moudles) {
      switch (moudles) {
        case "2":
          this.$router.push({
            path: "/Login"
          });
          break;
        case "3":
          this.$router.push({
            path: "/Sigin"
          });
          break;
        case "4":
          this.$router.push({
            path: "/VIP/Selecting"
          });
          break;
        case "5":
          this.$router.push({
            path: "/Ticket/Selecting"
          });
          break;
         case "6":
          this.$router.push({
            path: "/Ticket/Selecting"
          });
          break;
      }
    }
  }
};
</script>
