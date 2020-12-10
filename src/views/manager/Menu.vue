<template>
  <el-col :span="4">
    <el-menu
      :default-active="active"
      @select="menu($event)"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <i class="el-icon-s-goods"></i>
        <span slot="title">用户</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">工作人员</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">电影</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">影厅</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">排片</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
export default {
  props: {
    active: String
  },
  methods: {
    menu(modules: string) {
      switch (modules) {
        case "1":
          this.$router.push({ path: "/VIP/Selecting" });
          break;
        case "2":
          this.$router.push({ path: "/People/Selecting" });
          break;
        case "3":
          this.$router.push({ path: "/Movie/Selecting" });
          break;
        case "4":
          this.$router.push({ path: "/Seat/Selecting" });
          break;
        case "5":
          this.$router.push({ path: "/Arrange/Selecting" });
          break;
      }
    }
  }
};
</script>
