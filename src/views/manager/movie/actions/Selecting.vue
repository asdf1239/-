<template>
  <el-row>
    <!-- 电影信息 -->
    <Menu active="3"/>
    <Pagination/>
  </el-row>
</template>
<script lang="ts">
  import Menu from '@/views/manager/Menu.vue'
  import Pagination from '@/views/manager/movie/components/Pagination.vue'
  export default {
    components: {
      Menu, Pagination
    }
  }
</script>