<template>
  <div class='personalData'>
    <x-header class="xheader"  :left-options="{backText:''}"  :title="msg" :right-options="{showMore:false}" ref="head">
      <a slot="right" ><span @click="title_more()" class="titleRight">{{xHeaderRText}}</span></a>
    </x-header>
    <div class="contentBox">
      <div class="box">
        <div class="line1" @click="changePhotoState=true">
          <span class="s1">头像</span>
          <img class="img1" v-if="headPortrait != null" :src="headPortrait" ref="headPortrait"/>
          <img class="img1" v-if="headPortrait == null" src="../img/oxniceDefault.png" ref="headPortrait">
          <input type="file" @change="fileChange" style="display: none" ref="file">
        </div>
        <div class="line1">
          <span class="s1">昵称</span><input type="text" class="input1"  v-model="nickName"/>
        </div>
        <div class="line1">
          <span class="s1">姓名</span><input type="text" class="input1" :value="trueName" disabled/>
        </div>
      </div>
      <div class="box">
        <div class="line1">
          <span class="s1">手机号</span><input type="text" class="input1" :value="phone" disabled/>
        </div>
        <div @click="changeSexState=true"><set-cell :lLabel="line4.lLabel" :rLabel="sexText" :rLabelColor="line4.rLabelColor" ></set-cell></div>
        <div  @click="showAddress"><set-cell :lLabel="line6.lLabel" :rLabel="addressText" :rLabelColor="line6.rLabelColor"  :bBorder="false"></set-cell></div>
      </div>
      <div class="box">
        <set-cell :lLabel="line7.lLabel" :type="line7.textarea" :textareaValue="signature" :textareaPlaceholder="line7.textareaPlaceholder"  :rLabelColor="line7.rLabelColor"  :bBorder="false" :rImgState="false" @textareaVal="getTextareaVal"></set-cell>
      </div>
    </div>
    <sel-sex :show="changeSexState" @getSex="getSex"></sel-sex>
    <sel-photo :show="changePhotoState" @getPhoto="getPhoto"></sel-photo>
    <!--<div @click="test">text</div>-->
    <self-address v-if="addressState" :value="addressValue" :state="addressState" @close="addressState=false" @change="getAddressVal"></self-address>
  </div>
