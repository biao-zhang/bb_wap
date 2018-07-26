<template>
  <div class='gradeClass'>
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--线-->
    <div class="xian"></div>
    <!--背景-->
    <div class="grade_top">
        <div class="top_one">
          <div class="logo">
            <img :src="gradeDatas.portrait" alt="">
            <div class="dengji">
              <img :src="gradeDatas.level" alt="">
            </div>
          </div>

        </div>
        <div class="top_two">
          <p>{{gradeDatas.nickName}}</p>
          <!--<p>我的经验值110，距离下次升级还需200经验值</p>-->
        </div>
    </div>
    <!--说明-->
    <div class="explain" v-if="gradeDatas.helpCenter != null" v-html="gradeDatas.helpCenter.content">
        <!--<p>等级说明</p>-->
        <!--<p>-->
          <!--在您成为奈斯牛会员，使用奈斯牛提供的服务之前，请您认真阅读本用户协议及隐私政策，更好的了解我们所提供的服务以及您享有的权利义务。您开始使用奈斯牛提供的服务，即表示您已经确认并接受了本文件中的全部条款。在您成为奈斯牛会员，使用奈斯牛提供的服务之前，请您认真阅读本用户协议及隐私政策，更好的了解我们所提供的服务以及您享有的权利义务。您开始使用奈斯牛提供的服务，即表示您已经确认并接受了本文件中的全部条款。</p>-->
    </div>
    <div class="explain" v-else>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from '@/components/my/common/xHeader'
  import { gradeData } from "@/api/shop";
  export default{
    data(){
      return{
        top:"等级",
        gradeDatas:{
          helpCenter:{}
        },
      }
    },
    props:{

    },
    components:{xHeader},
    mounted(){
      var session_id = this.getCookie('session_id')
      gradeData({token:session_id,tid:5,type:0}).then( res => {
        console.log('等级', res)
        if(res.message == 'success'){
          this.gradeDatas = res.data
        }else {

        }
      })
    },
    methods:{
      //      获取
      getCookie (name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
          return unescape(arr[2]);
        else
          return null;
      },
    },
  }
</script>
<style scoped>
    .xian{width:100%;height:0.22rem;background:#f5f5f5;padding-top:46px;}
    .grade_top{width:7.1rem;height:4rem;margin:0 auto;background:url("../img/dengji_bg.png") no-repeat;background-size:100% 100%;overflow:hidden;}

    .top_one{border-radius:50%;margin-top:0.55rem;}
    .top_one .logo{width:1.21rem; height:1.21rem; border:0.05rem solid #faa87f;border-radius:50%;display:flex;margin:auto;position:relative;}
    .logo>img{width:100%;height:100%;border-radius:50%;}
    .logo img{width:100%;height:100%;}
    .top_two{text-align:center;}
    .top_two p:first-child{font-size:0.34rem;line-height:1rem;color: rgba(255, 255, 255, 0.6);font-family: HiraginoSansGB-W3;}
    .top_two p:last-child{font-size:0.26rem;line-height:1rem;color: #ffffff;}

    .explain{padding:0 0.3rem;}
    .explain p:first-child{text-align:center;margin:0;line-height:1.2rem;color: #333333;font-size:0.4rem;}
    .explain p:last-child{font-size:0.3rem;color: #333333;line-height:0.5rem;}

    .dengji{
      width:18px;
      height:18px;
      position:absolute;
      right:-6px;
      bottom:0;
      z-index:99;
    }
</style>
