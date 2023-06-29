import App from './App'
import uView from "uview-ui";
Vue.use(uView);

import http from "utils/http.js"
import tip from "utils/tip.js"
import baseUrl from "utils/config.js"
import music from 'utils/music.js'
Vue.prototype.$music = music
Vue.prototype.$http = http
Vue.prototype.$tip = tip
Vue.prototype.$baseUrl = baseUrl

// #ifdef H5
// import './router/index';
// #endif

// import './router/lanjie.js';

import share from "utils/share.js"
Vue.mixin(share)

// 全局挂载常用方法
import $ from '@/common/fun.js';
Vue.prototype.$ = $;


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif