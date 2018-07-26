<template>
  <div class="coupunblue">
    <div class="meney_one">
      <div>￥{{datas.price}}</div>
      <div>
        <p>{{datas.shop_name}}</p>
        <p>满{{datas.restrict_price}}元可用</p>
      </div>
    </div>
    <div class="time">
      使用期限：<span v-for="(item,index) in times" v-if="index<3">{{item}}.</span>  ~  <span v-for="(item,index) in times1" v-if="index<3">{{item}}.</span>
    </div>
  </div>
</template>
<script>
  import { time } from '@/components/common/js/format'
  export default {
    data(){
      return{
        times:'',
        times1:''
      }
    },
    props:{
      datas:{
        type:Object,
        default:function () {
          return {}
        }
      }

    },
    mounted(){
      this.times = time(this.datas.begin_time)
      this.times1 = time(this.datas.end_time)
    },
    components:{},
    methods:{

    }
  }
</script>
<style scoped>
  .coupunblue{width:100%;height:2.4rem;background:url("../../img/youhui_bg2.png") no-repeat;background-size:100%;margin-bottom:0.3rem;}
  .coupunblue:last-child{margin:0;}

  .meney_one{display:flex; padding:0 0.2rem;justify-content: space-between;}
  .meney_one div:first-child{font-size:0.8rem;color:#fff;padding-top:0.3rem;}
  .meney_one div:last-child{padding-top:0.9rem;}

  .meney_one div p:first-child{font-size:0.32rem;color:#a45d2c;}
  .meney_one div p:last-child{font-size:0.24rem;color:#a45d2c;}

  .time{font-size:0.24rem;color:#666666;padding:0 0.2rem;line-height:0.8rem;}
</style>
