<template>
  <div class='h5Pay'>
    <button @click="h5Pay">h5Pay</button>
    <button id="btn" @click="zfbPay">zfbPay</button>
    <button @click="gzhPay">公众号Pay1</button>
    <button id="gzh" @click="onBridgeReady">公众号Pay2</button>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  export default{
    data(){
      return{
        appid: '',
        mch_id: '',
        nonce_str: '',
        prepay_id: '',
        sign: '',
        timeStamp: ''
      }
    },
    props:{

    },
    mounted(){

    },
    methods:{
      // h5pay http://192.168.1.150:8115
      h5Pay() {
        // h5pay
        console.log('ip对象', returnCitySN)
        console.log('ip', returnCitySN["cip"]+','+returnCitySN["cname"])
        this.axios.post('/personally/b2c/order/onPay',this.qs.stringify({

          token: 'df157648ebf6dedfee2d1a9a433675bc',
          order_id: '5356f133ea25426ca3257aaa5b3f10c6',
          ip: returnCitySN["cip"],
          payId: 6,

        }))
          .then((response) => {

            let url = response.data.data.weiXin.mweb_url

            console.log('后台h5Pay111数据', response.data)

            window.location = url

          })
          .catch((error) => {
            console.log('错误信息', error)
          })
      },
      // 支付宝pay
      zfbPay() {
        this.axios.post('/personally/b2c/order/onPayZFB',this.qs.stringify({

          order_id: '5356f133ea25426ca3257aaa5b3f10c6',

          payId: 4,

        }))
          .then((response) => {

            console.log('后台zfbPay数据', response.data)

            $('#btn').html(response.data)

          })
          .catch((error) => {
            console.log('错误信息', error)
          })
      },
      // 公众号pay
      gzhPay() {
        this.axios.post('http://192.168.1.161:8115/personally/b2c/order/onPay',this.qs.stringify({

          token: '8410f4b0188cd0a80ccb1725e83da7dc',

          ip: returnCitySN["cip"],

          order_id: 'be6cdc175c614e9f97b63f534a103686',

          payId: 8,

        }))
          .then((response) => {

            let data = response.data.data

            console.log('后台gzhPay数据', response.data)

            this.appid = data.weiXin.appid

            this.timeStamp = data.weiXin.timeStamp

            this.nonce_str = data.weiXin.nonce_str

            this.prepay_id = "prepay_id=" + data.weiXin.prepay_id

            this.sign = md5(data.weiXin.paySign)  // 需要MD5加密

            console.log('this.sign', this.sign)

            this.onBridgeReady(this.appid, this.timeStamp, this.nonce_str, this.prepay_id, this.sign)

          })
          .catch((error) => {
            console.log('错误信息', error)
          })
      },
      onBridgeReady(appId, timeStamp, nonceStr, prepay_id, paySign){
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": appId,     //公众号名称，由商户传入
            "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr": nonceStr, //随机串
            "package": prepay_id,
            "signType":"MD5",         //微信签名方式：
            "paySign": paySign //微信签名
          },
          function(res){
            if(res.err_msg === "get_brand_wcpay_request:ok" ) {}    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          }
        );
      },

    },
  }
</script>
<style scoped>

</style>
