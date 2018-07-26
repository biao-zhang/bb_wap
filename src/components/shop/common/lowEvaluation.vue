<template>
  <div class="lowEvaluation">
    <div v-if="datas!=null">
      <div @click="comment">
        <div class="all_low">
          <div class="num">
            评价（{{datas.totalCount}}）
          </div>
          <div class="all">
            <div class="all_all">全部评论</div>
            <div class="right">
              <img src="../img/right.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <!--默认1-->
      <div class="evaluateOne">
        <div class="oneTop">
          <div class="portrait">
            <div>
              <img :src='datas.portrait' alt="">
            </div>
            <span>{{datas.userName}}</span>
          </div>
          <div class="time">
            2018-1-20
          </div>
        </div>
        <!--主题-->
        <div class="subject">
          <p>{{datas.evaluateContent}}</p>
          <p>规格：{{datas.goodsSpecs}}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <div @click="comment">
        <div class="all_low">
          <div class="num">
            暂无评价
          </div>
          <div class="all">
            <div class="all_all">全部评论</div>
            <div class="right">
              <img src="../img/right.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { time } from '@/components/common/js/format'
  export default {
    data(){
      return{

      }
    },
    props:['datas'],

    methods: {
      comment(){
        this.$emit('toDiscuss')
      },

    }
  }
</script>
<style scoped>
    .all_low{
      padding:0.2rem 0.2rem;
      display:flex;
      justify-content:space-between;
      /*justify-content:space-between;*/
      align-items: center;
      border-bottom:1px solid #f5f5f5;
    }
  .all{
    display:flex;
  }
  .num{
    font-size:0.3rem;
    color:#3c3c3c;
    font-weight:600;
  }
  .all_all{
    font-size:0.24rem;
    color:#f86e0e;
    font-weight:600;
  }
    .right{
      width:0.18rem;
      height:0.29rem;
      padding-left:0.1rem;
    }
    .right img{
      width:0.18rem;
      height:0.29rem;
    }
  /*评价第一条*/
  .evaluateOne{
    padding:0.16rem 0.2rem;
  }
  .oneTop{
    display: flex;
    padding:0.04rem 0;
    align-items: center;
    justify-content: space-between;
  }
  .portrait{
    display:flex;
    align-items: center;
  }
    .portrait img{
      width:0.7rem;
      height:0.7rem;
      border:0.06rem solid #ffb47f;
      border-radius:50%;
    }
  .portrait span{
    padding-left:0.12rem;
    color:#3c3c3c;
    font-size:0.3rem;
    font-weight:600;
  }
  .time{
    font-size:0.24rem;
    color:#9a9a9a;
  }
  /*主体*/
  .subject p:first-child{
    font-size:0.3rem;
    color:#6b6b6b;
    font-weight:600;
    line-height:0.55rem;
  }
    .subject p:last-child{
      font-size:0.24rem;
      color:#9a9a9a;
      font-weight:600;
      line-height:0.45rem;
    }
  .wu{width:100%;height:2rem;line-height:2rem;text-align:center;color:#999;}
</style>
