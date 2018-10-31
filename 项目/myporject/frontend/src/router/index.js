import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


import User from '@/components/foo'
import Hello from '@/components/HelloWorld'
import AAA from '@/components/aaa'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/login'], resolve)
window.localStorage.removeItem('access-user')

const router = new VueRouter({
    routes: [
        {
            path: '/login',
            name: '登录',
            component: Login,
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
router.beforeEach((to, from, next) => {
    console.log("1---------",JSON.parse(window.localStorage.getItem('access-user')))
    if (to.path.startsWith('/login')) {
        console.log("1---------",JSON.parse(window.localStorage.getItem('access-user')))
        window.localStorage.removeItem('access-user')
        console.log("2---------",JSON.parse(window.localStorage.getItem('access-user')))
        next()
    } else {
        let user = JSON.parse(window.localStorage.getItem('access-user'))
        console.log("3---------",JSON.parse(window.localStorage.getItem('access-user')))
        if (!user) {
            next({path: '/login'})
        } else {
            next()
        }
    }
})

export default router;
