<template>
  <div class='tickProblem'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div class='tickProblemContent'>
      <div class='tickProblemTitle'>描述您遇到的问题:</div>
      <div>
        <group>
          <x-textarea v-model="one" :placeholder="tips" :height="150"> </x-textarea>
        </group>
      </div>
      <div class='tickProblemPic'>
        <div class="add_picture_file">
          <!--<img v-show="img5State[0]" class="imgPhoto"/>-->
          <!--<img v-show="img5State[1]" class="imgPhoto"/>-->
          <!--<img v-show="img5State[2]" class="imgPhoto"/>-->
          <!--<img v-show="img5State[3]" class="imgPhoto"/>-->
          <!--<img v-show="img5State[4]" class="imgPhoto"/>-->
          <!--<img @click = 'upload' src="../img/addpicture.png" class="imgPhoto" />-->
          <!--<input type="file" style="display: none;" @change="getFileVal" multiple="multiple" ref="file"/>-->
          <upload
            :maxUploadNumber="5"
            @uploadItems="getInputItems"
            @uploadUrls="getInput"
          > </upload>
        </div>
      </div>
    </div>
    <div class='personInfo'>
      <div class='personInfoName'>
        <div>联系人</div>
        <div style="border-left: 1px solid #ccc; margin-left: 0.50rem; padding-left: 0.20rem">
          <input v-model="nickName" type="text" placeholder="请输入您的姓名"/>
        </div>
      </div>
      <div class='personInfoTel'>
        <div>联系电话</div>
        <div style="border-left: 1px solid #ccc; margin-left: 0.20rem; padding-left: 0.20rem">
          <input v-model="phone" type="number" placeholder="请输入手机号"/>
        </div>
      </div>
    </div>
    <div class="btn" style="margin-top: 0.80rem">
      <div @click="btn">提交申请</div>
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
  import {checkPhone} from '@/untils/untils'
  import upload from "@/components/common/upload"

  import { problemFeedback } from "@/api/service";
  export default{
    components: {
      XHeader,
      Group,
      XTextarea,
      myBtn,
      upload
    },
    data(){
      return{
        topMessage: '反馈问题',
        tips: '描述您的问题',
        img5State:[0,0,0,0,0],
        one:'',
        nickName:'',
        phone:'',
        imgs:'',
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
//      getFileVal(){
//        var file = this.$refs.file.files;
//        for(var i=0;i<file.length;i++){
//          this.$set(this.img5State,i,1);
//          console.log(i)
//          if(i>=4) {
//            this.is5='none'
//          }else{
//            this.is5=''
//          }
//          getImgURL(file[i],document.getElementsByClassName('imgPhoto')[i])
//        }
//      },
      // 上传图片
      getInputItems(a){
        console.log('a', a)
      },
      getInput(b){
        if(b!=''){   //更改了用户头像
          var url=[];
          url = this.multipartUpload(b);
          var interval,timeout;
          interval = setInterval(()=>{                     //头像上传成功后，提交接口 21
            if(url.length>0){
              this.imgs = url.join(',')

              clearTimeout(timeout)
              clearInterval(interval)

              console.log('this.imgs',url.join(','))
            }

          },500)
          timeout = setTimeout(()=>{                       //头像上传超时
            this.$store.state.toastText='服务器错误'
            this.$store.state.toastType='text'
            clearInterval(interval)
            clearTimeout(timeout)
          },10000)
        }
      },

      btn(){
        if (this.one == ''){
          this.$store.state.toastText='请输入您的问题'
          this.$store.state.toastType='warn'
          return false
        }else if(this.nickName == ''){
          this.$store.state.toastText='请输入您的姓名'
          this.$store.state.toastType='warn'
          return false
        }else if(this.phone == ''){
          this.$store.state.toastText='请输入您的手机号'
          this.$store.state.toastType='warn'
          return false
        }else if(checkPhone(this.phone).state == false){
          this.$store.state.toastText='手机号格式错误'
          this.$store.state.toastType='warn'
          return false
        }else {
          problemFeedback({imgs:this.imgs,info:this.one,linkman:this.nickName,phone:this.phone}).then( res => {
            console.log('反馈', res)
            if(res.message == 'success'){
              this.$router.push({path: '/y/serviceOne'})
              this.$store.state.toastText='反馈成功'
              this.$store.state.toastType='success'
              return false
            }else {
              this.$store.state.toastText= res.message
              this.$store.state.toastType='warn'
              return false
            }
          })
        }
      }
    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

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
  .btn div{width:80%;margin:0 auto;height: 0.80rem;
    color: #fff;
    border-radius: 0.05rem;
    text-align: center;
    line-height: 0.80rem;
    font-size: 0.32rem;
    background-color: #f86e0e;}
</style>
