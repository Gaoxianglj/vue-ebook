<template>
  <div class="register-wrap" >
   <a v-if="success">注册成功 3s后自动跳转登陆页面</a>
  </div>
</template>

<script>

import { AccessMail } from '@/api/store'

export default {
  name: 'MailAccess',
  data: function () {
    return {
      success: false
    }
  },
  methods: {
    AccessMail () {
      console.log('进入')
      this.success = false
      const getUrl = window.location.href
      const getGyInfo = getUrl.split('?')[2] // qycode=1001&qyname=%E4%BC%81%E4%B8%9A%E5%BF%99   截取到参数部分
      const getRul = new URLSearchParams('?' + getGyInfo) // 将参数放在URLSearchParams函数中
      console.log('getRUL:' + getRul)
      const code = getRul.get('code') // 1001
      console.log('code' + code)
      AccessMail(code).then(response => {
        console.log('返回值' + response)
        if (response.status === 200 && response.data.result) {
          this.success = true
          setTimeout(() => {
            this.$router.push({
              path: '/store/login'
            })
          }, 3000)
        }
      })
    }
  },
  created: function () {
    // 在页面初始化时调用initData方法
    this.AccessMail()
  }
}
</script>

<style scoped>
.register-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

</style>
