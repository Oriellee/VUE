<template>
    <div id="app">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    export default {
        name: 'app',
        components: {
            // foo:Foo,

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
