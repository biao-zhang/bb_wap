<template>
  <div class="swiperItem">
    <!--轮播图-->
    <swiper loop auto  height="7.5rem" :show-dots="true" dots-position="center">
      <swiper-item v-for="(item,index) in datas.goodsImgList" :key="index"><img style="width:100%;height: 100%;" :src='item'></swiper-item>
    </swiper>
    <!--信息-->
    <div class="swiperItem">
      <!--信息-->
      <div class="ioFo">
        <div class="ioFo1">
          <div class="shAre">
            <span style="display:none;" v-if="datas.isZy===1"></span>
            <span v-if="datas.isZy===2">运营中心自营</span>
            <span v-if="datas.isZy===3">平台自营</span>
            <span>{{datas.goodsName}}</span>
          </div>
          <!-- <div class="shAre1" @click="share">
             <img src="../img/share.png" alt="" />
           </div>-->
        </div>
        <!--价格-->
        <div class="money">
          <div class="line2" style="display: flex" v-if="goodsType !== 3">
            <p class="onep">￥{{datas.goodsPrice}}</p>
            <span v-if="datas.gtVal === 1"></span>
            <span v-if="datas.gtVal === 3"><img src="../img/fresh3.png"/></span>
            <span v-if="datas.gtVal === 4"><img src="../img/newProduct3.png"/></span>
            <span v-if="datas.gtVal === 2"><img src="../img/seckill3.png"/></span>
            <!-- <p class="twop" >￥{{datas.activePrice}}</p> -->
          </div>
          <!-- 活动商品 -->
          <div style="display: flex" v-else >
            <p class="onep">￥{{datas.activePrice}}</p>
            <p class="twop" >￥{{datas.goodsPrice}}</p>
          </div>
          <span class="time" v-if="goodsType === 3">
          <span v-if="datas.nowTime > datas.startTime && datas.nowTime < datas.endTime">
            <span class="blackBox">{{s1}}</span>:
            <span class="blackBox">{{s2}}</span>:
            <span class="blackBox">{{s3}}</span>
          </span>
            <span v-if="datas.nowTime < datas.startTime" style="color: #f86e0e">活动即将开始</span>
          <span v-if="datas.nowTime > datas.endTime" style="color: #f86e0e">活动已结束</span>
        </span>
        </div>
        <!--月销-->
        <div class="monthlySales">
          <p>月销{{datas.saleNum}}{{datas.goodsUnit}}</p>
          <p>{{ datas.goodsShopVO ? datas.goodsShopVO.shopAddress : '' }}</p>
        </div>
      </div>
      <!--分享弹窗-->
      <div v-transfer-dom class="popup_zong1">
        <popup v-model="show_share" position="bottom" >
          <div class="share_list">
            <div>
              <div>
                <img src="../img/fenxiang1.png" alt="">
              </div>
              <p>朋友圈</p>
            </div>
            <div>
              <div>
                <img src="../img/fenxiang2.png" alt="">
              </div>
              <p>QQ空间</p>
            </div>
            <div>
              <div>
                <img src="../img/fenxiang3.png" alt="">
              </div>
              <p>微博</p>
            </div>
            <div>
              <div>
                <img src="../img/fenxiang4.png" alt="">
              </div>
              <p>微信好友</p>
            </div>
            <div>
              <div>
                <img src="../img/fenxiang5.png" alt="">
              </div>
              <p>QQ好友</p>
            </div>
          </div>
          <!--底部-->
          <div class="share_quxiao" @click="btn_closeone()">取消分享</div>
        </popup>
      </div>
    </div>
    <!--线-->
    <div class="wire"></div>
    <!--优惠券-->
    <div class="ticket">
      <you-hui :datas="datas"></you-hui>
    </div>
    <!--线-->
    <div class="wire"></div>
    <!--选择规格-->
    <div class="ticket" >
      <gui-ge :datas="datas" ></gui-ge>
    </div>
    <!--线-->
    <div class="wire"></div>
    <!--评价-->
    <low-evaluation @toDiscuss="toDiscuss" :datas="datas.goodsPjVO"></low-evaluation>
    <!--线1-->
    <div class="wire1"></div>
    <!--店铺-->
    <shop-store v-if="datas.goodsShopVO" :datas="datas.goodsShopVO"></shop-store>
    <!--线-->
    <div class="wire2"></div>
    <!--底部-->
    <shop-footer :datas="datas" v-if="goodsType !== 3"> </shop-footer>
    <!-- 秒杀 没有购物车 -->
    <footerfresh-one :datas="datas" v-if="goodsType === 3"> </footerfresh-one>
  </div>
