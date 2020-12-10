<template>
  <el-row>
    <!-- menu 电影信息 -->
    <Menu active="3"/>
    <Editor/>
  </el-row>
</template>
<script lang="ts">
import Menu from '@/views/manager/Menu.vue'
import Editor from '@/views/manager/movie/components/Editor.vue'
export default{
  components: {
    Menu,Editor
  }
}
</script>