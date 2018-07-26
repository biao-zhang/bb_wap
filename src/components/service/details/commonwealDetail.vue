<template>
  <div class="bb_page">
    <div class="header" ref="header"><img onclick="javascript:history.go(-1)" class="back" src="../img/back.png"/>
      <img class="imgBg" :src="particularsDatas.welfareTitleImg"/> </div>
    <div class="title" ref="title">
      <img class="titleLogo" src="../img/activityLogo.png"><span class="s1">{{particularsDatas.welfareTitle}}</span>
    </div>
    <div class="content" :style="{height:contentHeight+'px'}">
      <shadow-box>
        <div class="box1">
          <div class="line1"><span class="s2">发起人：</span><span class="s3">{{particularsDatas.author}}</span></div>
          <div class="line1"><span class="s2">已报名：</span><span class="s3">{{particularsDatas.peopleCounting}}人</span>
            <router-link :to="{path: '/z/alldetails', query: {welfareId:particularsDatas.orderId,isRelease:particularsDatas.isRelease}}">
              <div class="toPeopleList" v-if="status">报名详情</div>
            </router-link>
            <router-link :to="{path: '/z/alldetails1', query: {welfareId:particularsDatas.orderId,isRelease:particularsDatas.isRelease,welfareState:particularsDatas.welfareState}}">
              <div class="toPeopleList" v-if="!status">确认到达</div>
            </router-link>
          </div>
          <div class="line1"><span class="s2">截止时间：</span><span class="s3">{{deadline[0]}}-{{deadline[1]}}-{{deadline[2]}}</span></div>
        </div>
      </shadow-box>
      <shadow-box>
        <div class="box2">
          <div class="tit">活动详情</div>
          <div class="con">{{particularsDatas.welfareContent}}</div>
          <div class="item_img">
            <img class="img_obe" v-if="item" v-for="(item,index) in particularsDatas.serviceImgs" :src="item" alt="">
          </div>
        </div>
      </shadow-box>
    </div>
    <!--<router-link to='/z/result'>-->
      <div v-if="btn" class="bot" @click="giveHelp(particularsDatas.orderId)">我要帮忙</div>
      <div v-if="btn_1" class="bot_1">已结束</div>
      <div v-if="btn_2" class="bot_1">已报名</div>
    <!--</router-link>-->
  </div>
