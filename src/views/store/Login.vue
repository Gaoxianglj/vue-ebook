<template>

  <div class="login-wrap">
    <form class="login-container">
      <h1 class="title">用户登录：</h1>
      <form>
          <input class="input-field" type="email" placeholder="邮箱" v-model="email" autocomplete="off">
      </form>
      <form>
        <input class="input-field" type="password" placeholder="用户密码" v-model="password" autocomplete="off">
      </form>
      <form>
        <button type="primary" @click="doLogin" style="width: 100%;">登录</button>
        <button type="primary" @click="toRegister" style="width: 100%;">注册</button>
      </form>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/store'

export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    doLogin: function () {
      const email = this.email
      const password = this.password
      console.log('username=%s,password=%s', email, password)
      login(email, password).then(response => {
        if (response.status === 200 && response.data.result) {
          localStorage.setItem('Authorization', response.data.result.token)

          this.$router.push({
            path: '/store/home'
          })
        }
      })
    },
    toRegister: function () {
      this.$router.push('/store/reg')
    }
  }
}

</script>

<style scoped>
.login-wrap {
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

.login-container {
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
