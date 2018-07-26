<template>
  <div class='awardExplain'>
    <xHeader :msg="tit"></xHeader>
    <div class="center_1" v-html="gradeDatas"></div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { gradeData } from "@/api/shop";
  import xHeader from "@/components/my/common/xHeader";
  export default{
    components: {
      xHeader
    },
    data(){
      return{
        tit: "奖励说明",
        gradeDatas:''
      }
    },
    props:{

    },
    mounted(){
      gradeData({tid:7,type:0}).then( res => {
        console.log('奖励说明', res)
        if(res.message == 'success'){
          this.gradeDatas = res.data.content
        }else {

        }
      })
    },
    methods:{


    },
  }
</script>
<style scoped>
    .awardExplain{height:100%;    background: #fff;}
    .center_1{padding:46px 0.2rem 0.2rem 0.2rem;background:#fff;width:100%;box-sizing:border-box;}
    .center_1>>>p img{width:100%;height: 100%;}
</style>
