<template>
  <el-row>
    <!-- People -->
    <Menu active="4"/>
    <Pagination/>
  </el-row>
</template>
<script lang="ts">
  import Menu from '@/views/manager/Menu.vue'
  import Pagination from '@/views/manager/seat/components/Pagination.vue'
  export default {
    components: {
      Menu, Pagination
    }
  }
</script>