</template>
<script>
  import xHeader from '@/components/service/common/xHeader'
  import shadowBox from '@/components/service/common/shadowBox'
  import { publicParticulars , applyJoin } from "@/api/service";
  import { time } from "../../../untils/untils";

  export default {
    data(){
      return{
        help_one:true,
        contentHeight:0,         //滑动的height
        orderId:'',
        particularsDatas:{
          serviceImgs:[]
        },
        deadline:'',
        btn:true,
        btn_1:false,
        btn_2:false,
        status:true
      }
    },
    components:{xHeader,shadowBox},
    mounted(){


      if(this.$route.query.orderId!==undefined){
        this.orderId = this.$route.query.orderId;
      }
//      if(this.$route.query.issue!==undefined){
//        this.status = false
//      }

      var that = this;
      setTimeout(function () {
        that.contentHeight = window.innerHeight-that.$refs.header.clientHeight-that.$refs.title.clientHeight;
      },20)

      publicParticulars({orderId:this.orderId}).then(res => {
        console.log('接收公益详情',res)
        if(res.message = 'success'){
          this.particularsDatas = res.data
          this.initShare();
          this.deadline = time(res.data.deadline)
          if(this.particularsDatas.isJoin == 0 && this.particularsDatas.isRelease == 0){
            that.btn = true
          }else if(this.particularsDatas.isRelease == 1){
            that.btn = false
            that.btn_2 = false
            that.status = false
          }else {
            that.btn = false
            that.btn_2 = true
          }
          if(this.particularsDatas.welfareState == 4){
            that.btn = false
            that.btn_1 = true
          }
        }
      })
    },
    methods:{
//      var that = this
      giveHelp(orderId){
        if(this.help_one == false){
          return false
        }
        this.help_one = false
        this.$store.commit("setLoading", true);
        applyJoin({orderId:orderId}).then(res => {
          console.log(res)
          if(res.message = 'success'){
            this.btn = false
            this.$router.push({path:'/z/result'})
            this.$store.commit("setLoading", false);
          }
        })
      },
      initShare(){
        //分享加上图片
        var date = parseInt((new Date().getTime())/1000);
        this.axios.post('/personally/wxJspLoginContriller/permissionsSign',this.qs.stringify({noncestr:'DiezASFKolejsDmF',timestamp:date,url:location.href}))
          .then((res)=>{
            console.log(res)
            if(res.data.data.length>0){
              wx.config({
//              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx070f1e1cb0797cbd', // 必填，公众号的唯一标识wx200cd3b413c4e6ef
                timestamp:date, // 必填，生成签名的时间戳
                nonceStr: 'DiezASFKolejsDmF', // 必填，生成签名的随机串
                signature: res.data.data,// 必填，签名，见附录1
                jsApiList: ['startRecord','stopRecord','translateVoice','onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
              wx.ready(()=>{
                console.log('ready')
                wx.onMenuShareAppMessage({
                  title: document.title,  // 分享标题
                  desc: document.title, // 分享描述
                  link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: this.particularsDatas.welfareTitleImg, // 分享图标
                  type: '', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: ()=>{
                    console.log('success')
                    // 用户点击了分享后执行的回调函数
                  },
                  error:(res)=>{
                    console.log(res)
                  }
                });
                wx.onMenuShareTimeline({
                  title: document.title, // 分享标题
                  link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: this.particularsDatas.welfareTitleImg, // 分享图标
                  success: function () {
                    // 用户点击了分享后执行的回调函数
                  },
                });
              })
              wx.error((res)=>{
                console.log(res)
              });
            }else{
              this.$store.commit('setToastText','权限获取失败')
              this.$store.commit('setToastType','warn')
            }
          })
          .catch((err)=>{
            console.log(err)
            this.$store.commit('setToastText','权限获取失败!')
            this.$store.commit('setToastType','warn')
          })
      },
    }
  }

</script>
<style scoped>
  .bb_page{background-color: #f5f5f5}

  .header{width:100%;height:4.48rem;position: relative}
  .header .imgBg{width:100%;height: 100%;}
  .header .back{position: absolute;width:0.19rem;top:0.29rem;left: 0.29rem;}

  .title{height: 1rem;padding:0.28rem 0.2rem;box-sizing: border-box;overflow: hidden;background-color: white;box-shadow: 0 0.02rem 0.02rem #ccc;overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;}
  .title .s1{font-size: 0.34rem;color:#3a3a3a;}
  .title .titleLogo{width:0.8rem;height: 0.4rem;vertical-align: text-bottom;margin-right: 0.1rem;}

  .content{overflow: scroll;padding-bottom: 0.9rem;box-sizing: border-box;}
  .content .box1{padding:0 0.13rem;height: 3rem;}
  .content .box1 .line1{color:#333;font-size: 0.3rem;line-height: 1rem;}
  .content .box1 .line1 .s2{display: inline-block;width: 1.7rem;text-align: right;}
  .content .box1 .line1 .s3{display: inline-block;margin-left: 0.2rem;}
  .content .box1 .line1 .toPeopleList{display:inline-block;float:right;margin-top:0.25rem;width:2rem;height: 0.5rem;line-height: 0.5rem;font-size: 0.3rem;color: white;border-radius: 0.05rem;background-color: #f86e0e;text-align: center;}
  .content .box2{padding:0 0.1rem;}
  .content .box2 .tit{font-size: 0.3rem;color: #f86e0e;font-weight: bold;line-height: 0.7rem;}
  .content .box2 .con{font-size: 0.3rem;color:#333;line-height: 0.45rem;text-indent: 2em;padding-bottom:0.3rem;}

  .bot{width:100%;height: 0.9rem;line-height: 0.9rem;color: white;font-size: 0.3rem;background-color: #f86e0e;text-align: center;position: fixed;bottom: 0;}
  .bot_1{width:100%;height: 0.9rem;line-height: 0.9rem;color: white;font-size: 0.3rem;background-color:#ccc;text-align: center;position: fixed;bottom: 0;}
  .item_img{display:flex;justify-content:space-between;padding-bottom:0.3rem;}
  .item_img .img_obe{width:1.26rem;height:1.26rem;}
</style>
