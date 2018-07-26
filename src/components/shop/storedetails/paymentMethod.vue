<template>
  <div class="paymentmethod">
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--支付方式-->
    <ul class="paymentlist">
      <li class="li" @click="banlance" v-if="settlementType">
        <div class="div">
          <img src="../img/payment2.png" alt="">
        </div>
        <p class="p">余额支付</p>
      </li>
      <li class="li" v-if="zfb" @click="zfbPay">
        <div class="div">
          <img src="../img/payment3.png" alt="">
        </div>
        <p class="p">支付宝支付</p>
        <div id="zfb"></div>
      </li>
      <li class="li" @click="wxPay">
        <div class="div">
          <img src="../img/payment6.png" alt="">
        </div>
        <p class="p">微信支付</p>
      </li>
    </ul>
    <!--dialog-->
    <div v-if="popass" class="xdialog">
      <x-dialog v-model="showDialogStyle" :dialog-style="{'background-color': 'transparent'}">
        <div class="dialogBox">
          <div class="sureTitel">
            <div v-if="isPWd" class="titlePassword">请输入密码</div>
            <banlance v-if="isPWd" @blur="blur"> </banlance>
            <div v-if="!isPWd" style="font-size: 14px; padding: 0.40rem 0">您还没有设置支付密码，是否前往设置</div>
          </div>
          <div class="sureBtn">
            <div
              class="sureBtnCancel"
              style="border-right: 1px solid #eee"
              @click="sureBtnCancel"
            >取消</div>
            <div class="sureBtnSure"
                 @click="sureBtnSure"
            >{{ isPWd ? '确定' : '去设置'}}</div>
          </div>
        </div>
      </x-dialog>
    </div>
    <!--end-->
  </div>
