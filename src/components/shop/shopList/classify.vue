<template>
  <div class="shopIndex">
    <x-header></x-header>
    <div class="pullTos" ref="pullTos">
      <div class="pullToLBox">
        <pull-to >
          <div class="pullToLContainer">
            <ul class="ul1">
              <li v-for="(item,index) in ClassOneData.data" :class="{pullToLActive:lCurIndex==index}" @click="leftNavClick(index,item.categoryId)">{{item.categoryName}}</li>
            </ul>
          </div>
        </pull-to>
      </div>
      <div class="pullToRBox" v-if="ClassTwoData.data != 0">
        <!--<pull-to :top-load-method="refresh" :top-config="topConfig" @top-state-change="topChangeState" :bottom-load-method="load" :bottom-config="bottomConfig" @bottom-state-change="bottomChangeState" @infinite-scroll="theEnd">-->
        <pull-to>
          <div class="pullToRContainer">
            <div class="floor" v-for="(item,index) in ClassTwoData.data">
              <div class="tit">{{item.categoryName}}</div>
              <ul class="ul2">
                <li v-for="(item,index) in item.list">
                  <router-link :to="{path:'/x/shopGoodsList',query:{shopGoodsListTitle:item.categoryName,categoryId:item.categoryId}}">
                    <classify-item :datas="item"></classify-item>
                  </router-link>
                </li>
              </ul>
            </div>
            <!--<div class="floor">-->
              <!--<div class="tit">进口牛奶</div>-->
              <!--<ul class="ul2">-->
                <!--<li v-for="item in data"><classify-item></classify-item></li>-->
              <!--</ul>-->
            <!--</div>-->
          </div>
        </pull-to>
      </div>
      <div class="kong" v-else style="flex:1;">
        <img src="./img/kong.png" alt="">
        <p>暂无该分类商品</p>
      </div>
    </div>
  </div>
</template>
<script>
  import PullTo from 'vue-pull-to'
  import {mapMutations} from 'vuex'
  import xHeader from '@/components/shop/common/xHeader'
  import classifyItem from '@/components/shop/shopList/components/classifyItem'

  const TOP_DEFAULT_CONFIG = {
    pullText: '下拉刷新', // 下拉时显示的文字
    triggerText: '释放更新', // 下拉到触发距离时显示的文字
    loadingText: '加载中...', // 加载中的文字
    doneText: '加载完成', // 加载完成的文字
    failText: '加载失败', // 加载失败的文字
    loadedStayTime: 400, // 加载完后停留的时间ms
    stayDistance: 50, // 触发刷新后停留的距离
    triggerDistance: 70 // 下拉刷新触发的距离
  }
  const BOTTOM_DEFAULT_CONFIG = {
    pullText: '',
    triggerText: '',
    loadingText: '',
    doneText: '',
    failText: '',
    loadedStayTime: 400,
    stayDistance: 0,
    triggerDistance: 30
  }

  export default {
    data(){
      return{
        pullTosHeight:0,   //LR滚动的高度
        topConfig:TOP_DEFAULT_CONFIG,
        bottomConfig:BOTTOM_DEFAULT_CONFIG,

        data:[1,2,3,4,5],
        lCurIndex:0,

        categoryIdOne:''  //第0个

      }
    },
    components:{PullTo,xHeader,classifyItem},
    computed: {
      // 查询一级分类列表
      ClassOneData() {
        return this.$store.state.eightClassify.ClassOneDatas

      },
      // 查询二级分类列表
      ClassTwoData() {
        return this.$store.state.eightClassify.ClassTwoDatas
      }
    },
    mounted(){
      var that = this;
      setTimeout(function () {
        that.pullTosHeight = window.innerHeight-46;
      },20)
//      获取一级分类
      this.$store.dispatch({
        type: 'eightClassify/getClassOne',
      })

    },
    methods:{
      //    mapMutations
      ...mapMutations('page',[
        'bottomChangeState',    //bottom文字
        'topChangeState',         //top文字
        'theEnd'         //top文字
      ]),
      //      下拉刷新
      refresh(loaded) {
//        this.pageLoadF=loaded;
//        setTimeout(() => {
//          this.pagenum=1;
//          this.getData(1,this.pagesize,this.userId,1)
//        }, 2000);
      },
//      上拉加载更多
      load(loaded){
//        this.pageLoadF=loaded;
//        setTimeout(() => {
//          this.pagenum++;
//          this.getData(this.pagenum,this.pagesize,this.userId,2)
//        },2000)
      },
      //切换左侧nav
      leftNavClick(index,categoryId){
        this.lCurIndex=index;
        this.$store.dispatch({
          type: 'eightClassify/getClassTwo',
          categoryId:categoryId
        })
      }
    }

  }



</script>
<style scoped>
  .shopIndex{background-color: #f5f5f5;height: 100%;}

  .pullTos{width:100%;height: 100%;padding-top:54px;box-sizing: border-box;display: flex;justify-content: space-between}
  .pullTos .pullToLBox{width:2rem;height: 100%;}
  .pullTos .pullToLBox .pullToLContainer .ul1{background-color: #f5e7dd;}
  .pullTos .pullToLBox .pullToLContainer .ul1 li{height: 1.15rem;text-align: center;line-height: 1.15rem;font-size: 0.3rem;color:#222;}
  .pullTos .pullToLBox .pullToLContainer .ul1 li.pullToLActive{background-color: white;color:#f86e0e;}



  .pullTos .pullToRBox{width:5.4rem;height: 100%;}
  .pullTos .pullToRBox .pullToRContainer{margin-top:0.03rem;}
  .pullTos .pullToRBox .pullToRContainer .floor{background-color: white;width:5.35rem;margin-left:0.05rem;margin-bottom: 0.2rem;box-shadow: 0px 3px 6px #ccc;}
  .pullTos .pullToRBox .pullToRContainer .floor .tit{line-height: 0.6rem;text-align: center;font-size: 0.3rem;color:#333;}
  .pullTos .pullToRBox .pullToRContainer .floor .ul2{display: flex;width: 100%;flex-wrap: wrap;}

  .kong{text-align:center;}
  .kong img{width:2.5rem;height:2.5rem;margin-top:1rem;}
  .kong p{line-height:1rem;color:#6a6965;font-size:0.3rem;}
</style>
