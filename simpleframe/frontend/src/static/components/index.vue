<template>
    <div>
        <router-link to="/test">Go to test</router-link>
        <router-link to="/hello">Go to hello</router-link>

        <div>用户名：{{username}}</div>
        <button @click="logout">登出</button>
        <router-view></router-view>
    </div>

</template>

<script>
    import API from '@/static/axios/index';
    import store from "../store";

    export default {
        name: "index",
        data() {
            return {
                username: ""
            }
        },
        methods: {
            getProfile() {
                let that = this;
                API.get('/api/profile').then(res => {
                    that.username = res.data.username;
                }, error => {
                    that.$router.replace('/login');
                })
            },
            logout() {
                let that = this;
                API.get('/api/logout').then(res => {
                    that.$router.replace('/login');
                }, error => {
                    that.$router.replace('/login');
                })
            }
        },
        created: function () {
            this.getProfile()
        }
    }
</script>

<style scoped>

</style>