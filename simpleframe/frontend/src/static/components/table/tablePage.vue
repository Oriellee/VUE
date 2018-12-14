<template>
    <div>
        <el-input v-model="input" placeholder="请输入内容" class="text"
                  style="margin-bottom:15px;max-width:200px;float:right"></el-input>
        <el-table ref="multipleTable"
                  :data="filterData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe
                  style="width: 100%;margin-bottom:25px;"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <template v-for="item in tableColumnList">
                <el-table-column v-if="item.isShow" :prop="item.prop"
                                 :label="item.label" :sortable="item.isSort" :width="item.width">
                </el-table-column>
                <slot v-if="item.slot" :name="item.slot"></slot>
            </template>
        </el-table>
        <el-pagination style="float:right;text-align: right"
                       background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next"
                       :total="filterData.length">
        </el-pagination>
    </div>
</template>

<script>
    import API from '@/static/axios/index'

    export default {
        name: "tablePage",
        data() {
            return {
                input: "",
                currentPage: 1,
                pageSize: 10,
                multipleSelection: [],
            }
        },
        props: {
            tableColumnList: {
                type: Array,
                default() {
                    return []
                }
            },
            tableData: {
                type: Array,
                default() {
                    return []
                }
            },

        },
        computed: {
            filterData: function () {
                let input = this.input && this.input.toLowerCase();
                let items = this.tableData;
                let items1;
                if (input) {
                    items1 = items.filter(function (item) {
                        return Object.keys(item).some(function (key1) {
                            return String(item[key1]).toLowerCase().match(input)
                        })
                    })
                } else {
                    items1 = this.tableData
                }
                return items1
            }
        },
        methods: {
            handleSizeChange: function (size) {
                this.pageSize = size;
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$emit('commitSelection', this.multipleSelection);

            },
        },
        created: function () {
        },
        watch: {
            //观察option的变化
            tableColumnList: {
                handler(newVal) {
                    this.tableColumnList = newVal;
                },
                deep: true,//对象内部属性的监听，关键。
            },
            tableData: {
                handler(newVal) {
                    this.tableData = newVal;
                },
                deep: true,//对象内部属性的监听，关键。
            },
        }
    }
</script>

<style lang="less" scoped>
    div {
        width: 100%;
        height: 100%;
    }
</style>