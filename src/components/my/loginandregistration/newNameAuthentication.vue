<template>
  <div class='newNameAuthentication'>
    <xHeader :msg="tit"></xHeader>
    <div class="centent">
      <!--上半部分-->
      <div class="one_top">
        <!--真实姓名-->
        <div class="box">
          <span class="name1">真实姓名</span>
          <input type="text" placeholder="请输入姓名" class="input1" v-model="realName"/>
        </div>
        <!--身份证号-->
        <div class="box">
          <span class="name1">身份证号</span>
          <input type="text" placeholder="请输入身份证号" class="input1" v-model="idNum"/>
        </div>
        <!--银行卡号-->
        <div class="box">
          <span class="name1">银行卡号</span>
          <input type="text" placeholder="请输入银行卡号" class="input1" v-model="creditCardNumbers"/>
        </div>
      </div>
      <!--下半部分-->
      <div class="one_bottom">
        <!--预留手机号-->
        <div class="line">
          <span class="s1">预留手机</span>
          <input class="input1" type="text" placeholder="请输入银行预留手机号" v-model="bankPhone"/>
          <span class="s2">
            <span v-if="!sendMsgDisabled" @click="send">获取验证码</span>
            <span class="hs" v-if="sendMsgDisabled">{{time}}秒后重新获取</span>
          </span>
        </div>
        <!--验证码-->
        <div class="box">
          <span class="name1">验证码</span>
          <input type="text" placeholder="请输入验证码" class="input1" v-model="verificationCode"/>
        </div>
      </div>
      <!--按钮-->
      <div class="button" @click="nextStep" v-if="chineseName == true && idNum1 == true && bankCard1 == true && phone ==true && verificationCode != ''">提交</div>
      <div class="button disabled" v-else>提交</div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from "@/components/my/common/xHeader"
  import {chineseName , idNumber , bankCard , checkPhone} from '@/untils/untils'
  import { nameAuthentication , submitNameAuthentication } from "@/api/personally";
  export default{
    data(){
      return{
        tit:'实名认证',
        sendMsgDisabled:false,
        time:60,

        realName:'', //真实姓名
        idNum:'', //身份证号
        creditCardNumbers:'',  //银行卡号
        bankPhone:'', //预留手机号
        verificationCode:'',   //验证码

        chineseName:false,   //时时验证姓名
        idNum1:false,     //验证身份证号
        bankCard1:false,     //银行卡认证
        phone:false,         //时时验证手机号

        tranceNum:'',       //短信接口返回的流水号（提交接口需要使用）
      }
    },
    components:{xHeader},
    watch:{
      //姓名认证
      realName(){
        if(chineseName(this.realName) === false){
          this.chineseName = false
        }else {
          this.chineseName = true
        }
      },
      //身份证号认证
      idNum(){
        if(idNumber(this.idNum) === false){
          this.idNum1 = false
        }else {
          this.idNum1 = true
        }
      },
      //银行卡号认证
      creditCardNumbers(){
        if(bankCard(this.creditCardNumbers) === false){
          this.bankCard1 = false
        }else {
          this.bankCard1 = true
        }
      },
      //手机号认证
      bankPhone(){
        if(checkPhone(this.bankPhone).state === false){
          this.phone = false
        }else {
          this.phone = true
        }
      }
    },
    props:{

    },
    mounted(){

    },
    methods:{
      //获取验证码
      send(){
        let me = this;
        var that = this
        if(chineseName(this.realName) === false){
          this.$store.state.toastText='请输入正确姓名'
          this.$store.state.toastType='text'
          return false
        }else if(idNumber(this.idNum) === false){
          this.$store.state.toastText='请输入正确的身份证号'
          this.$store.state.toastType='text'
          return false
        }else if(bankCard(this.creditCardNumbers) === false){
          this.$store.state.toastText='请输入正确的银行卡号'
          this.$store.state.toastType='text'
          return false
        }else if(checkPhone(this.bankPhone).state === false){
          this.$store.state.toastText='请输入正确的手机号'
          this.$store.state.toastType='text'
          return false
        }
        nameAuthentication({realName:this.realName,idNum:this.idNum,cardNum:this.creditCardNumbers,bankPhone:this.bankPhone}).then(res => {
          console.log('获取验证码等信息',res)
          if (res.message == 'success') {
            // 倒计时
            me.sendMsgDisabled = true;
            let interval = window.setInterval(function() {
              if ((me.time--) <= 0) {
                me.time = 60;
                me.sendMsgDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
            that.$store.state.toastText='验证码已发送'
            that.$store.state.toastType='success'
            that.tranceNum = res.data.tranceNum
          } else {
            that.$store.state.toastText=res.message
            that.$store.state.toastType='warn'
          }
        })
      },
      //提交实名认证
      nextStep(){
        submitNameAuthentication({tranceNum:this.tranceNum,phone:this.bankPhone,verificationCode:this.verificationCode,cardNum:this.creditCardNumbers}).then(res => {
          console.log('获取认证信息',res)
          if (res.message == 'success') {
            this.$store.state.toastText='实名认证成功'
            this.$store.state.toastType='text'
            this.$router.go(-1);
          } else {
            this.$store.state.toastText=res.message
            this.$store.state.toastType='warn'
          }
        })
      }
    },
  }
</script>
<style scoped>
  .centent{padding-top:46px;}
  .one_top{background:#fff;width:100%;margin-top:0.16rem;}
  .one_bottom{background:#fff;width:100%;margin-top:0.6rem;}

  .box {height: 1rem;width: 100%;padding: 0 0.3rem;box-sizing: border-box; border-bottom: 1px solid #f5f5f5;display:flex;}
  .box .name1 {display: inline-block; vertical-align: middle;line-height: 1rem;font-size: 0.3rem;color:#333333;width:1.5rem;}
  .box .input1 {flex:1; text-align: right;line-height: 0.5rem;font-size: 0.3rem;color:#333333;}

  .line{height: 1rem;line-height: 1rem;background:#fff;padding:0 0.3rem;display:flex;border-bottom: 1px solid #f5f5f5;}
  .line .s1{width:4rem;color:#333333;font-size:0.3rem;}
  .line input{width:3rem;color:#333333;font-size:0.3rem;}
  .line .s2{width:6rem;color:#f86e0e;font-size:0.3rem;text-align:center;}

  .button{width:6.8rem;margin:0.8rem auto;line-height: 0.8rem;background-color: #f86e0e;text-align: center;color: white;font-size: 0.32rem;border-radius: 0.02rem;}
  .disabled{disabled:disabled;background:#f6b17e;color:#fafbfb;}
</style>
