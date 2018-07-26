import axios from 'axios'
axios.defaults.timeout = 10000
import qs from 'qs'
import store from '@/store/index'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
// let store = new vux;
export default {
  fetchGet (url, params = {}) {
    params.terminalType='wap'
    params = qs.stringify(params);
    return new Promise((resolve, reject) => {
      axios.get(url, {params}).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    params.terminalType='wap'
    params = qs.stringify(params);
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        store.state.toastText='系统异常'
        store.state.toastType='text'
        reject(error)
      })
    })
  }
}
