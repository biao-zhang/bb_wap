<template>
  <div class="footerfresh">
    <div class="footerfresh_one">
    <div class="left">
      <div class="customerService" @click="kefu">
        <div class="image1">
          <img src="../img/kefu.png" alt="">
        </div>
        <p>客服</p>
      </div>
      <div class="colleCtion">
        <div class="image2">
          <img v-if="radioState" @click="changeRadioState" class="img2" src="../img/star2.png"/>
          <img v-else @click="changeRadioState" class="img2" src="../img/star1.png"/>
        </div>
        <p>收藏</p>
      </div>
      <div class="shoppingCart">
        <div  class="image3">
          <img src="../img/car.png" alt="">
        </div>
        <p>购物车</p>
      </div>
    </div>
    <div class="right">
      <div v-if="datas.nowTime > datas.startTime && datas.nowTime < datas.endTime" @click="showPlugin">立即购买</div>
      <div v-if="datas.nowTime < datas.startTime">即将开始</div>
      <div v-if="datas.nowTime > datas.endTime" style="background-color: #666666">已结束</div>
    </div>
    </div>
    <!--弹窗-->
    <div v-transfer-dom>
      <confirm v-model="show" @on-cancel="onCancel" @on-confirm="onConfirm" confirm-text="确认">
        <p style="text-align:center;">确认提醒？</p>
      </confirm>
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
              <p>联系客服</p>
            </div>
            <div>
              <div>
                <img src="../img/qq2.png" alt="">
              </div>
              <p class="lei">微信客服</p>
              <p>15523458902</p>
            </div>
            <div>
              <div>
                <img src="../img/qq3.png" alt="">
              </div>
              <p class="lei">电话客服</p>
              <p style="color:#fff" >400-9998888</p>
            </div>
          </div>
        </div>
        <!--底部-->
        <div class="kefu_quxiao" @click="close_kefu()">取消</div>
      </popup>
    </div>
  </div>
</template>
<script>
  import { Confirm, Group, XSwitch, XButton, TransferDomDirective as TransferDom ,Popup} from 'vux'
  import { getSearchGpdById, addGoodsCollection, searchGoodsIsNotCollection } from "@/api/shop"


  export default {
    data(){
      return{
        tan_title:"确定提醒？",
        show:false,
        show_kefu: false,

        radioState: 0,
        goodsType: '',
      }
    },
    directives: {
      TransferDom
    },
    props: ['datas'],
    components:{
      Confirm,
      Group,
      XSwitch,
      XButton,
      Popup
    },
    mounted() {
      this.goodsId = this.$route.query.recommendId

      this.session_id = this.getCookie('session_id')

      if (this.session_id) this._searchGoodsIsNotCollection()
    },
    methods: {
      showPlugin () {
        /*this.show = true;*/
        this.$store.commit('goodsDetail/setShowOne', true)
      },
      onConfirm(){
        console.log("点击确定")
      },
      onCancel(){
        console.log("点击取消")
      },
      kefu() {
        this.show_kefu = true;
        console.log('客服')
      },
      close_kefu(){
        this.show_kefu = false;
        console.log('客服取消')
      },
      //  收藏
      changeRadioState(){
      //         if(this.$route.query.activityType)
      // {

      // }
           this.$store.commit("setToastText", "活动商品不能收藏");
            this.$store.commit("setToastType", "text");
            return false
        // if (this.session_id) {

        //   if (this.radioState) {
        //     // 取消
        //     this._addGoodsCollection(1)

        //   } else {

        //     // 添加
        //     this._addGoodsCollection(0)

        //   }

        // } else {

        //   this.$router.push('/y/logIn')

        // }

      },
      // 添加收藏或取消
      _addGoodsCollection(val) {
        if (this.goodsType === 2) {

          addGoodsCollection({
            goodsId: this.datas.goodsId, // 商品ID
            shopType: 1, // 商品所属商家的类型(2、b2c本地；1、合作终端；3、b2b本地；4、b2b全国)
            signStr: val, // 添加或取消标记(1取消；0添加)
          })
            .then( res => {

              if (val) {

                this._searchGoodsIsNotCollection()
                this.$store.commit('setToastText', '取消成功')
                this.$store.commit('setToastType', 'success')

              } else {

                this._searchGoodsIsNotCollection()
                this.$store.commit('setToastText', '收藏成功')
                this.$store.commit('setToastType', 'success')

              }

              console.log('合作终端添加收藏或取消', res)

            })

        } else {

          addGoodsCollection({
            goodsId: this.goodsId, // 商品ID
            shopType: 2, // 商品所属商家的类型(2、b2c本地；1、合作终端；3、b2b本地；4、b2b全国)
            signStr: val, // 添加或取消标记(1取消；0添加)
          })
            .then( res => {

              if (val) {

                this._searchGoodsIsNotCollection()
                this.$store.commit('setToastText', '取消成功')
                this.$store.commit('setToastType', 'success')

              } else {

                this._searchGoodsIsNotCollection()
                this.$store.commit('setToastText', '收藏成功')
                this.$store.commit('setToastType', 'success')

              }

              console.log('b2c添加收藏或取消', res)

            })
        }

      },
      // 判断商品是否收藏
      _searchGoodsIsNotCollection() {
        searchGoodsIsNotCollection({
          goodsId: this.goodsId,
        })
          .then( res => {

            this.radioState = res.data
            console.log('是否收藏', res)

          })
      },
      getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
        else return null;
      }
    },
  }
