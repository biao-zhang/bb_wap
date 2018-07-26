<template>
  <div class='familiarProblem'>
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <div class="xian"></div>
     <!--问题-->
      <!--<problem v-for="(item,index) in 6" :key="index"></problem>-->
    <div class="center_center" v-html="problemDetails">

    </div>
    <!--底部-->
    <div class="foot">
        <p class="pOne">没有找到相关问题？</p>
        <p class="ptwo">
          <a style="color:#f86e0e" :href="'tel:'+'400-113-7166'">400-113-7166</a>
        </p>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from '@/components/my/common/xHeader'
  import problem from '@/components/my/problem/common/problem'
  import { problemDatails } from "@/api/service";
  export default{
    data(){
      return{
        top:"常见问题",
        problemId:"",
        problemDetails:''
      }
    },
    components:{xHeader,problem},
    props:{

    },
    mounted(){
      this.problemId = this.$route.query.problemId;
      problemDatails({id:this.problemId}).then( res => {
        console.log('问题详情', res)
        if(res.message == 'success'){
          this.problemDetails = res.data
        }else {

        }
      })
    },
    methods:{

    },
  }
</script>
<style>
    .familiarProblem{width:100%;background:#fff;box-sizing:border-box;height:12rem;overflow: scroll;}

    .xian{height:0.1rem;background:#f5f5f5;}

    /*.foot{position:absolute; margin: 0 auto; bottom:0.8rem; text-align: center;left:0;right:0;}*/
    /*.foot{text-align:center;margin:0.6rem 0;}*/
    /*.foot p{display:inline-block;font-size:0.24rem;}*/
    /*.pOne{padding-right:0.1rem;border-right:1px solid #3a3a3a;color: #999999;}*/
    /*.ptwo{padding-left:0.1rem;color: #f86e0e;}*/

    .foot{text-align: center;position: fixed;left: 0; right: 0;bottom:0; height:1.35rem;line-height:1.35rem;background:#fff;}
    .foot p{display:inline-block;font-size: 0.24rem;}
    .pOne{padding-right: 0.1rem;color: #999999;}
    .ptwo{padding-left: 0.1rem;color: #f86e0e;}

    .center_center{padding:46px 0.4rem 0;}
    .center_center p{font-size: 0.28rem;color: #333333;}
    /*.top_foot{display:flex;width:100%;height:0.6rem;line-height:0.6rem;align-items:center;box-sizing: border-box}*/
    /*.top_foot p{flex:1;font-size: 0.28rem;color: #333333;}*/
</style>
