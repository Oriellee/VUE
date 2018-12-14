<template>
    <div class="father-box">
        <div class="table-box">
            <span>任务完成度</span>
            <div>
                <startToEndTime @inputTime="query">
                </startToEndTime>
                <ITable :tableColumnList="tableColumnList" :tableData="tableData" @commitSelection="tableChecked">
                    <el-table-column label="操作" slot="opt">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="info"
                                    @click="handleEdit(scope.$index, scope.row,'查看')">查看
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row,'编辑')">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleEdit(scope.$index, scope.row,'删除')">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </ITable>
            </div>
        </div>
    </div>
</template>

<script>
    import ITable from './table/tablePage'
    import startToEndTime from './time/startToEndTime'

    export default {
        name: 'tableShow',
        props: {
            msg: String,
        },
        data() {
            return {
                tableColumnList: [{'prop': 'name', 'label': '姓名', 'width': '', 'isSort': true, 'isShow': true},
                    {'prop': 'address', 'label': '地址', 'width': '', 'isSort': true, 'isShow': true},
                    {'prop': 'date', 'label': '日期', 'width': '', 'isSort': true, 'isShow': true}, {slot: 'opt'}],
                tableData: [{
                    date: '2016-05-03',
                    name: 'aaa',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: 'dd',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '111111 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '张三',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王五',
                    address: '234234 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '李葱',
                    address: '上海市普陀4444区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '测试',
                    address: '22222 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '人员',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '在测试',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '呵呵',
                    address: '111111 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '哈哈',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: 'aa',
                    address: '234234 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: 'gg',
                    address: '上海市普陀4444区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: 'rr',
                    address: '22222 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '33',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '22',
                    address: '111111 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '66',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '234234 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀4444区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '22222 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '111111 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '234234 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀4444区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '22222 1518 弄'
                }]
            }
        },
        components: {
            ITable, startToEndTime
        }, methods: {
            tableChecked(data) {
                let rowName = "";
                data.forEach((item, index) => {
                    if (index < 20) {
                        rowName += index === 20 || index=== data.length-1? item.name : item.name + ",";
                    }
                });
                this.$confirm('您选中了"' + rowName + '"等列。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
            },
            handleEdit(index, row, type) {
                console.log(index, row, type)
                this.$confirm('您点击了“' + row.name + "”列的" + type + "按钮。", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.$message({
                    //     type: 'success',
                    //     message: '成功!'
                    // });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消'
                    // });
                });
            },
            query(data) {
                this.$confirm('您选择了' + data + "这段时间。", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.$message({
                    //     type: 'success',
                    //     message: '成功!'
                    // });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消'
                    // });
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @font-color: #818492;
    .father-box {
        padding: 20px;
        > .table-box {
            background-color: #2a2d39;
            color: @font-color;
            @echartSpanHei: 40px;
            padding-bottom: 10px;
            > span {
                display: inline-block;
                width: 100%;
                font-size: @echartSpanHei / 2;
                padding: @echartSpanHei / 4;
            }

            > div {
                margin: 0 auto 20px;
                padding: 5px 20px 20px;
            }

        }
    }
</style>
