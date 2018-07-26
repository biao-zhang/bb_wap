<template>
  <div class='newsCentre'>
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <div class="xian"></div>
    <!--消息-->
    <div class="null" v-if="informationListData == '' || informationListData == null">
      <img src="./img/null.png" alt="">
      <p>暂无消息</p>
    </div>
    <div :style="{height:sliderHeight+'px'}">
      <pull-to
        :bottom-load-method="loadmore"
        :top-load-method="refresh"
      >
        <message v-if="informationListData" v-for="(item,index) in informationListData" :datas="item" :key="index"></message>
      </pull-to>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from '@/components/my/common/xHeader'
  import message from '@/components/my/problem/common/message'
  import { informationList } from "@/api/service";
  import PullTo from 'vue-pull-to'
  export default{
    data(){
      return{
        top:"消息中心",
        informationListData:[],
        pageNum: 1,
        pageSize:3,
        sliderHeight:0,  //滑动区域的高度
      }
    },
    props:{

    },
    components:{xHeader,message,PullTo},
    mounted(){
      this._informationList()
      setTimeout(()=>{ //计算滑动区域的高度
        this.sliderHeight = window.innerHeight-46;
      },20)

    },
    methods:{
      // 上拉加载
      loadmore(loaded) {
        this.pageNum ++
        setTimeout(() => this._informationList(loaded, 'loaded'), 1000)
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1
        setTimeout(() => this._informationList(loaded, 'refresh'), 1000)
      },

      _informationList(loaded, type){
        informationList({pageNum:this.pageNum,pageSize:this.pageSize,statusStr:0}).then( res => {
          console.log('消息结果', res)
          if(res.message == 'success'){
//            this.informationListData = res.data

            if (loaded) {
              if (type === 'refresh') this.informationListData = []  // 下拉刷新只显示第一页数据
              this.informationListData =  this.informationListData.concat(res.data);
              loaded('done');
            }  else {
              // 页面第一次加载的数据
              this.informationListData = res.data
            }
          }else {

          }
        })
      }
    },
  }
</script>
<style scoped>
    .newsCentre{background:#f5f5f5;}
    .xian{padding-top:46px;}
    .null{text-align:center;margin-top:3rem;}
    .null img{width:2.5rem;height:2.5rem;}
    .null p{line-height:1rem;color:#3c3c3c;}
</style>
