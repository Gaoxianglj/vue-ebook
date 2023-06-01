import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import '@/assets/styles/global.scss'
import '@/assets/styles/fonts/icon.css'
import '@/assets/styles/fonts.css'
// ASK 标记，下行mock是使用本地数据
// import '@/mock'
import './utils/boost'
import './utils/create-api'
import Axios from 'axios'
// import Axios from 'axios'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

Axios.interceptors.request.use(config => {
  if (config.push === '/') {
  } else {
    if (localStorage.getItem('Authorization')) {
      // 在请求头加入token，名字要和后端接收请求头的token名字一样
      config.headers.contentType = 'application/json'
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
  }
  return config
},
error => {
  return Promise.reject(error)
})
// 响应回来token是否过期
Axios.interceptors.response.use(response => {
  console.log('响应回来：' + response.status)
  // 和后端token失效返回码约定400
  if (response.status === 401) {
    // 引用elementui message提示框
    // 清除token
    localStorage.removeItem('Authorization')
    // 跳转
    router.push({ name: '/store/login' })
  } else {
    return response
  }
},
error => {
  return Promise.reject(error)
})
