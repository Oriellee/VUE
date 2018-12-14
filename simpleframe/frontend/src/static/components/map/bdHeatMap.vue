<template>
    <div :id="id" :data="data">
    </div>
</template>

<script>
    import BMap from 'BMap'

    export default {
        name: "bdHeatMap",
        data() {
            return {
                map: Object
            }
        },
        props: {
            id: {
                type: String,
            },
            data: {
                type: Object,
                default() {
                    return {
                        'lng': 116.404,
                        'lat': 39.915,
                        'level': 11,
                        'dataList': []
                    }
                }
            }
        },
        mounted() {
            this.map = this.createMap();
            this.showHeatMap(this.data.dataList);
        },
        methods: {
            createMap() {
                let map = new BMap.Map(document.getElementById(this.id), {enableMapClick: false}); //在百度地图容器中创建一个地图
                map.centerAndZoom(new BMap.Point(this.data.lng, this.data.lat), this.data.level); //设定地图的中心点和坐标并将地图显示在地图容器中
                map.enableScrollWheelZoom(); //启动鼠标滚轮缩放地图
                map.enableKeyboard(); //启用键盘移动地图
                // map.setMapStyle({style:'midnight'});
                return map;
            },
            clearMapData(map) {
                map.clearOverlays();
            },
            isSupportCanvas() {
                let elem = document.createElement('canvas');
                return !!(elem.getContext && elem.getContext('2d'));
            },
            showHeatMap(mapData) {
                if (!this.isSupportCanvas()) {
                    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
                } else {
                    let map = this.map;
                    map.clearOverlays();
                    let data = [];
                    let values = [];

                    mapData.forEach(function (value) {
                        data.push({
                            lng: value.lng,
                            lat: value.lat,
                            count: value.cnt
                        });
                        values.push(value.cnt);
                    });
                    values.sort(function (a, b) {
                        return a - b;
                    });
                    let max = values.length === 0 ? 0 : values[values.length - 1];
                    let min = values.length === 0 ? 0 : values[0];
                    let heatmapOverlay = new BMapLib.HeatmapOverlay({
                        "radius": 30
                    });

                    map.addOverlay(heatmapOverlay);
                    heatmapOverlay.setDataSet({
                        data: data,
                        max: max,
                        min: min
                    });
                    heatmapOverlay.show();
                    map.setViewport(mapData); //将所有的点放置在最佳视野内
                }
            },
        },
        watch: {
            //观察option的变化
            data: {
                handler(newVal) {
                    this.data = newVal;
                    this.showHeatMap(this.data.dataList);
                },
                deep: true,//对象内部属性的监听，关键。
            },
        }
    }
</script>

<style lang="less" scoped>
    div {
        height: 100%;
        width: 100%;
    }
</style>