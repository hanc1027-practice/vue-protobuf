import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// proto
import awesome from './proto/awesome_pb.js'

// 掛載為全局 也可以按需引用 import awesome from './proto/awesome_pb.js'
Vue.prototype.awesome = awesome
Vue.config.productionTip = false

// 設定axios
import axios from 'axios'
axios.defaults.baseURL="http://localhost:3000"
// Vue.prototype.$ajax = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
