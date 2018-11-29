import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store/index'
import router from '../router/index'

let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;

axios.defaults.headers['sctoken'] = store.state.sctoken;
axios.defaults.timeout = 5000;

// 请求拦截器。
axios.interceptors.request.use(config => {
    if (store.state.sctoken) {
        config.headers.sctoken = store.state.sctoken;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器和异常处理。
axios.interceptors.response.use(response => {
    return response;
}, error => {
    let errorText = "";
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                errorText = '错误请求';
                break;
            case 401:
                errorText = '未授权，请重新登录';
                store.commit('del_token');
                router.replace('/login');
                break;
            case 402:
                errorText = '用户名或者密码错误';
                break;
            case 403:
                errorText = '用户不存在';
                break;
            case 404:
                errorText = '请求错误,未找到该资源';
                break;
            case 405:
                errorText = '短时间内调用次数太多';
                store.commit('del_token');
                router.replace('/login');
                break;
            case 406:
                errorText = '登录超过规定时长，请重新登录';
                store.commit('del_token');
                router.replace('/login');
                break;
            case 408:
                errorText = '请求超时';
                break;
            case 500:
                errorText = '服务器端出错';
                break;
            case 501:
                errorText = '网络未实现';
                break;
            case 502:
                errorText = '网络错误';
                break;
            case 503:
                errorText = '服务不可用';
                break;
            case 504:
                errorText = '网络超时';
                break;
            case 505:
                errorText = 'http版本不支持该请求';
                break;
            default:
                errorText = `连接错误${error.response.status}`
        }
    } else {
        errorText = "连接到服务器失败"
    }
    Message({
        showClose: true,
        message: errorText,
        type: 'error',
        duration: 2000
    });
    return Promise.reject(error.response);
});

export default {
    get(url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: param,
                concelToken: new CancelToken(c => {
                    cancel = c;
                })
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err)
            })
        })
    },
    post(url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        })
    }
}