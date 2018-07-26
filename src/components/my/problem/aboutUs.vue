<template>
  <div class='aboutUs'>
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--头-->
    <!--<div class="logo1">-->
      <!--<img src="../img/logo_1.png" alt="">-->
      <!--<p>version v1.1.1</p>-->
    <!--</div>-->
    <!--尊敬的用户-->
    <div class="aboutUs-yonghu" v-html="aboutData.content">
        <!--<p>尊敬的用户：</p>-->
        <!--<p>在您成为奈斯牛会员，使用奈斯牛提供的服务之前，请您认真阅读本用户协议及隐私政策，更好的了解我们所提供的服务以及您享有的权利义务。您开始使用奈斯牛提供的服务，即表示您已经确认并接受了本文件中的全部条款。在您成为奈斯牛会员，使用奈斯牛提供的服务之前，请您认真阅读本用户协议及隐私政策，更好的了解我们所提供的服务以及您享有的权利义务。您开始使用奈斯牛提供的服务，即表示您已经确认并接受了本文件中的全部条款。</p>-->
        <!--<p>协议声明</p>-->

    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from '@/components/my/common/xHeader'
  import { aboutUs  } from "@/api/shop"
  export default{
    data(){
      return{
        top:"关于我们",
        aboutData:{}
      }
    },
    props:{

    },
    components:{xHeader},
    mounted(){
      aboutUs({tid:1,type:0}).then( res => {
        console.log('关于我们', res)
        if(res.message == 'success'){
          this.aboutData = res.data
        }else {

        }
      })
    },
    methods:{

    },
  }
</script>
<style>
  /*.lContent{background:#fff;}*/
    /*.logo1{padding-top:46px;width:100%;text-align:center;}*/

    /*.logo1 img{width:3.02rem;display: inline-block;margin-top:0.4rem;}*/
    /*.logo1 p{color: #9a9a9a;line-height:0.5rem;font-size:0.28rem;}*/

    .aboutUs-yonghu{width: 100%;padding:46px 0.3rem 0;box-sizing: border-box;}
    .aboutUs-yonghu p img{width: 3.02rem;display: inline-block;margin-top: 0.4rem;}
    .aboutUs-yonghu p{font-size: 0.28rem;color: #333333;line-height: 0.58rem;text-align: left;}
</style>
