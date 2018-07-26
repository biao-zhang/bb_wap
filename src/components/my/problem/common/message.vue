<template>
  <div class='message'>
    <router-link  :to="{path:'/y/activityInform',query: {infoId:datas.infoId,title:datas.title}}">
        <div class="time">{{createTime[0]}}.{{createTime[1]}}.{{createTime[2]}}   {{createTime[3]}}:{{createTime[4]}}</div>
        <!--框-->
        <div class="kuang">
          <div class="top_1">
            <img src="../../img/dian1.png" alt="">
            <p>{{datas.title}}</p>
          </div>
          <div class="top_img">
            <img :src="datas.bannerUrl" alt="">
          </div>
          <div class="top_foot">
            <p>查看详情</p>
            <img src="../../img/right1.png" alt="">
          </div>
        </div>
    </router-link>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { time } from "../../../../untils/untils";

  export default{
    data(){
      return{
        createTime:''
      }
    },
    props:{
      datas:{
        type: Object,
        default: () => {}
      }
    },
    mounted(){
      this.createTime = time(this.datas.createTime)
    },
    methods:{

    },
  }
</script>
<style scoped>
    .message{padding:0 0.2rem;}

    .time{line-height:0.7rem;text-align:center;color: #999999;font-size:0.24rem;}

    .kuang{background:#fff;padding:0.15rem;box-sizing:border-box;}
    .top_1{display:flex;display: -webkit-box;height:0.65rem;line-height:0.65rem;}
    .top_1 img{width:0.14rem;height:0.14rem;margin-right:0.1rem;}
    .top_1 p{color: #333333;font-size:0.3rem;}

    .top_img img{width:100%;height:3rem;}

    .top_foot{display:flex;width:100%;height:0.6rem;line-height:0.6rem;align-items:center;box-sizing: border-box}
    .top_foot p{flex:1;color: #999999;font-size:0.24rem;}
    .top_foot img{width:0.15rem;height:0.3rem;line-height:0.6rem;}
</style>
