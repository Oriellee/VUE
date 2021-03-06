import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/static/store/index';

Vue.use(VueRouter);

import Index from '@/static/components/index'
import Hello from '@/static/components/HelloWorld'
import AAA from '@/static/components/aaa'
import Foo from '@/static/components/foo'
import Bar from '@/static/components/bar'
import Error from '@/static/components/404'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/static/components/login'], resolve);

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
            component: Index,
            children: [{
                path: 'hello',
                component: Hello,
            }, {
                path: 'foo',
                component: Foo,
            }, {
                path: 'bar',
                component: Bar,
            }, {
                path: 'aaa/:id',
                component: AAA,
            }
            ]
        }
    ]
});

if (sessionStorage.getItem('sctoken')) {
    store.commit('set_token', sessionStorage.getItem('sctoken'))
}

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        store.commit('del_token');
        next()
    } else {
        if (store.state.sctoken) {
            next()
        } else {
            next('/login')
        }
    }
});

export default router;
