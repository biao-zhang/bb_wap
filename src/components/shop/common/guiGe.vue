<template>
  <div class="guige" @click="spec_choice">
    <div v-if='!guige_show'>请选择规格</div>
    <div v-else>已选：{{guige_content}} 数量：{{curNum}}</div>
    <div class="right">
      <img src="../img/right.png" alt="">
    </div>
    <!--弹窗-->
    <div v-transfer-dom class="popup_zong">
      <popup v-model="show_one" position="bottom" @on-show='popShow' :hide-on-blur="false">
        <!--关闭按钮-->
        <div class="close" @click="close_ong">
          <img src="../img/close1.png" alt="">
        </div>
        <div class="popup_top">
          <div class="popup_img">
            <img :src='datas.goodsImgMaster' alt="">
          </div>
          <div class="popup_top_right">
            <p v-if="this.goodsType === 3">
              <span class="one_span">￥{{datas.activePrice}}</span>
            </p>
           <p v-else>
              <span class="one_span">￥{{datas.goodsPrice}}</span>

            </p>
            <p>库存{{datas.stockNum}}{{datas.goodsUnit}}</p>
          </div>
        </div>
        <!--规格-->
        <div class="guige_one">
          <div class="guige_one_one">
            <guige-choice v-for="(item,index) in datas.gsList" :key="index" :index="index" :datas="item" @clickgs="getGuige"> </guige-choice>
          </div>
          <!--数量-->
          <div class="number_one">
            <div>
              <group :title="num_title">
                <x-number  :fillable=true :max="datas.stockNum" :name="num_name" :title="num_title_one" :min="1"  v-model="changeValue" :width="num_width" @on-change="dian" :value="1"></x-number>
              </group>
            </div>
          </div>
        </div>
        <!--底部-->
        <div class="footer">
          <div class="addcat" v-if="goodsType !== 3 && activityType !== 3" @click="addCart">加入购物车</div>
          <div class="onebuy" @click="nowBuy" :style="{width: goodsType === 3 || activityType === 3 ? '100%' : '50%'}">
            <span>立即购买</span>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import { TransferDom, Popup, Group, XNumber, XSwitch, Divider } from "vux";
  import guigeChoice from "@/components/shop/storedetails/assembly/guigeChoice";
  import { addCarB2c, addCarO2o, b2cCartNum, o2oCartNum} from "@/api/personally";
  import { searchGpdById } from "@/api/shop";
