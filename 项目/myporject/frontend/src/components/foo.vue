<template>
    <div>
        <router-link to="/user/foo">Go to Foo</router-link>
        <router-link to="/user/bar">Go to Bar</router-link>
        <router-link to="/user/foo/aaa/hahahah">aaa</router-link>
        <router-link to="/user/foo/hello">hello</router-link>
        <router-link to="/login">login</router-link>
        <h2>foo34543534535345345 + {{ $route.params.id }}+</h2>
        <router-view></router-view>
    </div>

</template>

<script>
    export default {
        name: "foo"
    }
</script>

<style scoped>

</style>