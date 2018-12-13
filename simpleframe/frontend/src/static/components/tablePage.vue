<template>
    <div class="father-box">
        <div class="table-box">
            <span>任务完成度</span>
            <div>
                <el-input v-model="input" placeholder="请输入内容" class="text"
                          style="margin-bottom:15px;max-width:200px;float:right"></el-input>
                <!--:default-sort="{prop: 'id', order: 'descending'}" 默认排序-->
                <el-table ref="multipleTable"
                          :data="filterData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
                          style="width: 100%;margin-bottom:25px;"
                          @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="name" label="Item name" sortable width="180">
                    </el-table-column>
                    <el-table-column prop="date" label="date" sortable width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="address" sortable>
                    </el-table-column>
                    <el-table-column prop="url" label="网址" sortable width="180">
                    </el-table-column>
                    <el-table-column prop="alex" label="Alex" sortable>
                    </el-table-column>
                    <el-table-column prop="country" label="国家" sortable>
                    </el-table-column>
                </el-table>
                <el-pagination style="float:right"
                               background
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="currentPage"
                               :page-sizes="[10, 20, 50, 100]"
                               :page-size="pagesize"
                               layout="total, sizes, prev, pager, next"
                               :total="filterData.length">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import API from '@/static/axios/index'

    export default {
        name: "tablePage",
        data() {
            return {
                msg: [],
                tableData: [{
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
                }],
                filtData: [],
                input: "",
                currentPage: 1,
                pagesize: 20,
                multipleSelection: []
            }
        },
        computed: {
            filterData: function () {
                let input = this.input && this.input.toLowerCase();
                let items = this.tableData;
                let items1;
                if (input) {
                    items1 = items.filter(function (item) {
                        return Object.keys(item).some(function (key1) {
                            return String(item[key1]).toLowerCase().match(input)
                        })
                    })
                } else {
                    items1 = this.tableData
                }
                return items1
            }
        },
        methods: {
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        created: function () {
        }
    }
</script>

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
                margin: auto;
                padding: 20px;
            }

        }
    }
</style>