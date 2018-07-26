<template>
  <div class='tickProblem'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div class="orderNum">
      <span>订单编号：</span>
      <span>15642566869</span>
    </div>
    <div class='tickProblemContent'>
      <div class='tickProblemTitle'>投诉说明:</div>
      <div>
        <group>
          <x-textarea :placeholder="tips" :height="150"> </x-textarea>
        </group>
      </div>
      <div class='tickProblemPic'>
        <div class="add_picture_file">
          <img v-show="img5State[0]" class="imgPhoto"/>
          <img v-show="img5State[1]" class="imgPhoto"/>
          <img v-show="img5State[2]" class="imgPhoto"/>
          <img v-show="img5State[3]" class="imgPhoto"/>
          <img v-show="img5State[4]" class="imgPhoto"/>
          <img @click = 'upload' src="../img/addpicture.png" class="imgPhoto" />
          <input type="file" style="display: none;" @change="getFileVal" multiple="multiple" ref="file"/>
        </div>
      </div>
    </div>
    <div class='personInfo'>
      <div class='personInfoName'>
        <div>联系人</div>
        <div style="border-left: 1px solid #ccc; margin-left: 0.50rem; padding-left: 0.20rem">
          <input type="text" placeholder="请输入您的姓名"/>
        </div>
      </div>
      <div class='personInfoTel'>
        <div>联系电话</div>
        <div style="border-left: 1px solid #ccc; margin-left: 0.20rem; padding-left: 0.20rem">
          <input type="number" placeholder="请输入手机号"/>
        </div>
      </div>
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
  import { XHeader, Group, XTextarea } from 'vux'
  const getImgURL = require('@/assets/js/getImgURL.js')
  import myBtn from '../common/myBtn'
  export default{
    components: {
      XHeader,
      Group,
      XTextarea,
      myBtn
    },
    data(){
      return{
        topMessage: '投诉',
        tips: '投诉说明',
        img5State:[0,0,0,0,0],
        btnMessage: '提交'
      }
    },
    props:{

    },
    mounted(){

    },
    methods:{
      upload(){
        this.$refs.file.click();
      },
      getFileVal(){
        var file = this.$refs.file.files;
        for(var i=0;i<file.length;i++){
          this.$set(this.img5State,i,1);
          console.log(i)
          if(i>=4) {
            this.is5='none'
          }else{
            this.is5=''
          }
          getImgURL(file[i],document.getElementsByClassName('imgPhoto')[i])
        }
      },
    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .orderNum {
    padding: 0.40rem 0.30rem;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
  .tickProblemContent {
    margin: 0.20rem 0;
    padding: 0 0.20rem;
    background-color: #fff;
    font-size: 0.30rem;
  }
  .tickProblemTitle {
    padding: 0.35rem 0;
  }
  .tickProblemContent >>> .weui-cells {
    margin-top: 0;
  }
  .tickProblemContent >>> .weui-textarea {
    background-color: #fafafa;
  }
  .tickProblemPic {
    padding: 0.30rem 0;
  }
  .imgPhoto { width: 1.40rem; height: 1.40rem; }
  .personInfo {
    font-size: 0.30rem;
  }
  .personInfoName,.personInfoTel {
    padding: 0.35rem 0.30rem;
    display: flex;
    background-color: #fff;
  }
  .personInfoName {
    border-bottom: 1px solid #eee;

  }
</style>
