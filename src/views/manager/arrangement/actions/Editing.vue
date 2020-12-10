<template>
  <el-row>
    <!-- menu VIP -->
    <Menu active="5"/>
    <Editor/>
  </el-row>
</template>
<script lang="ts">
import Menu from '@/views/manager/Menu.vue'
import Editor from '@/views/manager/arrangement/components/Editor.vue'
export default{
  components: {
    Menu,Editor
  }
}
</script>