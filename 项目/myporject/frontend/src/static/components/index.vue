<template>
    <div>
        <title class="title">这是所有文本的顶端标题！！！！！！！！！！！！！！！！</title>
        <div class="body">
            <div><h1>这是所有左侧菜单栏</h1>
                <router-link to="/foo">Go to Foo</router-link>
                <router-link to="/bar">Go to Bar</router-link>
                <router-link to="/aaa/hahahah">aaa</router-link>
                <router-link to="/hello">hello</router-link>
                <router-link to="/login">login</router-link>
            </div>
            <div>
                <h1>这是右侧内容区域</h1>
                <router-view></router-view>
            </div>
        </div>
    </div>

</template>

<script>
    import API from '../axios/index'
    import store from '@/static/store/index';
    import router from '@/static/router/index';
    export default {
        name: "index",
        methods: {
            getProfile() {
                let that = this;
                API.get('/api/profile').then(function (result) {
                    if (result.headers.sctoken) {
                        store.commit('set_token', result.headers.sctoken);
                        if (store.state.sctoken) {
                            console.log("+_+_+_+_+_+_",store.state.sctoken)
                            setTimeout(function(){
                                // that.$router.push('/hello')
                                // console.log("走了！")
                            },0)

                        } else {
                            that.$router.push('/login');
                        }
                    } else {
                        console.log("bbb")

                        that.$message.error({
                            showClose: true,
                            message: result.errmsg || '鉴权失败，请重新登录',
                            duration: 2000
                        });
                        that.$router.replace('/login');
                    }
                }, function (err) {
                    console.log("aaa");
                    that.loading = false;
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
    .title {
        width: 100%;
        height: 30px;
        color: red;
        font-size: 24px;
    }

    .body {
        width: 100%;
        display: flex;
        flex-flow: row;
        > div {
            border: 1px solid red;
            min-height: 500px;
            >*{
                margin: 10px;
            }
        }
        > div:first-child {
            width: 30%;
        }
        >div:last-child{
            width: 70%;
        }

    }
</style>