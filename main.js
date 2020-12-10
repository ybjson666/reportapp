import Vue from 'vue'
import App from './App'
import {showModal} from './utils/tool.js'
import request from './utils/request.js'


Vue.config.productionTip = false
Vue.prototype.showToast=showModal
Vue.prototype.$http=request

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
