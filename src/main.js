import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// proto
import awesome from './proto/awesome_pb.js'

// 掛載為全局 也可以按需引用 import awesome from './proto/awesome_pb.js'
Vue.prototype.awesome = awesome
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
