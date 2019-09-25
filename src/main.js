import Vue from 'vue'
import App from './App.vue'

// 控台提示信息  开发环境信息提示  详细一些
Vue.config.productionTip = false
// 根实例
new Vue({
  render: h => h(App)
}).$mount('#app')