</template>
<script>
  import xHeader from '@/components/shop/common/xHeader'
  import banlance from './banlance'
  import { XDialog, } from 'vux'
  import { isWeiXin } from "@/untils/untils";

  export default {
    data(){
      return{
        top:"支付方式",
        zfb: true,
        showDialogStyle: false,
        password: '123456',
        orderId: '',
        charge: '',
        // 1 b2c, 2 b2b, 3 o2o, 4 服务, 5 发红包, 6 补单
        settlementType: 1,
        popass: false,
        isPWd: false,
      }
    },
    components:{xHeader,XDialog,banlance},
    mounted() {
      this.orderId = this.$route.query.orderId
      this.settlementType = this.$route.query.settlementType

      isWeiXin() ? this.zfb = false : this.zfb = true

    },
    methods: {
      // 余额
      banlance() {

        this.hasZhifuPwd()

      },
      sureBtnCancel() {
        this.showDialogStyle = false
        this.popass = false
      },
      sureBtnSure() {
        this.showDialogStyle = false
        this.popass = false

        if(this.isPWd) {

          this.$store.commit('setLoading', true)

          setTimeout(() => {

            this.$store.commit('setLoading', false)

          }, 10000)

          this.banlancePay()

        } else {

          this.$router.push('/x/getSms')

        }
      },
      blur(val) {
        this.password = val
      },
      // wx支付
      wxPay() {

        if( isWeiXin() ) {

          console.log('ip对象', returnCitySN)
          console.log('ip', returnCitySN["cip"]+','+returnCitySN["cname"])

          if (this.settlementType == 1) {

            this.axios.post('/personally/b2c/order/onPay',this.qs.stringify({

              order_id: this.orderId,

              ip: returnCitySN["cip"],

              payId: 8,

            }))
              .then((response) => {

                console.log('b2c公众号数据', response.data)

                let data = response.data.data

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

          } else if (this.settlementType == 3) {

            this.axios.post('/personally/o2o/order/onPay',this.qs.stringify({

              order_id: this.orderId,

              ip: returnCitySN["cip"],

              payId: 8,

            }))
              .then((response) => {

                console.log('o2o公众号数据', response.data)

                let data = response.data.data

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

          } else if (this.settlementType == 4) {

            this.axios.post('/service/order/pay/onPay',this.qs.stringify({

              orderId: this.orderId,

              ip: returnCitySN["cip"],

              payId: 8,

            }))
              .then((response) => {

                console.log('order公众号数据', response.data)

                let data = response.data.data

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

          } else if (this.settlementType == 5) {

            this.axios.post('/promotion/member/onPay',this.qs.stringify({

              redId: this.orderId,

              ip: returnCitySN["cip"],

              payId: 8,

            }))
              .then((response) => {

                console.log('发红包公众号数据', response.data)

                let data = response.data.data

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

          } else if (this.settlementType == 6) {

            this.axios.post('/service/order/pay/onPay',this.qs.stringify({

              orderId: this.orderId,

              ip: returnCitySN["cip"],

              payId: 8,

            }))
              .then((response) => {

                console.log('order补单公众号数据', response.data)

                let data = response.data.data

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

          }  else {

            // 充值
            this.axios.post('/personally/userRecharge/onPay',this.qs.stringify({

              reId: this.orderId,

              ip: returnCitySN["cip"],

              payId: 8,

            }))
              .then((response) => {

                console.log('充值公众号数据', response.data)

                let data = response.data.data

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

          }

        } else {

          console.log('ip对象', returnCitySN)
          console.log('ip', returnCitySN["cip"]+','+returnCitySN["cname"])

          if (this.settlementType == 1) {

            this.axios.post('/personally/b2c/order/onPay',this.qs.stringify({

              order_id: this.orderId,

              ip: returnCitySN["cip"],

              payId: 6,

            }))
              .then((response) => {

                console.log('b2c微信数据', response.data)

                let url = response.data.data.weiXin.mweb_url

                window.location = url

              })
              .catch((error) => {

                console.log('错误信息', error)

              })

          } else if (this.settlementType == 3) {

            this.axios.post('/personally/o2o/order/onPay',this.qs.stringify({

              order_id: this.orderId,

              ip: returnCitySN["cip"],

              payId: 6,

            }))
              .then((response) => {

                console.log('o2o微信数据', response.data)

                let url = response.data.data.weiXin.mweb_url

                window.location = url

              })
              .catch((error) => {

                console.log('错误信息', error)

              })

          } else if (this.settlementType == 4) {

            this.axios.post('/service/order/pay/onPay',this.qs.stringify({

              orderId: this.orderId,

              ip: returnCitySN["cip"],

              payId: 6,

            }))
              .then((response) => {

                console.log('order微信数据', response.data)

                let url = response.data.data.weiXin.mweb_url

                window.location = url

              })
              .catch((error) => {

                console.log('错误信息', error)

              })

          } else if (this.settlementType == 5) {

            this.axios.post('/promotion/member/onPay',this.qs.stringify({

              redId: this.orderId,

              ip: returnCitySN["cip"],

              payId: 6,

            }))
              .then((response) => {

                console.log('发红包微信数据', response.data)

                let url = response.data.data.weiXin.mweb_url

                window.location = url

              })
              .catch((error) => {

                console.log('错误信息', error)

              })

          } else if (this.settlementType == 6) {

            this.axios.post('/service/order/pay/onPay',this.qs.stringify({

              orderId: this.orderId,

              ip: returnCitySN["cip"],

              payId: 6,

            }))
              .then((response) => {

                console.log('order补单微信数据', response.data)

                let url = response.data.data.weiXin.mweb_url

                window.location = url

              })
              .catch((error) => {

                console.log('错误信息', error)

              })

          }  else {

            // 充值
            this.axios.post('/personally/userRecharge/onPay',this.qs.stringify({

              reId: this.orderId,

              ip: returnCitySN["cip"],

              payId: 6,

            }))
              .then((response) => {

                console.log('充值微信数据', response.data)

                let url = response.data.data.weiXin.mweb_url

                window.location = url

              })
              .catch((error) => {

                console.log('错误信息', error)

              })

          }

        }

      },
      // 支付宝pay
      zfbPay() {

        if (this.settlementType == 1) {

          this.axios.post('/personally/b2c/order/onPayZFB',this.qs.stringify({

            order_id: this.orderId,

            payId: 4,

          }))
            .then((response) => {

              console.log('b2c支付宝数据', response.data)

              $('#zfb').html(response.data)

            })
            .catch((error) => {

              console.log('错误信息', error)

            })

        } else if (this.settlementType == 3) {

          this.axios.post('/personally/o2o/order/onPayZFB', this.qs.stringify({

            order_id: this.orderId,    // 订单Id

            payId: 4

          }))
            .then((response) => {

              console.log('o2o支付宝数据', response.data)

              $('#zfb').html(response.data)

            })
            .catch((error) => {

              console.log('错误信息', error)

            })

        } else if (this.settlementType == 4) {

          this.axios.post('/service/order/pay/onPayZFB', this.qs.stringify({

            orderId: this.orderId,    // 订单Id

            payId: 4

          }))
            .then((response) => {

              console.log('order支付宝数据', response.data)

              $('#zfb').html(response.data)

            })
            .catch((error) => {

              console.log('错误信息', error)

            })
        } else if (this.settlementType == 5) {

          this.axios.post('/promotion//member/onPayZFB', this.qs.stringify({

            redId: this.orderId,    // 订单Id

            payId: 4

          }))
            .then((response) => {

              console.log('发红包支付宝数据', response.data)

              $('#zfb').html(response.data)

            })
            .catch((error) => {

              console.log('错误信息', error)

            })

        } else if (this.settlementType == 6) {

          this.axios.post('/service/order/pay/onPayZFB', this.qs.stringify({

            orderId: this.orderId,    // 订单Id

            payId: 4

          }))
            .then((response) => {

              console.log('order补单支付宝数据', response.data)

              $('#zfb').html(response.data)

            })
            .catch((error) => {

              console.log('错误信息', error)

            })
        } else {

          // 充值
          this.axios.post('/personally/userRecharge/onPayZFB',this.qs.stringify({

            reId: this.orderId,

            payId: 4,

          }))
            .then((response) => {

              console.log('充值支付宝数据', response.data)

              $('#zfb').html(response.data)

            })
            .catch((error) => {

              console.log('错误信息', error)

            })

        }
      },
      // 余额支付
      banlancePay() {

        let pwd = md5(this.password)

        if (this.settlementType == 1) {

          this.axios.post('/personally/b2c/order/onPay',this.qs.stringify({

            password: pwd,

            order_id: this.orderId,

            payId: 3,

          }))
            .then((response) => {

              this.$store.commit('setLoading', false)

              console.log('b2c余额支付', response.data)

              if (response.data.data.code === '1') {

                this.$router.push({path: '/z/paymentResult', query: {orderId: this.orderId}})

              } else {

                this.$store.commit('setToastText', response.data.data.msg)
                this.$store.commit('setToastType', 'warn')

              }

              console.log('b2c余额支付', response.data)

            })
            .catch((error) => {

              console.log('错误信息', error)

            })

        } else if (this.settlementType == 3) {

          this.axios.post('/personally/o2o/order/onPay', this.qs.stringify({

            password: pwd,      // '123456'

            order_id: this.orderId,    // 订单Id daa7e02d7e7b49a9b254c8490d812889

            payId: 3

          }))
            .then((response) => {

              if (response.data.data.code === '1') {

                this.$router.push({path: '/z/paymentResult', query: {orderId: this.orderId}})

              } else {

                this.$store.commit('setToastText', response.data.data.msg)
                this.$store.commit('setToastType', 'warn')

              }

              console.log('o2o余额支付数据', response.data)

            })
            .catch((error) => {

              console.log('错误信息', error)

            })

        } else if (this.settlementType == 4) {

          this.axios.post('/service/order/pay/onPay', this.qs.stringify({

            password: pwd,      // '123456'

            orderId: this.orderId,    // 订单Id daa7e02d7e7b49a9b254c8490d812889

            payId: 3

          }))
            .then((response) => {

              if (response.data.data.code === '1') {

                this.$router.push({path: '/z/paymentResult', query: {orderId: this.orderId}})

              } else {

                this.$store.commit('setToastText', response.data.data.msg)
                this.$store.commit('setToastType', 'warn')

              }

              console.log('order余额支付数据', response.data)

            })
            .catch((error) => {

              console.log('错误信息', error)

            })

        } else if (this.settlementType == 5) {

          this.axios.post('/promotion/member/onPay', this.qs.stringify({

            password: pwd,      // '123456'

            redId: this.orderId,    // 订单Id daa7e02d7e7b49a9b254c8490d812889

            payId: 3

          }))
            .then((response) => {

              if (response.data.data.code === '1') {

                this.$router.push({path: '/z/paymentResult', query: {id: this.orderId}})

              } else {

                this.$store.commit('setToastText', response.data.data.msg)
                this.$store.commit('setToastType', 'warn')

              }

              console.log('发红包余额支付数据', response.data)

            })
            .catch((error) => {

              console.log('错误信息', error)

            })

        } else if (this.settlementType == 6) {

          this.axios.post('/service/order/pay/onPay', this.qs.stringify({

            password: pwd,      // '123456'

            orderId: this.orderId,    // 订单Id daa7e02d7e7b49a9b254c8490d812889

            payId: 3

          }))
            .then((response) => {

              if (response.data.data.code === '1') {

                this.$router.push({path: '/z/paymentResult', query: {orderId: this.orderId}})

              } else {

                this.$store.commit('setToastText', response.data.data.msg)
                this.$store.commit('setToastType', 'warn')

              }

              console.log('order补单余额支付数据', response.data)

            })
            .catch((error) => {

              console.log('错误信息', error)

            })

        }
      },

      onBridgeReady(appId, timeStamp, nonceStr, prepay_id, paySign){
        // alert(prepay_id);
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

      // 判断用户是否设置了支付密码
      hasZhifuPwd(){

        this.axios.post('/personally/user/selectPayPasswordStatus')

          .then( res =>{

            this.showDialogStyle = true

            this.popass = true

            res.data.data === 1 ? this.isPWd = true : this.isPWd = false

            console.log('是否设置支付密码', res.data)

          })

          .catch((error)=>{

            console.log('错误信息', error)

          })
      },

    }
  }
</script>
<style scoped>
  .paymentlist{
    width:100%;
    padding-top:46px;
    display:flex;
    box-sizing: border-box;

    flex-wrap: wrap;
    border-top:0.02rem solid #eeeeee;
  }
  .paymentlist .li{
    background:#fff;
    /*width:2.48rem;*/
    /*height:2.48rem;*/
    width:33.33%;
    border-bottom:0.02rem solid #eeeeee;
    border-right: 1px solid #eeeeee;
    box-sizing: border-box;
  }
  .paymentlist .li:nth-child(3n){border:0;}
  .paymentlist .li .div>img{
    width:1.2rem;
    height:1.2rem;
    margin-top:0.5rem;
  }
  .paymentlist .li .div{
    text-align:center;
  }
  .paymentlist .li .p{
    text-align:center;
    line-height:0.65rem;
    font-size:0.25rem;
    color:#3c3c3c;
  }

  .dialogBox {
    /*border-radius: 0.20rem;*/
    font-size: 0.34rem;
    background-color: #fff;
  }
  .sureTitel {
    padding: 0.20rem 0;
    text-align: center;
  }
  .sureBtn {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
  }
  .sureBtnCancel,.sureBtnSure {
    padding: 0.35rem 0;
    text-align: center;
    width: 3.25rem;
  }
  .sureBtnSure {
    color: #fff;
    background-color: #f15352;
  }
  .titlePassword {
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 0.20rem;
    margin-bottom: 0.20rem;
  }

  .xdialog >>> .weui-dialog {
    display: block !important;
    top: 30% !important;
  }

</style>
