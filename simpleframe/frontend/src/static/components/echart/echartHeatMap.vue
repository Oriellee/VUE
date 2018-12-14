<template>
    <div :id="id" style="width: 100%;height: 100%;margin: auto;"></div>
</template>

<script>
    export default {
        name: "echartHeatMap",
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
                        'hours': [],
                        'days': [],
                        'data': []
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
                var hours = chartData.hours;
                var days = chartData.days;

                var data = chartData.data;

                data = data.map(function (item) {
                    return [item[1], item[0], item[2] || '-'];
                });

                let option = {
                    tooltip: {
                        position: 'top'
                    },
                    animation: false,
                    grid: {},
                    xAxis: {
                        type: 'category',
                        data: hours,
                        splitArea: {
                            show: true
                        },
                        axisLabel:{
                            color:'#7d838b'
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: days,
                        splitArea: {
                            show: true
                        },
                        axisLabel:{
                            color:'#7d838b'
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 5,
                        calculable: true,
                        left: 'right',
                        inRange: {
                            color: ['rgba(0,255,252,0.3)', 'rgba(255,37,117,0.7)']
                        }
                    },
                    series: [{
                        name: 'Punch Card',
                        type: 'heatmap',
                        data: data,
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
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