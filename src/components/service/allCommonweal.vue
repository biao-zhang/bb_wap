<template>
  <div class="bb_page">
    <xHeader :msg="tit"></xHeader>
    <div class="content">
        <scroller :on-infinite="loadmore" :on-refresh = "refresh">
          <div class="navBox" ref="navBox">
            <div class="navBg">
              <img @click="changeNavState" v-if="navState" src="./img/commonwealNavIng.png">
              <img v-if="!navState" src="./img/commonwealNavIng1.png">
              <img @click="changeNavState" v-if="!navState" src="./img/commonwealNavDone.png">
              <img v-if="navState" src="./img/commonwealNavDone1.png">
            </div>
          </div>

          <div class="listBox" v-if="seeMoreListData!=''" style="height:100%;">

            <div class="commonwealItemBox" v-for="(item,index) in seeMoreListData" :key="index">
              <router-link :to="{path: '/x/commonwealDetail', query: {orderId: item.orderId}}">
                <commonweal-list-item :datas="item"></commonweal-list-item>
              </router-link>
            </div>

          </div>

          <div class="null" v-if="seeMoreListData == ''">
            <img src="./img/null.png" alt="">
            <p>暂无公益活动~</p>
          </div>
        </scroller>
      </div>
  </div>
</template>
<script>
  import xHeader from "@/components/my/common/xHeader";
  import commonwealListItem from '@/components/common/commonwealListItem'
  import { seeMoreList } from "@/api/service";

  import VueScroller from "vue-scroller";
  import Vue from "vue";
  Vue.use(VueScroller);

  export default {
    data(){
      return{
        tit:'公益更多',
        contentHeight:0,         //滑动的height
        navState:false,           //nav状态

        welfareState:3,
        adcode:'',
        pageNum:1,
        pageSize:4,

        seeMoreListData:[]
      }
    },
    components:{xHeader,commonwealListItem},
    mounted(){
      var that = this;
      setTimeout(function () {
        that.contentHeight = window.innerHeight-46-that.$refs.navBox.clientHeight;
      },20)
      this.adcode = localStorage.getItem('curCityAdcode');
      this._seeMoreList()
    },
    methods:{
      // 上拉加载
      loadmore(loaded) {
        this.pageNum++;
        setTimeout(() => this._seeMoreList(loaded, "loaded"), 1000);
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1;
        setTimeout(() => this._seeMoreList(loaded, "refresh"), 1000);
      },

      _seeMoreList(loaded, type){
        seeMoreList({welfareState:this.welfareState,adcode:this.adcode,pageNum:this.pageNum,pageSize:this.pageSize}).then(res => {
          console.log('接收分类公益列表',res)
//          if(res.message = 'success'){
//            this.seeMoreListData = res.data
//          }
          if (loaded) {
            if (type === "refresh") this.seeMoreListData = []; // 下拉刷新只显示第一页数据

            this.seeMoreListData = this.seeMoreListData.concat(res.data);

            loaded("done");

            console.log("接收分类公益列表", this.seeMoreListData);
          } else {
            // 页面第一次加载的数据
            this.seeMoreListData = res.data;
          }
        })
      },
      changeNavState(){
        this.navState = !this.navState;
        console.log(this.navState)
        if(this.navState){
          this.welfareState = 4
          this.pageNum = 1
          this._seeMoreList()
        }else {
          this.welfareState = 3
          this.pageNum = 1
          this._seeMoreList()
        }
      }
    }
  }

</script>
<style scoped>
  .bb_page{background-color: #f5f5f5}

  .content{padding-top:46px;}
  .content .navBox{padding:0.2rem 0 0.3rem;}
  .content .navBg{display:flex;width:7.1rem;height: 2.6rem;margin:auto;border-top-left-radius: 0.1rem;border-top-right-radius: 0.1rem;background-color: #ebb085;justify-content: space-around;}
  .content .navBg img{width:1.8rem;height:1.8rem;margin-top:0.48rem;}

  .listBox{background-color: white;overflow: scroll}
  /*公益*/
  .commonwealItemBox{width:7.1rem;margin:0 auto;padding: 0.25rem 0;border-bottom:1px solid #ededed}
  /*.commonwealItemBox:last-child{border:0;}*/
  .null{text-align:center;margin-top:2rem;}
  .null img {width: 4.36rem;height: 3.08rem;}
  .null p{ color: #333;
    font-size: 0.3rem;
    line-height:0.8rem;}
  ._v-container>._v-content{padding-top:46px;}
  ._v-container{position:static;overflow:visible;}
</style>
