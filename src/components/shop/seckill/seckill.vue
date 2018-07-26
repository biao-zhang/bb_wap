<template>
  <div class="seckill">
    <!--xheader-->
    <x-header :msg="title"></x-header>
    <!--nav-->
    <div class="tab" ref="tab">
      <seckill-tab @tabVal="tabVal"  :seckill-time="searchSeckillTime"> </seckill-tab>
    </div>
    <!--content-->
    <div class="content" :style="{paddingTop:contentPaddingTopH+'px'}">
      <swiper v-model="index" :show-dots="false" height="100%" :min-moving-distance="1000">
        <swiper-item v-for="(item, index) in searchSeckillTime" :key="index">
          <div style="width: 100%;height: 100%;overflow: scroll">
            <div style="overflow: scroll; height: 100%">
              <div class="list" style="height: 100%">
                <seckill-item v-if="active === index" :datas="item"> </seckill-item>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
  import {Swiper,SwiperItem} from 'vux'
  import xHeader from '@/components/shop/common/xHeader'
  import seckillTab from '@/components/shop/seckill/components/seckillTab'
  import seckillItem from '@/components/shop/seckill/components/seckillItem'
  import { searchSeckillTime, searchFreshTimes } from '@/api/shop'

  export default {
    components:{
      Swiper,
      SwiperItem,
      xHeader,
      seckillTab,
      seckillItem,
    },
    data(){
      return{
        title:'',
        contentPaddingTopH:0,
        index: 0,
        active: 0,

        adcode: '',
        searchSeckillTime: [],
      }
    },
    computed: {


    },

    mounted(){
      this.adcode = localStorage.getItem('curCityAdcode')
      this.title = this.$route.query.seckillPageTitle

      if (this.title === '秒杀') {

        this._searchSeckillTime()

      } else if (this.title === '生鲜') {

        this._searchFreshTimes()

      }

      setTimeout(() => this.contentPaddingTopH = 46 + this.$refs.tab.clientHeight, 20)

    },
    methods:{
      // val: 数组下标
      tabVal( val ){
        this.index = val
        this.active = val
      },
      // 秒杀时间
      _searchSeckillTime() {
        searchSeckillTime({
          adcode: this.adcode
        })
          .then( res => {

            this.searchSeckillTime = res.data
            console.log('秒杀时间', res)

          })
      },
      // 生鲜时间
      _searchFreshTimes() {
        searchFreshTimes({
          adcode: this.adcode
        })
          .then( res => {

            this.searchSeckillTime = res.data
            console.log('生鲜时间', res)

          })
      },

    }

  }

</script>
<style scoped>
  .seckill{width: 100%;height: 100%;}

  .seckill .tab{position: fixed;top:46px;z-index: 60;width:100%;}

  .seckill .content{width:100%;height: 100%;box-sizing: border-box;overflow: scroll;background-color: white;}

  .seckill .picture{width:100%;height: 2.6rem;}
  .seckill .picture .img1{width:100%;height: 100%;}

  .content .vux-slider{height: 100%;}
</style>
