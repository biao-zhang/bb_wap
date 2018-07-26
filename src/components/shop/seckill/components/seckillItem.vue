<template>
  <div style="height: 100%">
    <pull-to
      :bottom-load-method="loadmore"
      :top-load-method="refresh"
    >
      <!--图片-->
      <div class="picture">
        <img
          class="img1"
          v-if="datas"
          :src="datas.activityPritrue"
        />
      </div>
      <div class="shopGoodsListItem" v-for="(item,index) in searchSeckillGoodsp" :key="index" @click="buyClick(item)">
        <div class="goodsLogoBox">
          <!--../../img/name.png-->
          <img class="goodsLogo" :src="item.goodsPicture === 'null' ? require('../../img/kong3.png') : item.goodsPicture"/>
        </div>
        <div class="goodsItemR">
          <!--name-->
          <div class="line1">{{ item.goodsName }}</div>
          <div class="boxL">
            <div class="line2">限量{{ item.seckillNum }}件</div>
            <div class="line3">￥{{ item.seckillPrice }}</div>
            <div class="line4" style="text-decoration: line-through">￥{{ item.goodsPrice }}</div>
          </div>
          <div class="boxR">
            <!--进度条-->
            <!--<div class="progressBarBox">
              <seckill-progress v-if="true"> </seckill-progress>
            </div>-->
            <!--按钮-->
            <span class="b">
              <img class="img2" v-if="datas.nowTime > datas.endTime" src="../../img/over.png"/>
              <img class="img2" v-if="datas.nowTime > datas.startTime && datas.nowTime < datas.endTime" src="../../img/qiang.png"/>
              <img class="img2" v-if="datas.nowTime < datas.startTime" src="../../img/ready.png"/>
            </span>
          </div>
        </div>
      </div>
    </pull-to>
  </div>
</template>
<script>
  import seckillProgress from '@/components/shop/seckill/components/seckillProgress'
  import { searchSeckillGoodsp, searchFreshGoodsp } from '@/api/shop'
  import PullTo from 'vue-pull-to'

  export default {
    components:{
      seckillProgress,
      PullTo
    },
    data(){
      return{
        pageNum: 1,
        pageSize: 10,
        searchSeckillGoodsp: []
      }
    },

    props: ['datas'],
    mounted(){
      this.title = this.$route.query.seckillPageTitle

      if (this.title === '秒杀') {

        this._searchSeckillGoodsp()

      } else if (this.title === '生鲜') {

        this._searchFreshGoodsp()

      }

    },
    methods:{
      buyClick(val) {

        if (this.title === '秒杀') {

          this.$router.push({path: '/y/shopGoodsDetail', query:{recommendId: val.goodsId, goodsType: 3, activityId: val.activityId, activityType: 1}})

        } else if (this.title === '生鲜') {

          this.$router.push({path: '/y/shopGoodsDetail', query:{recommendId: val.goodsId, goodsType: 3, activityId: val.activityId, activityType: 2}})

        }

      },
      // 上拉加载
      loadmore(loaded) {
        this.pageNum ++
        if (this.title === '秒杀') {

          setTimeout(() => this._searchSeckillGoodsp(loaded, 'loaded'), 1000)

        } else if (this.title === '生鲜') {

          setTimeout(() => this._searchFreshGoodsp(loaded, 'loaded'), 1000)

        }

      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1
        if (this.title === '秒杀') {

          setTimeout(() => this._searchSeckillGoodsp(loaded, 'loaded'), 1000)

        } else if (this.title === '生鲜') {

          setTimeout(() => this._searchFreshGoodsp(loaded, 'loaded'), 1000)

        }
      },
      // 秒杀列表
      _searchSeckillGoodsp( loaded, type ) {
        searchSeckillGoodsp({
          type: this.datas.seckillId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
          .then( res => {

            console.log('当前页秒杀列表', res)

            if (loaded) {

              if (type === 'refresh') this.searchSeckillGoodsp = []  // 下拉刷新只显示第一页数据

              this.searchSeckillGoodsp =  this.searchSeckillGoodsp.concat(res.data);

              loaded('done');

              console.log('所有秒杀列表', this.searchSeckillGoodsp)

            }  else {

              // 页面第一次加载的数据
              this.searchSeckillGoodsp = res.data

            }

          })
      },
      // 生鲜列表
      _searchFreshGoodsp( loaded, type ) {
        searchFreshGoodsp({
          type: this.datas.seckillId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
          .then( res => {

            console.log('当前页生鲜列表', res)

            if (loaded) {

              if (type === 'refresh') this.searchSeckillGoodsp = []  // 下拉刷新只显示第一页数据

              this.searchSeckillGoodsp =  this.searchSeckillGoodsp.concat(res.data);

              loaded('done');

              console.log('所有生鲜列表', this.searchSeckillGoodsp)

            }  else {

              // 页面第一次加载的数据
              this.searchSeckillGoodsp = res.data

            }

          })
      },

    }
  }
</script>
<style scoped>
  .shopGoodsListItem{width:6.9rem;margin:0 auto;height: 2.5rem;display: flex;justify-content:space-between;padding:0.3rem 0;border-bottom:1px solid #ededed;}

  .shopGoodsListItem .goodsLogoBox{width:2.5rem;height: 2.5rem;}
  .shopGoodsListItem .goodsLogoBox .goodsLogo{width:100%;height: 100%;}

  .shopGoodsListItem .goodsItemR{width:4.2rem;margin:0.1rem 0;}
  .shopGoodsListItem .goodsItemR .line1{width:100%;font-size: 0.3rem;color:#3c3c3c;line-height: 0.5rem;}

  .shopGoodsListItem .goodsItemR .boxL{width:2.3rem;display: inline-block;}
  .shopGoodsListItem .goodsItemR .boxL .line2{width:100%;font-size: 0.22rem;color:#666;margin-top: 0.3rem;}
  .shopGoodsListItem .goodsItemR .boxL .line3{width:100%;font-size: 0.34rem;color:#f86e0e;line-height: 0.5rem;}
  .shopGoodsListItem .goodsItemR .boxL .line4{width:100%;font-size: 0.24rem;color:#9a9a9a;}
  .shopGoodsListItem .goodsItemR .boxR{display: inline-block;width:1.8rem;vertical-align: text-bottom;height: 1rem;}
  .shopGoodsListItem .goodsItemR .boxR .b{display: inline-block;width:1.8rem;height: 0.5rem;border-radius: 0.06rem;}
  .shopGoodsListItem .goodsItemR .boxR .b .img2{width:100%;}

  .shopGoodsListItem .goodsItemR .boxR .progressBarBox{width:1.5rem;margin:0 0 0.26rem 0.3rem;height: 0.16rem;border-radius: 0.08rem;overflow: hidden;}

  .picture{width:100%;height: 2.6rem;}
  .picture .img1{width:100%;height: 100%;}
</style>
