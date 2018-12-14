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
                <span>任务完成度</span>
                <div>
                    <barLine id="barLine" :chartData="barLineData"></barLine>
                </div>
            </el-col>
            <el-col :span="24" class="echart-box">
                <span>客流统计</span>
                <div>
                    <threeBar id="threeBar" :chartData="threeBarData"></threeBar>
                </div>
            </el-col>
            <el-col :span="24" class="bottom-box">
                <el-col class="echart-box">
                    <span>年龄占比</span>
                    <div>
                        <threePie id="threePie" :chartData="barLineData"></threePie>
                    </div>
                </el-col>
                <el-col class="echart-box">
                    <span>职业分析</span>
                    <div>
                        <radar id="radar" :chartData="radarData"></radar>
                    </div>
                </el-col>
                <el-col class="echart-box">
                    <span>每日停留时长</span>
                    <div>
                        <echartHeatMap id="heatmap" :chartData="heatmapData"></echartHeatMap>
                    </div>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import barLine from "./echart/barLine";
    import threeBar from "./echart/threeBar";
    import radar from "./echart/radar";
    import threePie from "./echart/threePie";
    import echartHeatMap from "./echart/echartHeatMap";

    export default {
        name: "index",
        data: function () {
            return {
                textBoxList: [{'num': 22, 'type': '今日新增', 'icon': 'el-icon-time'}, {
                    'num': 30,
                    'type': '昨日新增', 'icon': 'el-icon-mobile-phone\n'
                }, {'num': 31, 'type': '明日预测', 'icon': 'el-icon-star-on'}, {
                    'num': 4565,
                    'type': '历史总量',
                    'icon': 'el-icon-bell'
                }],
                barLineData: {
                    xAxis: ["12-05", "12-06", "12-07", "12-08", "12-09", "12-10"],
                    yAxis: [[4, 6, 36, 6, 8,], [4, 2, 36, 6, 8,], [100, 33, 100, 100, 100, 100]]
                },
                threeBarData: {
                    'name': ['昨天', '今天', '明天'],
                    'data': {
                        "客流统计": [65, 60, 76.5],
                        "人数增长": [93, 93, 93.4],
                        "实际购买人数": [87, 87, 88.3],
                        "预计购买人数": [36, 36, 36.4],
                    }
                },
                radarData: {
                    'indicator': [{
                        "name": "人事",
                        "max": 88
                    }, {
                        "name": "程序员",
                        "max": 88
                    }, {
                        "name": "销售",
                        "max": 88
                    }, {
                        "name": "蓝领",
                        "max": 88
                    }, {
                        "name": "商务",
                        "max": 88
                    }],
                    'data1': [[80, 50, 55, 80, 50]],
                    'data2': [
                        [60, 60, 65, 60, 70]
                    ]
                },
                heatmapData: {
                    'hours': ['0-2', '3-5', '6-8',
                        '9-11', '12-14', '15-17',
                        '18-20', '21-23'
                    ],
                    'days': ['12-09', '12-10', '12-11',
                        '12-12', '12-13'
                    ],
                    'data': [
                        [0, 0, 0],
                        [1, 0, 1],
                        [2, 0, 2],
                        [3, 0, 1],
                        [4, 0, 3],
                        [0, 1, 0],
                        [1, 1, 0],
                        [2, 1, 1],
                        [3, 1, 0],
                        [4, 1, 1],
                        [0, 2, 1],
                        [1, 2, 1],
                        [2, 2, 2],
                        [3, 2, 1],
                        [4, 2, 2],
                        [0, 3, 0],
                        [1, 3, 2],
                        [2, 3, 3],
                        [3, 3, 2],
                        [4, 3, 4],
                        [0, 4, 3],
                        [1, 4, 4],
                        [2, 4, 6],
                        [3, 4, 4],
                        [4, 4, 6],
                        [0, 5, 0],
                        [1, 5, 4],
                        [2, 5, 6],
                        [3, 5, 4],
                        [4, 5, 6],
                        [0, 6, 3],
                        [1, 6, 5],
                        [2, 6, 8],
                        [3, 6, 6],
                        [4, 6, 8],
                        [0, 7, 1],
                        [1, 7, 3],
                        [2, 7, 4],
                        [3, 7, 3],
                        [4, 7, 5]
                    ]
                }

            }
        },
        components: {
            barLine, threeBar, radar, echartHeatMap, threePie
        },

        methods: {},
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    @font-color: #818492;
    .father-box {
        margin: auto;
        padding: 20px;
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
            }
            .bottom-box {
                padding: 0;
                display: flex;
                justify-content: space-between;
                > .echart-box {
                    width: calc(~"37.5%" - 10px);
                }
                > .echart-box:nth-child(2) {
                    width: calc(~"25%" - 10px);
                }
            }
        }
    }
</style>