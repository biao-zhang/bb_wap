<template>
  <div class='serviceOne'>
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--常见问题-->
    <div class="service">
        <p>常见问题</p>
        <div class="list">
          <serve-list v-for="(item,index) in problemListData" :key="index" :datas="item"></serve-list>
        </div>
    </div>
    <!--底部-->
    <div class="foot">
      <router-link :to="{path:'/z/tickProblem'}">
        <div>意见反馈</div>
      </router-link>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from '@/components/my/common/xHeader'
  import serveList from '@/components/my/touchservice/common/serveList'
  import { problemList } from "@/api/service";
  export default{
    data(){
      return{
        top:"联系客服",
        problemListData:[], //问题列表
      }
    },
    props:{

    },
    components:{xHeader,serveList},
    mounted(){
      problemList({infoId:this.infoId}).then( res => {
        console.log('问题列表', res)
        if(res.message == 'success'){
          this.problemListData = res.data
        }else {

        }
      })
    },
    methods:{

    },
  }
</script>
<style scoped>
    .service{padding:46px 0.3rem 0;}
    .service p{margin-top:0.3rem;color: #333333;font-size:0.34rem;line-height:1rem;}

    .list{display: flex;flex-wrap: wrap;justify-content: space-between;}

    .foot{display:flex;position:fixed;bottom:0;height:1.2rem;width:100%;text-align:center;line-height:1.2rem;}
    .foot a{width:100%;background:#f15352;color:#fff;font-size:0.32rem;}
</style>
