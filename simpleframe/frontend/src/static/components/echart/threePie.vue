<template>
    <div :id="id" style="width: 100%;height: 100%;margin: auto;"></div>
</template>

<script>
    export default {
        name: "threePie",
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
                app.configParameters = {
                    pie1Process: {
                        min: 0,
                        max: 100
                    },
                    pie2Process: {
                        min: 0,
                        max: 100
                    },
                    pie3Process: {
                        min: 0,
                        max: 100
                    },
                };

                app.config = {
                    message: 'dat.gui',
                    pie1Process: 25,
                    pie2Process: 50,
                    pie3Process: 75,
                    pie1Color: '#3dd4de',
                    pie2Color: '#b697cd',
                    pie3Color: '#a6f08f',
                    onChange: function () {
                        var tempOption = {
                            title: {
                                text: parseInt(app.config.pie2Process) + '%',
                                textStyle: {
                                    color: app.config.pie2Color,
                                }
                            },
                            series: [{
                                data: [{
                                    value: parseInt(app.config.pie1Process),
                                    itemStyle: {
                                        normal: {
                                            color: app.config.pie1Color,
                                            shadowColor: app.config.pie1Color,
                                        }
                                    },
                                    label: {
                                        normal: {
                                            formatter: '{d}%',
                                            position: 'center',
                                            show: true,
                                            textStyle: {
                                                fontSize: '35',
                                                fontWeight: 'normal',
                                                color: app.config.pie1Color
                                            }
                                        }
                                    },
                                }, {
                                    value: 100 - parseInt(app.config.pie1Process),
                                    itemStyle: placeHolderStyle,

                                }]
                            }, {
                                data: [{
                                    value: parseInt(app.config.pie2Process),
                                    itemStyle: {
                                        normal: {
                                            color: app.config.pie2Color,
                                            shadowColor: app.config.pie2Color,
                                        }
                                    }
                                }, {
                                    value: 100 - parseInt(app.config.pie2Process),
                                    itemStyle: placeHolderStyle,
                                }]
                            }, {
                                data: [{
                                    value: parseInt(app.config.pie3Process),
                                    label: {
                                        normal: {
                                            formatter: '{d}%',
                                            position: 'center',
                                            show: true,
                                            textStyle: {
                                                fontSize: '35',
                                                fontWeight: 'normal',
                                                color: app.config.pie3Color
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: app.config.pie3Color,
                                            shadowColor: app.config.pie3Color,
                                        }
                                    }
                                }, {
                                    value: 100 - parseInt(app.config.pie3Process),

                                    itemStyle: placeHolderStyle,
                                }]
                            }]
                        }
                        myChart.setOption(tempOption);
                    }
                };


                var dataStyle = {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        shadowBlur: 40,
                        shadowColor: 'rgba(40, 40, 40, 0.5)',
                    }
                };

                var placeHolderStyle = {
                    normal: {
                        color: 'rgba(44,59,70,1)', // 未完成的圆环的颜色
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
                    }
                };

                let option = {
                    title: {
                        text: '50%',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            color: '#b697cd',
                            fontSize: 35
                        }
                    },
                    toolbox: {
                        show: false,
                    },
                    series: [{
                        name: 'Pie1',
                        type: 'pie',
                        clockWise: false,
                        radius: [80, 85],
                        itemStyle: dataStyle,
                        hoverAnimation: false,
                        center: ['25%', '50%'],
                        data: [{
                            value: 25,
                            label: {
                                normal: {
                                    formatter: '{d}%',
                                    position: 'center',
                                    show: true,
                                    textStyle: {
                                        fontSize: '35',
                                        fontWeight: 'normal',
                                        color: '#3dd4de'
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#3dd4de',
                                    shadowColor: '#3dd4de',
                                    shadowBlur: 10
                                }
                            }
                        }, {
                            value: 75,
                            name: 'invisible',
                            itemStyle: placeHolderStyle,
                        }]
                    }, {
                        name: 'Pie2',
                        type: 'pie',
                        clockWise: false,
                        radius: [80, 85],
                        itemStyle: dataStyle,
                        hoverAnimation: false,
                        center: ['50%', '50%'],
                        data: [{
                            value: 50,
                            itemStyle: {
                                normal: {
                                    color: '#b697cd',
                                    shadowColor: '#b697cd',
                                    shadowBlur: 10
                                }
                            }
                        }, {
                            value: 50,
                            name: 'invisible',
                            itemStyle: placeHolderStyle,
                        }]
                    }, {
                        name: 'Pie3',
                        type: 'pie',
                        clockWise: false,
                        radius: [80, 85],
                        itemStyle: dataStyle,
                        hoverAnimation: false,
                        center: ['75%', '50%'],
                        data: [{
                            value: 75,
                            label: {
                                normal: {
                                    formatter: '{d}%',
                                    position: 'center',
                                    show: true,
                                    textStyle: {
                                        fontSize: '35',
                                        fontWeight: 'normal',
                                        color: '#a6f08f'
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#a6f08f',
                                    shadowColor: '#a6f08f',
                                    shadowBlur: 10
                                }
                            }
                        }, {
                            value: 25,
                            name: 'invisible',
                            itemStyle: placeHolderStyle,
                        }]
                    },]
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