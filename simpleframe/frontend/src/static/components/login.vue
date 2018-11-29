<template>
    <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <h3 class="title">管理员登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="account.username" prefix-icon="el-icon-search" auto-complete="off"
                      placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="account.password" prefix-icon="el-icon-search" auto-complete="off"
                      placeholder="密码"></el-input>
        </el-form-item>
        <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="loading">登录
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import API from '../axios/index'
    import store from '@/static/store/index';

    export default {
        data() {
            return {
                loading: false,
                account: {
                    username: 'admin',
                    password: 'admin'
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        methods: {
            login() {
                let that = this;
                this.$refs.AccountFrom.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let loginParams = {username: this.account.username, password: this.account.password};
                        API.post('/api/login', loginParams).then(result => {
                            that.loading = false;
                            console.log(result)
                            if (result.headers.sctoken) {
                                store.commit('set_token', result.headers.sctoken);
                                that.$message.success({showClose: true, message: "成功", duration: 2000});
                                that.$router.push('/hello')
                            } else {
                                that.$router.replace('/login');
                            }
                        }, error => {
                            that.loading = false;
                            console.log(error)
                        });
                    }
                });
            },
        }
    }
</script>
<style>
    body {
        background: #DFE9FB;
    }
</style>
<style lang="scss" scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 160px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
        background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
        background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
        background: -o-linear-gradient(top, #ace, #00C1DE); /*Opera 11.10+*/

        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>
