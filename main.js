import Vue from 'vue'
import App from './App'
import {showModal} from './utils/tool.js'
import request from './utils/request.js'


Vue.config.productionTip = false
Vue.prototype.showToast=showModal
Vue.prototype.$http=request

App.mpType = 'app'

Vue.directive('enterNumber', { //全局方法  限制input输入框只能输入纯数字 组件中调用如（<el-input v-enter-number v-model="number" ></el-input>）
  inserted: function(el) {
    el.addEventListener("keypress", function(e) {
      e = e || window.event;
      let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
    });
  }
});

const app = new Vue({
    ...App
})
app.$mount()
