<template>
    <div :id="id" style="width: 100%;height: 100%;margin: auto;"></div>
</template>

<script>

    export default {
        name: "sourceMap",
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
                        'name': [],
                        'data': {}
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
            randomData() {
                return Math.round(Math.random() * 100);
            },
            drawChart() {
                let data = [
                    {
                        name: '齐齐哈尔'
                    }, {
                        name: '盐城'
                    }, {
                        name: '青岛'
                    }, {
                        name: '金昌'
                    }, {
                        name: '泉州'
                    }, {
                        name: '拉萨'
                    }, {
                        name: '上海浦东'
                    }, {
                        name: '攀枝花'
                    }, {
                        name: '威海'
                    }, {
                        name: '承德'
                    }, {
                        name: '汕尾'
                    }, {
                        name: '克拉玛依'
                    }, {
                        name: '重庆市'
                    }, {
                        name: '北京市'
                    }

                ];
                let geoCoordMap = {
                    '齐齐哈尔': [123.97, 47.33],
                    '盐城': [120.13, 33.38],
                    '青岛': [120.33, 36.07],
                    '金昌': [102.188043, 38.520089],
                    '泉州': [118.58, 24.93],
                    '拉萨': [91.11, 29.97],
                    '上海浦东': [121.48, 31.22],
                    '攀枝花': [101.718637, 26.582347],
                    '威海': [122.1, 37.5],
                    '承德': [117.93, 40.97],
                    '汕尾': [115.375279, 22.786211],
                    '克拉玛依': [84.77, 45.59],
                    '重庆市': [108.384366, 30.439702],
                    '北京市': [116.4551, 40.2539]

                };
                let planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
                let dataFrom = '北京市';
                let convertData = function (data) {
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        let geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            });
                        }
                    }
                    return res;
                };
                let option = {
                    title: {
                        text: '中国大区分布图',
                        subtext: '中国的八大区分布',
                        itemGap: 30,
                        left: 'center',
                        textStyle: {
                            color: '#1a1b4e',
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fontSize: 30
                        },
                        subtextStyle: {
                            color: '#58d9df',
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fontSize: 16
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    visualMap: {
                        min: 0,
                        max: 100,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'],
                        calculable: true,
                        inRange: {
                            color: ['#ffffff', '#E0DAFF', '#ADBFFF', '#9CB4FF', '#6A9DFF', '#3889FF']
                        }
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {
                                readOnly: false
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    geo: {
                        map: 'china',
                        zoom: 1.2,
                        label: {
                            normal: {

                                show: true,
                                color: '#c1c4c8'
                            },
                            emphasis: {
                                show: false,
                                color: '#292929'
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#fbfbfb',
                                borderColor: '#b9b4b7'

                            },
                            emphasis: {
                                areaColor: '#05ff09'
                            }
                        }
                    },
                    series: [
                        {
                            name: '北京市',
                            type: 'lines',
                            zlevel: 2,
                            symbolSize: 10,
                            effect: {
                                show: true,
                                period: 6,
                                symbol: planePath,
                                trailLength: 0,
                                symbolSize: 15

                            },
                            lineStyle: {
                                normal: {
                                    color: '#c60fff',
                                    width: 2,
                                    opacity: 0.5,
                                    curveness: 0.2
                                }
                            },
                            data: data.map(function (dataItem) {
                                return {
                                    fromName: dataFrom,
                                    toName: dataItem.name,
                                    coords: [
                                        geoCoordMap[dataFrom],
                                        geoCoordMap[dataItem.name]
                                    ]
                                }
                            })
                        }, {
                            name: '供需占比',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(data),
                            symbolSize: 8,
                            showEffectOn: 'render',
                            rippleEffect: {
                                scale: 5,
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c60fff',
                                    shadowBlur: 20,
                                    shadowColor: '#333'
                                }
                            }
                        }, {
                            type: 'map',
                            mapType: 'china',
                            geoIndex: 0,
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [{
                                name: '北京',
                                value: this.randomData()
                            }, {
                                name: '天津',
                                value: this.randomData()
                            }, {
                                name: '上海',
                                value: this.randomData()
                            }, {
                                name: '重庆',
                                value: this.randomData()
                            }, {
                                name: '河北',
                                value: this.randomData()
                            }, {
                                name: '河南',
                                value: this.randomData()
                            }, {
                                name: '云南',
                                value: this.randomData()
                            }, {
                                name: '辽宁',
                                value: this.randomData()
                            }, {
                                name: '黑龙江',
                                value: this.randomData()
                            }, {
                                name: '湖南',
                                value: this.randomData()
                            }, {
                                name: '安徽',
                                value: this.randomData()
                            }, {
                                name: '山东',
                                value: this.randomData()
                            }, {
                                name: '新疆',
                                value: this.randomData()
                            }, {
                                name: '江苏',
                                value: this.randomData()
                            }, {
                                name: '浙江',
                                value: this.randomData()
                            }, {
                                name: '江西',
                                value: this.randomData()
                            }, {
                                name: '湖北',
                                value: this.randomData()
                            }, {
                                name: '广西',
                                value: this.randomData()
                            }, {
                                name: '甘肃',
                                value: this.randomData()
                            }, {
                                name: '山西',
                                value: this.randomData()
                            }, {
                                name: '内蒙古',
                                value: this.randomData()
                            }, {
                                name: '陕西',
                                value: this.randomData()
                            }, {
                                name: '吉林',
                                value: this.randomData()
                            }, {
                                name: '福建',
                                value: this.randomData()
                            }, {
                                name: '贵州',
                                value: this.randomData()
                            }, {
                                name: '广东',
                                value: this.randomData()
                            }, {
                                name: '青海',
                                value: this.randomData()
                            }, {
                                name: '西藏',
                                value: this.randomData()
                            }, {
                                name: '四川',
                                value: this.randomData()
                            }, {
                                name: '宁夏',
                                value: this.randomData()
                            }, {
                                name: '海南',
                                value: this.randomData()
                            }, {
                                name: '台湾',
                                value: this.randomData()
                            }, {
                                name: '香港',
                                value: this.randomData()
                            }, {
                                name: '澳门',
                                value: this.randomData()
                            }]
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
                }
                ,
                deep: true,//对象内部属性的监听，关键。
            }
            ,
        }
    }
</script>

<style scoped>

</style>