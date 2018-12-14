import Vue from 'vue';
import ElementUI from 'element-ui';
import store from './static/store/index.js'
import 'element-ui/lib/theme-chalk/index.css';
import App from './static/App.vue';
import router from './static/router/index.js';
import '@/static/assets/iconfont.css';
import '@/static/assets/styles/main.scss';
import 'font-awesome/css/font-awesome.min.css';
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
import moment from "moment";

Vue.prototype.$moment = moment;

Vue.prototype.$echarts = echarts;
echarts.registerMap('china', china);

Vue.use(ElementUI, {size: 'small', zIndex: 3000});

const vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});

Vue.use(vm);
