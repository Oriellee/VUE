<template>
    <div class="father-box">
        <el-row>
            <el-col :span="24" class="card-box">
                <el-col :span="6" v-for="item in textBoxList">
                    <el-col :span="6"><i :class="item.icon"></i></el-col>
                    <el-col :span="16">
                        <h2>{{item.num}}</h2>
                        <span>{{item.type}}</span>
                    </el-col>
                </el-col>
            </el-col>
            <el-col :span="24" class="echart-box">
                <span>当前时间</span>
                <div>
                    <barLine id="barLine" :chartData="barLineData"></barLine>
                </div>
            </el-col>
            <el-col :span="24" class="echart-box">
                <span>当前时间</span>
                <div>
                    <threeBar id="threeBar" :chartData="barLineData"></threeBar>
                </div>
            </el-col>
            <el-col :span="24" class="echart-box">
                <span>当前时间</span>
                <div>
                    <el-input v-model="input" placeholder="请输入内容" class="text"
                              style="margin-bottom:15px;max-width:200px;float:right"></el-input>
                    <!-- :default-sort="{prop: 'id', order: 'descending'}" 默认排序-->
                    <el-table ref="multipleTable"
                              :data="filterData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
                              style="width: 100%;margin-bottom:25px;" v-bind:height="height"
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

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import barLine from "./echart/barLine";
    import threeBar from "./echart/threeBar";

    export default {
        name: "index",
        data: function () {
            return {
                textBoxList: [{'num': 22, 'type': '今日新增', 'icon': 'el-icon-time'}, {
                    'num': 22,
                    'type': '今日新增',
                    'icon': 'el-icon-bell'
                }, {
                    'num': 22,
                    'type': '今日新增', 'icon': 'el-icon-mobile-phone\n'
                }, {'num': 22, 'type': '今日新增', 'icon': 'el-icon-star-on'}],
                barLineData: {
                    xAxis: ["1街", "2街", "3街", "4街", "5街", "6街"],
                    yAxis: [[4, 6, 36, 6, 8,], [4, 2, 36, 6, 8,], [100, 33, 100, 100, 100, 100]]
                },
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
                height: 500,
                currentPage: 1,
                pagesize: 20,
                multipleSelection: []
            }
        },
        components: {
            barLine, threeBar
        },
        computed: {
            filterData: function () {
                var input = this.input && this.input.toLowerCase()
                var items = this.tableData
                var items1
                if (input) {
                    items1 = items.filter(function (item) {
                        //console.log(Object.keys(item))
                        //return item.country.toLowerCase().match(searchContent);
                        //Object.keys(item)遍历item对象里面的键值是否符合回调函数的测试，通过测试则返回true，否则为false。
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
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    @font-color: #818492;
    .father-box {
        margin: auto;
        .el-row {
            > .el-col {
                margin-bottom: 20px;
            }
            .card-box {
                display: flex;
                justify-content: space-between;
                @cardBg1: #e7756f;
                @cardBg2: #f1cc43;
                @cardBg3: #4ac2c0;
                @cardBg4: #4c9ffe;
                > .el-col {
                    padding: 0;
                    width: calc(~'25%' - 20px);
                    border-radius: 10px;
                    height: 130px;
                    font-weight: bolder;
                    .cardLeftBg(@color) {
                        background-color: @color;
                        > .el-col:first-child > i {
                            border: 2px solid @color;
                            color: @color;
                        }
                    }
                    &:nth-child(1) {
                        .cardLeftBg(@cardBg1)
                    }
                    &:nth-child(2) {
                        .cardLeftBg(@cardBg2)
                    }
                    &:nth-child(3) {
                        .cardLeftBg(@cardBg3)
                    }
                    &:nth-child(4) {
                        .cardLeftBg(@cardBg4)
                    }
                    > .el-col {
                        height: 100%;
                    }
                    > .el-col:first-child {
                        text-align: center;
                        background-color: #ffffff;
                        display: flex;
                        align-items: center;
                        > i {
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                            display: inline-block;
                            margin: auto;
                            line-height: 50px;
                            font-size: 30px;
                        }
                    }
                    .el-col:last-child {
                        text-align: left;
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        padding-left: 15px;
                        color: #ffffff;
                        > h2 {
                            font-size: 30px;
                            margin: 5px 0px 0 10px;
                        }
                        > span {
                            font-weight: normal;
                            font-size: 14px;
                        }

                    }
                }

            }
            .echart-box {
                background-color: #2a2d39;
                color: @font-color;
                @echartSpanHei: 40px;
                padding-bottom: 10px;
                > span {
                    display: inline-block;
                    width: 100%;
                    font-size: @echartSpanHei/2;
                    padding: @echartSpanHei/4;
                }
                > div {
                    width: 95%;
                    height: 300px;
                    margin: auto;
                    padding: 5px;
                }
                &:last-child > div {
                    height: inherit;
                    /*<!--.el-input {-->*/
                        /*<!--&gt; input {-->*/
                            /*<!--background-color: #4A5064;-->*/
                            /*<!--color: @font-color;-->*/
                            /*<!--border:1px solid @font-color;-->*/
                        /*<!--}-->*/

                    /*<!--}-->*/
                    /*<!--.el-table, .el-table tr, .el-table th, .el-table td {-->*/
                        /*<!--background-color: #4A5064;-->*/
                        /*<!--color: @font-color;-->*/

                    /*<!--}-->*/
                    /*<!--.el-table tr{-->*/
                        /*<!--border: 1px solid @font-color;-->*/
                        /*<!--&:hover {-->*/
                            /*<!--background-color: red;-->*/
                        /*<!--}-->*/
                    /*<!--}-->*/
                }
            }
        }
    }
</style>