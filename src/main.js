import Vue from 'vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import 'mpvue-weui/src/style/weui.css';
import App from './App'
import './css/main.css'

import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false
App.mpType = 'app'

// Vue.use(ElementUI)
const app = new Vue(App)
app.$mount()
