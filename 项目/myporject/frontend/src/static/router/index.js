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
if (sessionStorage.getItem('sc_token')) {
    store.commit('set_token', sessionStorage.getItem('sc_token'))
}

router.beforeEach((to, from, next) => {
    // console.log(store,"1111111111111111111",store.state)
    // if (!store.state.sc_token) {
    // console.log("1111111",sessionStorage.getItem('sc_token'))

    // if(sessionStorage.getItem('sc_token')){
    //     console.log(sessionStorage.getItem('sc_token'))
        // if (to.path.startsWith('/login')) {
        //     sessionStorage.removeItem('sc_token')
        //     next()
        // } else {
        // next({path: '/login'})
        // }
    // } else {
    //     console.log(store,"1111111111111111111",store.state)
    // }
    if (to.path.startsWith('/login')) {
        console.log("aaaaaaaaaaaaaaaaaaaaa",window.sessionStorage)
        window.sessionStorage.removeItem('sc_token')
        console.log("bbbbbbbbbbbbbbbbbbbbbb",window.sessionStorage)
        next()
    } else {
        console.log(store.state.sc_token)
        if (store.state.sc_token) {
            next()
            console.log(store,"1111111",store.state.sc_token)
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
