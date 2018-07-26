<template>
  <div class='register'>
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--logo-->
    <lo-go></lo-go>
    <!--表单-->
    <div class="biao">
      <div class="biao1">
        <label for="">手机号</label>
        <input type="number" placeholder="手机号" v-model="phone" />
      </div>
      <!--验证码-->
      <div class="biao1">
        <label for=""style="line-height:0.78rem;">验证码</label>
        <!--<input type="number" placeholder="验证码" v-model="yzm">-->
        <input class="input1" type="text" placeholder="验证码" v-model="yzm" style="width:3rem;" /><span class="s2"><span v-if="!sendMsgDisabled" @click="send">发送验证码</span><span class="hs" style="background:#ccc;" v-if="sendMsgDisabled">{{time}}后重新获取</span> </span>
      </div>
      <div class="biao1">
        <label for="">设置密码</label>
        <input :type="inppasw" placeholder="设置登录密码" v-model="pasw">
        <img v-if="eye" src="../img/eye1.png" alt="" @click="changePasswordType">
        <img v-else="eye" src="../img/eye.png" alt="" @click="changePasswordType">
      </div>
      <!--用户协议-->
      <div class="xieyi">
        <div class="image2">
          <img v-if="radioState" @click="changeRadioState" class="img2" src="../img/true1.png"/>
          <img v-else="radioState" @click="changeRadioState" class="img2" src="../img/true2.png"/>
        </div>
        <div class="xie">
          <p>已阅读并同意
            <router-link :to="{path:'/y/protocolExplain'}">
              <span>《用户服务协议》</span>
            </router-link>
          </p>
        </div>
      </div>
      <!--按钮-->
      <div class="btn" v-if="phone!='' && pasw!='' && yzm!='' && radioState == true" @click="regBtn">注册并绑定</div>
      <div class="btn disabled" v-else>注册并绑定</div>

      <!--<toast v-model="show1" type="cancel" is-show-mask width="2.4rem" :text='toastText' :position="position"></toast>-->
      <!--<toast v-model="show2" type="success" is-show-mask width="2.4rem" :text='toastText1' :position="position"></toast>-->
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  import xHeader from '@/components/my/common/xHeader'

  import loGo from '@/components/my/loginandregistration/common/loGo'
  import { gainVerificationCode , submitRegister} from "@/api/personally";

  import {checkPhone,authCode,isPasswordLen,isPasswordStr} from '@/untils/untils'
  export default{
    data(){
      return{
        top:"注册",
        radioState:true, //协议状态
        eye:true,   //眼睛状态
        phone:'',   //手机号
        yzm:'',//验证码
        pasw:'',   //密码

        inppasw:'password',  //密码input的默认


        show2:false,
        toastText1:'',      //提示文字

//        yzmdata:'',
        time:60,
        sendMsgDisabled:false,
      }
    },
    props:{

    },
    components:{xHeader,loGo},
    computed:{
      //正则手机号
      checkphone(){
        if(checkPhone(this.phone).state){
          return true;
        }else{
          return false;
        }
      },
//      //验证验证码
//      authcode(){
//        if(authCode(this.yzm).state){
//          return true;
//        }else{
//          return false;
//        }
//      },
    },
    mounted(){

    },
    methods:{
      //      改变input属性
      changePasswordType(){
        this.eye = !this.eye;
        console.log(this.inppasw)
        if(this.inppasw == 'password'){
          this.inppasw = 'text'
        }else{
          this.inppasw = 'password'
        }
      },
      //是否同意协议
      changeRadioState(){
        this.radioState = !this.radioState;
      },
//      发送验证码接口
      send(){
        let me = this;
        console.log(this.phone)
        var that = this
        if(this.checkphone == false){
          this.$store.state.toastText='手机号格式错误'
          this.$store.state.toastType='warn'
          return false
        }
        gainVerificationCode({phone:this.phone}).then(res => {
          console.log("获取通联注册（获取验证码）结果", res);
          if (res.message == "success") {
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
          }else {
            that.$store.state.toastText= res.message
            that.$store.state.toastType='warn'
          }
        })
      },
      //注册按钮
      regBtn(){
        var pasw = md5(this.pasw)
//        if(this.authcode == false ||this.yzm != this.yzmdata){
//          this.$store.state.toastText='验证码错误'
//          this.$store.state.toastType='warn'
//          return false
//        }else
        if(isPasswordLen(this.pasw)===false){
          this.$store.state.toastText='密码长度不正确'
          this.$store.state.toastType='warn'
          return false
        }else if(isPasswordStr(this.pasw)===false){
          this.$store.state.toastText='密码格式不正确'
          this.$store.state.toastType='warn'
          return false
        }else {
          var that = this;
          this.axios.post('/personally/userRegister/addAndBindUserByAllInPay',this.qs.stringify({
            code: this.yzm,
            phone: this.phone,
            password: pasw,
            temp: this.temp,
            terminalType: 'wap',
          }))
            .then(function (response) {
              let datas = response.data;
              if(datas.message == 'success'){

                /*that.$router.push({path:'/y/logIn'})*/

                that.$router.push({path:'/my/persionDatailMsg'})

              }else {
                that.$store.state.toastText=datas.message
                that.$store.state.toastType='warn'
              }
              console.log('注册并绑定', datas)
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
    },
  }
</script>
<style scoped>
  .register{background:#fff;height:100%;}

  .logo{padding-top:46px;}
  /*表单*/
  .biao{padding:0 0.5rem;}
  .biao1{display:flex;padding:0.3rem 0;border-bottom:1px solid #cccccc;margin-top:0.4rem;align-items: center;}
  .biao1 img{width:0.34rem;height:0.24rem;}
  .biao1 label{width:1.2rem;font-size:0.3rem;color: #333333;}
  .biao1 input{flex:1;padding-left:0.6rem;}
  .biao1 span{flex:1;display:inline-block;height:0.6rem;line-height:0.6rem;text-align:center;font-size:0.2rem;color: #ffffff;background:#f86e0e;border-radius:0.08rem;}
  /*协议*/
  .xieyi{margin-top:0.65rem;display:flex;}
  .image2{width:0.3rem;height:0.3rem;}
  .image2 img{width:100%;height:100%;}
  .xie{font-size:0.24rem;color: #333333;}
  .xie p{padding-left:0.18rem;}
  .xie p span{color:#f86e0e;}
  /*按钮*/
  .btn{width:100%; line-height:0.8rem;background:#f86e0e;font-size:0.32rem;color: #ffffff;text-align:center;margin-top:0.55rem;border-radius:0.05rem;}
  .register>>>.weui-toast{height:2.4rem;}
  .disabled{disabled:disabled;background:#eeeeee;color:#999999;}
  .hs{color:#9a9a9a;padding:0 0.2rem;}
</style>
