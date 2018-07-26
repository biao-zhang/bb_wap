<template>
  <div class="work">
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--头部-->
    <div class="work_top">
      <img src="../img/naibtn.png" alt="" @click="xiazai">
    </div>
    <!--中部-->
    <div class="center">
        <p>为进一步了解我校学生对我校各方面的存在的态度和看法，以便更好地建设我校各项事业，现决定开展 “我为学校建言献策”活动，具体通知如下： 1． 活动对象：顺德校区全体学生；  2． 参与方式：各学院学生会组织所在学院的学生参加本次 活动，并将每一位学生对于学校各方面的意见和建议收集起来，整理统计后做成活动报告并提交至学生联合会办公室；  3． 活动截止时间为2010年11月14日 ，活动报告送交截 止时间为2010年11月19日。纸质版报告须于办公室值班时间送交，电子版报告发送至xxxxxxxxx@126.com</p>
    </div>
  </div>
</template>
<script>
  import xHeader from '@/components/my/common/xHeader'
  export default {
    data(){
      return{
        top:"帮工入驻"
      }
    },
    components:{xHeader},
    methods: {
      xiazai() {
        console.log(123)
      }
    }
  }
</script>
<style scoped>
    .work{padding-top:46px;}

    .work_top{width:100%;height:4rem;background:url("../img/nai1.png") no-repeat;background-size:100%;margin-top:0.1rem;overflow: hidden;}
    .work_top img{width:4.44rem;display:flex;margin:2.7rem auto 0;}

    .center{width:7.1rem;margin:0.24rem auto 0; background:#fff; padding:0.4rem 0.4rem 1rem 0.4rem; box-sizing:border-box;box-shadow:0 0 5px #ccc;}
    .center p{font-size:0.3rem;line-height:0.48rem;letter-spacing: 0px;color: #333333;font-family: PingFangSC-Regular;font-weight: norma;}
</style>
