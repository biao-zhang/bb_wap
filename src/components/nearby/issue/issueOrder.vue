<template>
  <div class="issue">
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <div class="testImg" style="display:none;width:400px;height:400px;">
      <img src="../img/testImg.png" alt="你好">
    </div>
    <!--公告-->
    <div class="notice">
      <p>不想码字，语音找服务</p>
      <p>您可以这样说：我想找跑腿，送一件快递到附近</p>
    </div>
    <!--底部-->
    <div class="footer">
      <div id="yuyinBox"><div id="yuyin" :class="{ani:aniState}" @touchstart.prevent="start" @touchend.prevent="end"></div> </div>
      <p>长按开始说话</p>
    </div>
  </div>
</template>
<script>

  import xHeader from '@/components/nearby/common/xHeader'
  import { isWeiXin,isIOS } from '@/untils/untils'
  export default {
    data(){
      return{
        top:"发布",
        aniState:false,
        voiceId:'',
        Ticket:'',
      }
    },
    components:{xHeader},
    beforeRouteEnter(to,from,next){
      // XXX: 修复iOS版微信HTML5   History兼容性问题
      if (isWeiXin() && isIOS() && to.path !== location.pathname) {
        // 此处不可使用location.replace
        location.assign(to.fullPath)
      } else {
        next( vm => {
          var date = parseInt((new Date().getTime())/1000);
          vm.axios.post('/personally/wxJspLoginContriller/permissionsSign',vm.qs.stringify({noncestr:'DiezASFKolejsDmF',timestamp:date,url:'https://m.oxnice.com/y/issueOrder'}))
            .then((res)=>{
              console.log(res)
              if(res.data.data.length>0){
              //  alert(res.data.data)
                wx.config({
              //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: 'wx070f1e1cb0797cbd', // 必填，公众号的唯一标识wx200cd3b413c4e6ef
                  timestamp:date, // 必填，生成签名的时间戳
                  nonceStr: 'DiezASFKolejsDmF', // 必填，生成签名的随机串
                  signature: res.data.data,// 必填，签名，见附录1
                  jsApiList: ['startRecord','stopRecord','translateVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function(){

                });
                wx.error(function(res){

                });
              }else{
                vm.$store.commit('setToastText','语音识别权限获取失败')
                vm.$store.commit('setToastType','warn')
              }
            })
            .catch((err)=>{
              console.log(err)
              vm.$store.commit('setToastText','语音识别权限获取失败!')
              vm.$store.commit('setToastType','warn')
            })
        })
      }

    },
    mounted(){


    },
    methods:{
      start(){
        console.log('start')
        this.aniState=true;
        this.openVoice();
      },
      end(){
        console.log('end')
        this.aniState=false;
        this.stopVoice();
      },
      stopVoice() {
        console.log('stopVoice')
        wx.stopRecord({
          success: (res)=>{
            var localId = res.localId;
            console.log(localId)
            this.voiceId = localId;
          },
          fail:()=>{
            this.voiceId = '';
          }
        });
        setTimeout(()=>{
          console.log('translateVoice')
          wx.translateVoice({
            localId: this.voiceId, // 需要识别的音频的本地Id，由录音相关接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success:(res)=>{
//              alert(res.translateResult); // 语音识别的结果
              this.$router.push({path:'/y/perfectVoice',query:{scName:res.translateResult}})
            },
            fail:()=>{
              this.$store.commit('setToastText','无法识别')
              this.$store.commit('setToastType','warn')
            }
          });
        },500)
      },
      openVoice() {
        console.log('openVoice')
        wx.startRecord({
          success: ()=>{
            this.voiceId = '';
          },
          fail:()=>{
            this.voiceId = '';
            this.aniState=false;
          },
        });
      },
    }
  }
</script>
<style scoped>
  *{
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }
  /*公告*/
  .notice{padding-top:3.86rem;text-align:center;}
  .notice p:first-child{font-size:0.34rem;color: #3a3a3a;line-height:0.48rem;}
  .notice p:last-child{width:5.39rem;margin:0.3rem auto 0; font-size:0.3rem;color: #6b6b6b;line-height:0.48rem;}
  /*底部*/
  .footer{position: fixed; bottom:0.6rem;left:50%;transform: translate(-50%,0);}
  .footer img{width:1.6rem;height:1.6rem;}
  .footer p{font-size:0.24rem;line-height:1.4rem;text-align:center;color: #6b6b6b;}

  #yuyinBox{position: relative;top:0;left:0;width:1.6rem;height: 1.6rem;}
  #yuyin{position: absolute;transform: translate(-50%,-50%);top:50%;left: 50%;border-radius: 50%;border-style:solid;border-color:#ecd0c6;width:100%;height: 100%;background: url("./yuyin.png");background-size: 100% 100%;}
  .ani{-webkit-animation:trans 1s infinite linear;}
  @-webkit-keyframes trans {
    0%{
      border-width:1px;
    }
    100%{
      border-width:24px;
    }
  }
</style>
