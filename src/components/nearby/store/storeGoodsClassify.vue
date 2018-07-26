<template>
  <div class="storeIndex">
    <div class="header" ref="header">
      <img class="back" src="../img/o2oBack.png" onclick="javascript:history.go(-1)"/>
      <img class="back" style="float: right;margin-right: 0.21rem;" src="../img/o2oCart.png" @click="o2oCart"/>
      <div class="box">
        <div class="imgBox">
          <img class="img1" v-if="shopInfo.goodsShopVO.shopLogo == null||shopInfo.goodsShopVO.shopLogo==''||shopInfo.goodsShopVO.shopLogo== undefined" src="../img/logo1.png" alt="">
          <img class="img1" v-else :src="shopInfo.goodsShopVO.shopLogo"/>
        </div>
        <div class="imgBoxR">
          <div class="line1">{{shopInfo.goodsShopVO.shopName}}</div>
          <div class="weizhiBox">
            <div class="weizhiImgBox"><img class="weizhiImg" src="../img/weizhi.png"/> </div>
            <div class="weizhi">{{shopInfo.goodsShopVO.shopAddress}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--折扣-->
    <!--<div class="zhekouBox" ref="zhekouBox">-->
      <!--<div class="zhekou">-->
        <!--<div class="imgBox"><img src="" class="imgZhekou"/> </div>-->
        <!--<div class="zhekouCon">折扣折扣折扣折扣折扣折扣折扣折扣折扣折扣折扣折扣折扣折扣折扣</div>-->
        <!--<img class="imgZhekouMore" src="../img/clo.png"/>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="zhekouMore">-->
      <!--啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊-->
    <!--</div>-->
    <!--店铺商品分类-->
    <div class="groom" :style="{height:groomH+'px'}" ref="zhekouBox" v-if="shopInfo.categoryResultVOList != null">
      <div class="pullTos" ref="pullTos">
        <div class="pullToLBox">
          <pull-to >
            <div class="pullToLContainer">
              <ul class="ul1">
                <li v-for="(item,index) in shopInfo.categoryResultVOList" :class="{pullToLActive:lCurIndex==index}" @click="dianji(index,item.categoryId)">{{item.categoryName}}</li>
              </ul>
            </div>
          </pull-to>
        </div>
        <div class="pullToRBox">
          <!--<pull-to :top-load-method="refresh" :top-config="topConfig" @top-state-change="topChangeState" :bottom-load-method="load" :bottom-config="bottomConfig" @bottom-state-change="bottomChangeState" @infinite-scroll="theEnd">-->
          <pull-to>
            <div class="pullToRContainer">
              <router-link v-for="(item,index) in shopList" :key="index" :to="{path:'/y/shopGoodsDetail',query: {recommendId:item.goodsId,goodsType:2,isShop:1}}">
                <div class="pullToRItem" >
                    <div class="pullToRImgBox"><img class="pullToRImg" :src="item.goodsImgMaster"/> </div>
                    <div class="pullToRImgR">
                      <div class="pullToRImgRLine1 re-twoLineOverFlow">{{item.goodsName}}</div>
                      <div class="pullToRImgRLine2">￥{{item.goodsPrice}}</div>
                    </div>
                </div>
              </router-link>
            </div>
          </pull-to>
        </div>
      </div>
    </div>
    <div v-else class="kong">
      <img src="../img/kong.png" alt="">
      <p>暂无该分类商品</p>
    </div>
  </div>
</template>
<script>
  import PullTo from 'vue-pull-to'
  import {mapMutations} from 'vuex'
  import { getOneshop , getTwoshop } from "@/api/shop"
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
        groomH:0,   //LR滚动的高度
        topConfig:TOP_DEFAULT_CONFIG,
        bottomConfig:BOTTOM_DEFAULT_CONFIG,

        lCurIndex:0,


        shopId:'',//获取的终端店ID
        shopInfo:{
          categoryResultVOList:[
            {categoryId:''}
          ],
          goodsShopVO:{},
        },//获取的信息
        shopList:[],
        adcode:'',   //区域编码

      }
    },
    components:{PullTo},
    watch:{

    },
    mounted(){
      //获取终端店商店ID
      if(this.$route.query.shopId!==undefined){
        this.shopId = this.$route.query.shopId;
      }else {
        this.$store.state.toastText='无商店ID'
        this.$store.state.toastType='text'
      }
      //获取地理编码
      this.adcode = localStorage.curCityAdcode

      var that = this;
      setTimeout(function () {
        that.groomH = window.innerHeight-that.$refs.header.clientHeight-that.$refs.zhekouBox.clientHeight;
      },20)
      //一级
      getOneshop({shopId:this.shopId}).then( res => {
        console.log('终端店数据结果', res)
        if(res.message == 'success'){
          this.shopInfo = res.data
          this.Two(this.shopInfo.categoryResultVOList[0].categoryId)
        }
      })
    },
    methods:{
      //二级
      Two(goodsCatId){
        getTwoshop({pageNum:1,pageSize:10,adcode:this.adcode,goodsCatId:goodsCatId}).then( res => {
          console.log('列表结果', res)
          if(res.message == 'success'){
            this.shopList = res.data
          }
        })
      },
      dianji(index,categoryId){
        var that = this
        this.lCurIndex=index
        console.log(categoryId)
        this.categoryId = categoryId
        getTwoshop({pageNum:1,pageSize:10,adcode:this.adcode,goodsCatId:this.categoryId}).then( res => {
          console.log('列表结果', res)
          if(res.message == 'success'){
            that.shopList = res.data
          }
        })
      },
      //进入终端店购物车
      o2oCart(){
//        /x/cartShop?shopId=790371824378
        this.$router.push({path:'/x/cartShop',query:{shopId:this.shopId,isShop:1}})
      },

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
    }

  }
