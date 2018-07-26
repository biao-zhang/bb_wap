<template>
  <div style="background-color: #f5f5f5">
    <div class="top" ref="topt">
      <x-header :left-options="{backText: ''}">{{ msg_m }}</x-header>
    </div>
    <div>
      <div ref="tabt" class="ttabc">
        <tab :line-width=2 active-color='#f9925d' v-model="index" ref="tabttt">
          <tab-item
            class="vux-center"
            v-bind:style="{fontSize: '0.34rem'}"
            :selected="demo2 === item"
            v-for="(item, index) in list2"
            @on-item-click="tabClick(item, index)"
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
                  <order-item :order-children="item1"  @cancelOrder="cancelOrder" @deleteOrder="deleteOrder" @conformOrder="conformOrder"> </order-item>
                </div>
                <div v-if="demo2 === '待付款'" v-for="item1 in pullToDatas">
                  <order-item :order-children="item1"  @cancelOrder="cancelOrder" @deleteOrder="deleteOrder" @conformOrder="conformOrder"> </order-item>
                </div>
                <div v-if="demo2 === '待消费'" v-for="item1 in pullToDatas">
                  <order-item :order-children="item1"  @cancelOrder="cancelOrder" @deleteOrder="deleteOrder" @conformOrder="conformOrder"> </order-item>
                </div>
                <div v-if="demo2 === '待评价'" v-for="item1 in pullToDatas">
                  <order-item :order-children="item1"  @cancelOrder="cancelOrder" @deleteOrder="deleteOrder" @conformOrder="conformOrder"> </order-item>
                </div>
              </div>
            </pull-to>

      </div>

    </div>

  </div>
</template>
<script>
  import { XHeader, Tab, TabItem, Swiper, SwiperItem, XDialog, } from 'vux'
  import OrderItem from './orderItem.vue'
  import { o2oSelectList } from "@/api/personally"
  import PullTo from 'vue-pull-to'

  const list = () => ['全部', '待付款', '待消费', '待评价']
  export default {
    components: {
      XHeader,
      OrderItem,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      XDialog,
      PullTo,
    },
    data() {
      return {
        pullToDatas: [],
        pageNum: 1,
        pageSize: 10,
        status: -1,

        msg_m: '终端店订单',
        demo2: '全部',
        list2: list(),
        index: 0,
        showDialogStyle: false,
        tabIndex: 9999,
        hei: '', // swiper高度
        delId: 0, // 订单id

        orderHeightL: 0,

      }
    },
    mounted() {
      // 初始化列表
      this._o2oSelectList()

      setTimeout(() => this.orderHeightL = window.innerHeight - 46 - this.$refs.tabt.clientHeight, 0)

    },
    methods: {

      tabClick(item, index) {

        if (item === '全部') {

          this.status = -1
          this._o2oSelectList()

        } else if (item === '待付款') {

          this.status = 0
          this._o2oSelectList()

        } else if (item === '待消费') {

          this.status = 1
          this._o2oSelectList()

        }  else if (item === '待评价') {

          this.status = 2
          this._o2oSelectList()

        }
      },

      // 上拉加载
      loadmore(loaded) {
        this.pageNum ++
        setTimeout(() => this._o2oSelectList(loaded, 'loaded'), 1000)
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1
        setTimeout(() => this._o2oSelectList(loaded, 'refresh'), 1000)
      },
      _o2oSelectList( loaded, type ) {
        o2oSelectList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          status: this.status, // -1 全部，0 未付款, 1 待消费, 2 待评价
        })
          .then( res => {

            console.log('o2o当前页商品列表', res, this.pageNum)

            if (loaded) {

              if (type === 'refresh') this.pullToDatas = []  // 下拉刷新只显示第一页数据

              this.pullToDatas =  this.pullToDatas.concat(res.data);

              loaded('done');

              console.log('o2o所有页商品列表', this.pullToDatas)

            }  else {

              // 页面第一次加载的数据
              this.pullToDatas = res.data;

            }

          })
      },
      cancelOrder() {
        this.pageNum = 1
        this._o2oSelectList()
      },
      deleteOrder() {
        this.pageNum = 1
        this._o2oSelectList()
      },
      conformOrder() {
        this.pageNum = 1
        this._o2oSelectList()
      },
    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff; z-index: 9999}
  .top >>> .vux-header-title {color: #000; }
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
