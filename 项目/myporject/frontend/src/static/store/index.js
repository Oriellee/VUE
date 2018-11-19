import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        sctoken:''
    },
    mutations:{
        set_token(state,token) {
            state.sctoken = token;
            sessionStorage.sctoken = token
        },
        del_token(state) {
            state.sctoken = '';
            sessionStorage.removeItem('sctoken')
        }
    }
});

export default store;