<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
//  const official = require('http://res.wx.qq.com/open/js/jweixin-1.2.0.js')
//  import official from 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
  const SHA2 = require('@/assets/js/shaEncode.js')

  export default{
    name:'init',
    data(){
      return{
        appId:'wx070f1e1cb0797cbd', //奈斯牛appid
        timestamp:new Date().getTime(), //生成时间戳
        nonce:'DiezASFKolejsDmF', //随机
        tick:'HoagFKDcsGMVCIY2vOjf9iSsdwAYkPX-Jz2zi8Fh2KCqwIt-jbfzk9KPs1FoERT_YfhZsWK43p-z0F32hKdotA',
        configUrl:'http://www.donghengwangluo.com/wx.html',
      }
    },
    computed:{
      lTicket:function () {
        return 'jsapi_ticket='+this.tick+'&noncestr='+this.nonce+'&timestamp='+this.timestamp+'&url='+this.configUrl;
      },
    },
    mounted(){
      this.init();
      console.log(wx)
    },
    methods:{
      init(){
        wx.config({
          debug: true, // 开启调试模式。
          appId: this.appId, // 必填，公众号的唯一标识
          timestamp:this.timestamp, // 必填，生成签名的时间戳
          nonceStr: this.nonce, // 必填，生成签名的随机串
          signature: SHA2(this.lTicket),// 必填，签名
          jsApiList: ['chooseImage','startRecord','stopRecord','translateVoice'] // 必填，需要使用的JS接口列表
        });
      },
    },
  }
</script>
