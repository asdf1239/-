<template>
  <el-row>
    <!-- VIP -->
    <Menu active="5"/>
    <Pagination/>
  </el-row>
</template>
<script lang="ts">
  import Menu from '@/views/manager/Menu.vue'
  import Pagination from '@/views/manager/arrangement/components/Pagination.vue'
  export default {
    components: {
      Menu, Pagination
    }
  }
</script>