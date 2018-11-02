<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中。。。。"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="showJob(scope.row.id)"> 查看 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  filters: {
    
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>
