<template>
  <div class='changePwd'>
    <xHeader :msg="tit"></xHeader>
    <div class="content">
      <!--绑定预付卡-->
      <div class="box box0">
        <div class="line">
          <span class="s1" style="width:100%;text-align: left">请填写持卡人本人的预付卡</span>
        </div>
      </div>
      <div class="box box1">
        <div class="line">
          <span class="s1">持卡人：</span><input class="input1" type="password" />
        </div>
        <div class="line" style="border:0;">
          <span class="s1">卡号：</span><input class="input1" type="password" />
        </div>
      </div>
    </div>
    <div class="button">绑定</div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from "@/components/my/common/xHeader"
  export default{
    data(){
      return{
        tit:'绑定预付卡',

      }
    },
    components:{xHeader},
    props:{

    },
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
  .changePwd{ width:100%;height: 100%; }

  .content{background-color: #f5f5f5;padding-top:46px;box-sizing: border-box;}
  .box{width:100%;padding:0 0.35rem;box-sizing: border-box;background-color: white;margin-top:0.3rem;}
  .box.box1{margin-top:0.1rem;}
  .box.box0 .line{border:0;}
  .box .line{height: 1rem;border-bottom: 1px solid #ededed;line-height: 1rem;}
  .box .line .s1{width:1.5rem;display: inline-block;font-size:0.3rem;vertical-align:middle;text-align: right;color:#333;}
  .box .line .input1{color:#9a9a9a;font-size: 0.3rem;vertical-align: middle;outline: none;border:0;}

  .button{width:6.8rem;margin:0.8rem auto;line-height: 0.8rem;background-color: #f86e0e;text-align: center;color: white;font-size: 0.32rem;border-radius: 0.05rem;}
</style>
