<template>
  <div class="shopGoodsList">
    <!--置顶按钮-->
    <!--<div class="topLink" @click="topLink">-->
      <!--<img src="../img/top.png"/>-->
    <!--</div>-->
    <!--<x-header v-if="!goodsName" :msg="title"> </x-header>-->
   <!-- <div class="search" v-else>
      <search
        v-model="value"
        @on-focus="onFocus"
        @on-cancel="onCancel"
      > </search>
    </div>-->
    <x-header :msg="title"> </x-header>
    <!--tab-->
    <div class="nav" ref="nav">
      <shop-goods-list-nav @sort="sort"> </shop-goods-list-nav>
    </div>
    <!--list-->
    <div class="list"  ref="list" v-if="shopGoodsList != 0">
       <scroller :on-infinite="loadmore" v-if="shopGoodsList!=''" style="padding-top:96px"  :on-refresh = "refresh" ref="my_scroller">
        <router-link :data-d='item.gtVal' :to="{path:'/y/shopGoodsDetail',query:{recommendId: item.goodsId, goodsType: 1,activityType:item.gtVal=='3'?'3':''}}" v-for="(item,index) in shopGoodsList" :key="index">
          <shop-goods-list-item :datas="item" ></shop-goods-list-item>
        </router-link>
         <div style="height:100px"></div>
       </scroller>
    </div>
    <div v-else class="kong" :style="{paddingTop:listH+'px'}">
      <img src="./img/kong.png" alt="">
      <p>暂无该分类商品</p>
    </div>
  </div>
</template>
<script>

  /**
   * @query title
   * @router /y/shopGoodsDetail
   */
   import Vue from "vue";
  import { Search } from 'vux'
  import xHeader from '@/components/shop/common/xHeader'
  import shopGoodsListNav from '@/components/shop/common/shopGoodsListNav'
  import shopGoodsListItem from '@/components/shop/common/shopGoodsListItem'
  import { searchB2CGoodsList } from "@/api/shop"
  // import PullTo from 'vue-pull-to'
  import VueScroller from "vue-scroller"
  Vue.use(VueScroller)

  export default {
    components:{
      xHeader,
      shopGoodsListNav,
      shopGoodsListItem,
      Search,
      // PullTo
    },
    data(){
      return{
        title: '',
        listH: 0,

        value: '',
        pageNum: 1,
        pageSize: 10,
        goodsCatId: '',
        goodsName: '',
        adcode: '',
        sortType: '',
        shopGoodsList: [],
      }
    },
    beforeCreate() {
      this.$store.commit("setLoading", true);
    },
    mounted(){

      this.adcode = localStorage.getItem('curCityAdcode')
      this.goodsName = this.$route.query.goodsName
      this.goodsCatId = this.$route.query.categoryId

      // 搜索框
      this.value = this.$route.query.goodsName

      //获取头部文字
      this.title = this.$route.query.shopGoodsListTitle

      this._searchB2CGoodsList()

      //获取头部高度
      setTimeout(() => this.listH = 46 + this.$refs.nav.clientHeight, 20)

    },
    methods:{
      // 上拉加载
      loadmore(loaded) {
        this.pageNum ++
        setTimeout(() => this._searchB2CGoodsList(loaded, 'loaded'), 1000)
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1
        setTimeout(() => this._searchB2CGoodsList(loaded, 'refresh'), 1000)
      },
      //点击置顶按钮
//      topLink() {
//        console.log(123456)
//        this.$refs.list.scrollTop = 0
//      },
      onFocus() {
        this.$router.go(-1)
      },
      onCancel() {
        this.$router.go(-1)
      },
      // b2c商品列表(所有)
      _searchB2CGoodsList( loaded, type ) {

        searchB2CGoodsList({
          adcode: this.adcode,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          goodsName: this.goodsName,   // 商品名称
          brandId: this.brandId,       // 品牌ID
          goodsCatId: this.goodsCatId,  // 分类ID
          sortType: this.sortType,      // 排序类型（1是按创建时间倒叙排列；2是按商品价格正序排列；3是按商品价格倒叙排列，4是按商品销量正序排列；5是按商品销量倒叙排列）
          isNew: '',                      // 是否新品推荐：0代表否，1代表是, 不填代表所有
        })
          .then( res => {

            console.log('b2c当前页商品列表', res)

            if (loaded) {

              if (type === 'refresh') this.shopGoodsList = []  // 下拉刷新只显示第一页数据

              this.shopGoodsList =  this.shopGoodsList.concat(res.data);

              loaded('done');

              console.log('b2c所有商品列表', this.shopGoodsList)

            }  else {

              // 页面第一次加载的数据
              this.shopGoodsList = res.data
                console.log('商品列表',res.data);
            }

          })
      },
      // 排序
      sort(val) {
        this.sortType = val
        this.pageNum = 1
        this._searchB2CGoodsList()
      }
    },
    updated() {
      this.$store.commit("setLoading", false);
    },

  }



</script>
<style scoped>
  .search >>> .weui-search-bar__cancel-btn {color: #f86e0e;}

  .shopGoodsList{background-color: white;height: 100%;}

  .shopGoodsList .nav{margin-top: 46px;position: fixed;z-index:50;top:0;width:100%;}
  .shopGoodsList .list{width:100%;height: 100%;background-color: white;overflow: scroll;box-sizing: border-box;}

  .topLink {
    width: 0.80rem;
    height: 0.80rem;
    position: fixed;
    right: 0;
    bottom: 2.00rem;
    z-index: 9999;
    cursor: pointer;
  }
  .topLink img {
    width: 100%;
  }

  .kong{text-align:center;}
  .kong img{width:2.5rem;height:2.5rem;margin-top:1rem;}
  .kong p{line-height:1rem;color:#6a6965;font-size:0.3rem;}
</style>
