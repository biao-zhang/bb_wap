<template>
  <div class='myColloct'>
    <div class="top" ref="header">
      <xHeader :msg="tit"></xHeader>
    </div>
    <!--nav-->
    <div class="tab1" ref="zhekouBox">
      <collect-tab @tabVal="tabVal" :data="navText" :curIndex="navIndex"></collect-tab>
    </div>
    <!--content-->
    <div class="content" :style="{'padding-top':groomH/100+'rem'}">
      <div v-show="navIndex===0">
        <div class="kong" v-if="this.workData == ''">
          <img src="./img/kong.png" alt="">
          <p>暂无该分类商品</p>
        </div>
        <swipeout v-else>
          <swipeout-item transition-mode="follow" v-for="(item,index) in workData" :key="index">
            <div slot="right-menu">
              <swipeout-button @click.native="deleteClick(item.helperId,index)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="outItem">
              <div class="item1ImgBox">
                <img v-if="item.portrait == '' || item.portrait == null" src="./img/logo_1.png" class="item1Img">
                <img v-else :src="item.portrait" class="item1Img">
              </div>
              <div class="item1ConBox">
                <div class="nameLine"><span class="s1 re-twoLineOverFlow">{{item.helperName}}</span>
                  <img v-if="item.workStatus  == 1" src="./img/mang.png" class="nameStateImg">
                  <img v-else="item.workStatus  == 2" src="./img/xian.png" class="nameStateImg">
                </div>
                <div class="starLine" v-if="item.helperLevel == 0">
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                </div>
                <div class="starLine" v-if="item.helperLevel == 1">
                  <img src="./img/smallStar.png" class="shineStar"/> 
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                </div>
                <div class="starLine" v-if="item.helperLevel == 2">
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                </div>
                <div class="starLine" v-if="item.helperLevel == 3">
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                </div>
                <div class="starLine" v-if="item.helperLevel == 4">
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStarNull.png" class="shineStar"/>
                </div>
                <div class="starLine" v-if="item.helperLevel == 5">
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStar.png" class="shineStar"/>
                  <img src="./img/smallStar.png" class="shineStar"/>
                </div>
              </div>
              <img src="./img/helpMePlease.png" class="btnLine1"/>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
      <div v-show="navIndex==1" style="height: 100%">
        <div class="kong" v-if="this.shopData == ''">
          <img src="./img/kong.png" alt="">
          <p>暂无该分类商品</p>
        </div>
          <scroller :on-infinite="loadmore" v-if="shopData!=''" style="padding-top:3rem"  :on-refresh = "refresh">
            <swipeout-item transition-mode="follow" v-for="(item,index) in shopData" :key="index">
              <div slot="right-menu">
                <swipeout-button @click.native="deleteClick1(item.collectionId,index)" type="warn">删除</swipeout-button>
              </div>
              <div slot="content" class="outItem1" @click="shopShop(item.isNew,item.goodsId)">
                <div class="item1ImgBox"><img :src="item.goodsImgMaster" class="item1Img"> </div>
                <div class="item1ConBox">
                  <div class="nameLine"><span class="s1 re-twoLineOverFlow">{{item.goodsName}}</span> </div>
                  <div class="starLine">￥{{item.goodsPrice}}</div>
                </div>
              </div>
            </swipeout-item>
          </scroller>
        </div>

      <div v-show="navIndex===2">
        <div class="kong" v-if="this.terminalShopData == ''">
          <img src="./img/kong.png" alt="">
          <p>暂无该分类商品</p>
        </div>
        <swipeout>
          <swipeout-item transition-mode="follow" v-for="(item,index) in terminalShopData" :key="index">
            <div slot="right-menu">
              <swipeout-button @click.native="deleteClick2(item.collectionId,index)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="outItem1">
              <router-link :to="{path:'/y/shopGoodsDetail',query:{recommendId:item.goodsId,goodsType:2,isShop:1}}">
              <div class="item1ImgBox"><img :src="item.goodsImgMaster" class="item1Img"> </div>
              <div class="item1ConBox">
                <div class="nameLine"><span class="s1 re-twoLineOverFlow">{{item.goodsName}}</span> </div>
                <div class="starLine">￥{{item.goodsPrice}}</div>
              </div>
              </router-link>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
      <!--<swiper v-model="navIndex" :show-dots="false" height="100%">-->
        <!--<swiper-item>-->
          <!--<div style="width: 100%;height: 100%;overflow: scroll">-->
            <!--<div style="overflow: scroll;background-color: white;">-->
              <!--<div class="flexBox">-->
                <!--<div class="flexItem" v-for="d in 10">-->
                  <!--<div class="img1Box"><img src="../img/juxing.png" class="img1"/> </div>-->
                  <!--<div class="nameLine"><span class="s1">王某某</span><img src="../img/juxing.png" class="nameStateImg"> </div>-->
                  <!--<div class="starLine">-->
                    <!--<img src="./img/smallStar.png" class="shineStar"/>-->
                    <!--<img src="./img/smallStar.png" class="shineStar"/>-->
                    <!--<img src="./img/smallStar.png" class="shineStar"/>-->
                    <!--<img src="./img/smallStar.png" class="shineStar"/>-->
                    <!--<img src="./img/smallStarNull.png" class="shineStar"/>-->
                  <!--</div>-->
                  <!--<router-link to="/service"><img src="./img/helpMePlease.png" class="btnLine"/></router-link>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</swiper-item>-->
        <!--<swiper-item>-->
          <!--<div style="width: 100%;height: 100%;overflow: scroll">-->
            <!--<div style="overflow: scroll;background-color: white;">-->
              <!--<div class="flexBox1">-->
                <!--&lt;!&ndash;d是 index&ndash;&gt;-->
                <!--<div class="flexItem1" :class="{'clo':flex2CurItem===d}" @click="flex2CurItem=d" v-for="d in 10">-->
                  <!--<img src="../img/juxing.png" class="img2"><img src="./img/img2Close.png" class="img2Close" :class="{'block':flex2CurItem===d}"/>-->
                  <!--<div class="flexItem1Name">房价将飞机飞机</div>-->
                  <!--<div class="flexItem1Price">￥100.00</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</swiper-item>-->
      <!--</swiper>-->
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import {Swiper,SwiperItem} from 'vux'
  import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
  import collectTab from '@/components/my/myCAndCAndO/common/collectTab'
  import xHeader from "@/components/my/common/xHeader"
  import {getStore,setStore} from "@/untils/storage"
  import { collectWork , deleteWork } from "@/api/personally"
  import { collectCommodity , deleteCommodity } from "@/api/shop"

  import VueScroller from "vue-scroller";
  import Vue from "vue";
  Vue.use(VueScroller);
  export default {
    data(){
      return{
        groomH:0,   //LR滚动的高度
        tit:'我的收藏',
        navIndex:0,
        navText:{12:{id:0, text:"帮工",}, 13:{id:0, text:"商品"},14:{id:0, text:"终端商品",}},
        flex2CurItem:-1,
        workData:[], //收藏帮工数据
        shopData:[], //收藏商品数据
        terminalShopData:[], //收藏终端商品数据
        flag:'',
        pageNum: 1,
        pageSize: 5,
      }
    },
    components:{xHeader,Swiper,SwiperItem,collectTab,Swipeout, SwipeoutItem, SwipeoutButton},
    mounted(){
      var that = this;
      
      if(getStore('myCollectIndex')=='0')
      {
        this.navIndex = 0;
      }
      else if(getStore('myCollectIndex')=='1'){
        this.navIndex = 1;
      }
      else{
        this.navIndex = 2;
      }
      setTimeout(function () {
        console.log(window.innerHeight)
        console.log(that.$refs.header.clientHeight)
        console.log(that.$refs.zhekouBox.clientHeight)
        that.groomH = that.$refs.header.clientHeight+that.$refs.zhekouBox.clientHeight;
      },20)
      this._collectCommodity()
      //收藏帮工
      collectWork({pageNum:1,pageSize:10}).then( res => {
        console.log('收藏帮工结果', res)
        if(res.message == 'success'){
          this.workData = res.data
        }else {

        }
      })
      //收藏终端商品
      collectCommodity({pageNum:1,pageSize:10,shopType:1}).then( res => {
        console.log('收藏终端商品结果', res)
        if(res.message == 'success'){
          this.terminalShopData = res.data
        }else {

        }
      })
    },
    methods:{
      
      // 上拉加载
      loadmore(loaded) {
        this.pageNum++;
        setTimeout(() => this._collectCommodity(loaded, "loaded"), 1000);
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1;
        setTimeout(() => this._collectCommodity(loaded, "refresh"), 1000);
      },

//      收藏商品
      _collectCommodity(loaded, type){
        //收藏商品
        collectCommodity({pageNum:this.pageNum,pageSize:this.pageSize,shopType:2}).then( res => {
          console.log('收藏商品结果', res)
          if (loaded) {
            if (type === "refresh") this.shopData = []; // 下拉刷新只显示第一页数据

            this.shopData = this.shopData.concat(res.data);

            loaded("done");

            console.log("b2c所有新品推荐列表", this.shopData);
          } else {
            // 页面第一次加载的数据
            this.shopData = res.data;
          }
        })
      },
















      tabVal(a){
        this.navIndex=a;
        setStore('myCollectIndex',a);
        // console.log('tab标题',a);
      },
      deleteClick(a,index){
        console.log(a)
        deleteWork({helperId:a}).then( res => {
          console.log('删除收藏帮工结果', res)
          if(res.message == 'success'){
            this.$store.state.toastText='删除成功'
            this.$store.state.toastType='success'
            this.workData.splice(index,1);
            return false
          }else {
            this.$store.state.toastText='删除失败'
            this.$store.state.toastType='warn'
            return false
          }
        })
      },
      deleteClick1(a,index){
        console.log(a)
        deleteCommodity({collectionIds:a}).then( res => {
          console.log('删除收藏商品结果', res)
          if(res.message == 'success'){
            this.$store.state.toastText='删除成功'
            this.$store.state.toastType='success'
            this.shopData.splice(index,1);
            return false
          }else {
            this.$store.state.toastText='删除失败'
            this.$store.state.toastType='warn'
            return false
          }
        })
      },
      deleteClick2(a,index){
        deleteCommodity({collectionIds:a}).then( res => {
          console.log('删除终端店商品结果', res)
          if(res.message == 'success'){
            this.$store.state.toastText='删除成功'
            this.$store.state.toastType='success'
            this.terminalShopData.splice(index,1);
            return false
          }else {
            this.$store.state.toastText='删除失败'
            this.$store.state.toastType='warn'
            return false
          }
        })
      },

      shopShop(a,b){
        var that = this
        console.log(a)
        console.log(b)
        if (a == 1){
          that.$router.push({path:'/y/shopGoodsDetail',query:{recommendId:b,goodsType:1,activityType:3}})
        }else {
          that.$router.push({path:'/y/shopGoodsDetail',query:{recommendId:b,goodsType:1}})
        }
      }
    }

  }
</script>
<style scoped>

  .myColloct{width: 100%;height: 100%;}
  .top{height:46px;}
  .myColloct .tab1{position:fixed;left:0;right:0;top:46px;z-index: 9;}
  .myColloct .tab{border-bottom:0.01rem solid #dedede;border-top:0.01rem solid #dedede;}


  .myColloct .content{width:100%;height: 100%;box-sizing: border-box;overflow: scroll;background-color: #f5f5f5;margin-top:0.1rem;padding-top:92px;}
  .myColloct .content>div{background-color: white;}

  .outItem{height: 1.6rem;box-sizing: border-box;padding:0.35rem 0 0;margin:0 0.2rem;border-bottom: 1px solid #ededed;}
  .outItem .item1ImgBox{width:1rem;height: 1rem;border-radius: 50%;overflow:hidden;display: inline-block;vertical-align: middle;}
  .outItem .item1ImgBox .item1Img{width:100%;height:100%;}
  .outItem .item1ConBox{width:4.3rem;height: 1rem;padding-left: 0.2rem;display: inline-block;vertical-align: middle;}
  .outItem .item1ConBox .nameLine{}
  .outItem .item1ConBox .nameLine .s1{font-size: 0.3rem;vertical-align:middle;color:#3c3c3c;}
  .outItem .item1ConBox .nameLine .nameStateImg{width:0.3rem;height: 0.3rem;margin-left: 0.1rem;vertical-align: middle}
  .outItem .item1ConBox .starLine{margin-top:0.2rem}
  .outItem .item1ConBox .starLine .shineStar{width:0.2rem;height: 0.2rem;margin:0 0.04rem;display: inline-block;}
  .outItem .btnLine1{width:1.37rem;margin:auto;vertical-align: middle;display: inline-block;}

  .outItem1{height: 2.45rem;box-sizing: border-box;padding:0.35rem 0 0;margin:0 0.2rem;border-bottom: 1px solid #ededed;}
  .outItem1 .item1ImgBox{width:2.4rem;height: 1.8rem;overflow:hidden;display: inline-block;vertical-align: middle;}
  .outItem1 .item1ImgBox .item1Img{width:100%;height:100%;}
  .outItem1 .item1ConBox{width:4.3rem;height: 1.8rem;padding-left: 0.2rem;display: inline-block;vertical-align: middle;}
  .outItem1 .item1ConBox .nameLine{height: 1rem;}
  .outItem1 .item1ConBox .nameLine .s1{font-size: 0.32rem;vertical-align:middle;color:#333;}
  .outItem1 .item1ConBox .starLine{font-size: 0.32rem;color:#f86e0e;}



  .kong{text-align:center;background:#f5f5f5;}
  .kong img{width:2.5rem;height:2.5rem;margin-top:1rem;}
  .kong p{line-height:1rem;color:#6a6965;font-size:0.3rem;}


  /*.content .vux-slider{height: 100%;}*/


  /*.flexBox{display: flex;justify-content: space-around;width:100%;flex-wrap: wrap;padding-top:0.05rem;}*/
  /*.flexBox .flexItem{width:3.35rem;height: 3.6rem;background-color: #fffaf7;border-radius: 0.05rem;box-shadow: 2px 3px 10px #999;margin:0.15rem 0;box-sizing: border-box;padding:0.14rem;}*/
  /*.flexBox .flexItem .img1Box{width:1.2rem;height: 1.2rem;border-radius: 50%;border:0.02rem solid #f86e0e;box-sizing: border-box;display: block;margin:auto;margin-bottom: 0.2rem;overflow: hidden;}*/
  /*.flexBox .flexItem .img1Box .img1{width:100%;height: 100%;}*/
  /*.flexBox .nameLine{text-align: center;margin-bottom: 0.12rem;}*/
  /*.flexBox .nameLine .s1{font-size: 0.3rem;vertical-align:middle;color:#3c3c3c;}*/
  /*.flexBox .nameLine .nameStateImg{width:0.3rem;height: 0.3rem;margin-left: 0.1rem;vertical-align: middle}*/
  /*.flexBox .starLine{text-align: center;margin-bottom: 0.3rem;}*/
  /*.flexBox .starLine .shineStar{width:0.2rem;height: 0.2rem;margin:0 0.04rem;display: inline-block;}*/
  /*.flexBox .btnLine{width:2rem;margin:auto;display: block;}*/

  /*.flexBox1{display: flex;justify-content: space-between;width:100%;flex-wrap: wrap;padding:0.05rem 0.18rem;box-sizing: border-box;background-color: #f5f5f5;}*/
  /*.flexBox1 .flexItem1{width:3.5rem;height: 4.5rem;padding:0.18rem;box-sizing: border-box;background-color: white;box-shadow: 1px 2px 5px #999;margin:0.16rem 0;}*/
  /*.flexBox1 .flexItem1.clo:nth-child(2n-1){background-color: #fff4ed;position: relative;padding-right: 0.38rem;z-index:1;padding-bottom: 0.38rem;width:3.7rem;height:4.7rem;margin-right: -0.2rem;margin-bottom: -0.2rem;}*/
  /*.flexBox1 .flexItem1.clo:nth-child(2n){background-color: #fff4ed;position: relative;padding-right: 0.38rem;z-index:1;padding-bottom: 0.38rem;width:3.7rem;height:4.7rem;margin-left: -0.2rem;margin-bottom: -0.2rem;}*/
  /*.flexBox1 .flexItem1 .img2{width:100%;}*/
  /*.flexBox1 .flexItem1 .img2Close{width:0.34rem;height:0.34rem;display:none;position: absolute;right: 0.03rem;top:0.03rem;}*/
  /*.flexBox1 .flexItem1 .img2Close.block{display: inline-block;}*/
  /*.flexBox1 .flexItem1 .flexItem1Name{font-size: 0.3rem;color:#3c3c3c;text-align: center;margin-top:0.1rem;}*/
  /*.flexBox1 .flexItem1 .flexItem1Price{font-size: 0.3rem;color:#f86e0e;text-align: center;margin-top:0.1rem;}*/
</style>
