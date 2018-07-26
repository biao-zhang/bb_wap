<template>
  <div class="bb_page">
    <x-header  ref="xheader"></x-header>
    <div class="content">
      <div>
        <tab :line-width=2 bar-active-color='#f86e0e' active-color="#f86e0e" v-model="index" default-color="#111" custom-bar-width="1.4rem" ref="BBTab">
          <tab-item :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <x-bottom ref="BBPageBottom"></x-bottom>
  </div>
</template>
<script>
  import {Tab,TabItem,Swiper,SwiperItem} from 'vux'
  import xHeader from '@/components/service/common/xHeader'
  import xBottom from '@/components/service/common/xBottom'

  import ShadowBox from '@/components/service/common/shadowBox'
  import HelpMeQu from '@/components/service/common/helpMeQu'
  import goumaiGoods from '@/components/service/common/goumai'
  import goumaiGoodsAddress from '@/components/service/common/goumaiAddress'
  import goumaiGoodsRemarks from '@/components/service/common/remarks'
  import goumaiGoodsQuicken from '@/components/service/common/goumaiQuicken'

  const list = () => ['帮我买', '帮我取送']
  export default {
    data(){
      return{
        index: 0,
        demo2: '',
        list2: list(),
        tabSwiperHeight:400
      }
    },
    components:{xHeader,xBottom,Tab,TabItem,Swiper,SwiperItem,ShadowBox,HelpMeQu,goumaiGoods,goumaiGoodsAddress,goumaiGoodsRemarks,goumaiGoodsQuicken},
    mounted(){
      var that = this;
      setTimeout(function (){
        that.tabSwiperHeight=(window.innerHeight-that.$refs.xheader.$el.clientHeight-that.$refs.BBTab.$el.clientHeight-that.$refs.BBPageBottom.$el.clientHeight);
      },20)
    },

  }

</script>
<style scoped>
  .bb_page{}

  .content{padding-top:46px;}

  .vux-tab{height: 1rem;box-shadow: 0px 1px 5px #999;z-index: 2}
  .vux-tab .vux-tab-item{line-height: 1.1rem;font-size: 0.34rem;}
  .vux-tab >>> .vux-tab-ink-bar{bottom: 0.1rem;}
  .BBSwiper .vux-slider{height: 100%;}


</style>
