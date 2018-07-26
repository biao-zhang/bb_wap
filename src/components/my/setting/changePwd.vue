<template>
  <div class='changePwd'>
    <xHeader :msg="tit"></xHeader>
    <div class="content">
      <!--修改支付密码-->
      <div v-if="isChange===0">
        <div class="box">
          <div class="line">
            <span class="s1">旧密码：</span><input class="input1" type="password" v-model="oldpayPwd_0"/>
          </div>
          <div class="line">
            <span class="s1">新密码：</span><input class="input1" type="password" v-model="payPwd_0"/>
          </div>
          <div class="line" style="border:0;">
            <span class="s1">确认密码：</span>
            <input class="input1" :type="eyesType" v-model="confirm_0"/>
            <div>
              <img v-if="eyesState" src="./img/eyes_huise.png" class="eyes" @click="eyesState=!eyesState"/>
              <img v-else="eyesState" src="./img/eyes.png" class="eyes" @click="eyesState=!eyesState" />
            </div>
          </div>
        </div>
        <p class="wangji" style="width: 6.8rem;margin:0 auto;text-align:right;line-height:1rem;">
          <router-link :to="{path: '/x/forgetPaymentPaw'}">
            <span style="color: #9a9a9a;">忘记密码？</span>
          </router-link>
        </p>
        <!--修改支付密码按钮-->
        <div class="button" style="margin: 0 auto;" v-if="isChange==0 && oldpayPwd_0 != '' && payPwd_0 != '' && confirm_0 != ''" @click="modificationPayment">修改保存</div>
        <div class="button disabled" style="margin: 0 auto;" v-else>修改保存</div>
      </div>
      <!--<div class="forgetPwd" v-if="isChange===0">忘记密码?</div>-->


      <!--修改密码-->
      <div v-if="isChange===1">
        <div class="box">
          <div class="line">
            <span class="s1">旧密码：</span><input class="input1" type="password" v-model="oldPasw_1"/>
          </div>
          <div class="line">
            <span class="s1">新密码：</span><input class="input1" type="password" v-model="newPasw_1"/>
          </div>
          <div class="line" style="border:0;">
            <span class="s1">确认密码：</span>
            <input class="input1" :type="eyesType" v-model="affirmPasw_1"/>
            <div>
              <img v-if="eyesState" src="./img/eyes_huise.png" class="eyes" @click="eyesState=!eyesState"/>
              <img v-else="eyesState" src="./img/eyes.png" class="eyes" @click="eyesState=!eyesState" />
            </div>
          </div>
        </div>
        <!--修改密码按钮-->
        <div class="button" v-if="isChange==1 && oldPasw_1 != '' && newPasw_1 != '' && affirmPasw_1 != ''" @click="changePassword">修改保存</div>
        <div class="button disabled" v-else>修改保存</div>
      </div>



      <!--设置支付密码-->
      <div v-if="isChange===2">
        <div class="box">
          <div class="line">
            <span class="s1">支付密码：</span><input class="input1" type="password" v-model="paymentPsw_2"/>
          </div>
          <div class="line" style="border:0;">
            <span class="s1">确认密码：</span>
            <input class="input1" :type="eyesType" v-model="affirmPsw_2"/>
            <div>
              <img v-if="eyesState" src="./img/eyes_huise.png" class="eyes" @click="eyesState=!eyesState"/>
              <img v-else="eyesState" src="./img/eyes.png" class="eyes" @click="eyesState=!eyesState" />
            </div>
          </div>
        </div>
        <div class="button" v-if="isChange==2 && paymentPsw_2 != '' && affirmPsw_2 != ''" @click="paymentCode">设置保存</div>
        <div class="button disabled" v-else>设置保存</div>
      </div>



      <!--忘记密码-->
      <div v-if="isChange===3">
        <div class="box">
          <div class="line">
            <span class="s1">手机号：</span><input class="input1" type="number" v-model="phone_3"/>
          </div>
          <div class="line">
            <span class="s1">验证码：</span><input class="input1" type="text" v-model="yzm_3" style="width:2rem;" /><span class="s2"><span v-if="!sendMsgDisabled" @click="send">获取验证码</span><span class="hs" v-if="sendMsgDisabled">{{time}}后重新获取</span> </span>
          </div>
          <div class="line" style="border:0;">
            <span class="s1">新密码：</span>
            <input class="input1" :type="eyesType" v-model="pasw_3" />
            <div>
              <img v-if="eyesState" src="./img/eyes_huise.png" class="eyes" @click="eyesState=!eyesState"/>
              <img v-else="eyesState" src="./img/eyes.png" class="eyes" @click="eyesState=!eyesState" />
            </div>
          </div>
        </div>
        <!--忘记密码按钮-->
        <div class="button" v-if="isChange==3 && phone_3 != '' && yzm_3 != '' && pasw_3 != ''" @click="forgetPasw">确定</div>
        <div class="button disabled" v-else>确定</div>
        <div>
          <confirm
            v-model="show_3"
            :show-cancel-button="false"
            @on-confirm="onConfirm"
            :title="title">
            <p style="text-align:center;">修改成功,前往登录</p>
          </confirm>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  /**
   * @props
   * @emit
   * @router   isChange:     isChange      0:修改支付密码  1:修改密码  2:设置支付密码  3:找回密码
   */
  import xHeader from "@/components/my/common/xHeader"
  import { Confirm, } from 'vux'
  import {checkPhone , isPaymentStr , isPasswordLen , isPasswordStr} from '@/untils/untils'
  import { getCode, forgetPassword ,changeLoginPassword , setPaymentPsw , changePaymentPsw , forgetPaymentPsw} from "@/api/personally"
  export default{

    data(){
      return{
//        tit:'支付/找回/修改密码、支付密码',
//        isChange:0,
        eyesState:true,
        time:60,
        sendMsgDisabled:false,
        title:'恭喜',
        //修改密码
        oldPasw_1:'',
        newPasw_1:'',
        affirmPasw_1:'',

        //忘记密码
        phone_3:'',
        yzm_3:'',
        pasw_3:'',
        getYzm:'', //忘记密码获取的验证码
        show_3:false, //忘记密码获取的验证码
        //设置支付密码
        paymentPsw_2:'',
        affirmPsw_2:'',
        //修改支付密码
        oldpayPwd_0:'',
        payPwd_0:'',
        confirm_0:'',

        wangji:''

      }
    },
    components:{xHeader, Confirm},
    computed:{
      eyesType(){
        return this.eyesState?'password':'text'
      },
      tit(){
        if(this.isChange===0){
          return '修改支付密码'
        }else if(this.isChange===1){
          return '修改密码'
        }else if(this.isChange===2){
          return '设置支付密码'
        }else if(this.isChange===3){
          return '忘记密码'
        }
      },
      isChange(){
        if(this.$route.query.isChange===undefined){
          return 0;
        }else{
          return parseInt(this.$route.query.isChange)
        }
      }
    },
    props:{

    },
    created(){

    },
    mounted(){
      if(this.$route.query.wangji!=undefined){
        this.wangji = this.$route.query.wangji
      }
    },
    methods:{
      //      获取
      getCookie (name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
    },
  //     删除
      delCookie (name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=this.getCookie(name);
    if(cval!=null)
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    },

      send(){
        //获取验证码
        var that = this
        if(checkPhone(this.phone_3).state == false){
          this.$store.state.toastText='手机号格式错误'
          this.$store.state.toastType='warn'
          return false
        }else {
          getCode({phone: this.phone_3,type:2}).then( res => {
              console.log('验证码', res)
              this.getYzm = res.data
            })
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
        }
      },
      //修改密碼
      changePassword(){
        var that = this
        var oldPwd = md5(this.oldPasw_1)
        var newpwd = md5(this.newPasw_1)
        var confirm = md5(this.affirmPasw_1)
        if(isPasswordLen(this.oldPasw_1)===false){
          this.$store.state.toastText='密码长度不正确'
          this.$store.state.toastType='warn'
          return false
        }else if(isPasswordStr(this.oldPasw_1)===false){
          this.$store.state.toastText='密码格式不正确'
          this.$store.state.toastType='warn'
          return false
        }else if(isPasswordLen(this.newPasw_1)===false){
          this.$store.state.toastText='密码长度不正确'
          this.$store.state.toastType='warn'
          return false
        }else if(isPasswordStr(this.newPasw_1)===false){
          this.$store.state.toastText='密码格式不正确'
          this.$store.state.toastType='warn'
          return false
        }else if(isPasswordLen(this.affirmPasw_1)===false){
          this.$store.state.toastText='密码长度不正确'
          this.$store.state.toastType='warn'
          return false
        }else if(isPasswordStr(this.affirmPasw_1)===false){
          this.$store.state.toastText='密码格式不正确'
          this.$store.state.toastType='warn'
          return false
        }else if(this.newPasw_1 != this.affirmPasw_1){
          this.$store.state.toastText='两次密码不一致'
          this.$store.state.toastType='warn'
          return false
        }
        changeLoginPassword({oldPwd:oldPwd,newPwd:newpwd,confirm:confirm}).then( res => {
          console.log('修改登录密码结果', res)
          if(res.message == 'success'){
            this.delCookie('session_id')
            this.$store.state.toastText='修改成功，请重新登录'
            this.$store.state.toastType='success'
            this.$router.push({path: '/y/logIn'})
          }else {
            this.$store.state.toastText= res.message
            this.$store.state.toastType='warn'
            return false
          }
        })
      },
      //忘记密码
      forgetPasw(){
        var that = this
        var newpwd = md5(this.pasw_3)
        if(checkPhone(this.phone_3).state == false){
          this.$store.state.toastText='手机号格式错误'
          this.$store.state.toastType='warn'
          return false
        }else if(this.yzm_3 != this.getYzm){
          this.$store.state.toastText='验证码输入错误'
          this.$store.state.toastType='warn'
          return false
        }else if(isPasswordLen(this.pasw_3)===false){
          this.$store.state.toastText='密码长度不正确'
          this.$store.state.toastType='warn'
          return false
        }else if(isPasswordStr(this.pasw_3)===false){
          this.$store.state.toastText='密码格式不正确'
          this.$store.state.toastType='warn'
          return false
        }
        forgetPassword({phone: this.phone_3,code:this.yzm_3,newpwd:newpwd}).then( res => {
          console.log('忘记密码结果', res)
          if(res.message == 'success'){
            this.show_3 = true
          }else {
            this.$store.state.toastText= res.message
            this.$store.state.toastType='warn'
            return false
          }
        })
      },
      //设置支付密码
      paymentCode(){
        if(this.wangji == ''){
            var paymentPsw_2 = md5(this.paymentPsw_2)
            var affirmPsw_2 = md5(this.affirmPsw_2)
            if(this.paymentPsw_2.length != 6){
              this.$store.state.toastText='密码必须6位纯数字'
              this.$store.state.toastType='warn'
              return false
            }else if(this.affirmPsw_2.length != 6){
              this.$store.state.toastText='密码必须6位纯数字'
              this.$store.state.toastType='warn'
              return false
            }else if(this.paymentPsw_2 != this.affirmPsw_2){
              this.$store.state.toastText='两次密码不一致'
              this.$store.state.toastType='warn'
              return false
            }else if(isPaymentStr(this.paymentPsw_2) == false){
              this.$store.state.toastText='密码格式为纯数字'
              this.$store.state.toastType='warn'
              return false
            }else if(isPaymentStr(this.affirmPsw_2) == false){
              this.$store.state.toastText='密码格式为纯数字'
              this.$store.state.toastType='warn'
              return false
            }else {
              setPaymentPsw({paypwd:paymentPsw_2,confirm:affirmPsw_2}).then( res => {
                console.log('设置支付密码结果', res)
                if(res.message == 'success'){
                  this.$router.push({path: '/x/mySetting'})
                  this.$store.state.toastText= '设置成功'
                  this.$store.state.toastType='success'
                  return false
                }else {
                  this.$router.push({path: '/x/mySetting'})
                  this.$store.state.toastText= res.message
                  this.$store.state.toastType='warn'
                  return false
                }
              })
            }
          }else {
          //忘記支付密碼
          var paymentPsw_2 = md5(this.paymentPsw_2)
          var affirmPsw_2 = md5(this.affirmPsw_2)
          if(this.paymentPsw_2.length != 6){
            this.$store.state.toastText='密码必须6位纯数字'
            this.$store.state.toastType='warn'
            return false
          }else if(this.affirmPsw_2.length != 6){
            this.$store.state.toastText='密码必须6位纯数字'
            this.$store.state.toastType='warn'
            return false
          }else if(this.paymentPsw_2 != this.affirmPsw_2){
            this.$store.state.toastText='两次密码不一致'
            this.$store.state.toastType='warn'
            return false
          }else if(isPaymentStr(this.paymentPsw_2) == false){
            this.$store.state.toastText='密码格式为纯数字'
            this.$store.state.toastType='warn'
            return false
          }else if(isPaymentStr(this.affirmPsw_2) == false){
            this.$store.state.toastText='密码格式为纯数字'
            this.$store.state.toastType='warn'
            return false
          }
          forgetPaymentPsw({confirm: affirmPsw_2,newpwd:paymentPsw_2}).then( res => {
            console.log('忘記密碼結果', res)
            if(res.result == '1'){
              this.$router.push({path: '/x/mySetting'})
              this.$store.state.toastText= '修改成功'
              this.$store.state.toastType='success'
              return false
            }else {
              this.$store.state.toastText= res.message
              this.$store.state.toastType='warn'
              return false
            }
          })
        }
        },





    //修改支付密码
      modificationPayment(){
        console.log(123456)
        var oldpayPwd_0 = md5(this.oldpayPwd_0)
        var payPwd_0 = md5(this.payPwd_0)
        var confirm_0 = md5(this.confirm_0)
        if(this.payPwd_0.length != 6){
          this.$store.state.toastText='密码必须6位纯数字'
          this.$store.state.toastType='warn'
          return false
        }else if(this.confirm_0.length != 6){
          this.$store.state.toastText='密码必须6位纯数字'
          this.$store.state.toastType='warn'
          return false
        }else if(isPaymentStr(this.payPwd_0) == false){
          this.$store.state.toastText= '密码格式为纯数字'
          this.$store.state.toastType='warn'
          return false
        }else if(isPaymentStr(this.confirm_0) == false){
          this.$store.state.toastText= '密码格式为纯数字'
          this.$store.state.toastType='warn'
          return false
        }else if(this.payPwd_0 != this.confirm_0){
          this.$store.state.toastText= '两次密码不一致'
          this.$store.state.toastType='warn'
          return false
        }else {
          changePaymentPsw({oldpayPwd: oldpayPwd_0,payPwd:payPwd_0,confirm:confirm_0}).then( res => {
            console.log('修改支付密码结果', res)
            if(res.message == 'success'){
              this.$router.push({path: '/x/mySetting'})
              this.$store.state.toastText= '修改成功'
              this.$store.state.toastType='success'
              return false
            }else {
              this.$store.state.toastText= res.message
              this.$store.state.toastType='warn'
              return false
            }
          })
        }


      },
      onConfirm(){
        this.delCookie('session_id')
        this.$router.push({path: '/y/logIn'})
      }
    },


  }
