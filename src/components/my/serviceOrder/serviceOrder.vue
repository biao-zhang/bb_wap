<template>
  <div class='serviceOrder'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div>
      <div class='orderNum'>
        <span>订单编号：</span>
        <span>{{ serviceOrderDetail.orderId }}</span>
      </div>
      <!--地址-->
      <div v-if="false">
        <service-address> </service-address>
      </div>
      <div class='orderObject'>
        <span class="serviceTitle">服务类型：</span>
        <span>{{ serviceOrderDetail.serviceProjectName }}</span>
      </div>
      <div class='orderInfo'>
        <span class="serviceTitle">服务说明：</span>
        <div class="xTextarea">
          <group>
            <x-textarea v-if="serviceOrderDetail" :max="140" v-model="serviceOrderDetail.serviceContent"  :height="80" :disabled="true"> </x-textarea>
          </group>
        </div>
        <div style="margin-top: 0.10rem">
          <img
            style="width: 0.90rem; height: 0.90rem; margin-right: 0.10rem;"
            v-for="item in serviceOrderDetail.imgs"
            :src="item"/>
        </div>
      </div>
    </div>
    <div>
      <!--第一种情况-->
      <div
        class='serviceAddress'
        v-if="serviceOrderDetail.serviceTypeName === '家政帮' || serviceOrderDetail.serviceTypeName === '维修帮' || serviceOrderDetail.serviceTypeName === '找帮手'"
      >
        <span style="display: inline-block; width: 5rem; color: #666666"><i class="iconfont icon-dizhi" style="margin-right: 0.12rem"></i><span>服务地址</span></span>
        <span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{ serviceOrderDetail.serviceAddress }}</span>
      </div>
      <!--第三种情况-->
      <div
        class='serviceAddress'
        v-if="serviceOrderDetail.serviceTypeName === '司机帮'"
      >
        <span style="display: inline-block; width: 4.00rem; color: #666666">
          <i class="iconfont icon-dizhi" style="margin-right: 0.12rem"></i>
          <span>出发地址</span>
        </span>
        <span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{ serviceOrderDetail.startingAddress }}</span>
      </div>
      <div
        class='serviceAddress'
        v-if="serviceOrderDetail.serviceTypeName === '司机帮'"
        style="border-top: 1px solid #eee;"
      >
        <span style="display: inline-block; width: 4.00rem; color: #666666">
          <i class="iconfont icon-dizhi" style="margin-right: 0.12rem"></i>
          <span>到达地址</span>
        </span>
        <span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{ serviceOrderDetail.destinationAddress }}</span>
      </div>
      <!--end-->
      <div class='orderTime'>
        <span style="color: #666666"><i class="iconfont icon-shijian" style="margin-right: 0.12rem"></i><span>预约时间</span></span>
        <span>{{createTime[0]}}-{{createTime[1]}}-{{createTime[2]}} {{createTime[3]}}:{{createTime[4]}}:{{createTime[5]}}</span>
      </div>
      <div class='telPhone'>
        <span style="color: #666666"><i class="iconfont icon-dianhua" style="margin-right: 0.12rem"></i><span>联系电话</span></span>
        <span>{{ serviceOrderDetail.contactsPeoplePhone }}</span>
      </div>
    </div>
    <!--补单-->
    <div v-if="supplementLength !== 0" style="padding: 0.20rem; background-color: #f5f5f5;">
      <div>
        <span style="color: #f86e0e; font-weight: bold; font-size: 0.12rem; vertical-align: middle">|</span>
        <span style="vertical-align: middle">补单</span>
      </div>
      <div v-for="item in serviceOrderDetail.supplementList">
        <div class="xTextarea">
          <group>
            <x-textarea :max="140" v-model="item.supplementContent"  :height="80" :readonly="true"> </x-textarea>
          </group>
        </div>
        <div style="padding: 0.20rem 0; display: flex; justify-content: flex-end">
          <div style="padding: 0.10rem; display: inline-block">价格：<span style="margin: 0.20rem; color: #f86e0e">￥{{ item.supplimentCost }}</span></div>
          <div @click="goPay(item)" class="goPay" v-if="item.supplementPayState === 0">去付款</div>
          <span v-if="item.supplementPayState === 1" style="margin: 0 0.20rem; padding: 0.10rem; display: inline-block">已支付</span>
        </div>
      </div>
    </div>
    <!--end-->
    <!--空div-->
    <div style="padding: 0.56rem 0"></div>
    <!--end-->
    <div>
      <help-information v-if="serviceOrderDetail" :service-children="serviceOrderDetail"> </help-information>
    </div>
    <div class="bottomBtn">
      <div class='serviceBtn'>
        <div class="serviceBtnContent">
          <div class="serviceBtnLeft" @click="sumMoney">
            <span>共计：</span>
            <span style="color: #f86e0e">￥<span>{{ serviceOrderDetail.actualPayMoney }}</span></span>
            <img src="../img/triangle.png"/>
          </div>
          <div class="serviceBtnRight">
            <div v-if="serviceOrderDetail.orderState === 0" >
              <div class="cancel" @click="operate1">取消订单</div>
              <div class="pay" @click="operate2">去支付 </div>
            </div>
            <div v-if="serviceOrderDetail.orderState === 1" >
              <div class="cancel"  @click="operate1">取消订单</div>
              <!--<div class="detailStatusItem" style="display: inline-block" @click="operate2">去支付 </div>-->
            </div>
            <div v-if="serviceOrderDetail.orderState === 2" >
              <div class="cancel" @click="operate1"> 取消订单</div>
              <!--<div class="detailStatusItem" style="display: inline-block" @click="operate2"> </div>-->
            </div>
            <div v-if="serviceOrderDetail.orderState === 3" >
              <div class="cancel" @click="operate1">确认完成</div>
            </div>
            <div v-if="serviceOrderDetail.orderState === 4" >
              <div class="cancel" @click="operate1">去评价</div>
            </div>
            <div v-if="serviceOrderDetail.orderState === 5" >
              <!--<div class="detailStatusItem" style="display: inline-block" @click="operate1">删除订单</div>-->
              <!--<div class="detailStatusItem" style="display: inline-block" @click="operate2"> </div>-->
            </div>

            <!--其他-->
             <!--<div v-if="serviceOrderDetail.orderState === 6">已取消</div>
             <div v-if="serviceOrderDetail.orderState === 7">已退款</div>
             <div v-if="serviceOrderDetail.orderState === 10">退款中</div>-->
          </div>
          <div class="mask" v-if="maskState">
            <mask-box @cloMask2="cloMask">
              <div class="costDetail" v-on:click.stop="de($event)">
                <div class="pickerBox">
                  <div class="pickerLogo"><img class="" :src="serviceOrderDetail.serviceImgA"></div>
                  <div class="line"><span class="s1">服务费：</span><span class="s2">￥{{ serviceOrderDetail.serviceCost }}</span> </div>
                  <div class="line"><span class="s1">夜班费：</span><span class="s2">￥{{ serviceOrderDetail.nightCost }}</span> </div>
                  <div class="line"><span class="s1">恶劣天气费：</span><span class="s2">￥{{ serviceOrderDetail.badWeatherCost }}</span> </div>
                  <div class="line"><span class="s1">帮帮加速费：</span><span class="s2">￥{{ serviceOrderDetail.accelerateCost }}</span> </div>
                  <div class="line"><span class="s1">积分抵扣费：</span><span class="s2">￥{{ serviceOrderDetail.integralDeduction }}</span> </div>
                  <div class="clo"><img @click="cloPicker" src="../img/clo.png"/> </div>
                </div>
              </div>
            </mask-box>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XHeader, Group, XTextarea, } from 'vux'
  import serviceBtn from './serviceBtn'
  import serviceAddress from './serviceAddress'
  import { serviceOrderDetail, serviceInsert, serviceOk } from "@/api/service"
  import {time} from '@/untils/untils'
  import maskBox from '@/components/common/maskBox'
  import helpInformation from './helpInformation'

  export default{
    components: {
      XHeader,
      Group,
      XTextarea,
      serviceBtn,
      serviceAddress,
      maskBox,
      helpInformation
    },
    data(){
      return{
        topMessage: '服务订单',
        maskState: false,

        orderId: '',
        serviceOrderDetail: '',
        adcode: '', // 区县编码
      }
    },
    computed: {
      createTime() {
        return time(this.serviceOrderDetail.timeOfAppointment)
      },

      supplementLength() {
        let newP = this.serviceOrderDetail.supplementList
        return newP ? newP.length : 0
      }
    },
    props:{

    },
    mounted(){
      this.orderId = this.$route.query.orderId
      this.adcode = localStorage.getItem('curCityAdcode')

      this._serviceOrderDetail()
    },
    methods:{
      /*弹窗相关*/
      sumMoney() {
        this.maskState = true
      },
      cloMask() {
        this.maskState = false
      },
      cloPicker() {
        this.maskState = false
      },
      de(a){
        a.preventDefault();
      },
      /*end*/

      // 服务详情
      _serviceOrderDetail() {
        serviceOrderDetail({
          orderId: this.orderId,
          adcode: this.adcode,
        })
            .then( res => {

              if(res.result === 1) {

                if(res.message === 'success') {

                  this.serviceOrderDetail = res.data

                } else {

                  this.$store.commit('setToastText', res.message)
                  this.$store.commit('setToastType', 'warn')

                }

              } else {

                this.$store.commit('setToastText', '数据异常')
                this.$store.commit('setToastType', 'warn')

              }

              console.log('service服务详情', res)

            })
      },
      // 操作1
      operate1() {
        let status = this.serviceOrderDetail.orderState
        if (status === 0 || status === 1 || status === 2) {

          this._serviceInsert()

        }  else if (status === 3) {
          // 确认完成
          this._serviceOk()

        } else if (status === 4) {

          // 去评价
          this.$router.push({path:'/z/serviceEvaluate', query: {orderId: this.orderId}})

        }
      },
      // 操作2
      operate2() {
        let status = this.serviceOrderDetail.orderState
        if (status === 0) {

          // 去支付
          this.$router.push({path:'/y/paymentMethod', query: {orderId: this.orderId, settlementType: 4}})

        }
      },
      // 取消订单
      _serviceInsert() {
        serviceInsert({orderId: this.orderId}).then( res => {
          this._serviceOrderDetail()
          console.log('service取消订单', res)
        })
      },

      // 确认完成
      _serviceOk() {
        serviceOk({orderId: this.orderId}).then( res => {

          if(res.result === 1) {

            if(res.message === 'success') {

              this._serviceOrderDetail()

            } else {

              this.$store.commit('setToastText', res.message)
              this.$store.commit('setToastType', 'warn')

            }

          } else {

            this.$store.commit('setToastText', '数据异常')
            this.$store.commit('setToastType', 'warn')

          }

          console.log('service确认收货', res)
        })
      },
      // 补单
      goPay(item) {
        this.$router.push({path: '/y/paymentMethod', query: {orderId: item.supplementOrderId, settlementType: 6}})
      }
    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .serviceOrder {
    font-size: 0.30rem;
  }
  .orderNum,.orderObject,.orderInfo{
    padding: 0.35rem 0.20rem;
    background-color: #ffffff;
  }
  .orderNum {
    margin-top: 0.10rem;
  }
  .orderObject {
    margin: 0.10rem 0;
    display: flex;
    justify-content: space-between;
  }
  .orderInfo {
    margin-bottom: 0.30rem;
  }
  .serviceTitle {
    color: #666666;
  }
  .xTextarea >>> .vux-x-textarea {
    border:1px solid #eee;
    border-radius: 5px;
  }
  .xTextarea >>> .weui-cells:before {
    border: 0;
  }
  .xTextarea >>> .weui-cells:after {
    border: 0;
  }
  .serviceAddress,.orderTime,.telPhone{
    padding: 0.35rem 0.20rem;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
  }
  .orderTime {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .serviceBtn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .serviceBtnContent {
    padding: 0.15rem 0.20rem;
    background-color: #ffffff;
    overflow: hidden;
    border-top:1px solid #eee;
  }
  .serviceBtnLeft {
    float: left;
    padding: 0.20rem;
  }
  .serviceBtnLeft img {
    width: 0.20rem;
    height: 0.20rem;
  }
  .serviceBtnRight {
    float: right;
  }
  .cancel,.pay {
    padding: 0.20rem;
    float: left;
    border-radius: 3px;
  }
  .cancel {
    margin-right: 0.20rem;
    border:1px solid #cccccc;
  }
  .pay {
    background-color: #f86e0e;
    color: #ffffff;
  }

  .costDetail{width:7.1rem;height: 4rem;background-color: white;border-radius: 0.1rem;position: fixed;z-index: 81;bottom:1rem;margin:0 0.2rem;padding:0.3rem 0;box-sizing: border-box;}
  .costDetail .pickerLogo{width:1.3rem;height: 1.3rem;position: absolute;top:-0.65rem;left: 0.7rem;background-color: white;border-radius: 50%;border:0.04rem solid #f86e0e;overflow: hidden;}
  .costDetail .pickerLogo img{width:100%;height: 100%;}
  .costDetail .line{width: 100%;line-height: 0.55rem;font-size: 0.3rem;color:#333;}
  .costDetail .line .s1{width: 3.6rem;text-align: right;display: inline-block;}
  .costDetail .line .s2{color:#f86e0e}
  .costDetail .pickerBox .clo{width:100%;text-align: center}
  .costDetail .pickerBox .clo img{width:0.38rem;margin-bottom: -0.2rem;}

  .goPay {
    margin: 0 0.20rem;
    display: inline-block;
    padding: 0.10rem;
    background-color: #f86e0e;
    color: #ffffff;
    border-radius: 5px;
  }

</style>