import { setTimeout } from 'timers';

  export default {
    components: {
      Popup,
      Group,
      XNumber,
      XSwitch,
      Divider,
      guigeChoice
    },
    data() {
      return {
        guige_show: false,
        guige_content: "",
        roundValue: 0,
        num_title: "",
        num_name: "名字",
        num_title_one: "购买数量",
        changeValue: 1,
        num_width: "0.8rem",
        curProductName: "",
        activityId: '',
        activityType: '',
        goodsType: '',

      };
    },
    directives: {
      TransferDom
    },
    computed: {
      show_one: {
        get: function () {
          return this.$store.state.goodsDetail.show_one
        },
        set: () => ''
      },
      curNum(){
        return this.$store.state.goodsDetail.curNum
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
    mounted() {
      this.$store.commit('goodsDetail/clearProduct',{});
      this.activityId = this.$route.query.activityId
      this.activityType = parseInt(this.$route.query.activityType)
      this.goodsType = parseInt(this.$route.query.goodsType)
      console.log('立即购买当前规格-加载完毕', this.$store.state.goodsDetail.curProduct);
    },
    methods: {
      popShow(){

      },
      spec_choice() {

        if (this.goodsType === 3) {

          if (this.datas.nowTime > this.datas.endTime) {

            this.$store.commit('setToastText', '该商品暂不支持购买')
            this.$store.commit('setToastType', 'text')

          } else if (this.datas.nowTime < this.datas.startTime) {

            this.$store.commit('setToastText', '请稍后购买')
            this.$store.commit('setToastType', 'text')

          } else if (this.datas.nowTime > this.datas.startTime && this.datas.nowTime < this.datas.endTime) {

            this.$store.commit('goodsDetail/setShowOne', true)

          } else {

            this.$store.commit('setToastText', '系统异常')
            this.$store.commit('setToastType', 'warn')
          }

        } else {

          this.$store.commit('goodsDetail/setShowOne', true)

        }
      },
      //关闭
      close_ong() {

        this.$store.commit('goodsDetail/setShowOne', false)
        if(this.$store.state.goodsDetail.curProduct)
        {
          if(this.$store.state.goodsDetail.curProduct.productName)
          {
            console.log(this.datas.goodsName.length)
            var goodsNameLen = this.datas.goodsName.length;

            this.guige_show =  true;
            this.guige_content = this.$store.state.goodsDetail.curProduct.productName.substring(goodsNameLen);
          }
        }
      },
      dian(val) {
        this.$store.commit("goodsDetail/setCurNum", val);
      },
      // 单品详情
      getGuige(index, b) {

        this.$store.commit("goodsDetail/setCurSvIds", [index, b]);

        this.$store.dispatch({
          type: "goodsDetail/getProduct",
          goodsId: this.datas.goodsId,
          svIds: this.$store.state.goodsDetail.curSvIds.join(","),
          goodsType: this.goodsType,
          activityId: this.activityId,
        }).then(()=>{
          console.log(this.$store.state.goodsDetail.curProduct.stockNum,this.$store.state.goodsDetail.curProduct.productPrice,11);
          if(this.$store.state.goodsDetail.curProduct)
          {
              this.datas.stockNum = this.$store.state.goodsDetail.curProduct.stockNum;
              this.datas.goodsPrice  = this.$store.state.goodsDetail.curProduct.productPrice;
          }
          console.log('iddd',this.datas.goodsId,'单品ID'+this.$store.state.goodsDetail.curProduct.productId);
        });
        // if(this.$store.state.goodsDetail.curProduct)
        // {
        //   this.datas.stockNum = this.$store.state.goodsDetail.curProduct.stockNum;
        //   this.datas.goodsPrice  = this.$store.state.goodsDetail.curProduct.productPrice;
        //   // this.$store.dispatch().then(()=>{

        //   // })

        //   // var that = this;
        //   // setTimeout(function(){
        //   //    console.log(that.$store.state.goodsDetail.curProduct.stockNum,that.$store.state.goodsDetail.curProduct.productPrice,111111111112);
        //   // },1000)
        // }

          console.log('iddds',this.datas.goodsId,this.$store.state.goodsDetail.curSvIds.join(","),this.goodsType,);
      },
      // 加入购物车
      addCart() {

        if (this.goodsType === 1) {

          if (this.gsListNum()) {

            this._addCarB2c()

          } else {

            this.$store.commit('setToastText', '请选择规格')
            this.$store.commit('setToastType', 'warn')

          }

        } else if (this.goodsType === 2) {

          // 合作终端的
          if (this.gsListNum()) {

            this._addCarO2o()

          } else {

            this.$store.commit('setToastText', '请选择规格')
            this.$store.commit('setToastType', 'warn')

          }
        }

      },
      // 立即购买
      nowBuy() {
        console.log('立即购买当前规格', this.$store.state.goodsDetail.curProduct);
        if (this.goodsType === 1) {

          if (this.gsListNum()) {

            // b2c普通商品
            // console.log(this.$store.state.goodsDetail.curNum,'111111111');
            if(this.datas.stockNum >0)
            {
              this.$router.push({
              path: "/z/confirmOrder",
              query: {
                orderType: "nowBuyOrder",
                goodsId: this.datas.goodsId,
                id: this.$store.state.goodsDetail.curProduct.productId?this.$store.state.goodsDetail.curProduct.productId:'',
                num: this.changeValue,
                isZy: this.datas.isZy, ///!* 是否自营 1.代表非直营 2.营运商自营，3.总平台自营,/
                shopId: this.datas.shopId,
                // 当goodsType为1时，activityType只传空值就行（不管是普通的还是新品）
                activityType: '',
                activityId: this.activityId ? this.activityId : '', //活动ID(秒杀与生鲜商品商品购买时，活动ID必传)
              }
            });
            this.$store.commit('goodsDetail/setShowOne', false)
            }
            else{

              this.$store.commit('setToastText','库存不足')
              this.$store.commit('setToastType','warn')
              return false
            }

          } else {

            this.$store.commit('setToastText', '请选择规格')
            this.$store.commit('setToastType', 'warn')

          }

        } else if (this.goodsType === 2) {

          if (this.gsListNum()) {

            // 合作终端的

            this.$router.push({
              path: "/z/confirmOrder1",
              query: {
                orderType: "nowBuyOrder",
                goodsId: this.datas.goodsId,
                id: this.$store.state.goodsDetail.curProduct.productId?this.$store.state.goodsDetail.curProduct.productId:'',
                num: this.changeValue ,
                // isZy: this.datas.isZy, ///!* 是否自营 1.代表非直营 2.营运商自营，3.总平台自营,/
                shopId: this.datas.shopId,
              }
            })
            this.$store.commit('goodsDetail/setShowOne', false)
          } else {

            this.$store.commit('setToastText', '请选择规格')
            this.$store.commit('setToastType', 'warn')

          }

        } else if (this.goodsType === 3) {
          // console.log('活动立即购买',this.$store.state.goodsDetail.curProduct.productId)
          // 活动的
          this.$router.push({
            path: "/z/confirmOrder",
            query: {
              orderType: "nowBuyOrder",
              goodsId: this.datas.goodsId,
              id: this.$store.state.goodsDetail.curProduct.productId?this.$store.state.goodsDetail.curProduct.productId:'',
              num: this.$store.state.goodsDetail.curNum,
              isZy: this.datas.isZy, //* 是否自营 1.代表非直营 2.营运商自营，3.总平台自营,/
              shopId: this.datas.shopId,
              activityType: this.activityType?this.activityType:'', //活动类别(秒杀与生鲜商品商品购买时，买活动类别必传) 活动类别：1.秒杀，2生鲜
              activityId: this.activityId?this.activityId:'', //活动ID(秒杀与生鲜商品商品购买时，活动ID必传)
            }
          });
        }
      },
      // 加入购物车
      _addCarB2c() {
        addCarB2c({
          goodsId: this.datas.goodsId,   // 商品ID
          productId: this.$store.state.goodsDetail.curProduct ? this.$store.state.goodsDetail.curProduct.productId : '', // 商品单品ID
          num: this.changeValue,  // 商品单品数量
          isZy: this.datas.isZy, //  是否自营 1.代表非直营 2.营运商自营，3.总平台自营
          shopId: this.datas.shopId, // 店铺ID
          terminalType: 'wap', // web,wap,ios,android 操作端
        })
          .then( res => {
            if (res.message === 'success') {

             this._b2cCartNum()

            this.$store.commit('setToastText', '加入购物车成功')
            this.$store.commit('setToastType', 'success')
            this.$store.commit('goodsDetail/setShowOne', false)
            } else {
              // alert(res.message)
            }
            console.log('b2c加入购物车', res)
          })
      },
      _addCarO2o() {
        addCarO2o({
          goodsId: this.datas.goodsId,   // 商品ID
          productId: this.$store.state.goodsDetail.curProduct ? this.$store.state.goodsDetail.curProduct.productId : '', // 商品单品ID
          num: this.changeValue,  // 商品单品数量
          terminalType: 'wap', // web,wap,ios,android 操作端
        })
          .then( res => {

            if (res.message === 'success') {

              this._o2oCartNum()

              this.$store.commit('setToastText', '加入购物车成功')
              this.$store.commit('setToastType', 'success')

              this.$store.commit('goodsDetail/setShowOne', false)


            } else {

              // alert(res.message)
            }

            console.log('o2o加入购物车', res)

          })
      },
      // b2c购物车数量
      _b2cCartNum() {
        b2cCartNum({

          terminalType: 'wap',

        }).then( res => {

          this.$store.commit('cart/setCartNum', res.data)

          console.log('b2c购物车数量', res)

        })
      },
      // o2o购物车数量
      _o2oCartNum() {
        o2oCartNum({
          shopId: this.datas.shopId,
          terminalType: 'wap',

        }).then( res => {

          this.$store.commit('cart/setCartNum', res.data)

          console.log('o2o购物车数量', res)

        })
      },
      // 判断是否选择规格
      gsListNum() {
        console.log('判断规格',this.datas.gsList);
        if (this.datas.gsList == null ) {
          //没有gslist
          return true;
        } else {
          let gslist = this.datas.gsList.length; //规格数组

          if (
            this.$store.state.goodsDetail.curSvIds &&
            this.$store.state.goodsDetail.curSvIds.length > 0
          ) {

            let storecurGslistNum = this.$store.state.goodsDetail.curSvIds.length;

            console.log('对比数组',this.$store.state.goodsDetail.curSvIds);
            if (gslist === storecurGslistNum) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      },

    }
  };
</script>
<style scoped>
  /*选择规格*/
  .guige {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .guige div:first-child {
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

  /*弹窗头*/
  .popup_top {
    background: #fff;
    padding: 0 0.2rem 0.2rem 0.2rem;
    display: flex;
    border-bottom:1px solid #cccccc;
  }
  .guige_one_one {
    height: 4.5rem;
    overflow: scroll;
    background: #fff;
  }
  .guige_one {
    height: 5.5rem;
  }
  .popup_img {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: -0.2rem;
  }
  .popup_img img {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 0.1rem;
  }
  .popup_top_right {
    padding-left: 2.4rem;
  }
  .vux-popup-dialog {
    overflow: visible;
  }
  .popup_top_right p {
    line-height: 0.9rem;
    font-size: 0.3rem;
    color: #666666;
  }
  .popup_top_right p .one_span {
    color: #f86e0e;
    font-weight: 600;
  }
  .popup_top_right p .two_span {
    color: #9a9a9a;
    font-size: 0.24rem;
    text-decoration: line-through;
    margin-left: 0.4rem;
  }
  .number_one >>> .vux-no-group-title {
    margin: 0 !important;
  }
  .number_one >>> .weui-cells {
    margin: 0 !important;
  }
  .number_one >>> .vux-number-selector svg {
    fill: #454648;
  }

  .number_one >>> .weui-cells:after {
    height: 0;
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
  .footer .addcat {
    background: #f15352;
  }
  .footer .onebuy {
    background: #f86e0e;
  }
  .twobuy {
    width: 100%;
    background: #f86e0e;
  }
  /*规格选择*/
  .ticket {
    display: flex;
    padding: 0.2rem 0.26rem;
    justify-content: space-between;
    align-items: center;
  }
  .ticket div:first-child {
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
  .ticket div:first-child {
    flex: 1;
  }
  .ticket div span {
    font-size: 0.3rem;
    color: #3c3c3c;
    font-weight: 600;
  }
  .ticket div span:first-child {
    color: #f86e0e;
    border-right: 0.05rem solid #f86e0e;
    padding-right: 0.16rem;
  }
  .ticket div span:last-child {
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