</template>
<script>
//
  /**
   * @props
   * @emit
   */
  import {XHeader} from 'vux'
  import setCell from "@/components/my/setting/common/setCell"
  import selSex from "@/components/common/selSex"
  import selPhoto from "@/components/common/selPhoto"
  import upload from '@/components/common/upload'
  import selfAddress from '@/vux/selfAddress'
  import { GetSelectBasicById,setPersonalDatas } from "@/api/personally";
  export default{
    data(){
      return{
        personalCcenterData:{}, //个人信息
        dizhi:'',// 选择的地址
        msg:'个人资料',
        xHeaderRText:'保存',
        line1:{
          lLabel:'头像',
//          rLabel:'张小凡',
//          rLabelColor:'#333'
        },
        line2:{
          lLabel:'昵称',
          rLabel:'太乙',
          rLabelColor:'#333'
        },
        line3:{
          lLabel:'姓名',
          rLabel:'啦啦啦',
          rLabelColor:'#333'
        },
        line4:{
          lLabel:'性别',
//          rLabel:'请选择',
          rLabelColor:'#333'
        },
        line5:{
          lLabel:'手机号',
          rLabel:'请填写手机号',
          rLabelColor:'333'
        },
        line6:{
          lLabel:'所在地区',
          rLabel:'河南省正好走势',
          rLabelColor:'333'
        },
        line7:{
          lLabel:'个性签名',
          rLabelColor:'333',
          textarea:'textarea',
          textareaPlaceholder:'不超过30个字',
        },
        changeSexState:false,     //选择性别
        changePhotoState:false,     //选择图片
        addressState:false,      //通过赋值改变(this.addressState=true)
        headPortraitFile:'',
        headPortraitItem:'',
        //  用户信息
        adcode:'',
        curHeadPortrait:'',
        curNickName:'',
        curTrueName:'',
        curPhone:'',
        curSex:'',
        curAddress:'',
        addressValue:['110000','110100','110101'],
        addressText:'请选择',
        curSignature:'',
      }
    },
    computed:{
      headPortrait:{
        get(){
          return this.personalCcenterData.portrait;
        },
        set(a){
          console.log(a)
        }
      },
      nickName:{
        get(){
          return this.personalCcenterData.nickName;
        },
        set(a){
          console.log(a)
          this.curNickName=a;
        }
      },
      trueName:{
        get(){
          return this.personalCcenterData.realName;
        },
        set(a){
          console.log(a)
        }
      },
      phone:{
        get(){
          return this.personalCcenterData.phone;
        },
        set(a){
          this.curPhone=a;
        }
      },
      sex:{
        get(){
          return this.personalCcenterData.sex
        },
        set(a){
          console.log(a)
        }
      },
      address:{
        get(){
          return this.personalCcenterData.address;
        },
        set(a){
          console.log(a)
        }
      },
      signature:{
        get(){
          return this.personalCcenterData.autograph;
        },
        set(a){
          console.log(a)
        }
      },
      sexText(){
        if(this.curSex==0){
          return '请选择'
        }else if(this.curSex==1){
          return '男'
        }else if(this.curSex==2){
          return '女'
        }else {
          return '请选择'
        }
      },
    },
    components:{XHeader,setCell,selSex,selPhoto,upload,selfAddress},
    props:{

    },
    mounted(){
      this.init();
    },
    methods:{
      getAddressVal(a,b){
        this.adcode = a[2];
        this.addressText = b[0]+b[1]+b[2];
      },
      showAddress(){
        this.addressState=true;
      },
      //  初始化
      init(){
        //个人中心
        GetSelectBasicById({}).then( res => {
          console.log('个人资料结果', res)
          if(res.message == 'success'){
            this.personalCcenterData = res.data;
            this.adcode = this.personalCcenterData.areaId;
            this.curSex = this.personalCcenterData.sex;
            this.curSignature = this.personalCcenterData.autograph;
            this.curPhone = this.personalCcenterData.phone;
            this.curNickName = this.personalCcenterData.nickName;
            this.curHeadPortrait = this.personalCcenterData.portrait;
            if(this.personalCcenterData.province!=null){
              this.addressText = this.personalCcenterData.province+this.personalCcenterData.city+this.personalCcenterData.area;
              this.addressValue=[this.personalCcenterData.provinceId,this.personalCcenterData.cityId,this.personalCcenterData.areaId];
            }

          }else {

          }
        })
      },
//      titleMore
      title_more(a){
        this.$store.commit("setLoading",true)
        if(this.headPortraitFile!=''){   //更改了用户头像
          var url=[];
          var arr = new Array(this.headPortraitFile)
          url = this.multipartUpload(arr);
          var interval,timeout;
          interval = setInterval(()=>{                     //头像上传成功后，提交接口 21
            if(url.length>0){
              console.log('yes')
              this.curHeadPortrait = url[0]
              this.sub();
              clearTimeout(timeout)
              clearInterval(interval)
            }
            console.log('no',url)
          },500)
          timeout = setTimeout(()=>{                       //头像上传超时
            this.$store.state.toastText='服务器错误'
            this.$store.state.toastType='text'
            clearInterval(interval)
            clearTimeout(timeout)
          },10000)
        }else{                           //没有更改头像信息
          this.sub()
        }
      },
      //提交保存
      sub(){
        let params = {
          portrait:this.headPortraitFile==''?this.curHeadPortrait.substring(22,this.curHeadPortrait.length):this.curHeadPortrait,//用户头像
          nickName:this.curNickName,//昵称
          sex:this.curSex,//性别1男2女
          autograph:this.curSignature,//个性签名
          areaCode:this.adcode,//区县id
        }
        var reg = /^[A-Z，。,.？?0-9a-z\u4e00-\u9fa5 ]+$/;
        // console.log(this.line3.lLabel,'1111111');
        if(this.curNickName.length==0||this.curNickName.length>6)
        {
            this.$store.commit('setToastText','昵称不能超过最大长度6')
            this.$store.commit('setToastType','text')
            this.$store.commit("setLoading",false)
            return false
        }
        else if(!reg.test(this.curSignature)&&this.curSignature.length>0)
        {
           this.$store.commit('setToastText','个性签名请勿输入非法字符')
            this.$store.commit('setToastType','text')
            this.$store.commit("setLoading",false)
            return false
        }
        else if(this.curSignature.length>30)
        {
          this.$store.commit('setToastText','最多输入30个字符')
            this.$store.commit('setToastType','text')
            this.$store.commit("setLoading",false)
            return false
        }
        // console.log(params)
        setPersonalDatas(params).then((res)=>{
          this.$store.commit("setLoading",false)
          if(res.message=='success'){
            this.$store.commit('setToastText','修改成功')
            this.$store.commit('setToastType','success')
            this.init();
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          this.$store.commit("setLoading",false)
          this.$store.commit('setToastText','服务器错误')
          this.$store.commit('setToastType','warn')
        })
      },
//      性别
      getSex(q){
        this.changeSexState=false;
        this.curSex=q;
      },
//      选择照片
      getPhoto(q){
        if(q===0){
          console.log("取消")
          this.changePhotoState=false;
        }else if(q===1){
          console.log("拍照")
          this.changePhotoState=false;
        }else if(q===2){
//          console.log("相册")
          this.$refs.file.click();
          this.changePhotoState=false;
        }else {

        }
      },
      fileChange(){
        var that = this;
        let files = this.$refs.file.files;
          if(files[0].type==='image/png'||files[0].type==='image/jpg'||files[0].type==='image/jpeg'){
            if(files[0].size<(1024*1000)){
              this.headPortraitFile = files[0];
              var reader = new FileReader();
              reader.readAsDataURL(files[0]);
              reader.onloadend = function (e) {
                that.headPortraitItem = e.target.result;
                that.$refs.headPortrait.src=that.headPortraitItem
              };
            }else{
              this.$store.commit('setToastText','上传的图片不能超过 1M！')
              this.$store.commit('setToastType','text')
            }
          }else{
            this.$store.commit('setToastText','只能上传 jpg 或 png 格式的图片！')
            this.$store.commit('setToastType','text')
          }
      },
      getTextareaVal(a){
        this.curSignature = a;
      },

    },
  }
</script>
<style scoped>
.personalData{  }
.personalData{position: fixed;top:0;z-index: 10;width:100%}
.xheader{width:100%;background-color: white;}

.personalData >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
.personalData >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
.vux-header .vux-header-right a .titleRight{font-size: 0.28rem;color:#f86e0e}

.contentBox{width:100%;height: 100%;box-sizing: border-box;background-color: #f5f5f5;}
.contentBox .box{margin:0.3rem 0;}

  .line1 {height: 1rem;width:100%;padding:0 0.3rem;box-sizing:border-box;border-bottom:1px solid #ededed;background-color: white}
  .line1 .s1{display: inline-block;vertical-align: middle;line-height: 1rem;font-size: 0.3rem;color:#333;}
  .line1 .img1{width:0.7rem;height: 0.7rem;text-align:right;margin:0.15rem;float: right;border-radius: 50%;overflow: hidden;}
  .line1 .input1{width:4rem;text-align: right;float: right;line-height: 0.5rem;margin:0.25rem 0;background-color: white;}
</style>