</template>
<script>
  import {
    Swiper,
    SwiperItem,
    TransferDom,
    Popup,
    Group,
    XNumber,
    XSwitch,
    Divider
  } from "vux";

  // import shopIofo from '@/components/shop/common/shopIofo'
  import lowEvaluation from "@/components/shop/common/lowEvaluation";
  import shopStore from "@/components/shop/common/shopStore";
  import shopFooter from "@/components/shop/common/shopFooter";//有购物车
  import guiGe from "@/components/shop/common/guiGe";
  import youHui from "@/components/shop/common/youHui";
  import footerfreshOne from "@/components/shop/common/footerfreshOne"; //没有购物车

  export default {
    data() {
      return {
        show_one: false,
        show_two: false,
        roundValue: 0,
        num_title: "",
        num_name: "名字",
        num_title_one: "购买数量",
        num_width: "0.8rem",
        s1: '00', //时
        s2: '00', //分
        s3: '00', // 秒
        show_share: false,

        goodsType: '',
      };
    },
    created() {
      // console.log("2级组件", this.datas);
    },

    mounted() {
      this.goodsType = parseInt(this.$route.query.goodsType)
      this.initCountdown();
    },
    computed: {
      Discounts() {
        return this.$store.state.goodsDetail.DiscountDatas;
      },
      setGoodsType() {
        console.log('获取商品类型',this.$store.state.goodsDetail.goodsType)
        return this.$store.state.goodsDetail.goodsType;
      }
    },
    props: {
      datas: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },
    methods: {
      toDiscuss(){
        this.$emit('toDiscuss')
      },

      //分享开启
      share() {
        this.show_share = true;
        console.log("分享");
      },
      btn_closeone() {
        this.show_share = false;
        console.log("分享关闭");
      },
      formatTime(a) {
        //格式化倒计时时间
        if (parseInt(a) < 10) {
          return "0" + parseInt(a);
        } else {
          return parseInt(a);
        }
      },
      initCountdown() {
        /*var date = new Date();
        var toDate = new Date(2018, 4, 4, 18, 0, 0);
        var dateGetTime = date.getTime();
        var toDateGetTime = toDate.getTime();*/
        var DValue = (this.datas.endTime - this.datas.nowTime) / 1000;
        var that = this;
        var interval1 = setInterval(function() {
          DValue--;
          that.s3 = that.formatTime(DValue % 60);
          that.s2 = that.formatTime((DValue / 60) % 60);
          that.s1 = that.formatTime(DValue / 3600);
          if (DValue < 0) {
            clearInterval(interval1);
          }
        }, 1000);
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Swiper,
      SwiperItem,
      lowEvaluation,
      shopStore,
      shopFooter,
      Popup,
      Group,
      XNumber,
      XSwitch,
      Divider,
      guiGe,
      youHui,
      footerfreshOne
    }
  };
</script>
<style scoped>
  .shopIndex {
    background-color: #f5f5f5;
    height: 100%;
  }

  .shopIndex .pullTos {
    width: 100%;
    height: 100%;
    padding-top: 0.54rem;
  }

  .black img {
    height: 7.5rem;
  }

  .vux-slider > .vux-indicator > a > .vux-icon-dot.active,
  .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
    background-color: #248;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot,
  .vux-slider .vux-indicator-right > a > .vux-icon-dot {
    background-color: #843f0d;
  }
  /*信息*/
  .ioFo {
    width: 100%;
    padding: 0.24rem 0.2rem;
    box-sizing: border-box;
  }
  .ioFo1 {
    display: flex;
    justify-content: space-between;
  }
  .shAre {
    /*width:60%;*/
    flex: 1;
  }
  .shAre span:first-child {
    color: #fff;
    font-size: 0.24rem;
    display: inline-block;
    background: #fa6e00;
    padding: 0.1rem 0.14rem;
    border-radius: 0.1rem;
  }
  .shAre span:last-child {
    color: #3c3c3c;
    font-size: 0.3rem;
    font-weight: 600;
    line-height: 0.55rem;
  }
  .shAre1 {
    width: 0.46rem;
    height: 0.76rem;
    margin-right: 0.1rem;
    margin-left: 0.4rem;
  }
  .shAre1 img {
    width: 0.46rem;
    height: 100%;
    display: inline-block;
  }
  /*价格*/
  .money {
    line-height: 0.48rem;
    display: flex;
  }
  /* .money p:first-child {
    color: #f86e0e;
    font-weight: 600;
    font-size: 0.3rem;
  }
  .money p:last-child {
    margin-left: 0.4rem;
    color: #9a9a9a;
    text-decoration: line-through;
  } */
  /*月销*/
  .monthlySales {
    font-size: 0.24rem;
    color: #666666;
    display: flex;
    justify-content: space-between;
    line-height: 0.45rem;
  }
  /*线*/
  .wire {
    width: 100%;
    height: 0.2rem;
    background: #f5f5f5;
  }
  .wire1 {
    width: 100%;
    height: 0.1rem;
    background: #f5f5f5;
  }
  .wire2 {
    width: 100%;
    height: 0.1rem;
    background: #f5f5f5;
    padding-bottom: 1.2rem;
  }
  /*规格选择*/
  .ticket {
    display: flex;
    padding: 0.2rem 0.26rem;
    justify-content: space-between;
    align-items: center;
  }

  /*底部*/
  .footer {
    display: flex;
    justify-content: space-between;
  }
  .footer div {
    text-align: center;
    width: 50%;
    line-height: 1.2rem;
    color: #fff;
    font-size: 0.32rem;
  }
  .footer div:first-child {
    background: #f15352;
  }
  .footer div:last-child {
    background: #f86e0e;
  }

  /* 组件内操作 */
  .shopIndex {
    background-color: #f5f5f5;
    height: 100%;
  }

  .shopIndex .pullTos {
    width: 100%;
    height: 100%;
    padding-top: 0.54rem;
  }

  .black img {
    height: 7.5rem;
  }

  .vux-slider > .vux-indicator > a > .vux-icon-dot.active,
  .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
    background-color: #248;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot,
  .vux-slider .vux-indicator-right > a > .vux-icon-dot {
    background-color: #843f0d;
  }
  /*信息*/
  .ioFo {
    width: 100%;
    padding: 0.24rem 0.2rem;
    box-sizing: border-box;
  }
  .ioFo1 {
    display: flex;
    justify-content: space-between;
  }
  .shAre {
    /*width:60%;*/
    flex: 1;
  }
  .shAre span:first-child {
    color: #fff;
    font-size: 0.24rem;
    display: inline-block;
    background: #fa6e00;
    padding: 0.1rem 0.14rem;
    border-radius: 0.1rem;
  }
  .shAre span:last-child {
    color: #3c3c3c;
    font-size: 0.3rem;
    font-weight: 600;
    line-height: 0.55rem;
  }
  .shAre1 {
    width: 0.46rem;
    height: 0.76rem;
    margin-right: 0.1rem;
    margin-left: 0.4rem;
  }
  .shAre1 img {
    width: 0.46rem;
    height: 100%;
    display: inline-block;
  }
  /*价格*/
  .money {
    line-height: 0.48rem;
    display: flex;
    justify-content: space-between;
  }
  .money .onep {
    color: #f86e0e;
    font-weight: 600;
    font-size: 0.3rem;
  }
  .money .twop {
    margin-left: 0.4rem;
    color: #9a9a9a;
    text-decoration: line-through;
  }
  /*月销*/
  .monthlySales {
    font-size: 0.24rem;
    color: #666666;
    display: flex;
    justify-content: space-between;
    line-height: 0.45rem;
  }
  /*线*/
  .wire {
    width: 100%;
    height: 0.2rem;
    background: #f5f5f5;
  }
  /*分享取消*/
  .share_quxiao {
    line-height: 1rem;
    background: #fff;
    text-align: center;
    font-size: 0.3rem;
    color: #333333;
  }

  .share_list {
    display: flex;
    padding: 0.4rem 0.2rem;
    flex-wrap: wrap;
  }
  .share_list div {
    width: 33.33%;
    display: flex;
    flex-direction: column;
  }
  .share_list div div {
    width: 1.3rem;
    height: 1.3rem;
    align-self: center;
  }
  .share_list div p {
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #333333;
  }
  .share_list div div img {
    width: 100%;
    height: 100%;
  }
  .time {
    float: right;
  }
  .time .blackBox {
    background-color: #212121;
    width: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    display: inline-block;
    color: white;
  }

  .line2 img {
    width: 0.84rem;
    height: 0.41rem;
    margin-left: 0.10rem;
  }
</style>
