<template>
    <div :id="id" style="width: 100%;height: 100%;margin: auto;"></div>
</template>

<script>
    export default {
        name: "barLine",
        data() {
            return {
                chart: "",
            };
        },
        props: {
            id: {
                type: String
            },
            chartData: {
                type: Object,
                //Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
                //使用闭包保证一个vue实例拥有自己的一份props
                default() {
                    return {
                        xAxis: [],
                        yAxis: [[], [], []]

                    };
                }
            }
        },
        mounted() {
            this.chart = this.$echarts.init(document.getElementById(this.id));
            this.drawChart();
        },
        destroyed() {
            window.onresize = null;
        },
        methods: {
            drawChart() {
                let chartData = this.chartData;
                let option = {
                    "color": "#fff",
                    "tooltip": {
                        "trigger": "axis",
                        "axisPointer": {
                            "type": "cross",
                            "crossStyle": {
                                "color": "#fff"
                            }
                        }
                    },
                    "legend": {
                        "data": [
                            {
                                "name": "待处理",
                                "icon": "circle",
                                "textStyle": {
                                    "color": "#7d838b"
                                }
                            },
                            {
                                "name": "已处理",
                                "icon": "circle",
                                "textStyle": {
                                    "color": "#7d838b"
                                }
                            },
                            {
                                "name": "完成率",
                                "icon": "circle",
                                "textStyle": {
                                    "color": "#7d838b"
                                }
                            }
                        ],
                        "top": "20px",
                        "textStyle": {
                            "color": "#fff"
                        }
                    },
                    "xAxis": [
                        {
                            "type": "category",
                            "data": chartData.xAxis,
                            "axisPointer": {
                                "type": "shadow"
                            },
                            axisLine: {//x轴的样式控制
                                show: true,　//显示与否
                                lineStyle: {//线条样式
                                    color: '#7d838b',
                                    width: 1,
                                    type: 'solid'
                                }

                            },
                            "axisLabel": {
                                "show": true,
                                "textStyle": {
                                    "color": "#7d838b"
                                }
                            }
                        }
                    ],
                    "yAxis": [
                        {
                            "type": "value",
                            "name": "单位（个）",
                            "nameTextStyle": {
                                "color": "#7d838b"
                            },
                            "min": 0,
                            "max": 50,
                            "interval": 10,
                            "axisLabel": {
                                "show": true,
                                "textStyle": {
                                    "color": "#7d838b"
                                }
                            },
                            axisLine: {//x轴的样式控制
                                show: true,　//显示与否
                                lineStyle: {//线条样式
                                    color: '#7d838b',
                                    width: 1,
                                    type: 'solid'
                                }

                            },
                            "splitLine": {
                                "lineStyle": {
                                    "color": "#7d838b"
                                }
                            }
                        },
                        {
                            "type": "value",
                            "name": "完成率",
                            "show": true,
                            "axisLabel": {
                                "show": true,
                                "textStyle": {
                                    "color": "#7d838b"
                                }
                            }
                        }
                    ],
                    "grid": {
                        left: '3%',
                        right: '3%',
                        bottom: '10%',
                        top: '20%',
                    },
                    "series": [
                        {
                            "name": "待处理",
                            "type": "bar",
                            "data": chartData.yAxis[0],
                            "barWidth": "auto",
                            "itemStyle": {
                                "normal": {
                                    "color": {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [
                                            {
                                                "offset": 0,
                                                "color": "rgba(255,37,117,0.7)"
                                            },
                                            {
                                                "offset": 0.5,
                                                "color": "rgba(0,133,245,0.7)"
                                            },
                                            {
                                                "offset": 1,
                                                "color": "rgba(0,133,245,0.3)"
                                            }
                                        ],
                                        "globalCoord": false
                                    }
                                }
                            }
                        },
                        {
                            "name": "已处理",
                            "type": "bar",
                            "data": chartData.yAxis[1],
                            "barWidth": "auto",
                            "itemStyle": {
                                "normal": {
                                    "color": {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [
                                            {
                                                "offset": 0,
                                                "color": "rgba(255,37,117,0.7)"
                                            },
                                            {
                                                "offset": 0.5,
                                                "color": "rgba(0,255,252,0.7)"
                                            },
                                            {
                                                "offset": 1,
                                                "color": "rgba(0,255,252,0.3)"
                                            }
                                        ],
                                        "globalCoord": false
                                    }
                                }
                            },
                            "barGap": "0"
                        },
                        {
                            "name": "完成率",
                            "type": "line",
                            "yAxisIndex": 1,
                            "data": chartData.yAxis[2],
                            "itemStyle": {
                                "normal": {
                                    "color": "#ffaa00"
                                }
                            },
                            "smooth": true
                        }
                    ]
                };
                this.chart.setOption(option);
                window.addEventListener("resize", this.chart.resize);
            },
        },
        watch: {
            //观察option的变化
            chartData: {
                handler(newVal) {
                    this.chartData = newVal;
                    this.drawChart();
                },
                deep: true,//对象内部属性的监听，关键。
            },
        }
    }
</script>

<style scoped>

</style>