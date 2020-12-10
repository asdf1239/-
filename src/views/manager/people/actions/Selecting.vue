<template>
  <el-row>
    <!-- People -->
    <Menu active="2"/>
    <Pagination/>
  </el-row>
</template>
<script lang="ts">
  import Menu from '@/views/manager/Menu.vue'
  import Pagination from '@/views/manager/people/components/Pagination.vue'
  export default {
    components: {
      Menu, Pagination
    }
  }
</script>