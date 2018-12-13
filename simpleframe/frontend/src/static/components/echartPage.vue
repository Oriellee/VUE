<template>
    <div class="father-box">
        <div class="echart-box one" ref="one" @click="changeClassName('one')">
            <mapDrawPoint id="mapDrawPointId"></mapDrawPoint>
        </div>
        <div class="echart-box two" ref="two" @click="changeClassName('two')">
            <mapDrawPoint id="mapDrawPointId2"></mapDrawPoint>
        </div>
        <div class="echart-box three" ref="three" @click="changeClassName('three')">
            <mapDrawPoint id="mapDrawPointId3"></mapDrawPoint>
        </div>
        <div class="echart-box active" ref="four" @click="changeClassName('four')">
            <mapDrawPoint id="mapDrawPointId4"></mapDrawPoint>
        </div>
    </div>
</template>

<script>
    import mapDrawPoint from './map/mapDrawPoint'

    export default {
        name: "echartPage",
        data() {
            return {
                mapDrawPointData: {},
            }
        },
        mounted() {
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
            mapDrawPoint
        }
    }
</script>

<style lang="less" scoped>
    .father-box {
        padding: 20px;
        height: 100%;
        .echart-box {
            padding: 0;
            margin: 0;
            width: calc((~'100%' - 300px)*0.75);
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