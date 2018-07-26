<template>
  <div class='forgetPaymentPaw'>
    <xHeader :msg="tit"></xHeader>
    <div class="content">
      <p class="wenzi" v-if="wenzi">您绑定的手机号码为：</p>
      <p class="wenzi" v-else>我们已将发送了验证码到您绑定的手机</p>
      <p class="phone">{{phone}}</p>
      <div class="line">
        <span class="s1">验证码：</span>
        <input class="input1" type="text" v-model="yzm" placeholder="短信验证码"/>
        <span @click="send" class="s2"><span v-if="!sendMsgDisabled">获取验证码</span><span class="hs" v-if="sendMsgDisabled">{{time}}后重新获取</span> </span>
      </div>
      <div class="button" v-if="yzm != ''" @click="nextStep">下一步</div>
      <div class="button disabled" v-else>下一步</div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from "@/components/my/common/xHeader"
  import { getPhone , getAuthcode } from "@/api/personally"
  export default{
    data(){
      return{
        phone:'',
        tit:'忘记支付密码',
        yzm:'',
        wenzi:true,
        time:60,
        sendMsgDisabled:false,
        getYzm:'', //得到验证码
      }
    },
    components:{xHeader},
    props:{

    },
    mounted(){
      getPhone({}).then( res => {
        console.log('获取手机号结果', res)
        if(res.message == 'success'){
          this.phone = res.data.phone
          this.state = res.data.payPasswordStatus
        }else {

        }
      })
    },
    methods:{
      send(){
        getAuthcode({phone:this.phone,type:3}).then( res => {
          console.log('获取验证码结果', res)
          if(res.message == 'success'){
            this.getYzm = res.data
            // 倒计时
            let me = this;
            me.sendMsgDisabled = true;
            let interval = window.setInterval(function() {
              if ((me.time--) <= 0) {
                me.time = 60;
                me.sendMsgDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
            this.wenzi = false
          }else {

          }
        })
      },
      nextStep(){
        if(this.yzm != this.getYzm){
          this.$store.state.toastText='验证码错误'
          this.$store.state.toastType='warn'
          return false
        }else {
          this.$router.push({path: '/x/changePwd',query:{isChange:2,wangji:1}})
        }
      }
    },
  }
</script>
<style scoped>
  .content{padding-top:46px;margin-top:0.3rem;}
  .content .wenzi{text-align:center;line-height:0.7rem;color:#333333;font-size:0.26rem;}
  .content .phone{text-align:center;line-height:0.7rem;color:#333333;font-size:0.36rem;}
  .line{height: 1rem;line-height: 1rem;background:#fff;padding:0 0.35rem;display:flex;margin-top:0.5rem;}
  .line .s1{width:1.8rem;color:#333333;font-size:0.3rem;}
  .line input{width:3.5rem;color:#333333;font-size:0.3rem;}
  .line .s2{width:3rem;padding-left:0.1rem;color:#f86e0e;font-size:0.3rem;text-align:center;}
  .hs{color:#f86e0e;font-size:0.3rem;}

  .button{width:6.8rem;margin:0.8rem auto;line-height: 0.8rem;background-color: #f86e0e;text-align: center;color: white;font-size: 0.32rem;border-radius: 0.02rem;}
  .disabled{disabled:disabled;background:#f6b17e;color:#fafbfb;}
</style>
