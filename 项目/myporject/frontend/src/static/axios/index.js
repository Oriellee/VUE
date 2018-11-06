import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store/index'

let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;

axios.defaults.baseURL = 'http://127.0.0.1:8000/'
//设置默认请求头
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    // 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
}
axios.defaults.headers['Authentication-Token'] = store.state.sc_token;
axios.defaults.timeout = 5000;
//请求拦截器
axios.interceptors.request.use(config => {

    // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel

        // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = `token ${store.state.token}`;
        // }
        //
        // let sc_token = window.localStorage.getItem('sc-token');
        // console.log(sc_token)
        // if(sc_token){
        //     console.log(sc_token)
        //     config.headers['sc-token'] =sc_token
        //     console.log(config)
        // }else{
        //     error.message = '登陆信息获取失败'
        //     Message.error(error)
        // }
    } else {
        promiseArr[config.url] = cancel
    }
    if (store.state.sc_token) {
        config.headers['Authentication-Token'] = store.state.token
    }
    console.log("发送成功")
    return config
}, error => {
    console.log("发送失败")
    return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
    console.log("返回成功")

}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break;
            case 401:
                error.message = '未授权，请重新登录'
                // this.$store.commit('del_token');
                // router.replace({
                //     path: '/login',
                //     query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                // })
                break;
            case 403:
                error.message = '拒绝访问'
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                break;
            case 405:
                error.message = '请求方法未允许'
                break;
            case 408:
                error.message = '请求超时'
                break;
            case 500:
                error.message = '服务器端出错'
                break;
            case 501:
                error.message = '网络未实现'
                break;
            case 502:
                error.message = '网络错误'
                break;
            case 503:
                error.message = '服务不可用'
                break;
            case 504:
                error.message = '网络超时'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        error.message = "连接到服务器失败"
    }
    Message.error(error)
    console.log("返回失败")
    return Promise.resolve(error.response)
})


export default {
    //get请求
    get(url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            })
        })
    },
    //post请求
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
                resolve(res)
            })
        })
    }
}
