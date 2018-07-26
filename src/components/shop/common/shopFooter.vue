<template>
    <div class="shopFooter">
      <div class="shopFooter_div">
        <div class="left">
            <div class="customerService" @click="kefu">
                <div class="image1">
                  <img src="../img/kefu.png" alt="">
                </div>
              <p>客服</p>
            </div>
            <div class="colleCtion">
              <div class="image2">
                <img v-if="radioState==0" @click="changeRadioState" class="img2" src="../img/star1.png"/>
                <img v-else @click="changeRadioState" class="img2" src="../img/star2.png"/>
              </div>
              <p>收藏</p>
            </div>
            <div class="shoppingCart" @click="toCart">
                <div  class="image3" style="position: relative">
                  <img src="../img/car.png" alt="">
                  <div class="cartNum">{{ cartNum }}</div>
                </div>
              <p>购物车</p>
            </div>
        </div>
        <div class="right">
            <div @click="addCart" v-if="activityType !== 3">加入购物车</div>
            <div @click="nowBuy" :style="{width: activityType !== 3 ? '50%' : '100%'}">立即购买</div>
        </div>
      </div>
      <!--客服弹窗-->
      <div v-transfer-dom class="popup_zong1">
        <popup v-model="show_kefu" position="bottom" >
            <!--客服-->
            <div class="kefu">
              <div class="kefu_top">
                  <div>
                    <div>
                      <img src="../img/qq1.png" alt="">
                    </div>
                    <p class="lei">QQ客服</p>
                    <p  class="qq"  :data-clipboard-text='qq' @click="copy('qq')">{{qq}}</p>
                  </div>
                <div>
                  <div>
                    <img src="../img/qq2.png" alt="">
                  </div>
                  <p class="lei">微信客服</p>
                  <p class="weixin"  :data-clipboard-text='weixin' @click="copy('weixin')">{{weixin}}</p>
                </div>
                <div>
                  <div>
                    <img src="../img/qq3.png" alt="">
                  </div>
                  <p class="lei">电话客服</p>
                  <p ><a style="color:#fff" :href="'tel:'+phone">{{phone}}</a></p>
                </div>
              </div>
            </div>
            <!--底部-->
            <div class="kefu_quxiao" @click="close_kefu">取消</div>
        </popup>
      </div>
    </div>
</template>
<script>
import { SwiperItem, TransferDom, Popup } from "vux";
import { GetSelectBasicByIdDetail, b2cCartNum, o2oCartNum } from "@/api/personally";
import {
  getSearchGpdById,
  addGoodsCollection,
  searchGoodsIsNotCollection,
  getQueryShopSettingById
} from "@/api/shop";
import Clipboard from 'clipboard';
// import {isEmpty} from "@/untils/untils";

