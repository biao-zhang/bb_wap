<template>
  <div class='serviceOrderList'>
    <div class="top" ref="topt">
      <x-header :left-options="{backText: ''}">{{ msg_m }}</x-header>
    </div>
    <div ref="tabt" class="ttabc">
      <tab :line-width=2 active-color='#f9925d' v-model="index" ref="tabttt">
        <tab-item
          class="vux-center"
          :style="{fontSize: '0.34rem'}"
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
            <service-item :order-children="item1" @cancelOrder="cancelOrder" @conformOrder="conformOrder"> </service-item>
          </div>
          <div v-if="demo2 === '待付款'" v-for="item1 in pullToDatas" >
            <service-item :order-children="item1" @cancelOrder="cancelOrder" @conformOrder="conformOrder"> </service-item>
          </div>
          <div v-if="demo2 === '已接单'" v-for="item1 in pullToDatas" >
            <service-item :order-children="item1" @cancelOrder="cancelOrder" @conformOrder="conformOrder"> </service-item>
          </div>
          <div v-if="demo2 === '待接单'" v-for="item1 in pullToDatas" >
            <service-item :order-children="item1" @cancelOrder="cancelOrder" @conformOrder="conformOrder"> </service-item>
          </div>
          <div v-if="demo2 === '服务中'" v-for="item1 in pullToDatas" >
            <service-item :order-children="item1" @cancelOrder="cancelOrder" @conformOrder="conformOrder"> </service-item>
          </div>
          <div v-if="demo2 === '待评价'" v-for="item1 in pullToDatas" >
            <service-item :order-children="item1" @cancelOrder="cancelOrder" @conformOrder="conformOrder"> </service-item>
          </div>
          <div v-if="demo2 === '已评价'" v-for="item1 in pullToDatas" >
            <service-item :order-children="item1" @cancelOrder="cancelOrder" @conformOrder="conformOrder"> </service-item>
          </div>
          <div v-if="pullToDatas.length === 0">
            <nothing-service> </nothing-service>
          </div>
        </div>
      </pull-to>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XHeader, Tab, TabItem, Swiper, SwiperItem, XDialog, } from 'vux'
  import serviceItem from './serviceItem'
  import { getAllOrder } from "@/api/service"
  import PullTo from 'vue-pull-to'
  import nothingService from './nothingService'

  const list = () => ['全部', '待付款', '待接单', '已接单', '服务中','待评价', '已评价']
  export default{
    components: {
      XHeader,
      serviceItem,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      XDialog,
      PullTo,
      nothingService
    },
    data(){
      return{
        pullToDatas: [],
        pageNum: 1,
        pageSize: 10,
        state: -1,

        msg_m: '服务订单',
        list2: list(),
        index: 0,
        hei: '', // swiper高度
        delId: 0, // 订单id
        orderHeightL: 0,
        showDialogStyle: false,

        demo2: '全部',
      }
    },
    props:{

    },
    mounted() {
      // 初始化列表
      this._getAllOrder()

      setTimeout(() => { this.orderHeightL = window.innerHeight - 46 - this.$refs.tabt.clientHeight }, 20)
    },
    methods: {

      tabClick(item, index) {

        if (item === '全部') {

          this.state = -1
          this._getAllOrder()

        } else if (item === '待付款') {

          this.state = 0
          this._getAllOrder()

        } else if (item === '待接单') {

          this.state = 1
          this._getAllOrder()

        } else if (item === '已接单') {

          this.state = 2
          this._getAllOrder()

        } else if (item === '服务中') {

          this.state = 3
          this._getAllOrder()

        } else if (item === '待评价') {

          this.state = 4
          this._getAllOrder()

        } else if (item === '已评价') {

          this.state = 5
          this._getAllOrder()

        }

      },
      // 上拉加载
      loadmore(loaded) {
        this.pageNum ++
        setTimeout(() => this._getAllOrder(loaded, 'loaded'), 1000)
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1
        setTimeout(() => this._getAllOrder(loaded, 'refresh'), 1000)
      },
      // 服务列表
      _getAllOrder( loaded, type ) {

        getAllOrder({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          state: this.state, // 订单状态（-1:全部 0：待支付 1:待接单 2:已接单 3:服务中 4:已完成 5:已评价 6:已取消 7:已退款 10:退款中）
        })
          .then( res => {

            console.log('service当前页列表', res)

            if (loaded) {

              if (type === 'refresh') this.pullToDatas = []  // 下拉刷新只显示第一页数据

              this.pullToDatas =  this.pullToDatas.concat(res.data);

              loaded('done');

              console.log('service所有页列表', this.pullToDatas)

            }  else {

              // 页面第一次加载的数据
              this.pullToDatas =  res.data

            }

          })
      },
      cancelOrder() {
        this.pageNum = 1
        this._getAllOrder()
      },

      conformOrder() {
        this.pageNum = 1
        this._getAllOrder()
      },
    },

  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff; z-index: 9999}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .ttabc >>> .vux-tab-wrap {z-index: 9999}

  .dialogBox {
    border-radius: 0.20rem;
    font-size: 0.34rem;
    background-color: #fff;
  }
  .sureTitel {
    padding: 0.80rem 0;
    text-align: center;
  }
  .sureBtn {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
  }
  .sureBtnCancel,.sureBtnSure {
    padding: 0.35rem 0;
    text-align: center;
    width: 3.25rem;
  }
  .sureBtnSure {
    color: #fff;
    background-color: #f15352;
  }
</style>
