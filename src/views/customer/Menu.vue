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
        <span slot="title">电影票</span>
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
          this.$router.push({ path: "/Ticket/Selecting" });
          break;
      }
    }
  }
};
</script>
