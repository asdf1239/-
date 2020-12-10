<template>
  <el-row>
    <!-- VIP -->
    <Menu active="1"/>
    <Pagination/>
  </el-row>
</template>
<script lang="ts">
  import Menu from '@/views/customer/Menu.vue'
  import Pagination from '@/views/customer/ticket/components/Pagination.vue'
  export default {
    components: {
      Menu, Pagination
    }
  }
</script>