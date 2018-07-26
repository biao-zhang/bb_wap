<template>
  <div class="newarrivals">
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
      <!-- <div class="newlist" :style="{height:sliderHeight+'px'}" v-if="shopGoodsNewList!=''"> </div> -->
        <scroller :on-infinite="loadmore" v-if="shopGoodsNewList!=''" style="padding-top:46px"  :on-refresh = "refresh" ref="my_scroller">
        
          <div class="picture">
          <img :src="shopBanner ? shopBanner.bannerImgUrl : require('./img/null.png')" alt="图片未显示">
        </div>
         <!-- <div style="height: 1px;"></div> -->
        <new-product-list  v-for="(item,index) in shopGoodsNewList" :key="index" :new-children="item"> </new-product-list>
         </scroller>    
   
    <div v-else class="kong">
      <img src="./img/kong.png" alt="">
      <p>暂无商品信息~</p>
    </div>
  </div>
</template>
<script>
import xHeader from "@/components/shop/common/xHeader";
import newProductList from "@/components/shop/common/newProductList";
import VueScroller from "vue-scroller";
import Vue from "vue";
import { searchB2CGoodsList } from "@/api/shop";
Vue.use(VueScroller);
export default {
  data() {
    return {
      top: "新品",
      pageNum: 1,
      pageSize: 10,
      adcode: "",
      shopGoodsNewList: [],
      sliderHeight: 0 //滑动区域的高度
    };
  },
  computed: {
    // 查询新品列表页面banner图
    shopBanner() {
      return this.$store.state.shopGoodsList.shopBanner;
    }
  },
  components: { xHeader, newProductList },
  mounted() {
    this.adcode = localStorage.getItem("curCityAdcode");
    setTimeout(() => {
      //计算滑动区域的高度
      this.sliderHeight = window.innerHeight - 46;
    }, 20);

    this._searchB2CGoodsList();
    // 查询新品列表页面banner图
    this.$store.dispatch("shopGoodsList/shopBanner");
  },
  methods: {
    // 上拉加载
    loadmore(loaded) {
      this.pageNum++;
      setTimeout(() => this._searchB2CGoodsList(loaded, "loaded"), 1000);
    },
    // 下拉刷新
    refresh(loaded) {
      this.pageNum = 1;
      setTimeout(() => this._searchB2CGoodsList(loaded, "refresh"), 1000);
    },
    // 新品推荐列表
    _searchB2CGoodsList(loaded, type) {
      searchB2CGoodsList({
        adcode: this.adcode,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        isNew: 1 // 是否新品推荐：0代表否，1代表是
      }).then(res => {
        console.log("b2c当前页新品推荐列表", res);

        if (loaded) {
          if (type === "refresh") this.shopGoodsNewList = []; // 下拉刷新只显示第一页数据

          this.shopGoodsNewList = this.shopGoodsNewList.concat(res.data);

          loaded("done");

          console.log("b2c所有新品推荐列表", this.shopGoodsNewList);
        } else {
          // 页面第一次加载的数据
          this.shopGoodsNewList = res.data;
        }
      });
    }
  }
};
</script>
<style scoped>
._v-container {
  top: auto !important;
}
.newarrivals {
  background: #fff;
  height: 100%;
  overflow: hidden;
}
.picture {
  width: 100%;
  height: 2.6rem;
}
.picture img {
  width: 100%;
  height: 100%;
}
.list {
  padding: 0 0.2rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.kong {
  text-align: center;
  margin-top: 2rem;
}
.kong img {
  width: 3.5rem;
  height: 3.5rem;
}
.kong p {
  line-height: 1.5rem;
  color: #6a6965;
  font-size: 0.3rem;
}
</style>