</script>
<style scoped>
.changePwd{ width:100%;height:100%;}

  .content{background-color: #f5f5f5;padding-top:46px;box-sizing: border-box;}
  .box{width:100%;padding:0 0.35rem;box-sizing: border-box;background-color: white;margin-top:0.3rem;}
  .box .line{height: 1rem;border-bottom: 1px solid #ededed;line-height: 1rem; display: flex; justify-content: space-between}
  .box .line .s1{width:1.5rem;display: inline-block;font-size:0.3rem;vertical-align:middle;text-align: right;color:#9a9a9a;}
  .box .line .s2{display: inline-block;font-size:0.3rem;vertical-align:middle;color:#f86e0e;width:2.3rem;text-align: center;}
  .box .line .s2 .hs{color:#9a9a9a;}
  .box .line .input1{color:#333;font-size: 0.3rem;vertical-align: middle;outline: none;border:0;flex:1;}
  .box .line .eyes{width:0.34rem;vertical-align: middle;}
  .forgetPwd{font-size: 0.26rem;color:#9a9a9a;text-align: right;line-height: 0.7rem;height:0;margin:0 0.35rem;}

  .button{width:6.8rem;margin:0.8rem auto;line-height: 0.8rem;background-color: #f86e0e;text-align: center;color: white;font-size: 0.32rem;border-radius: 0.02rem;}
.disabled{disabled:disabled;background:#f6b17e;color:#fafbfb;}
</style>
