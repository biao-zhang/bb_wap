<template>
  <section class="container">
    <div>
      <div style="line-height: 1rem;font-size:0.5rem;text-align: center">nuxt</div>
      <div style="line-height: 1rem;margin-top:1rem;text-align: center">{{d}}</div>
    </div>
  </section>
</template>
<script>

  import Vue from 'vue'
  import axios from 'axios'
  import qs from 'qs'
  Vue.config.productionTip = false
  Vue.prototype.axios = axios;
  Vue.prototype.qs = qs;

export default {
  data(){
    return{
      d:2
    }
  },
  asyncData ({ params }) {
    return axios.get("http://jtxyapp.doers.cn/wap/wx/countryNumber")
      .then((res) => {
      console.log(res)
        return { d: res.data[1].regionName }
      })
  },
  head() {
    return {
      title: 'niceCattle',
      script: [
        { src: './js/conform.js' }
      ],
      link: [
        {href: './css/reset.css',rel: 'stylesheet'},
      ]
    }
  }
}

</script>

<style>

</style>
