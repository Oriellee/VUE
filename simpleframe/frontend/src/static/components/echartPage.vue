<template>
    <div class="father-box">
        <div class="echart-box one" ref="one" @click="changeClassName('one')">
            <mapDrawPoint id="mapDrawPointId" :data="mapDrawPointData"
                          :tableTextList="mapDrawPointtableTextList"></mapDrawPoint>
        </div>
        <div class="echart-box two" ref="two" @click="changeClassName('two')">
            <bdHeatMap id="bdHeatMapId" :data="bdHeatMapData"></bdHeatMap>
        </div>
        <div class="echart-box three" ref="three" @click="changeClassName('three')">
            <sourceMap id="sourceMapId"></sourceMap>
        </div>
        <div class="echart-box active" ref="four" @click="changeClassName('four')">
            <mapDrawPoint id="mapDrawPointId4"></mapDrawPoint>
        </div>
    </div>
</template>

<script>
    import mapDrawPoint from './map/mapDrawPoint'
    import bdHeatMap from './map/bdHeatMap'
    import sourceMap from './echart/sourceMap'

    export default {
        name: "echartPage",
        data() {
            return {
                mapDrawPointtableTextList: {'name': '名称', 'lng': '经度', 'lat': '纬度', 'addr': '地址'},
                mapDrawPointData: {
                    'lng': 116.404,
                    'lat': 39.915,
                    'level': 11,
                    'dataList': [{'name': 'aaa', 'lng': 116.406, 'lat': 39.914, 'addr': '办公室'}, {
                        'name': 'fff',
                        'lng': 116.408,
                        'lat': 39.914,
                        'addr': '办公室'
                    }, {'name': 'vvv', 'lng': 116.406, 'lat': 39.915, 'addr': '办公室'}]
                },
                bdHeatMapData: {
                    'lng': 116.404,
                    'lat': 39.915,
                    'level': 11,
                    'dataList': [{'cnt': 9999, 'lng': 116.406, 'lat': 39.914, 'addr': '办公室'}, {
                        'cnt': 9999,
                        'lng': 116.408,
                        'lat': 39.914,
                        'addr': '办公室'
                    }, {'cnt': 9999, 'lng': 116.406, 'lat': 39.915, 'addr': '办公室'}]
                }
            }
        },
        mounted() {
            let that = this;
            setTimeout(function () {
                console.log("aaa")
                that.bdHeatMapData = {
                    'lng': 116.404,
                    'lat': 39.915,
                    'level': 11,
                    'dataList': [{'cnt': 777, 'lng': 116.406, 'lat': 39.914, 'addr': '办公室'}, {
                        'cnt': 888,
                        'lng': 116.408,
                        'lat': 39.914,
                        'addr': '办公室'
                    }, {'cnt': 666, 'lng': 116.406, 'lat': 39.915, 'addr': '办公室'}]
                }
            }, 2000)
        },
        methods: {
            changeClassName(self) {
                let divList = this.$refs;
                let oldActiveDiv = "";
                let oldActiveDivClassName = "";
                let checkedDivClassName = this.$refs[self].className;

                for (let item in divList) {
                    if (divList[item].className === "echart-box active") {
                        oldActiveDiv = item;
                        oldActiveDivClassName = divList[item].className;
                    }
                }
                this.$refs[self].className = oldActiveDivClassName;
                this.$refs[oldActiveDiv].className = checkedDivClassName;
            }
        },
        components: {
            mapDrawPoint, bdHeatMap, sourceMap
        }
    }
</script>

<style lang="less" scoped>
    .father-box {
        padding: 20px;
        height: 100%;
        position: relative;
        .echart-box {
            padding: 0;
            margin: 0;
            width: calc(~'75%' - 50px);
            height: 800px;
            position: absolute;
            text-align: center;
            transform: scale(0.32);
            transition: all .8s;
            background: rgba(32, 32, 35, .5);
            &.one {
                transform: translate(-33.5%, -33.5%) scale(0.32);
            }
            &.two {
                transform: translate(-33.5%, 0.5%) scale(0.32);
            }
            &.three {
                transform: translate(-33.5%, 34.5%) scale(0.32);
            }
            &.active {
                transform: translate(34.5%, 0.5%) scale(1);
            }
        }
    }
</style>