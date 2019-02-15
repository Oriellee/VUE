<template>
    <el-container class="father-box frame-box">
        <el-header class="header">
            <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="10">Oriel大数据分析系统</el-col>
                <el-col :span="10">
                    <el-dropdown trigger="hover">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544792808055&di=077a2662293f3d92399b9398d23b721c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201502%2F03%2F20150203135625_AxMxi.jpeg"
                             alt="">
                        <span class="el-dropdown-link userinfo-inner">{{username}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>我的消息</el-dropdown-item>
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>
        <el-container class="body">
            <el-aside class="aside" width="auto" @mouseenter.native="collapseOpen"
                      @mouseleave.native="collapseClose">
                <el-menu
                        :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        active-text-color="#fff" :collapse="isCollapse">
                    <el-submenu v-for="item in menu" :index="item.index">
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
                <!--<i class="fa fa-bars" @click="isCollapse = !isCollapse"></i>-->
            </el-aside>
            <el-container class="content">
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import API from '@/static/axios/index';
    import store from "../store";

    export default {
        name: "frame",
        data() {
            return {
                username: "",
                collapseBtnClick: false,
                isCollapse: false,
                menu: [],
            }
        },
        methods: {
            getProfile() {
                let that = this;
                API.get('/api/sysmanger/profile').then(res => {
                    that.username = res.data.username;
                }, error => {
                    that.$router.replace('/login');
                })
            },
            getMenus() {
                let that = this;
                API.get('/api/sysmanger/menus').then(res => {
                    that.menu = res.data
                }, error => {
                })
            },
            collapseStatus() {
                this.collapseBtnClick = this.isCollapse;
                this.isCollapse = !this.isCollapse;
            },
            collapseOpen() {
                if (this.collapseBtnClick) return;
                this.isCollapse = false;
            },
            collapseClose() {
                if (this.collapseBtnClick) return;
                this.isCollapse = true;
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
                this.$confirm('您将退出登陆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning'
                }).then(() => {
                    let that = this;
                    API.get('/api/sysmanger/logout').then(res => {
                        that.$router.replace('/login');
                    }, error => {
                        that.$router.replace('/login');
                    })
                }).catch(() => {
                });

            }
        }
        ,
        created: function () {
            this.getProfile();
            // this.test();
            this.getMenus();
        }
    }
</script>

<style lang="less">
    @import "../assets/styles/mainStyle.css";

    @aside: 220px;
    @theme-bgcolor: #2a2d39;
    @font-color: #818492;
    .frame-box {
        height: 100%;
        background-color: #1a1c24;
        color: @font-color;
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
                    padding: 15px;
                    text-align: right;
                    cursor: pointer;
                    font-weight: bold;
                    > .el-dropdown {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        color: @font-color;
                        > img {
                            width: 40px;
                            height: 40px;
                            border-radius: 20px;
                            margin: 0 10px;
                            /*float: right;*/
                        }

                    }
                }
            }
        }

        .body {
            .aside {
                background-color: @theme-bgcolor;
                .el-menu-vertical-demo:not(.el-menu--collapse) {
                    width: @aside;
                }
                .el-menu--collapse {
                    .el-submenu__title {
                        text-align: center;
                    }
                }
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
            .content {
                .el-main {
                    padding: 0;
                    > div {
                        width: 1920px - @aside - 60px;
                        margin: auto;
                    }
                }
            }
        }

    }
</style>