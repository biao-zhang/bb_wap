<template>
  <div class='facilitatorIn'>
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <div class="cen">
      <p>为进一步了解我校学生对我校各方面的存在的态度和看法，以便更好地建设我校各项事业，现决定开展 “我为学校建言献策”活动，具体通知如下： 1． 活动对象：顺德校区全体学生；  2． 参与方式：各学院学生会组织所在学院的学生参加本次 活动，并将每一位学生对于学校各方面的意见和建议收集起来，整理统计后做成活动报告并提交至学生联合会办公室；  3． 活动截止时间为2010年11月14日 ，活动报告送交截 止时间为2010年11月19日。纸质版报告须于办公室值班时间送交，电子版报告发送至xxxxxxxxx@126.com</p>
    </div>
    <div class="wang">
      <a href="#">入驻网址：www.baidu.com</a>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from '@/components/my/common/xHeader'

  export default{
    data(){
      return{
        top:"服务商入驻"
      }
    },
    props:{

    },
    components:{xHeader},
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
    .cen{padding-top:46px;}
    .cen p{margin-top:0.58rem;padding:0 0.4rem;font-size:0.3rem;color: #333333;line-height:0.48rem;}

    .wang{text-align:center; margin-top:2.2rem;}
    .wang a{font-size:0.3rem;color:#f86e0e;line-height:0.4rem;}
</style>