export default {
  data() {
    return {
      show_kefu: false,
      radioState: 0,
      session_id: "",
      activityType: "",
      loginState:'',
      qq:'暂无',
      weixin:'暂无',
      phone:'暂无',
    };
  },
  props: {
    datas: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  directives: {
    TransferDom
  },
  computed: {
    cartNum() {
      return this.$store.state.cart.cartNum
    }
  },
  mounted() {
    // console.log('radioState',this.radioState)
    this.goodsType = parseInt(this.$route.query.goodsType);
    this.goodsId = this.$route.query.recommendId;
    this.activityType = parseInt(this.$route.query.activityType);
    this.session_id = this.getCookie("session_id");
    this._GetSelectBasicByIdDetail();

    if (this.session_id) this._searchGoodsIsNotCollection();

    if(this.goodsType === 2) {

      this._o2oCartNum()

    } else if (this.goodsType === 1) {

      this._b2cCartNum()

    }
    this._getQueryShopSettingById();
  },
  components: { SwiperItem, Popup },
  methods: {
    copy(val) {
        if(val == 'qq')
        {
        var clipboard = new Clipboard('.qq')
        clipboard.on('success', e => {
        this.$store.commit("setToastType", "text");
        this.$store.commit("setToastText", "复制成功，请打开QQ添加");
        // 释放内存
        clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
        this.$store.commit("setToastType", "text");
        this.$store.commit("setToastText", "该浏览器不支持自动复制");
          // 释放内存
        clipboard.destroy()
        })
        }
        else{
        var clipboard1 = new Clipboard('.weixin')
        clipboard1.on('success', e => {
        this.$store.commit("setToastType", "text");
        this.$store.commit("setToastText", "复制成功，请打开微信添加");
        // 释放内存
        clipboard1.destroy()
        })
        clipboard1.on('error', e => {
          // 不支持复制
        this.$store.commit("setToastType", "text");
        this.$store.commit("setToastText", "该浏览器不支持自动复制");
          // 释放内存
        clipboard1.destroy()
        })
        }

      }
      ,
    // 加入购物车
    addCart() {
      this.$store.commit("goodsDetail/setShowOne", true);
    },
    // 立即购买
    nowBuy() {
      this.$store.commit("goodsDetail/setShowOne", true);
    },
    kefu() {
      this.show_kefu = true;
      console.log("客服");
    },
    close_kefu() {
      this.show_kefu = false;
      console.log("客服取消");
    },
    // 收藏
    changeRadioState() {
      // if(this.session_id)

      if (this.loginState=='1') {

        if (this.radioState) {
          // 取消
          this._addGoodsCollection(1);
        } else {
          // 添加
          this._addGoodsCollection(0);
        }
      } else {
        this.$router.push("/y/logIn");
      }
    },
    toCart() {
      if (this.datas.gtVal == "5") {
        this.$router.push({
          path: "/x/cartShop",
          query: { shopId: this.datas.shopId }
        });
      } else {
        this.$router.push({ path: "/x/shoppingCart" });
      }
    },
    //获取客服
    _getQueryShopSettingById(){
      let params = {
        shopId:this.datas.shopId,
      }
      getQueryShopSettingById(params).then(res =>{
        if(!this.isEmpty(res.data) )
        {
          this.qq = res.data.qq;
          this.weixin = res.data.weixin;
          this.phone = res.data.phone;
        }
        // else
        // {
        //   this.$store.commit('setToastText','店铺没有客服信息')
        //   this.$store.commit('setToastType','warn')

        // }
      })
    },
    // 添加收藏或取消
    _addGoodsCollection(val) {
      if (this.goodsType === 2) {
        addGoodsCollection({
          goodsId: this.datas.goodsId, // 商品ID
          shopType: 1, // 商品所属商家的类型(2、b2c本地；1、合作终端；3、b2b本地；4、b2b全国)
          signStr: val // 添加或取消标记(1取消；0添加)
        }).then(res => {
          if (val) {
            this._searchGoodsIsNotCollection();
            this.$store.commit("setToastText", "取消成功");
            this.$store.commit("setToastType", "success");
          } else {
            this._searchGoodsIsNotCollection();
            this.$store.commit("setToastText", "收藏成功");
            this.$store.commit("setToastType", "success");
          }
          // console.log("合作终端添加收藏或取消", res);
        });
      } else {
        addGoodsCollection({
          goodsId: this.goodsId, // 商品ID
          shopType: 2, // 商品所属商家的类型(2、b2c本地；1、合作终端；3、b2b本地；4、b2b全国)
          signStr: val // 添加或取消标记(1取消；0添加)
        }).then(res => {
          if (val) {
            this._searchGoodsIsNotCollection();
            this.$store.commit("setToastText", "取消成功");
            this.$store.commit("setToastType", "success");
          } else {
            this._searchGoodsIsNotCollection();
            this.$store.commit("setToastText", "收藏成功");
            this.$store.commit("setToastType", "success");
          }

          console.log("b2c添加收藏或取消", res);
        });
      }
    },
    // 购物车数量
    _b2cCartNum() {
      b2cCartNum({

        terminalType: 'wap',

      }).then( res => {

        this.$store.commit('cart/setCartNum', res.data)

        console.log('b2c购物车数量', res)

      })
    },
    // 购物车数量
    _o2oCartNum() {
      o2oCartNum({
        shopId: this.datas.shopId,
        terminalType: 'wap',

      }).then( res => {

        this.$store.commit('cart/setCartNum', res.data)

        console.log('o2o购物车数量', res)

      })
    },
    isEmpty(obj) {
      for (var name in obj) {
        return false;
      }
      return true;
    },
    //获取用户信息
      _GetSelectBasicByIdDetail() {
      let params = {};
      GetSelectBasicByIdDetail(params).then(res => {
        if (!this.isEmpty(res.data)) {

          this.loginState = '1'
        } else {
         this.loginState = '0'
        }
      });
    },
    // 判断商品是否收藏
    _searchGoodsIsNotCollection() {
      searchGoodsIsNotCollection({
        goodsId: this.goodsId
      }).then(res => {
        this.radioState = res.data;
        console.log("是否收藏", res);
      });
    },
    getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
  }
};
</script>
<style scoped>
.shopFooter_div {
  width: 100%;
  height: 1.2rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
}
.left {
  width: 3.5rem;
  display: flex;
  justify-content: space-between;
}
.left > div {
  width: 33.33%;
  display: flex;
  flex-direction: column;
}
.left > div p {
  text-align: center;
  line-height: 0.6rem;
}
.image1 {
  width: 0.42rem;
  height: 0.4rem;
  align-self: center;
  margin-top: 0.22rem;
}
.image2 {
  width: 0.42rem;
  height: 0.4rem;
  align-self: center;
  margin-top: 0.22rem;
}
.image3 {
  width: 0.42rem;
  height: 0.4rem;
  align-self: center;
  margin-top: 0.22rem;
}
.image1 img,
.image2 img,
.image3 img {
  width: 100%;
  height: 100%;
}
.right {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.right div {
  width: 50%;
  text-align: center;
  line-height: 1.2rem;
  font-size: 0.3rem;
  color: #fff;
}
.right div:first-child {
  background: #f15352;
}
.right div:last-child {
  background: #f86e0e;
}
/*客服弹窗*/
.kefu_quxiao {
  line-height: 1rem;
  background: #fff;
  text-align: center;
  font-size: 0.3rem;
  color: #333333;
}
.kefu {
  padding: 0.7rem 0.2rem 0.9rem;
}
.kefu_top {
  display: flex;
  justify-content: space-between;
}
.kefu_top > div {
  width: 2rem;
  display: flex;
  flex-direction: column;
  border-right:1px solid #fff;
  padding-right: 0.24rem;
}
.kefu_top > div:last-child {
  border: none;
  padding: 0;
}
.kefu_top div div {
  width: 0.9rem;
  height: 0.9rem;
  align-self: center;
}
.kefu_top img {
  width: 100%;
  height: 100%;
}
.kefu_top div p {
  text-align: center;
}
.lei {
  line-height: 0.8rem;
  font-size: 0.3rem;
  color: #333333;
}
.kefu_top div p:last-child {
  color: #ffffff;
  font-size: 0.24rem;
  line-height: 0.5rem;
  background: -webkit-linear-gradient(left, #f86e0e, #f45f32, #f15451);
  border-radius: 0.1rem;
}
.inputBox img2 {
  width: 0.42rem;
  height: 0.42rem;
}
.cartNum {
  width: 0.20rem;
  height: 0.20rem;
  padding: 0.05rem;
  border-radius: 50%;
  background-color: #f86e0e;
  color: #ffffff;
  position: absolute;
  top: -0.08rem;
  right: -0.2rem;
  text-align: center;
  line-height: 0.20rem
}
</style>
