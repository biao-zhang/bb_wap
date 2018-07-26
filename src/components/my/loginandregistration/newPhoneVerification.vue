<template>
  <div class='newPhoneVerification'>
    <xHeader @titleBack="titleBack" :msg="tit" ></xHeader>
    <div class="content">
      <p class="wenzi">为保证账户安全，需验证一下您的手机号</p>
      <p class="phone">手机号：{{phone}}</p>
      <div class="line">
        <span class="s1">验证码：</span>
        <input class="input1" type="text" v-model="yzm" placeholder="短信验证码"/>
        <span @click="send" class="s2"><span v-if="!sendMsgDisabled">获取验证码</span><span class="hs" v-if="sendMsgDisabled">{{time}}后重新获取</span> </span>
      </div>
      <div class="button" v-if="yzm != ''" @click="nextStep">确定</div>
      <div class="button disabled" v-else>确定</div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from "@/components/my/common/newPhoneVerificationHeader"
  import { getPhone , getAuthcode } from "@/api/personally"

  import { oldDataCode , oldDataSubmit } from "@/api/personally";
  export default{
    data(){
      return{
        tit:'验证手机',
        yzm:'',
        time:60,
        sendMsgDisabled:false,
        phone:'',
        backtrack:''
      }
    },
    components:{xHeader},
    props:{

    },
    mounted(){
      if(this.$route.query.phone!==undefined){
        this.phone = this.$route.query.phone;
      }
      if(this.$route.query.backtrack!==undefined){
        this.backtrack = this.$route.query.backtrack;
      }
    },
    methods:{
      send(){
        var that = this
        oldDataCode({}).then( res => {
          console.log('获取验证码结果', res)
          if(res.message == 'success'){
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
            that.$store.state.toastText= res.message
            that.$store.state.toastType='warn'
          }
        })
      },
      nextStep(){
        var that = this
        oldDataSubmit({verificationCode:this.yzm,terminalType:'wap'}).then( res => {
          console.log('提交旧数据结果', res)
          if(res.message == 'success'){
            that.$store.state.toastText='验证成功'
            that.$store.state.toastType='success'
            if(that.backtrack == 1){
              that.$router.push({path:'/my/persionDatailMsg'})
            }else if(that.backtrack == 2){
              that.$router.go(-1);
            }
          }else {
            that.$store.state.toastText= res.message
            that.$store.state.toastType='warn'
          }
        })
      },
      titleBack(){
        console.log(123456)
        if(this.backtrack == 1){
          this.$router.push({path:'/my/persionDatailMsg'})
        }else if(this.backtrack == 2){
          this.$router.go(-2);
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
