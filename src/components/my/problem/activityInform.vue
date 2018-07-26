<template>
  <div class='activityInform'>
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--中部-->
    <div class="center" v-html="infoIdData.content">

    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from '@/components/my/common/xHeader'
  import { informationDetails } from "@/api/service";
  export default{
    data(){
      return{
        top:"关于奈斯牛的活动通知",
        infoId:'',
        infoIdData:{}
      }
    },
    props:{

    },
    components:{xHeader},
    mounted(){
      this.infoId = this.$route.query.infoId;
      this.top = this.$route.query.title;
      console.log(this.infoId)
      informationDetails({infoId:this.infoId}).then( res => {
        console.log('消息詳情结果', res)
        if(res.message == 'success'){
          this.infoIdData = res.data
        }else {

        }
      })
    },
    methods:{

    },
  }
</script>
<style>
    .center{padding:46px 0.4rem 0;}
    .center p{font-size:0.3rem;color: #333333;line-height:0.48rem;}
    .center p:first-child{margin-top:0.44rem;}
    .center img{width:100%;height:3rem;}
</style>
