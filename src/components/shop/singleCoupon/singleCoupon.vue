<template>
  <div>
    <div class="coupon_middle_single">
      <div
        class="coupon_middle_img"
        v-for="(item,index) in receSingleConpon"
        v-bind:style="{ backgroundImage: (index%2)?'url(' + require('../img/couponsGet.png') + ')':'url(' + require('../img/couponsSet.png') + ')',backgroundSize: '100% 100%'}"
        :class="{opacity: title === '失效红包'}"
        @click="couponClick(item)"
      >
        <!--右上角领取图标-->
        <div v-if="item.isGet == 1&&flag!='选择折扣红包'" style="position: absolute; right: 0; top: 0;">
          <img style="width: 0.98rem"  src="../img/getC.png"/>
        </div>
        <!--右上角使用中图标-->
        <div v-if="item.red_id == redId&&flag=='选择折扣红包'" style="position: absolute; right: 0; top: 0;">
          <img style="width: 0.98rem"  src="../img/redUseing.png"/>
        </div>
        <!--end-->
        <div class="coupon_middle_info_two">
          <div class="coupon_money"><span>￥</span><span>{{item.price}}</span></div>
          <div class="coupon_middle_info" v-bind:style="{color: item.color}">
            <div class="coupon_middle_info1">{{item.shop_name}}</div>
            <div class="coupon_middle_info2">满{{item.restrict_price ? item.restrict_price : 0 }}可用</div>
          </div>
        </div>
        <div class="coupon_middle_two">
          <div>使用期限：<span>{{getStartTime(index)}}</span> ~  <span>{{getEndTime(index)}}</span></div>
          <!--<div style="color: #f86e0e" v-if="item.title === '分享列表'" @click="look">查看</div>
          <div style="color: #f86e0e" v-if="item.title === '折扣红包' || item.title === '失效红包'">
            <img style="width: 0.40rem" src="../img/shareSing.png" @click="share"/>
          </div>-->
        </div>
        <!--失效-->
        <div class="invalidPic" v-if="title === '失效红包'">
          <img v-if="item.isuse === 1" src="../img/useless.png"/>
          <img v-if="item.isuse === 2" src="../img/expires.png"/>
        </div>
        <!--失效结束-->
      </div>
    </div>
    <!--提示-->
    <toast v-model="showToast" :time="1000">领取成功</toast>
    <!--end-->
  </div>
</template>
<script>
  import { getDiscount } from "@/api/promotion"
  import { Toast } from 'vux'

  export default {
    components: {
      Toast
    },
    data() {
      return {
        couponHistory: true,
        redId:'',

        showToast: false,
      }
    },
    computed:{
//      redId(){
//        if(this.curConpon==null){
//          return ''
//        }else{
//          return this.curConpon.red_id;
//        }
//      }
    },
    props: {
      receSingleConpon: {
        type: Array
      },
      shopId:{
        type:String,
      },
      flag: '',
      curConpon:{
        default:null,
      },
      title: '',
    },
    mounted(){
      this.redId = this.curConpon==null?'':this.curConpon.red_id;
    },
    methods: {
      couponClick(val) {
        console.log(val)
        // 用户领取折扣红包
        if (this.flag === '所有折扣红包') {

            if(val.isGet){
              this.$store.state.toastText='你已经领取过了，请不要重复领取'
              this.$store.state.toastType='text'
            }else {
              getDiscount({
                red_id: val.red_id,
                get_type: 1, // 领取方式（1:主动领取，2:会员分享）
              })
                .then( res => {

                  this.showToast = true
                  this.$emit('userGetDiscount')
                  console.log('领取折扣红包', res)

                })
            }
        } else if (this.flag === '店铺折扣红包') {

          getDiscount({
            red_id: val.red_id,
            get_type: 1, // 领取方式（1:主动领取，2:会员分享）
          })
            .then( res => {

              /*this.showToast = true*/

              this.$emit('shopDiscount')

              console.log('领取折扣红包', res)

            })
        }else if(this.flag==='选择折扣红包'){
          console.log('111111')
          this.redId=val.red_id;
          this.$emit('changeCurRedPicket', this.shopId, val.red_id, val.price)
        }else{

        }
      },
     /* share() {
        console.log('分享')
      },
      look() {
        this.$emit('look', this.couponHistory)
        console.log('分享列表查看')
      },*/
      getStartTime(a){
        let start = new Date(this.receSingleConpon[a].begin_time);
        return start.getFullYear()+'/'+(start.getMonth()+1)+'/'+start.getDate();
      },
      getEndTime(a){
        let end = new Date(this.receSingleConpon[a].end_time);
        return end.getFullYear()+'/'+(end.getMonth()+1)+'/'+end.getDate();
      }
    },
  }
</script>
<style scoped>
  .coupon_middle_single {
    padding:0.1rem 0.80rem 1.2rem;
    background: #ffffff;
    /*min-height: 6.5rem;*/
  }
  .coupon_middle_img {
    width: 5.85rem;
    height: 2.40rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 0.30rem;
    position: relative;
  }
  .coupon_middle_img.active{border:1px solid #f86e0e}
  .coupon_middle_info_two {
    display: flex;
    justify-content: space-between;
  }
  .coupon_middle_info1,.coupon_middle_info2{
    display: flex;
    justify-content: flex-end;
  }
  .coupon_money {
    font-size: 0.80rem;
    color: #ffffff;
    margin-right: 0.40rem;
  }
  .coupon_middle_info {
    padding: 0.80rem 0.20rem 0.20rem 0.20rem;
    display: flex;
    flex-direction: column;
  }
  .coupon_middle_two {
    display: flex;
    justify-content: space-between;
    font-size: 0.24rem;
    padding: 0.10rem;
    color: #666666;
  }
  .invalidPic {
    position: absolute;
    top: 0.2rem;
    right: 0;
  }
  .invalidPic img {
    width: 1.00rem;
  }
  .opacity {
    opacity: 0.5;
  }
</style>
