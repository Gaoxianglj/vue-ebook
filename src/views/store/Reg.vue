<template>
  <div class="register-wrap">
    <form class="register-container">
      <h1 class="title">用户注册：</h1>
      <form>
        <input class="input-field" type="email" placeholder="邮箱" v-model="email" autocomplete="off">
      </form>
      <form>
        <input class="input-field" type="password" placeholder="密码" v-model="password" autocomplete="off">
      </form>
      <form>
        <input class="input-field" type="password" placeholder="确认密码" v-model="confirmPassword" autocomplete="off">
      </form>
      <form>
        <button type="primary" @click="doRegister" style="width: 100%;">注册</button>
        <button type="primary" @click="toLogin" style="width: 100%;">登录</button>
      </form>
    </form>
  </div>
</template>

<script>
import { register } from '@/api/store'

export default {
  name: 'Register',
  data: function () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    doRegister: function () {
      const email = this.email
      const password = this.password
      const confirmPassword = this.confirmPassword
      console.log('email=%s, password=%s, confirmPassword=%s', email, password, confirmPassword)
      if (!email || !password || !confirmPassword) {
        alert('请填写完整信息')
        return
      }
      if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)) {
        alert('邮箱格式不正确')
        return
      }
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
        alert('密码不符合要求：必须包含大小写字母和数字，长度至少为8')
        return
      }
      if (password !== confirmPassword) {
        alert('两次输入的密码不一致')
        return
      }
      register(email, password).then(response => {
        console.log('返回值' + response)
        if (response.status === 200 && response.data.result) {
          alert('请注意接收邮件，并点击邮件中的激活按钮进行账户激活，在未激活状态下无法进行登录')
          this.$router.push({
            path: '/store/login'
          })
        } else {
          alert('注册失败')
        }
      })
    },
    toLogin: function () {
      this.$router.push('/store/login')
    }
  }
}

</script>
<style scoped>
.register-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-image:url("~@/assets/background.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.input-field {
  outline-style: none ;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 10px 12px 5px 12px;
  font-size: 13px;
  height: 20%;
  width: 100%;
  max-width: 500px;
}

.register-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: rgba(255,255,255,0.6);
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.title {
  font-size: 25px;
  margin: 0px auto 15px auto;
  text-align: center;
  color: #505458;
}
</style>
