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
        <img src="../img/eye.png" alt="" @click="changePasswordType">
      </div>

      <!--按钮-->
      <div class="btn" v-if="phone!='' && pasw!=''" @click="loginBtn">立即绑定</div>
      <div class="btn disabled" v-else>立即绑定</div>
      <div style="float: right; margin-top: 0.20rem">
        <router-link :to="{ path:'/z/reglsterBind', query: {isChange:3, temp: temp}}">
          <p>没有奈斯牛账号？请注册</p>
        </router-link>
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
  import {checkPhone ,isPasswordLen,isPasswordStr} from '@/untils/untils'

  export default{
    data(){
      return{
        top:"账号绑定",
        phone:'',//手机号
        pasw:'',//密码

        inppasw:'password',  //密码input的默认
        wx:false,
        qq:true,
        temp: '',
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
//      //验证密码
//      checkpassword(){
//        if(checkPassword(this.pasw).state){
//          return true;
//        }else{
//          return false;
//        }
//      },

    },
    components:{xHeader,loGo},
    mounted(){
      this.temp = this.$route.query.temp
    },
    methods:{
      // 改变input属性
      changePasswordType(){
        console.log(this.inppasw)
        if(this.inppasw == 'password'){
          this.inppasw = 'text'
        }else{
          this.inppasw = 'password'
        }
      },
      // 登录按钮
      loginBtn(){

        console.log(md5(this.pasw))
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
          console.log({
            userName: this.phone,
            password: pasw,
            temp: this.temp
          })
          this.axios.post('/personally/thirdpartyLoginController/Bnding',this.qs.stringify({
            userName: this.phone,
            password: pasw,
            temp: this.temp
          }))
            .then(function (response) {
              let datas = response.data;
              if(datas.data){

                that.$router.push({path:'/my/persionDatailMsg'})
              }else {

                that.$store.state.toastText = datas.message
                that.$store.state.toastType='warn'

              }
              console.log('登录绑定', datas)

            })
            .catch(function (error) {
              this.$store.state.toastText='系统异常'
              this.$store.state.toastType='text'
              console.log(error)
            })
        }

      },
    },

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
