<template>
    <div :id="id" style="width: 100%;height: 100%;margin: auto;"></div>
</template>

<script>
    export default {
        name: "radar",
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
                        'indicator': [],
                        'data1': [[]],
                        'data2': [
                            []
                        ]

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
                    "color": ["rgba(245, 166, 35, 1)", "rgba(19, 173, 255, 1)"],
                    "tooltip": {
                        "show": true,
                        "trigger": "item"
                    },
                    "legend": {
                        "show": true,
                        "icon": "circle",
                        "left": "35%",
                        "top": "90%",
                        "orient": "horizontal",
                        "textStyle": {
                            "fontSize": 14,
                            "color": "#fff"
                        },
                        "data": ["男", "女"]
                    },
                    "radar": {
                        "center": ["50%", "50%"],
                        "radius": "70%",
                        "startAngle": 90,
                        "splitNumber": 4,
                        "shape": "circle",
                        "splitArea": {
                            "areaStyle": {
                                "color": ["transparent"]
                            }
                        },
                        "axisLabel": {
                            "show": false,
                            "fontSize": 18,
                            "color": "#fff",
                            "fontStyle": "normal",
                            "fontWeight": "normal"
                        },
                        "axisLine": {
                            "show": true,
                            "lineStyle": {
                                "color": "grey"//
                            }
                        },
                        "splitLine": {
                            "show": true,
                            "lineStyle": {
                                "color": "grey"//
                            }
                        },
                        "indicator": chartData.indicator
                    },
                    "series": [{
                        "name": "男",
                        "type": "radar",
                        "symbol": "circle",
                        "symbolSize": 10,
                        "areaStyle": {
                            "normal": {
                                "color": "rgba(245, 166, 35, 0.4)"
                            }
                        },
                        itemStyle:{
                            color:'rgba(245, 166, 35, 1)',
                            borderColor:'rgba(245, 166, 35, 0.3)',
                            borderWidth:10,
                        },
                        "lineStyle": {
                            "normal": {
                                "type": "dashed",

                                "color": "rgba(245, 166, 35, 1)",
                                "width": 2
                            }
                        },
                        "data":
                            chartData.data1

                    }, {
                        "name": "女",
                        "type": "radar",
                        "symbol": "circle",
                        "symbolSize": 10,
                        "itemStyle": {
                            "normal": {
                                color:'rgba(19, 173, 255, 1)',
                                "borderColor": "rgba(19, 173, 255, 0.4)",
                                "borderWidth": 10
                            }
                        },
                        "areaStyle": {
                            "normal": {
                                "color": "rgba(19, 173, 255, 0.5)"
                            }
                        },
                        "lineStyle": {
                            "normal": {
                                "color": "rgba(19, 173, 255, 1)",
                                "width": 2,
                                "type": "dashed"
                            }
                        },
                        "data": chartData.data2
                    }]
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