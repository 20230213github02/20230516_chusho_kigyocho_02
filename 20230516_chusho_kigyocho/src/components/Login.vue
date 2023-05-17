<template>
    <div>
        <label>用户名</label><input type="text" v-model="username"/>
        <div v-if="ErrorFlagUsernameTooLong">过长</div>
        <div v-if="ErrorFlagUsernameFormatWrong">格式错误</div>
        <div v-if="ErrorFlagUsernameNull">为空</div>
        <label>密码</label><input type="password" v-model="password"/>
        <div v-if="ErrorFlagPasswordTooShort">太短</div>
        <div v-if="ErrorFlagPasswordTooLong">过长</div>
        <div v-if="ErrorFlagPasswordFormatWrong">格式错误</div>
        <div v-if="ErrorFlagPasswordNull">为空</div>
        <input type="radio" name="usertype" value="manager" v-model="usertype" />管理员
        <div v-if="ErrorFlagUsertypeNotSelect">没有选择</div>
        <input type="radio" name="usertype" value="normaluser" v-model="usertype" />普通用户
        <input type="button" value="提交" @click="login" />
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {

            ErrorFlagUsernameTooLong: '',
            ErrorFlagUsernameFormatWrong : '',
            ErrorFlagUsernameNull : '',
            ErrorFlagPasswordTooShort: '',
            ErrorFlagPasswordTooLong: '',
            ErrorFlagPasswordFormatWrong: '',
            ErrorFlagPasswordNull: '',
            ErrorFlagUsertypeNotSelect: '',

            // ErrorMessageFlagUsernameTooLong: '',
            // ErrorMessageFlagUsernameFormatWrong : '',
            // ErrorMessageFlagUsernameNull : '',
            // ErrorMessageFlagPasswordTooShort: '',
            // ErrorMessageFlagPasswordTooLong: '',
            // ErrorMessageFlagPasswordFormatWrong: '',
            // ErrorMessageFlagPasswordNull: '', 

            regExpUsername : /^[ぁ-んァ-ン一-龯0-9a-zA-Z]+$/,
            regExpPassword : /^[0-9a-zA-Z]+$/,

            username: '',
            password: '',
            usertype: '',

            flagAllPass: ''

        }
    },
    methods: {
        login() {

            this.flagAllPass = 
            (!this.ErrorFlagUsernameTooLong)&&
            (!this.ErrorFlagUsernameFormatWrong)&&
            (!this.ErrorFlagUsernameNull)&&
            (!this.ErrorFlagPasswordTooShort)&&
            (!this.ErrorFlagPasswordTooLong)&&
            (!this.ErrorFlagPasswordFormatWrong)&&
            (!this.ErrorFlagPasswordNull)&&
            (!this.ErrorFlagUsertypeNotSelect);

            if(!this.flagAllPass){
                alert("有误")
                return;
            }

            if (this.usertype == "manager") {
                this.loginManager();
            } else if (this.usertype == "normaluser") {
                this.loginNormaluser();
            }
        },
        loginManager() {
            let manager = {
                managerUsername: this.username,
                managerPassword: this.password
            };
            // fortest
            console.log('234')

            axios.post('http://localhost:8815/Manager/login', manager).then(response => {
                if (response.data) {
                    console.log(response.data)
                    if(response.data.state == '200'){
                        this.$router.push('/content-for-manager');
                    } else if (response.data.state == '600'){
                        alert('没有找到数据');
                    }
                }
                else {
                    // fortest
                    console.log('jjjj');
                    alert("出现错误")
                }
            }

            )
        },
        loginNormaluser() {
            let normaluser = {
                normaluserUsername: this.username,
                normaluserPassword: this.password
            };
            axios.post('http://localhost:8815/Normaluser/login', normaluser).then(response => {
                if (response.data) {
                    console.log(response.data)
                    if(response.data.state == '200'){
                        this.$router.push('/content-for-normaluser');
                    } else if (response.data.state == '600'){
                        alert('没有找到数据');
                    }
                }
                else {
                    // fortest
                    console.log('jjjj');
                    alert("出现错误")
                }
            })
        },
        CheckUsernameWhetherTooLong(){
            this.ErrorFlagUsernameTooLong = this.username.length>10;

            // fortest
            console.log("test")
        },
        CheckUsernameFormat(){
            this.ErrorFlagUsernameFormatWrong = !this.regExpUsername.test(this.username);
        },
        CheckUsernameNull(){
            this.ErrorFlagUsernameNull = this.username== '';
        },
        CheckPasswordWhetherTooShort(){
            let passwordLength = this.password.length;
            this.ErrorFlagPasswordTooShort = passwordLength>0 && passwordLength<6;
        },
        CheckPasswordWhetherTooLong(){
            this.ErrorFlagPasswordTooLong = this.password.length > 10;
        },
        CheckPasswordFormat(){
            this.ErrorFlagPasswordFormatWrong = !this.regExpPassword.test(this.password);
        },
        CheckPasswordNull(){
            this.ErrorFlagPasswordNull = this.password == '';
        },
        CheckUsertypeWhetherSelected(){
            this.ErrorFlagUsertypeNotSelect = this.usertype == '';
        }

    },
    watch: {
        username(){
            this.CheckUsernameWhetherTooLong();
            this.CheckUsernameFormat();
            this.CheckUsernameNull();
        },
        password(){
            this.CheckPasswordWhetherTooShort();
            this.CheckPasswordWhetherTooLong();
            this.CheckPasswordFormat();
            this.CheckPasswordNull();
        }
    }

}
</script>
<style>
    .errorMessage{
        color: red;
    }
</style>