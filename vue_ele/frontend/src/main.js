import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import '@/assets/iconfont.css';
import '@/assets/styles/main.scss';

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });


const vm = new Vue({
    el: '#app',
    router,
    render: h => h(App),
});

Vue.use(vm);
