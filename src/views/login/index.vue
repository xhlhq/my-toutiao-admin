<template>
  <div class="login-index">
       <!--
           1.表单验证 :model要绑定要验证的内容
           验证的内容上药添加prop属性
           rules是表单验证的规则
           2.手动触发表单验证：ref起名
           通过$refs的validate进行验证
       -->
    <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
        <el-form-item prop="mobile">
            <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="isAgree">
            <el-checkbox v-model="user.isAgree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :loading="loginLoading" class="login-btn" @click="onLogin">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { requestLogin } from '@/api/user'
export default {
  name:'LoginIndex',
  data() {
      return {
        user: {
          mobile: '13922222222',
          code: '246810',
          isAgree: true 
        },
        //checked: false,
        loginLoading: false,
        formRules: {
            mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '验证码不能为空', trigger: 'blur' },
            { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
          ],
          isAgree: [
              { 
              //自定义校验规则
              //验证成功：callback()
              //验证失败：callback(new Error('错误信息'))
              validator: (rule, value, callback) => {
                  if(value){
                      callback()
                  }else{
                      callback(new Error('请勾选同意用户协议'))
                  }
              }, 
            trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      onLogin() {
        //表单验证(异步)
        this.$refs['login-form'].validate((valid,err) => {
            //如果代码验证失败，停止提交
            if(!valid){
                return
            }
            //成功，登录
            this.login()
        })
        //处理后端响应结果
      },
      login(){
          //验证通过，提交登录
        this.loginLoading = true
        requestLogin(this.user).then(res => {
            console.log(res)
            this.$message({
            message: '登录成功',
            type: 'success'
            })
            this.loginLoading = false

            //将接口返回的数据保存到本地，以备之后使用，但本地存储只能保存字符串，所有要把数据转换为字符串
            window.localStorage.setItem('user',JSON.stringify(res.data.data))

            //跳转到首页
            //this.$router.push('/')
            this.$router.push({
                name:'home'
            })
        }).catch(err => {
            console.log('登录失败',err)
            this.$message.error('登陆失败，请查看手机号码或验证码是否输入正确')
            this.loginLoading = false
        })
      }
    }
}
</script>

<style scoped lang="less">
.login-index {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    background: url(./login_bg.jpg) no-repeat;
    background-size: cover;
    .login-form {
        background-color: #fff;
        padding: 50px;
        min-width: 300px;
        .login-btn {
            width: 100%;
        }
    }
}
</style>