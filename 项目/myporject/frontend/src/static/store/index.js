import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        sc_token:''
    },
    mutations:{
        set_token(state,token) {
            state.sc_token = token;
            sessionStorage.sc_token = token
        },
        del_token(state) {
            state.sc_token = '';
            sessionStorage.removeItem('sc_token')
        }
    }
});

export default store;