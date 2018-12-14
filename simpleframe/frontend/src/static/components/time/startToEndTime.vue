<template>
    <div class="block">
        <el-date-picker
                v-model="time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2"
                :default-time="defaultTime"
                @change="dataTimeFormat"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
        <el-button
                size="mini"
                type="primary"
                @click="query()">查看
        </el-button>
    </div>
</template>

<script>
    export default {
        name: "startToEndTime",
        data() {
            return {
                time: [this.$moment(new Date(Date.parse(new Date()) - 1000 * 60 * 60)).format("YYYY-MM-DD HH:mm:ss"), this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss")],
                defaultTime: [this.$moment(new Date(Date.parse(new Date()) - 1000 * 60 * 60)).format("HH:mm:ss"), this.$moment(new Date()).format("HH:mm:ss")],
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },

            };
        },
        props: {},
        methods: {
            query() {
                this.$emit('inputTime', this.time);
            },
            dataTimeFormat(val) {
                this.startTime = val;
            }
        }, mounted() {
        },
    }
</script>

<style lang="less" scoped>
    div {
        width: 100%;
        height: 100%;
        > .el-button {
            margin-left: 10px;
        }
    }
</style>