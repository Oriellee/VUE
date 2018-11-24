<template>
    <el-container class="father-box">
        <el-header class="header">
            <el-row type="flex" justify="space-between" align="middle">
                <el-col>拾柴大数据分析系统</el-col>
                <el-col>
                    <i class="fa fa-user-o"></i>
                    <i class="fa fa-bars"></i>
                    <i class="fa fa-power-off"></i>
                </el-col>
            </el-row>
        </el-header>
        <el-container class="body">
            <el-aside class="aside" style="width: 220px;">
                <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        background-color="#2a2d39"
                        text-color="#818492"
                        active-text-color="#fff" v-for="item in menu">
                    <el-submenu :index="item.index">
                        <template slot="title">
                            <i :class="item.icon" class="menu-logo"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <el-menu-item  v-for="(child,childIndex) in item.child" :index="item.index+'-'+child.index"
                                      >
                            <router-link :to="child.url">{{child.name}}</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
                <!--<router-link to="/foo">Go to Foo</router-link>-->
                <!--<router-link to="/bar">Go to Bar</router-link>-->
                <!--<router-link to="/aaa/hahahah">aaa</router-link>-->
                <!--<router-link to="/hello">hello</router-link>-->
                <!--<router-link to="/login">login</router-link>-->
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
    import API from '../axios/index'
    import store from '@/static/store/index';
    import router from '@/static/router/index';

    export default {
        name: "index",
        data() {
            return {
                menu: [{
                    "name": "系统管理",
                    "icon": "fa fa-user-o",
                    "index": "1",
                    "child": [{"name": "个人中心", "url": "/foo", "index": "1"}, {
                        "name": "用户管理",
                        "url": "/aaa/hahahah",
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
                        "child": [{"name": "数据集管理", "url": "/hello", "index": "1"}, {
                            "name": "导入数据集",
                            "url": "/foo",
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
            console(index) {
                console.log(index)
            },
            getProfile() {
                let that = this;
                API.get('/api/profile').then(function (result) {
                    if (result.headers.sctoken) {
                        store.commit('set_token', result.headers.sctoken);
                    } else {
                        that.$message.error({
                            showClose: true,
                            message: result.errmsg || '鉴权失败，请重新登录',
                            duration: 2000
                        });
                        that.$router.replace('/login');
                    }
                }, function (err) {
                    that.$message.error({showClose: true, message: "鉴权接口请求失败", duration: 2000});
                    that.$router.replace('/login');
                })
            }
        },
        created: function () {
            this.getProfile();
        },
    }
</script>

<style lang="less" scoped>
    @aside: 220px;
    @theme-bgcolor: #2a2d39;
    @font-color:#818492;
    html, body, .father-box {
        height: 100%;
        background-color: #1a1c24;
        color: @font-color;
        * {
            /*border: 1px solid red;*/
        }
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
                .menu-logo {
                    margin-right: 5px;
                }
                a{
                     color:@font-color;
                }
                /*a:active{*/
                    /*color: #fff;*/
                /*}*/
            }
        }
    }
</style>