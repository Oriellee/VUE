<template>
    <div :id="id" :data="data">
    </div>
</template>
<script>
    import BMap from 'BMap'

    export default {
        name: "mapDrawPoint",
        data() {
            return {
                map: Object
            }
        },
        props: {
            id: {
                type: String,
            },
            pointTextList: {
                type: Object,
                default() {
                    return {'name': '名称', 'lng': '经度', 'lat': '纬度', 'addr': '地址'}
                }
            },
            data: {
                type: Object,
                default() {
                    return {
                        'lng': 116.404,
                        'lat': 39.915,
                        'level': 11,
                        'pointList': [{'name': 'aaa', 'lng': 116.406, 'lat': 39.914, 'addr': '办公室'}, {
                            'name': 'fff',
                            'lng': 116.408,
                            'lat': 39.914,
                            'addr': '办公室'
                        }, {'name': 'vvv', 'lng': 116.406, 'lat': 39.915, 'addr': '办公室'},]
                    }
                }
            }
        },
        mounted() {
            // this.createMap();
            this.map = this.createMap();
            this.drawPoint(this.data.pointList)
        },
        methods: {
            createMap() {
                let map = new BMap.Map(document.getElementById(this.id), {enableMapClick: false}); //在百度地图容器中创建一个地图
                map.centerAndZoom(new BMap.Point(this.data.lng, this.data.lat), this.data.level); //设定地图的中心点和坐标并将地图显示在地图容器中
                map.enableScrollWheelZoom(); //启动鼠标滚轮缩放地图
                map.enableKeyboard(); //启用键盘移动地图
                // map.setMapStyle({style:'dark'});
                return map;
            },
            clearMapData(map) {
                map.clearOverlays();
            },
            drawPoint(datas) {
                let map = this.map;
                let that = this;
                this.clearMapData(map);
                if (document.createElement('canvas').getContext) {
                    for (let i = 0; i < datas.length; i++) {
                        let mkr = new BMap.Marker(new BMap.Point(datas[i]["lng"], datas[i]["lat"]));
                        mkr.data = datas[i];
                        mkr.addEventListener('click', function (e) {
                                let open_point = new BMap.Point(e.point.lng, e.point.lat);

                                let startText = "<div style='width: 100%;height: 100%;'><table style='width: 100%;height: 100%;border-collapse:collapse;border: 1px solid lightgray;'>";
                                let endText = "</table></div>";
                                let centerText = "";
                                let optHeight = 0;
                                for (let key in that.pointTextList) {
                                    optHeight += 30;
                                    centerText += "<tr style='width: 100%;display: block;border: 1px solid lightgray;'><td style='border-right:1px solid lightgray;width:30%;display:inline-block;font-size:16px;padding:0px;' >" + that.pointTextList[key] + "</td>\<td style='width: 50%;display:inline-block;text-align:left;font-size:16px;padding:0px;'>" + e.currentTarget.data[key] + "</td></tr>";
                                }
                                let sContent = startText + centerText + endText;
                                let contentHeight = optHeight === 0 ? 100 : optHeight;
                                let opts = {
                                    width: 300, // 信息窗口宽度
                                    height: contentHeight, // 信息窗口高度
                                    title: "信息", // 信息窗口标题
                                    enableMessage: false //设置允许信息窗发送短息
                                };
                                var infowindow = new BMap.InfoWindow(sContent, opts);
                                map.openInfoWindow(infowindow, open_point);
                            }
                        );
                        map.addOverlay(mkr);
                        let label = new BMap.Label(datas[i]["name"], {offset: new BMap.Size(-3, -20)});
                        label.setStyle({
                            background: 'none', color: 'black', border: 'none', fontsize: '16px',
                        });
                        mkr.setLabel(label);
                    }

                } else {
                    alert('请在chrome、safari、IE8+以上浏览器查看本示例');
                }
                map.setViewport(datas); //将所有的点放置在最佳视野内
            },
        }
    }
</script>
<style>
    .anchorBL {
        display: none;
    }
</style>

<style lang="less" scoped>
    div {
        height: 100%;
        width: 100%;
    }

</style>