</script>
<style scoped>
  .storeIndex{width:100%;height: 100%;}

  .header{width:100%;height: 4rem;background-image: url('../../nearby/img/storeBg.png');background-size: 100% 100%;}
  .header .back{width:0.5rem;margin-left: 0.21rem;margin-top:0.3rem;}
  .header .box{width:6rem;height: 2.3rem;border-radius: 0.1rem;margin: 0.3rem auto;background-color: white;box-shadow: 0 0 10px #999;display: flex;}
  .header .box .imgBox{width:1.3rem;height: 1.3rem;border-radius: 0.04rem;display:inline-block;padding:0.5rem 0.3rem 0.5rem 0.5rem;}
  .header .box .imgBox .img1{width:100%;height: 100%;}

  .header .box .imgBoxR{padding:0.5rem 0;display: flex;flex-direction: column;justify-content: space-between}
  .header .box .imgBoxR .line1{font-size: 0.34rem;color:#3c3c3c;height:0.6rem;line-height:0.6rem;width:3.5rem;overflow: hidden;text-overflow:ellipsis; white-space: nowrap;}
  .header .box .imgBoxR .weizhiBox{width:100%;height: 0.6rem;display:flex;align-items:center;}
  .header .box .imgBoxR .weizhiBox .weizhiImgBox{width:0.28rem;height: 0.36rem;display: inline-block;vertical-align: text-top;}
  .header .box .imgBoxR .weizhiBox .weizhiImgBox .weizhiImg{width:100%;height: 100%;}
  .header .box .imgBoxR .weizhiBox .weizhi{font-size: 0.24rem;color:#6a6a6a;display: inline-block;margin-left:0.1rem;}

  .zhekouBox{width:100%;height: 1.4rem;padding:0.2rem 0;box-sizing: border-box;}
  .zhekou{width:100%;height: 1rem;padding:0.3rem 0.25rem;box-sizing: border-box;background-color: white;}
  .zhekou .imgBox{display:inline-block;width:0.3rem;height: 0.3rem;padding:0 0.1rem;vertical-align: middle;}
  .zhekou .imgBox .imgZhekou{width:100%;height: 100%;}
  .zhekou .zhekouCon{padding:0 0.1rem;font-size: 0.24rem;color:#666;display: inline-block;width:5.9rem;height:0.4rem;vertical-align: middle;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .zhekou .imgZhekouMore{display:inline-block;width:0.25rem;height: 0.13rem;vertical-align:middle}

  .groom{width:100%;background-color: #f5f5f5;box-sizing: border-box;overflow: scroll;margin-top:0.2rem;}

  .pullTos{width:100%;height: 100%;box-sizing: border-box;display: flex;justify-content: space-between;}
  .pullTos .pullToLBox{width:2rem;height: 100%;}
  .pullTos .pullToLBox .pullToLContainer .ul1{background-color: #f5e7dd;}
  .pullTos .pullToLBox .pullToLContainer .ul1 li{height: 1.15rem;text-align: center;line-height: 1.15rem;font-size: 0.3rem;color:#ccc;}
  .pullTos .pullToLBox .pullToLContainer .ul1 li.pullToLActive{background-color: white;color:#f86e0e;}



  .pullTos .pullToRBox{width:5.4rem;height: 100%;}
  .pullTos .pullToRBox .pullToRContainer{margin-top:0.03rem;}

  .pullTos .pullToRBox .pullToRContainer .pullToRItem{display:flex;justify-content:space-between;width:100%;height:1.9rem;background-color:white;padding:0.2rem;box-sizing: border-box;}
  .pullTos .pullToRImgBox{width:1.5rem;height: 1.5rem;margin-right: 0.1rem;}
  .pullTos .pullToRImgBox .pullToRImg{width:100%;height: 100%;}
  .pullTos .pullToRImgR{width:3.4rem;height: 1.5rem;display: flex;justify-content: space-between;flex-direction: column;}
  .pullTos .pullToRImgR .pullToRImgRLine1{font-size: 0.3rem;color:#3c3c3c;}
  .pullTos .pullToRImgR .pullToRImgRLine2{font-size: 0.3rem;color:#f86e0e;}

  .kong{text-align:center;}
  .kong img{width:2.5rem;height:2.5rem;margin-top:1rem;}
  .kong p{line-height:1rem;color:#6a6965;font-size:0.3rem;}
</style>
