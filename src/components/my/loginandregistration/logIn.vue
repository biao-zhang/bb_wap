<template>
  <div class='logIn'>
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--logo-->
    <lo-go></lo-go>
    <!--表单-->
    <div class="biao">
      <div class="biao1">
        <label for="">账号</label>
        <input type="number" placeholder="输入手机号" v-model="phone">
      </div>
      <div class="biao1">
        <label for="">密码</label>
        <input :type="inppasw" placeholder="输入登录密码" v-model="pasw">
        <img v-if="eye" src="../img/eye1.png" alt="" @click="changePasswordType">
        <img v-else src="../img/eye.png" alt="" @click="changePasswordType">
      </div>
      <!--注册与忘记密码-->
      <div class="forget">
        <router-link to="/y/regIster">
          <p>立即注册</p>
        </router-link>
        <router-link :to="{path:'/x/changePwd',query:{isChange:3}}">
          <p>忘记密码？</p>
        </router-link>
      </div>
      <!--按钮-->
      <div class="btn" v-if="phone!='' && pasw!=''" @click="loginBtn">登录</div>
      <div class="btn disabled" v-else>登录</div>

      <!--第三方-->
      <div class="thirdparty">
        <div class="party_top">
          <div class="xian"></div>
          <div class="ti">使用其他社交账号登录</div>
          <div class="xian"></div>
        </div>
        <!--QQ-->
        <div class="three">
          <img @click="qq_login" v-if="qq" src="../img/qq1.png" alt="">
          <img @click="wx_Login" v-if="!qq" src="../img/weixin1.png" alt="">
        </div>
      </div>
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
  import {checkPhone,isPasswordLen,isPasswordStr} from '@/untils/untils'
  // import {setUserId} from '@/store/index'
  export default{
    data(){
      return{
        top:"登录",
        phone:'',//手机号
        pasw:'',//密码
        inppasw:'password',  //密码input的默认
        wx:false,
        qq:true,
        eye:true
      }
    },
    computed:{

      //正则手机号
      checkphone(){
        if(checkPhone(this.phone).state){
          return true;
        }else{
          return false;
        }
      },
    },
    components:{xHeader,loGo},
    mounted(){



      var that = this
      function is_weixn(){
        console.log(navigator)
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {

          that.qq = false

        } else {

          that.qq = true

        }
      }
      is_weixn()
    },
    methods:{
      // 改变input属性
      changePasswordType(){
        this.eye = !this.eye;
        console.log(this.inppasw)
        if(this.inppasw == 'password'){
          this.inppasw = 'text'
        }else{
          this.inppasw = 'password'
        }
      },
      // 登录按钮
      loginBtn(){
        // console.log(md5(this.pasw))
        var pasw = (md5(this.pasw))
        if(this.checkphone == false){
          this.$store.state.toastText='手机号格式错误'
          this.$store.state.toastType='warn'
          return false
        }else if(isPasswordLen(this.pasw)===false){
          this.$store.state.toastText='密码长度不正确'
          this.$store.state.toastType='warn'
          return false
        }else if(isPasswordStr(this.pasw)===false){
          this.$store.state.toastText='密码格式不正确'
          this.$store.state.toastType='warn'
          return false
        }else {
          var that = this
          this.axios.post('/personally/login/',this.qs.stringify({phone:this.phone,password:pasw,terminalType:'wap'}))
            .then(function (response) {
              let datas = response.data;
              if(datas.message == 'success'){
                that.$router.go(-1);
              }else {
                that.$store.state.toastText = datas.message
                that.$store.state.toastType='warn'
              }

            })
            .catch(function (error) {
              console.log(error)
            })
        }

      },
      // qq登录
      qq_login() {
        /*this.$router.push('/z/loginBind')*/
        this.axios.get('/personally/thirdpartyLoginController/qqwaplogin')
          .then(function (response) {
            let datas = response.data;
            window.location=datas.data
          })
          .catch(function (error) {
            console.log(error)
          })
        console.log('qq登录')
      },
      // 微信/公众号登录
      wx_Login() {
        this.axios.get('/personally/wxJspLoginContriller/wxlogin')
          .then(function (response) {
            let datas = response.data;
            window.location=datas.data
          })
          .catch(function (error) {
            console.log(error)
          })
        console.log('微信/公众号登录')
      },
    },
    updated() {
      this.$store.commit("setLoading", false);
    }
  }
</script>
<style scoped>
  .logIn{background:#fff;height:100%;}

  .logo{padding-top:46px;}

  .biao{padding:0 0.5rem;}
  .biao1{display:flex;padding:0.3rem 0;border-bottom:1px solid #cccccc;margin-top:0.4rem;align-items:center;}
  .biao1 img{width:0.34rem;height:0.24rem;}
  .biao1 label{width:1.2rem;font-size:0.3rem;color: #333333;}
  .biao1 input{flex:1;padding-left:0.6rem;}
  /*忘记密码*/
  .forget{display:flex; justify-content: space-between;margin-top:0.7rem;}
  .forget a p{font-size:0.26rem;}
  .forget a:first-child p{color:#f86e0e;}
  .forget a:last-child p{color:#9a9a9a;}
  /*按钮*/
  .btn{width:100%; line-height:0.8rem;background:#f86e0e;font-size:0.32rem;color: #ffffff;text-align:center;margin-top:0.55rem;border-radius:0.05rem;}
  .disabled{disabled:disabled;background:#eeeeee;color:#999999;}
  /*第三方登录*/
  .thirdparty{margin-top:1.2rem;}
  .party_top{display:flex;line-height:0.4rem;align-items:center;}
  .xian{width:1.8rem; height:0.02rem;background:#ebebeb;}
  .ti{flex:1;color: #9a9a9a;font-size:0.2rem;text-align:center;}
  .three{width:3.24rem; margin:0.8rem auto 0;display:flex;justify-content:space-between;}
  .three img{width:0.6rem; height:0.6rem; margin:0 auto;}

</style>
