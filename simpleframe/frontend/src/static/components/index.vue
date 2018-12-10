<template>
    <el-container class="father-box">
        <el-header class="header">
            <el-row type="flex" justify="space-between" align="middle">
                <el-col>拾柴大数据分析系统</el-col>
                <el-col>
                    <i class="fa fa-user-o"></i>
                    <i class="fa fa-bars"></i>
                    <i class="fa fa-power-off" @click="logout"></i>
                </el-col>
            </el-row>
        </el-header>
        <el-container class="body">
            <el-aside class="aside" style="width: 220px;">
                <el-menu
                        :default-active="$route.path"
                        :unique-opened="uniqueOpened"
                        class="el-menu-vertical-demo"
                        active-text-color="#fff"
                        v-for="item in menu">
                    <el-submenu :index="item.index">
                        <template slot="title">
                            <i :class="item.icon" class="menu-logo"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <el-menu-item v-for="(child,childIndex) in item.child" :index="child.url"
                                      @click="goto(child.url)">
                            {{child.name}}
                            <span></span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container class="content">
                <el-main><h1>这是右侧内容区域</h1>
                    <router-view></router-view>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import API from '@/static/axios/index';
    import store from "../store";

    export default {
        name: "index",
        data() {
            return {
                username: "",
                uniqueOpened: true,
                menu: [{
                    "name": "系统管理",
                    "icon": "fa fa-user-o",
                    "index": "1",
                    "child": [{"name": "个人中心", "url": "/hello", "index": "1"}, {
                        "name": "用户管理",
                        "url": "/test",
                        "index": "2"
                    }, {
                        "name": "权限管理",
                        "url": "/bar",
                        "index": "3"
                    }]
                },
                    {
                        "name": "数据中心",
                        "icon": "fa fa-database",
                        "index": "2",
                        "child": [{"name": "数据集管理", "url": "/111", "index": "1"}, {
                            "name": "导入数据集",
                            "url": "/222",
                            "index": "2"
                        }]
                    },
                    {
                        "name": "工具中心",
                        "icon": "fa fa-wrench",
                        "index": "3",
                        "child": [{"name": "爬虫", "url": "/foo", "index": "1"}, {
                            "name": "数据库迁移",
                            "url": "/foo",
                            "index": "2"
                        }, {
                            "name": "统计分析",
                            "url": "/login",
                            "index": "3"
                        }]
                    }]
            }
        },
        methods: {
            getProfile() {
                let that = this;
                API.get('/api/sysmanager/profile').then(res => {
                    that.username = res.data.username;
                }, error => {
                    that.$router.replace('/login');
                })
            },
            test() {
                let that = this;
                API.get('/api/user/test').then(res => {

                }, error => {
                    that.$router.replace('/login');
                })
            },
            goto(path) {
                this.$router.push(path)
            },
            logout() {
                let that = this;
                API.get('/api/sysmanager/logout').then(res => {
                    that.$router.replace('/login');
                }, error => {
                    that.$router.replace('/login');
                })
            }
        },
        created: function () {
            this.getProfile();
            this.test();
        }
    }
</script>

<style lang="less">
    @aside: 220px;
    @theme-bgcolor: #2a2d39;
    @font-color: #818492;
    .father-box {
        height: 100%;
        background-color: #1a1c24;
        color: @font-color;
    }

    .header {
        @header-height: 60px;
        background-color: @theme-bgcolor;
        height: @header-height;
        padding: 0;
        .el-row {
            height: 100%;
            > .el-col:first-child {
                width: @aside;
                font-size: 16px;
                height: 100%;
                background-color: #323340;
                line-height: @header-height;
                box-shadow: 0px 0px 8px black;
                padding-left: 20px;
            }
            > .el-col:last-child {
                width: 100px;
                text-align: right;
                display: flex;
                flex-flow: row;
                align-items: center;
                justify-content: flex-end;
                > i {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    margin-right: 10px;
                }
            }
        }
    }

    .body {
        .aside {
            width: @aside;
            background-color: @theme-bgcolor;
            .el-menu {
                color: #818492;
                border: none;
                .el-submenu {
                    .el-submenu__title {
                        background-color: #333744;
                        color: @font-color;
                    }
                }
                .el-submenu {
                    &.is-opened {
                        .el-submenu__title, .el-submenu__title i:first-child {
                            color: #ffffff;
                        }
                    }
                }
                .menu-logo {
                    margin-right: 5px;
                }
                .el-menu-item {
                    padding: 0;
                    color: @font-color;
                    &.is-active {
                        background-color: #222531;
                        box-shadow: 5px 2px 5px #11131a inset;
                        > span {
                            width: 5px;
                            height: 100%;
                            background-color: #018ece;
                            display: inline-block;
                            float: right;
                        }
                    }
                }
            }
        }
    }
</style>