</script>
<style scoped>
  .footerfresh_one{
    width:100%;
    height:1.2rem;
    background: #FFF;
    position: fixed;
    bottom: 0;
    display: flex;
  }
  .left{
    width:3.5rem;
    display: flex;
    justify-content: space-between;
  }
  .left>div{
    width:33.33%;
    display:flex;
    flex-direction:column;
  }
  .left>div p{
    text-align:center;
    line-height:0.6rem;
  }
  .image1{
    width:0.42rem;
    height: 0.4rem;
    align-self:center;
    margin-top:0.22rem;
  }
  .image2{
    width:0.42rem;
    height: 0.4rem;
    align-self:center;
    margin-top:0.22rem;
  }
  .image3{
    width:0.42rem;
    height: 0.4rem;
    align-self:center;
    margin-top:0.22rem;
  }
  .image1 img,.image2 img,.image3 img{
    width:100%;
    height:100%;
  }
  .right{
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
  .right div{
    width:100%;
    text-align:center;
    line-height:1.2rem;
    font-size:0.3rem;
    color:#fff;
  }
  .right {
    background:#f86e0e;
  }
  /*弹窗*/
  .v-transfer-dom>>>.weui-dialog__btn_primary{
    background:#f15352 !important;
    color:#fff;
  }
  .weui-dialog>>>.weui-dialog__hd{
    padding: 3.5em 1.6em 3.5em;
  }
  /*客服弹窗*/
  .kefu_quxiao{
    line-height:1rem;
    background:#fff;
    text-align:center;
    font-size:0.3rem;
    color:#333333;
  }
  .kefu{
    padding:0.7rem 0.2rem 0.9rem;
  }
  .kefu_top{
    display: flex;
    justify-content: space-between;
  }
  .kefu_top>div{
    width:2rem;
    display: flex;
    flex-direction: column;
    border-right:1px solid #fff;
    padding-right:0.24rem;
  }
  .kefu_top>div:last-child{
    border:none;
    padding:0;
  }
  .kefu_top div div{
    width:0.9rem;
    height:0.9rem;
    align-self: center;
  }
  .kefu_top img{
    width:100%;
    height:100%;
  }
  .kefu_top div p{
    text-align:center;
  }
  .lei{
    line-height:0.8rem;
    font-size:0.3rem;
    color:#333333;
  }
  .kefu_top div p:last-child{
    color:#ffffff;
    font-size:0.24rem;
    line-height:0.5rem;
    background: -webkit-linear-gradient(left, #f86e0e, #f45f32, #f15451);
    border-radius:0.1rem;
  }
</style>
