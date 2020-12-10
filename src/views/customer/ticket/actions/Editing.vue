<template>
  <el-row>
    <!-- menu VIP -->
    <Menu active="1"/>
    <Editor/>
  </el-row>
</template>
<script lang="ts">
/* 引入组件 */
import Menu from '@/views/customer/Menu.vue'
import Editor from '@/views/customer/ticket/components/Editor.vue'
/* 注册组件 */
export default{
  components: {
    Menu,Editor
  }
}
</script>