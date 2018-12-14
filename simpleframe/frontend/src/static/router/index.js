import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/static/store/index';

Vue.use(VueRouter);

import Frame from '@/static/components/frame'
import Index from '@/static/components/index'
import User from '@/static/components/user'
import TableShow from '@/static/components/tableShow'
import EchartPage from '@/static/components/echartPage'
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
            component: Frame,
            children: [{
                path: 'index',
                component: Index,
            }, {
                path: 'user',
                component: User,
            }, {
                path: 'echart',
                component: EchartPage,
            }, {
                path: 'table',
                component: TableShow,
            }
            ]
        }
    ]
});

// 重要!!!,刷新页面时,store的状态被清空,此时需要从缓存中读取!
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