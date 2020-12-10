<template>
  <el-row>
    <!-- menu People -->
    <Menu active="4"/>
    <Editor/>
  </el-row>
</template>
<script lang="ts">
import Menu from '@/views/manager/Menu.vue'
import Editor from '@/views/manager/seat/components/Editor.vue'
export default{
  components: {
    Menu,Editor
  }
}
</script>