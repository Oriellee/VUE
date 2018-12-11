<template>
    <div class="father-box">
        <el-row>
            <el-col :span="6">
                <el-col class="card-box" :span="12" v-for="item in textBoxList">
                    <h3>{{item.num}}</h3>
                    <p>{{item.type}}</p>
                </el-col>
            </el-col>
            <el-col :span="6">
                <div id="pie"></div>
            </el-col>
            <el-col :span="12"></el-col>
            <el-col :span="24"></el-col>
            <el-col :span="24"></el-col>
            <el-col :span="24"></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "index",
        data: function () {
            return {
                textBoxList: [{'num': 22, 'type': '今日新增'}, {'num': 22, 'type': '今日新增'}, {
                    'num': 22,
                    'type': '今日新增'
                }, {'num': 22, 'type': '今日新增'}]
            }
        }
    }
</script>

<style lang="less" scoped>
    .father-box {
        margin: auto;
        .el-row {
            >.el-col:first-child{
                width: 400px;
            }
            .el-col {
                height: 300px;
                display: flex;
                justify-content: space-between;
                flex-flow: wrap;
                .card-box {
                    height: calc(~'50%' - 5px);
                    width: calc(~'50%' - 5px);
                    border-radius: 10px;
                    margin-bottom: 10px;
                    &:nth-child(1) {
                        background-color: #e7756f;
                        margin-right: 10px;
                    }
                    &:nth-child(2) {
                        background-color: #f1cc43;
                    }
                    &:nth-child(3) {
                        background-color: #4ac2c0;
                        margin-right: 10px;
                    }
                    &:nth-child(4) {
                        background-color: #4c9ffe;
                    }
                }

            }
        }
    }
</style>