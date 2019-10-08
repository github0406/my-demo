import Vue from 'vue'
import App from './App.vue'
// 导入element-ui 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
// 导入axios
import axios from 'axios'
// 引入style/indexedDB.less
import '@/style/index.less'
// 在vue的原型上挂载一个HTTP属性，所有的vue实例都能继承这个属性
Vue.prototype.$http = axios
// 这是给vue安装elementui插件
Vue.use(ElementUI)
// 控台提示信息  开发环境信息提示  详细一些
Vue.config.productionTip = false
// 根实例
new Vue({
  // 将router挂载到vue根实例中
  router,
  render: h => h(App)
}).$mount('#app')
