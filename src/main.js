/*
 * @Author: your name
 * @Date: 2020-03-28 20:40:55
 * @LastEditTime: 2020-03-28 22:28:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wh_mapping\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

import less from 'less'
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
import qs from 'qs'


Vue.use(iView)

Vue.use(Vuex)
Vue.use(less)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
const store = new Vuex.Store({
  state:{
    isLogin:false
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
