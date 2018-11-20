<template>
    <div id="app">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    import API from 'axios/index'
    import store from '@/static/store/index';
    import router from '@/static/router/index';

    export default {
        name: 'app',
        components: {
            // foo:Foo,

        },
        methods: {
            getProfile() {
                let that = this;
                API.get('/api/profile').then(function (result) {
                    if (result.headers.sctoken) {
                        store.commit('set_token', result.headers.sctoken);
                        if (store.state.sctoken) {
                            that.$router.push('/')
                            console.log(store.state.sctoken)
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
        created:function(){
            this.getProfile()
        },

    };

    // import { app } from './app'
    //
    // app.$mount('#app')


</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
