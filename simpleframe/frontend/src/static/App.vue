<template>
    <div id="app">
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {
            // foo:Foo,

        },


    };

</script>

<style>
    html,body{
        height: 100%;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color:#dfe9fb ;
        height: 100%;
    }
</style>
