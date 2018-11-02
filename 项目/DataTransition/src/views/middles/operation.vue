<template>
  <el-main>
  <el-radio-group v-model="selectType" size="medium">
    <el-radio-button label="Hadoop"></el-radio-button>
    <el-radio-button label="MySql"></el-radio-button>
    <el-radio-button label="Impala"></el-radio-button>
    <el-radio-button label="Kafka"></el-radio-button>
  </el-radio-group>
    <!-- hadoop template -->
  <el-form :label-position="'right'" label-width="80px" :model="hdfsFrom" v-if="selectType === 'Hadoop'">
    <el-form-item label="名称">
      <el-input v-model="hdfsFrom.name"></el-input>
    </el-form-item>
    <el-form-item label="连接地址">
      <el-input v-model="hdfsFrom.url"></el-input>
    </el-form-item>
    <el-form-item label="hdfs路径">
      <el-input v-model="hdfsFrom.hdfs_path"></el-input>
    </el-form-item>
    <el-form-item label="本地地址">
      <el-input v-model="hdfsFrom.local_path"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(hdfsFrom)">立即创建</el-button>
      <el-button @click="resetForm(hdfsFrom)">重置</el-button>
    </el-form-item>
  </el-form>

    <!-- mysql template -->
    <el-form :label-position="'right'" label-width="80px" :model="mysqlFrom" v-if="selectType==='MySql'">
      <el-form-item label="名称">
        <el-input v-model="mysqlFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="连接地址">
        <el-input v-model="mysqlFrom.host"></el-input>
      </el-form-item>
      <el-form-item label="端口">
        <el-input v-model="mysqlFrom.port"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="mysqlFrom.user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="mysqlFrom.passwd"></el-input>
      </el-form-item>
      <el-form-item label="数据库">
        <el-input v-model="mysqlFrom.database"></el-input>
      </el-form-item>
      <el-form-item label="表">
        <el-input v-model="mysqlFrom.table"></el-input>
      </el-form-item>
      <el-form-item label="分隔符">
        <el-input v-model="mysqlFrom.separator"></el-input>
      </el-form-item>
      <el-form-item label="列">
        <el-input v-model="mysqlFrom.column" placeholder="需要查询的列，使用,分割 ps:column1,column2"></el-input>
      </el-form-item>
      <el-form-item label="条件">
        <el-input v-model="mysqlFrom.where" placeholder="查询时使用的条件，ps: column1=1 and column2=2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(mysqlFrom)">立即创建</el-button>
        <el-button @click="resetForm(mysqlFrom)">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- impala template -->
    <el-form :label-position="'right'" label-width="80px" :model="impalaFrom" v-if="selectType==='Impala'">
      <el-form-item label="名称">
        <el-input v-model="impalaFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="连接地址">
        <el-input v-model="impalaFrom.host"></el-input>
      </el-form-item>
      <el-form-item label="端口">
        <el-input v-model="impalaFrom.port"></el-input>
      </el-form-item>
      <el-form-item label="查询条件">
        <el-input v-model="impalaFrom.where" placeholder="start_time=20181014 and end_time=2018081014"></el-input>
      </el-form-item>
      <el-form-item label="查询的列">
        <el-input v-model="impalaFrom.column" placeholder="id,name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(impalaFrom)">立即创建</el-button>
        <el-button @click="resetForm(impalaFrom)">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- kafka template -->
    <el-form :label-position="'right'" label-width="80px" :model="kafkaFrom" v-if="selectType==='Kafka'">
      <el-form-item label="名称">
        <el-input v-model="kafkaFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="连接地址">
        <el-input v-model="kafkaFrom.url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(kafkaFrom)">立即创建</el-button>
        <el-button @click="resetForm(kafkaFrom)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
export default {
  methods: {
    submitForm (data) {
      const tmp = JSON.parse(JSON.stringify(data))
      data.config = tmp
      console.log(data)
      const _this = this
      this.$http({
        method: 'post',
        url: '/config/add',
        data: data
      }).then((response) => {
        const data = response.data
        if (data.status === 0) {
          //这里应该重置data
          _this.addReload()
          //这里重新获取输几局
          _this.getAllConfig()
        }
      })
    }
  },
  inject: ['addReload', 'getAllConfig'],
  data () {
    return {
      hdfsFrom: {
        name: '',
        url: '',
        hdfs_path: '',
        local_path: '',
        type: 'hdfs'
      },
      mysqlFrom: {
        name: '',
        host: '',
        port: 3306,
        user: '',
        passwd: '',
        database: '',
        table: '',
        column: '',
        where: '',
        separator: ',',
        type: 'mysql'
      },
      impalaFrom: {
        name: '',
        host: '',
        port: 21050,
        database: '',
        table: '',
        sql: '',
        column: '',
        where: '',
        separator: ',',
        type: 'impala'
      },
      kafkaFrom: {
        name: '',
        url: '',
        type: 'kafka'
      },
      selectType: 'Hadoop'
    }
  }
}
</script>
