<template>
  <div class="storeIndex">
    <div class="header" ref="header">
      <img class="back" src="../../../assets/img/back.png" onclick="javascript:history.go(-1)"/>
      <div class="box">
        <div class="imgBox">
          <img class="img1" v-if="getShopList.shopLogo" :src='shopLogo'>
          <img class="img1" v-if="getShopList.shopLogo == null" src="../img/name1.png">
        </div>
        <div class="imgBoxR">
          <div class="line1">{{shopName}}</div>
          <div class="line2">商品：{{count}}件</div>
          <div class="line3">店铺等级：{{shopLevel}}星</div>
        </div>
      </div>
    </div>
    <!--店铺商品-->
    <div class="groom" :style="{height:groomH+'px'}">
      <pull-to :bottom-load-method="loadmore" :top-load-method="refresh">
        <div class="groomBox" v-if="list.length>0">
          <index-shop-list v-for="(item,index) in list" :key="index" :datas="item"></index-shop-list>
        </div>
        <div class="groomBox" v-if="list.length==0">
          没有商品
        </div>
      </pull-to>
    </div>
  </div>
</template>
<script>
  import indexShopList from '@/components/shop/common/indexShopList'
  import { shopStore } from "@/api/shop"
  import PullTo from 'vue-pull-to'
  export default {
    data(){
      return{
        groomH:0,
        shopId:'',
        getShopList:{},
        pageNum:1,
        pageSize:6,
//        shopLevel:0,
        list:[],
      }
    },
    components:{indexShopList,PullTo},
    computed:{
      count(){
        return this.getShopList.shopGoodsCount;
      },
      shopLogo(){
        return this.getShopList.shopLogo;
      },
      shopName(){
        return this.getShopList.shopName;
      },
      shopLevel(){
        return this.getShopList.shopLevel==null?0:this.getShopList.shopLevel;
      }
    },
    mounted(){
      if(this.$route.query.shopId!==undefined){
        this.shopId = this.$route.query.shopId;
      }else{
        console.log('没有店铺id')
      }

//      shopStore({pageNum:this.pageNum,pageSize:this.pageSize,shopId:this.shopId}).then( res => {
//        console.log('获取商店列表结果', res)
//        if(res.message == 'success'){
//          this.getShopList = res.data
//        }else {
//
//        }
//      })
      this.getMyRedList();

      setTimeout(()=>{
        this.groomH = window.innerHeight-this.$refs.header.clientHeight;
      },20)

    },
    methods:{
      // 上拉加载
      loadmore(loaded) {
        this.pageNum ++
        this.getMyRedList(loaded, 'loaded')
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1
        this.getMyRedList(loaded, 'refresh')
      },
      getMyRedList(loaded,type){
        let params = {
          pageSize:this.pageSize,
          pageNum:this.pageNum,
          shopId:this.shopId
        }
        console.log(params)
        shopStore(params).then( res => {
          console.log(res,'店铺商品数据')
          if(res.message == 'success'){
            this.getShopList = res.data;
            if (loaded) {
              if (type === 'refresh') this.list = [];  // 下拉刷新只显示第一页数据
              this.list =  this.list.concat(res.data.goodsInfoVOList);
              loaded('done');
            }  else {
              // 页面第一次加载的数据
              this.list = res.data.goodsInfoVOList
            }
          }else {
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          console.log(err)
          this.$store.commit('setToastText','服务器错误')
          this.$store.commit('setToastType','warn')
        })
      },
    }
  }
</script>
<style scoped>
  .storeIndex{width:100%;height: 100%;overflow: hidden;}

  .header{width:100%;height: 4rem;background-image: url('../img/storeBg.png');background-size: 100% 100%;}
  .header .back{width:0.18rem;margin-left: 0.21rem;margin-top:0.3rem;}
  .header .box{width:6rem;height: 2.3rem;border-radius: 0.1rem;margin: 0.3rem auto;background-color: white;box-shadow: 0 0 10px #999;display: flex;}
  .header .box .imgBox{width:1.3rem;height: 1.3rem;border-radius: 0.04rem;display:inline-block;padding:0.5rem 0.3rem 0.5rem 0.5rem;}
  .header .box .imgBox .img1{width:100%;height: 100%;}

  .header .box .imgBoxR{padding:0.5rem 0;}
  .header .box .imgBoxR .line1{font-size: 0.34rem;color:#3c3c3c;text-overflow:ellipsis; white-space: nowrap;overflow:hidden;height:0.6rem;line-height:0.6rem;width:3.5rem;}
  .header .box .imgBoxR .line2{font-size: 0.24rem;color:#6a6a6a;}
  .header .box .imgBoxR .line3{font-size: 0.24rem;color:#6a6a6a;}

  .groom{width:100%;padding:0 0.2rem;background-color: #f5f5f5;box-sizing: border-box;overflow: hidden;}
  .groom .groomBox{display: flex;flex-wrap: wrap;justify-content: space-between;}

</style>
