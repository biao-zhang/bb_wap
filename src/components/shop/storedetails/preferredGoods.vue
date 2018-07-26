<template>
  <div class="preferred">
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--列表-->
    <div class="newlist" v-if="bestGoods != 0" :style="{height:sliderHeight+'px'}" >
      <pull-to
        :bottom-load-method="loadmore"
        :top-load-method="refresh"
      >
        <router-link :to="{path:'/y/shopGoodsDetail',query:{ recommendId: item.goodsId, goodsType: 1}}" v-for="(item,index) in bestGoods" :key="index" >
          <preferred-list :new-children="item"></preferred-list>
        </router-link>
      </pull-to>
    </div>
    <div v-else class="kong">
      <img src="./img/kong.png" alt="">
      <p>暂无商品信息~</p>
    </div>
  </div>
</template>
<script>
  import xHeader from '@/components/shop/common/xHeader'
  import preferredList from '@/components/shop/storedetails/assembly/preferredList'
  import { searchGoodsByCayId } from "@/api/shop"
  import PullTo from 'vue-pull-to'

  export default {
    data(){
      return{
        top:"",
        categoryId:'',   //优选商品分类ID
        pageNum: 1,
        pageSize: 10,
        bestGoods: [],

        sliderHeight:0,  //滑动区域的高度
      }
    },
    components:{xHeader,preferredList,PullTo},
    mounted() {
      //获取优选商品分类ID
      if(this.$route.query.excellentId!==undefined){
        this.categoryId = this.$route.query.excellentId;
      }
      if(this.$route.query.title!==undefined){
        this.top = this.$route.query.title;
      }

      setTimeout(()=>{ //计算滑动区域的高度
        this.sliderHeight = window.innerHeight-46;
      },20)

      this._searchGoodsByCayId()
    },
    methods: {
      // 上拉加载
      loadmore(loaded) {
        this.pageNum ++
        setTimeout(() => this._searchGoodsByCayId(loaded, 'loaded'), 1000)
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1
        setTimeout(() => this._searchGoodsByCayId(loaded, 'refresh'), 1000)
      },
      // 优选商品列表
      _searchGoodsByCayId( loaded, type ) {
        searchGoodsByCayId({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          categoryId: this.categoryId
        })
          .then( res => {

            console.log('b2c当前页优选商品列表', res)

            if (loaded) {

              if (type === 'refresh') this.bestGoods = []  // 下拉刷新只显示第一页数据

              this.bestGoods =  this.bestGoods.concat(res.data);

              loaded('done');

              console.log('b2c所有优选商品列表', this.bestGoods)

            }  else {

              // 页面第一次加载的数据
              this.bestGoods = res.data

            }

          })
      }
    }
  }
</script>
<style scoped>
.preferred>>>.vux-header-title > span {
  display: inline;
}
  .preferred{
    background:#fff;
    height: 100%;
    padding-top:46px;
    box-sizing: border-box;
  }
  .picture{
    width:100%;
    height:2.6rem;
  }
  .picture img{
    width:100%;
    height:100%;
  }
  .list{
    padding:0 0.2rem;
    width:100%;
    box-sizing:border-box;
    display:flex;
    justify-content:space-between;
    flex-wrap: wrap;
  }
  .newlist a{display:block;}
  .kong{text-align:center;margin-top:2rem;}
  .kong img{width:3.5rem;height:3.5rem;}
  .kong p{line-height:1.5rem;color:#6a6965;font-size:0.3rem;}
</style>
