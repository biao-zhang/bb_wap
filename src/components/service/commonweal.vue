<template>
  <div class="bb_page">
    <x-header :msg="HeaderText"></x-header>
    <div class="content" :style="{paddingBottom:addPaddingBot+'px'}">
      <shadow-box>
        <commonweal-tit-line :serviceType="serviceType" :imgDatas="titleImg" @getServiceTit="getServiceTit" @changeCurImg="changeCurImg"></commonweal-tit-line>
      </shadow-box>
      <shadow-box>
        <commonweal-name-line :serviceType="serviceType" @getNameLine="getNameLine"></commonweal-name-line>
      </shadow-box>
      <shadow-box>
        <housekeep-photo :serviceType="serviceType"></housekeep-photo>
      </shadow-box>
      <!--<shadow-box>-->
        <!--<housekeep-address :serviceType="serviceType"></housekeep-address>-->
      <!--</shadow-box>-->
      <shadow-box>
        <remarks :serviceType="serviceType"></remarks>
      </shadow-box>
    </div>
    <x-bottom ref="bot" :serviceType="serviceType"  @submit="upload"></x-bottom>
  </div>
</template>
<script>
  import xHeader from '@/components/service/common/xHeader'
  import xBottom from '@/components/service/common/xBottom'
  import ShadowBox from '@/components/service/common/shadowBox'
  import commonwealTitLine from '@/components/service/common/commonwealTitLine'
  import commonwealNameLine from '@/components/service/common/commonwealNameLine'
  import housekeepPhoto from '@/components/service/common/housekeepPhoto'
  import housekeepAddress from '@/components/service/common/housekeepAddress'
  import remarks from '@/components/service/common/remarks'
  import { setStore, getStore } from "@/untils/storage"
  import { getTitleImg } from "@/api/service"
  import { checkPhone,checkString } from '@/untils/untils'

  export default {
    data(){
      return{
        serviceType:'commonweal',
        HeaderText:'公益帮',
        remarksText:['截止时间',''],
        addPaddingBot:0,/////////////////添加下padding

        stopTime:'',//截至时间
        addressVal:'', //地址行
        nameVal:'',   //name行
        serviceLineVal:'',   //line行
        photo5:[],    //图片行
        adcode:'',       //adcode
        titleImg:[],     //服务标题列表
      }
    },
    computed:{
      datas(){
        return this.$store.state.service.commonweal;
      }
    },
    mounted(){
      getTitleImg().then((res)=>{
        console.log(res,'公益活动标题列表')
        this.titleImg = res.data;
      }).catch((err)=>{
        console.log(err,'获取公益活动标题列表失败')
      })
      //获取adcode
      if (getStore("curCityAdcode")) {
        this.adcode = getStore("curCityAdcode");
      }
      setTimeout(()=>{
        this.addPaddingBot = this.$refs.bot.$el.clientHeight;
      },20)
    },
    components:{xHeader,xBottom,ShadowBox,commonwealTitLine,commonwealNameLine,housekeepPhoto,housekeepAddress,remarks},
    methods:{
      getStopTime(a){  //获取截至时间
        this.stopTime=a;
        console.log(this.stopTime)
      },
      getAddress(a){     //获取地址
        this.addressVal = a;
        console.log(this.addressVal)
      },
      getNameLine(a){    //获取用户名和电话
        this.nameVal = a;
        console.log(this.nameVal)
      },
      getServiceTit(a){     //获取line1的Value
        this.serviceLineVal = a;
        console.log(this.serviceLineVal)
      },
      getPhoto(a){      //获取图片信息
        this.photo5 = a;
        console.log(this.photo5)
      },
      //改变公益标题图片
      changeCurImg(img){
        console.log(img,'公益标题图片')
        this.datas.serviceType.input2 = img;
      },
      //上传图片
      upload(){
        let img = [];
        if(this.datas.housekeepPhoto.input2.files.length>0){
          this.$store.commit('setLoading',true)
          this.$store.commit('setLoadingText','正在上传图片...')
          img = this.multipartUpload(this.datas.housekeepPhoto.input2.files);
        }else{  //用户没有上传图片时，提示并返回.
//          this.$store.commit('setToastText','请上传图片')
//          this.$store.commit('setToastType','warn')
//          return false;
        }
        let interval = setInterval(()=>{
          if(img.length==this.datas.housekeepPhoto.input2.files.length){
            clearTimeout(timeout)
            this.$store.commit('setLoading',false)
            this.submit(img.join(','));
            clearInterval(interval)
          }else{
            console.log('正在上传图片')
          }
        },500)
        let timeout = setTimeout(()=>{
          clearInterval(interval)
          this.$store.commit('setLoading',false)
          this.$store.commit('setToastText','上传图片超时')
          this.$store.commit('setToastType','text')
          clearTimeout(timeout)
        },15000)
      },
      //提交
      submit(img){
        let allInput = {
          serviceImgs: img, // 用户上传图片
          welfareTitle: this.datas.serviceType.input1, // 公益标题
          welfareTitleImg: this.datas.serviceType.input2 == '' ? this.titleImg[0] : this.datas.serviceType.input2, // 公益标题图片
          author: this.datas.commonwealNameLine.input1, // 发布人
          authorPhone: this.datas.commonwealNameLine.input2, // 发布人联系方式
          welfareContent: this.datas.housekeepPhoto.input1, // 公益说明
          deadline: this.datas.remarks.input2.value, // 截止时间
          adcode: this.adcode, // 县Adcode
        }
        //  console.log('公益参数',allInput)
        if(this.checkInputValue(allInput)==false){
          return false;
        }
        this.$store.commit('setLoading',true)
        this.axios.post('/service/welfareOrder/insertWelfareOrder', this.qs.stringify(allInput))
          .then((response) => {
            this.$store.commit('setLoading',false)
            let dataContainer = response.data
            // console.log(dataContainer,'公益帮服务发布数据')
            if(response.data.message=='success'){
              this.$store.commit('service/initCommonweal')
              this.$router.push({path:'/'})
            }
          })
          .catch((error) => {
            this.$store.commit('setLoading',false)
            console.log('错误信息', error)
          })
      },
      checkInputValue(params){
        if(params.welfareTitle===''){
          this.$store.commit('setToastText','请填写公益标题')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(checkString(params.welfareTitle)){
          this.$store.commit('setToastText','请勿输入非法字符111')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.welfareTitleImg===''){
          this.$store.commit('setToastText','请选择公益图片')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.author===''){
          this.$store.commit('setToastText','请填写公益发布人')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.authorPhone===''){
          this.$store.commit('setToastText','请填写公益联系方式')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(!checkPhone(params.authorPhone).state){
          this.$store.commit('setToastText','手机号输入错误')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.welfareContent===''){
          this.$store.commit('setToastText','请填写公益说明')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(checkString(params.welfareContent)){
          this.$store.commit('setToastText','请勿输入非法字符')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.deadline===''){
          this.$store.commit('setToastText','请选择截至时间')
          this.$store.commit('setToastType','warn')
          return false;
        }else{
          return true;
        }
      },
    }
  }

</script>
<style scoped>
  .bb_page{background-color: #f5f5f5;height: 100%;padding:46px 0 1rem;box-sizing: border-box;position: relative;}

  .content{height: 100%;padding:0;overflow: scroll}



</style>
