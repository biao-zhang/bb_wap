<template>
  <div class='findPwd'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div class="findPwdTop">
      <div style="font-size: 0.26rem">我们已将发送了验证码到你绑定的手机：</div>
      <div style="font-size: 0.36rem; margin-top: 0.40rem">*******1960</div>
    </div>
    <div class="findPwdMindle">
      <div>
        <span>验证码：</span>
        <input type="number" placeholder="短信验证码"/>
      </div>
      <div class="findPwdRece">获取验证码</div>
    </div>
    <div style="margin-top: 0.80rem">
      <my-btn :btn-text="btnMessage"> </my-btn>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XHeader } from 'vux'
  import myBtn from '../common/myBtn'
  export default{
    components: {
      XHeader,
      myBtn
    },
    data(){
      return{
        topMessage: '找回密码',
        btnMessage: '下一步'
      }
    },
    props:{

    },
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .findPwdTop {
    padding: 0.40rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .findPwdMindle {
    padding: 0.35rem 0.30rem;
    background-color: #fff;
    font-size: 0.30rem;
    display: flex;
  }
  .findPwdRece {
    color: #f86e0e;
    border-left: 1px solid #ccc;
    padding-left: 0.25rem;
  }
</style>
