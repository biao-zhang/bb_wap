
<template>
  <div class="youhui" @click="ticket">
    <div>
      <span>优惠</span>
      <span>领取折扣红包</span>
    </div>
    <div class="right">
      <img src="../img/right.png" alt="">
    </div>
    <!--领取优惠券弹窗-->
    <div v-transfer-dom class="popup_zong">
      <popup v-model="show_two" @on-show='popShow' height='70%' position="bottom">
        <!--关闭按钮-->
        <div class="close_ong" @click="close_two()">
          <img src="../img/xiangxia.png" alt="">
        </div>
        <div class="finish_top">领取折扣红包</div>
        <single-coupon v-if="discounts.length"  :rece-single-conpon="discounts" :flag="'店铺折扣红包'" @shopDiscount="shopDiscount"> </single-coupon>

        <!--底部-->
        <!-- <div class="finish" @click="finish">完成</div> -->
      </popup>
    </div>
  </div>
</template>
<script>
import { TransferDom, Popup, Group, XNumber, XSwitch, Divider } from "vux";
import {getFindDiscountByShopId} from "@/api/promotion"
import singleCoupon from "@/components/shop/singleCoupon/singleCoupon";
import coupunBlue from "@/components/shop/storedetails/assembly/coupunBlue";
import coupunOrange from "@/components/shop/storedetails/assembly/coupunOrange";

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

      discounts: [],
    };
  },
  directives: {
    TransferDom
  },
  props: {
    datas: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  components: {
    TransferDom,
    Popup,
    Group,
    XNumber,
    XSwitch,
    Divider,
    coupunBlue,
    coupunOrange,
    singleCoupon,
  },
  mounted(){
      console.log('商店类型',this.$route.query.goodsType)
  },
  watch:{

  },
  methods: {
    shopDiscount() {
      this._getFindDiscountByShopId()
    },
    finish() {
      this.show_two = false
    },
    // 店铺优惠券表
    popShow(){
      this._getFindDiscountByShopId();
    },
    ticket() {
      this.show_two = true;
     /* if(Object.keys(this.discounts).length !== 0) {



      } else {

        this.$store.commit('setToastText', '暂无可用红包')
        this.$store.commit('setToastType', 'warn')

      }*/

    },
    close_two() {
      this.show_two = false;
    },
    _getFindDiscountByShopId() {
      var that = this;
      let params = {
        shop_id: this.datas.goodsShopVO.shopId,
        shop_type: this.$route.query.goodsType? this.$route.query.goodsType:'', // 店铺的类型（1：b2c，2：o2o）
      };
      getFindDiscountByShopId(params).then(res => {
        if (res.result) {
          let data = res.data;
          if(res.data){
           that.discounts = data.discounts;
          }
        } else {
        }
        // console.log('获取店铺所有红包', res.data)
      });
    }
  }
};
</script>
<style scoped>
/*领取优惠券弹窗*/
.youhui {
  position: relative;
}
.finish_top {
  line-height: 1rem;
  text-align: center;
  color: #3c3c3c;
  font-size: 0.34rem;
  background: #fff;
  border-bottom:1px solid #cccccc;
}
.finish {
  line-height: 1.2rem;
  background: #f15352;
  text-align: center;
  color: #fff;
  font-size: 0.32rem;
}
/*满减按钮*/
.vux-popup-dialog {
  background: #fff;
}
.fullcut {
  display: flex;
  margin: 0.3rem 0.2rem 0.1rem;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #fff;

  display: -moz-box;
  display: -webkit-box;
  display: box;
  overflow: auto;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  display: none;
}
.fullcut p {
  width: 2rem;
  height: 0.5rem;
  background: -webkit-linear-gradient(left, #f86e0e, #f45f32, #f15451);
  text-align: center;
  line-height: 0.5rem;
  border-radius: 0.1rem;
  color: #fff;
  font-size: 0.24rem;
  margin-left: 0.2rem;
}
.fullcut p:first-child {
  margin: 0;
}
/*优惠券*/
.quan {
  overflow: scroll;
  height: 5rem;
}
.quan_top {
  line-height: 0.9rem;
  background: #fff;
  text-align: center;
  font-size: 0.34rem;
  border-bottom:1px solid #cccccc;
}
.coupon {
  padding: 0.2rem 0.9rem;
}

.youhui {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.youhui div:first-child {
  flex: 1;
  font-size: 0.3rem;
  color: #3c3c3c;
  font-weight: 600;
}
.right {
  width: 0.18rem;
  height: 0.29rem;
}
.right img {
  width: 0.18rem;
  height: 0.29rem;
}
.youhui div:first-child {
  flex: 1;
}
.youhui div span {
  font-size: 0.3rem;
  color: #3c3c3c;
  font-weight: 600;
}
.youhui div span:first-child {
  color: #f86e0e;
  border-right: 0.05rem solid #f86e0e;
  padding-right: 0.16rem;
}
.youhui div span:last-child {
  padding-left: 0.14rem;
}

/*取消按钮*/
.close_ong {
  width: 0.38rem;
  height: 0.12rem;
  position: absolute;
  top: 0.35rem;
  right: 0.2rem;
}
.close_ong img {
  width: 100%;
  height: 100%;
}
.close {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
}
.close img {
  width: 100%;
  height: 100%;
}
</style>
