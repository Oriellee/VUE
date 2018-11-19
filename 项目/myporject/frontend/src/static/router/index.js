import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/static/store/index';
console.log("---------------------",store)

Vue.use(VueRouter);

import User from '@/static/components/foo'
import Hello from '@/static/components/HelloWorld'
import AAA from '@/static/components/aaa'
import Error from '@/static/components/404'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/static/components/login'], resolve)
// window.localStorage.removeItem('access-user')

const router = new VueRouter({
    routes: [
        {
            path: '/login',
            name: '登录',
            component: Login,
        }, {
            path: '/404',
            name: '404',
            component: Error
        },
        {
            path: '/',
            component: User,
        },
        {
            path: '/user/:id',
            component: User,
            children: [{
                path: 'hello',
                component: Hello,
            }, {
                path: 'aaa/:id',
                component: AAA,
            }
            ]
        }
    ]
})
if (sessionStorage.getItem('sctoken')) {
    store.commit('set_token', sessionStorage.getItem('sctoken'))
}

router.beforeEach((to, from, next) => {
    // console.log(store,"1111111111111111111",store.state)
    // if (!store.state.sctoken) {
    // console.log("1111111",sessionStorage.getItem('sctoken'))

    // if(sessionStorage.getItem('sctoken')){
    //     console.log(sessionStorage.getItem('sctoken'))
        // if (to.path.startsWith('/login')) {
        //     sessionStorage.removeItem('sctoken')
        //     next()
        // } else {
        // next({path: '/login'})
        // }
    // } else {
    //     console.log(store,"1111111111111111111",store.state)
    // }
    if (to.path.startsWith('/login')) {
        console.log("aaaaaaaaaaaaaaaaaaaaa",window.sessionStorage)
        window.sessionStorage.removeItem('sctoken')
        console.log("bbbbbbbbbbbbbbbbbbbbbb",window.sessionStorage)
        next()
    } else {
        console.log(store.state.sctoken)
        if (store.state.sctoken) {
            next()
            console.log(store,"1111111",store.state.sctoken)
        }else{
            next({path: '/login'})
        }


        // if (!user) {
        //     next({path: '/login'})
        // } else {
        }
    // }
})

export default router;
