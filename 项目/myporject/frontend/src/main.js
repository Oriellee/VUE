import Vue from 'vue';
import './static/plugins/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './static/App.vue';
import router from './static/router/index.js';
import '@/static/assets/iconfont.css';
import '@/static/assets/styles/main.scss';
// import Vuex from 'vuex'
import store from './static/store/index.js'

// console.log(store)
// Vue.use(Vuex)

Vue.use(ElementUI, {size: 'small', zIndex: 3000});

// const store = new Vuex.Store({
//     state: {
//         count: 111
//     },
//     mutations: {
//         increment(state) {
//             state.count++
//         }
//     }
// })
const vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});

Vue.use(vm);
