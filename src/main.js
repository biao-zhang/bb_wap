// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import multipartUpload from '@/components/common/js/multipartUpload'
import  { LoadingPlugin } from 'vux'
import { Toast } from 'vux'
import VueScroller from "vue-scroller"
import  { ConfirmPlugin } from 'vux'
import 'babel-polyfill'
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.component('toast', Toast)
Vue.use(VueScroller)
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';//"Accept": "application/json"
// axios.defaults.baseURL = 'http://jtxyapp.doers.cn';
// axios.defaults.baseURL = 'http://192.168.1.206:4444';
Vue.config.debug = true;
Vue.prototype.axios = axios;
Vue.prototype.multipartUpload = multipartUpload;
Vue.prototype.qs = qs;

// FastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  template: '<App/>',
  components: { App },
  mounted(){
    // this.$store.commit('axiosAll',{'obj':this})
    // let that = this;
    // setTimeout(function () {
    //   console.log(that.$store.state.getStaticData.jilianDatas);
    // },5000)
  }
})
