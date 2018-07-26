<template>
  <div style="background-color: #f5f5f5" ref="topAll">
    <div class="top" ref="topt">
      <x-header :left-options="{backText: ''}">{{ msg_m }}</x-header>
    </div>
    <div ref="tabt" class="ttabc">
      <tab :line-width=2 active-color='#f9925d' v-model="index" ref="tabttt">
        <tab-item
          class="vux-center"
          v-bind:style="{fontSize: '0.34rem'}"
          :selected="demo2 === item"
          v-for="(item, index) in list2"
          @click.native="tabClick(item, index)"
          :key="index"

        >
          {{item}}
        </tab-item>
      </tab>
    </div>
    <div :style="{height: orderHeightL+'px'}" style="overflow: scroll">

          <pull-to
            :bottom-load-method="loadmore"
            :top-load-method="refresh"
          >
            <div class="tab-swiper vux-center">
              <div v-if="demo2 === '全部'"  v-for="item1 in pullToDatas" >
                <order-item :order-children="item1" @cancelOrder="cancelOrder"> </order-item>
              </div>
              <div v-if="demo2 === '待付款'" v-for="item1 in pullToDatas">
                <order-item :order-children="item1" @cancelOrder="cancelOrder"> </order-item>
              </div>
              <div v-if="demo2 === '待发货'" v-for="item1 in pullToDatas">
                <order-item :order-children="item1" @cancelOrder="cancelOrder"> </order-item>
              </div>
              <div v-if="demo2 === '待收货'" v-for="item1 in pullToDatas">
                <order-item :order-children="item1" @cancelOrder="cancelOrder"> </order-item>
              </div>
              <div v-if="demo2 === '待评价'" v-for="item1 in pullToDatas">
                <order-item :order-children="item1" @cancelOrder="cancelOrder"> </order-item>
              </div>
              <div v-if="pullToDatas.length === 0">
                <nothing-order> </nothing-order>
              </div>
            </div>

          </pull-to>

    </div>
  </div>
</template>
<script>
  import { XHeader, Tab, TabItem, Swiper, SwiperItem, XDialog, } from 'vux'
  import OrderItem from './orderItem.vue'
  import { goodsSelectList } from "@/api/personally"
  import PullTo from 'vue-pull-to'
  import nothingOrder from './nothingOrder'

  const list = () => ['全部', '待付款', '待发货', '待收货', '待评价']
  export default {
    name: 'myOr',
    components: {
      XHeader,
      OrderItem,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      XDialog,
      PullTo,
      nothingOrder
    },
    data() {
      return {
        pullToDatas: [],
        pageNum: 1,
        pageSize: 10,
        status: 1,

        msg_m: '我的订单',
        demo2: '全部',
        list2: list(),
        index: 0,
        tabIndex: 9999,
        hei: '', // swiper高度
        orderHeightL: 0,
      }
    },
    computed: {

      showDialogStyle() {
        return this.$store.state.my.goodsOrder.showDialogStyle
      },

    },
    mounted() {
      // 初始化列表
      /*this._goodsSelectList()*/

      this.demo2 = this.$route.query.orderState

      if (this.demo2 === '全部') {

        this.status = 1
        this._goodsSelectList()

      } else if (this.demo2 === '待付款') {

        this.status = 2
        this._goodsSelectList()

      } else if (this.demo2 === '待发货') {

        this.status = 3
        this._goodsSelectList()

      } else if (this.demo2 === '待收货') {

        this.status = 4
        this._goodsSelectList()

      } else if (this.demo2 === '待评价') {

        this.status = 5
        this._goodsSelectList()

      }

      setTimeout(() => {
        this.orderHeightL = window.innerHeight - 46 - this.$refs.tabt.clientHeight;

      }, 20)
    },
    methods: {
      // 上拉加载
      loadmore(loaded) {
        this.pageNum ++
        setTimeout(() => this._goodsSelectList(loaded, 'loaded'), 1000)
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1
        setTimeout(() => this._goodsSelectList(loaded, 'refresh'), 1000)
      },
      // 商品列表
      _goodsSelectList( loaded, type ) {

        goodsSelectList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          status: this.status, // 前端订单状态全部-1 待付款-2 待发货-3 待收货-4 待评价-5
        })
          .then( res => {

            console.log('b2c当前页商品列表', res)

            if (loaded) {

              if (type === 'refresh') this.pullToDatas = []  // 下拉刷新只显示第一页数据

              this.pullToDatas =  this.pullToDatas.concat(res.data);

              loaded('done');

              console.log('b2c所有商品列表', this.pullToDatas)

            }  else {

              // 页面第一次加载的数据
              this.pullToDatas = res.data

            }

          })
      },
      // tab选项卡
      tabClick(item, index) {

        if (item === '全部') {

          this.status = 1;
          this.pageNum = 1;
          this._goodsSelectList()

        } else if (item === '待付款') {

          this.status = 2
          this.pageNum = 1;
          this._goodsSelectList()

        } else if (item === '待发货') {

          this.status = 3
          this.pageNum = 1;
          this._goodsSelectList()

        } else if (item === '待收货') {

          this.status = 4
          this.pageNum = 1;
          this._goodsSelectList()

        } else if (item === '待评价') {

          this.status = 5
          this.pageNum = 1;
          this._goodsSelectList()

        }

      },
      // 取消/删除/确认
      cancelOrder() {
        this.pageNum = 1
        this._goodsSelectList()
      },
    },
  }
</script>
<style scoped>

  .vux-header { background-color: #ffffff; z-index: 9999}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .ttabc >>> .vux-tab-wrap {z-index: 9999}
</style>
