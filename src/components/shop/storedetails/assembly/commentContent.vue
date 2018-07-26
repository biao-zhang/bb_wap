<template>
  <div class='commentContent'>
    <div class="assess_top">
      <div class="left_one">
        <!--../../img/ban1.png-->
        <img :src="datas.portrait" alt="">
        <p>{{ datas.userName }}</p>
      </div>
      <div class="right_one">{{ timeStamp }}</div>
    </div>
    <!--评价内容-->
    <div class="assess_center">
      <p>{{ datas.evaluateContent }}</p>
      <!--滑动图-->
      <div class="assess_img">
        <div class="images1">
          <div class="img1"  v-for="(item,index) in datas.evaluateImg" :key="index">
            <img :src="item" alt="">
          </div>
        </div>
      </div>
      <!--追加评论-->
      <evaluation-add v-if="datas.evaluateVO" :item-children="datas.evaluateVO"> </evaluation-add>
      <!--规格-->
      <p>规格：{{ datas.goodsSpecs }}</p>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import evaluationAdd from '@/components/shop/storedetails/assembly/evaluationAdd'
  export default{
    components:{
      evaluationAdd
    },
    data(){
      return{

      }
    },
    computed: {
      timeStamp() {
        return this.timestampToTime(this.datas.createTime)
      }
    },
    props: ['datas'],
    mounted(){

    },
    methods:{
      // 时间戳
      timestampToTime(timestamp) {
        let formatTime = (a) => parseInt(a) < 10 ? '0' + parseInt(a) : parseInt(a)
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let year = date.getFullYear() + '-';
        let month = formatTime(date.getMonth()+1) + '-';
        let day = formatTime(date.getDate()) + ' ';
        let hours = formatTime(date.getHours()) + ':';
        let minutes = formatTime(date.getMinutes());
        /*let seconds = formatTime(date.getSeconds());*/
        return year + month + day + hours + minutes
      }
    },
  }
</script>
<style scoped>
  .xian{
    width:100%;
    height:0.1rem;
    background:#f5f5f5;
  }
  .evaluate_top{
    margin-top:0.1rem;
    padding:0.2rem;
    display:flex;
    justify-content: space-between;
  }
  .evaluate_top span{
    padding:0.12rem 0.2rem;
    font-size:0.24rem;
    color:#fd593d;
    border:1px solid #fd593d;
    border-radius:0.4rem;
  }
  /*评价区*/
  .assess{
    padding:0 0.2rem;
  }
  /*评价头*/
  .assess_top{
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding-top:0.2rem;
  }
  .left_one{
    display: flex;
    align-items:center;
  }
  .left_one img{
    width:0.9rem;
    height:0.9rem;
    border-radius:50%;
    border:0.06rem solid #ffb47f;
  }
  .left_one p{
    font-size:0.3rem;
    color:#333333;
    font-weight:600;
    margin-left:0.16rem;
  }
  .right_one{
    font-size:0.24rem;
    color:#9a9a9a;
  }
  /*评价内容*/
  .assess_center{
    padding:0 0 0.3rem 1rem;
    border-bottom:1px solid #ededed;
  }
  .assess_center p:first-child{
    font-size:0.28rem;
    color:#6b6b6b;
    line-height:0.5rem;
  }
  .assess_center p:last-child{
    font-size:0.24rem;
    color:#9a9a9a;
    line-height:0.4rem;
  }
  /*滑动图*/
  .assess_img{
    overflow: auto;
    margin:0.3rem 0;
  }
  .images1{
    display: -moz-box;
    display: -webkit-box;
    display: box;
  }
  .images1 .img1{
    width:1.4rem;
    height:1.4rem;
    margin-left:0.2rem;
    display: flex;
  }
  .images1 div:first-child{
    margin:0;
  }
  .images1 img{
    width:100%;
    height:100%;
  }
  ::-webkit-scrollbar{
    display:none;
  }
</style>
