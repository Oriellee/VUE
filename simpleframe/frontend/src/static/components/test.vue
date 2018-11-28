<template>
    <div style="width: 100%;height: 100%;">
        <div>fdsfsfsfdsfsdfs</div>
        <p>{{msg}}</p>
    </div>
</template>

<script>
    import API from '@/static/axios/index'

    export default {
        name: "test",
        data() {
            return {
                msg: []
            }
        },
        methods: {
            getMenus() {
                let that = this;
                API.get('/api/menus').then(res => {
                    that.msg = res.data
                }, error => {
                })
            }
        },
        created: function () {
            console.log("aaaaaaaaaaaaa")
            this.getMenus()
        }
    }
</script>

<style scoped>

</style>