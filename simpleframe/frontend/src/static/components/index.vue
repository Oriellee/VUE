<template>
    <div>
        <router-link to="/test">Go to test</router-link>
        <router-link to="/hello">Go to hello</router-link>
        <router-view></router-view>
    </div>

</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

</style>