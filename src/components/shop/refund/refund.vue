<template>
  <div class="refund">
    <!--xHeader-->
    <div class="header">
      <x-header :msg="titleText"></x-header>
    </div>
    <div class="content">
      <!--money-->
      <div class="money">
        <div class="refundMoney">
          <div class="line1"><span class="s1">退款金额：</span><span class="s2">￥{{recData.refundMoney}}</span> </div>
          <div class="line1" style="display: flex; justify-content: space-between;">
            <span class="s1">退款状态：</span>
            <div style="color: #f86e0e">
              <!--退款状态-->
              <div v-if="recData.refundStatus === 0" class="goodsOrder-title status" >退款中</div>
              <div v-if="recData.refundStatus === 5" class="goodsOrder-title status" >商户审核确认退款</div>
              <!--<div v-if="itemChildren.refundStatus === 10" class="goodsOrder-title status" >取消售后</div>-->
              <div v-if="recData.refundStatus === 12" class="goodsOrder-title status" >商户拒绝退款</div>
              <div v-if="recData.refundStatus === 13" class="goodsOrder-title status" >商户已退款</div>
              <div v-if="recData.refundStatus === 14" class="goodsOrder-title status" >商户退款失败</div>
              <!--end-->
            </div>
          </div>
          <div class="line2">客服会在一到五个工作日内受理</div>
          <div v-if="recData.refundStatus === 12">
            <span>理由：</span>
            <span>{{ recData.adminRefuseReason }}</span>
          </div>
        </div>
      </div>
      <!--message-->
      <div class="message" style="padding: 0 0.20rem">
        <div class="refundMsg">
          <div class="line1" ><span class="s1">退款信息：</span> </div>
          <div class="line2" >
            <div class="img1Box" style="display: inline-block; vertical-align: top">
              <img :src="recData.goodsImgMaster" class="img1">
            </div>
            <div class="img1BoxR" style="display: inline-block; margin-left: 0.20rem; vertical-align: top">
              <div class="name re-twoLineOverFlow" style="width: 2rem">{{ recData.goodsName }} {{ recData.goodsSpecs }}</div>
              <div class="number">x{{ recData.refundNum }}</div>
            </div>
          </div>
        </div>
      </div>
      <!--explain-->
      <div class="explain" style="padding: 0 0.20rem">
        <div class="refundExplain">
          <div class="line1"><span class="s1">退款说明：</span> </div>
          <x-textarea class="textarea" :placeholder="placeHolder" :max="140"></x-textarea>
        </div>
      </div>
      <!--photo-->
      <div class="photo" style="height: 3.00rem" v-if="recData.imgList.length !== 0">
        <div class="line1"><span class="s1">退款图片：</span> </div>
        <div class="refundPhoto">
          <img v-for="item in recData.imgList" :src="item"/>
        </div>
      </div>
      <!--time-->
      <div class="time">
        <div class="refundTime">
          <div class="recline1">申请时间：{{createTime[0]}}.{{createTime[1]}}.{{createTime[2]}} {{createTime[3]}}:{{createTime[4]}}:{{createTime[5]}}</div>
          <div class="recline1">退款编号：{{ recData.tranOrderNo }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import xHeader from '@/components/shop/common/xHeader'
  import { selectRefundDetailById } from "@/api/personally"
  import { XTextarea } from 'vux'
  import {time} from '@/untils/untils'

  export default {
    data(){
      return{
        titleText:'退款详情',    //headerTitle
//        datas
        refundMoneyDatas:{
          'money':100.00,
          'type':'退款中',
          'word':'剩余2天21:20:20商家处理，如果商家未进行处理，请联系平台进行处理。',
        },
        refundMsgDatas:{},
        refundExplainDatas:{},
        refundPhotoDatas:{},
        refundTimeDatas:{},

        recid: '',
        recData: '',

      }
    },
    computed: {
      placeHolder() {
        return this.recData.intro
      },
      // 申请时间
      createTime() {
        return time(this.recData.refundTime)
      }
    },
    components:{xHeader,XTextarea},
    mounted() {
      this.recid = this.$route.query.recid

      this._selectRefundDetailById()
    },
    methods: {
      _selectRefundDetailById() {
        selectRefundDetailById({
          recid:  this.recid
        })
          .then( res => {

            this.recData = res.data
            console.log('b2c退款详情', res)

          })
      }
    }
  }
</script>
<style scoped>
  .refund{width:100%;height: 100%;}
  /*xHeader*/
  .header{position: fixed;top:0;z-index: 1;}

  .content{width:100%;height: 100%;box-sizing: border-box;padding-top:1rem;}

  .money,.message,.explain,.photo,.time{margin-top:0.2rem;background-color: white;}

  .refundMoney{width:100%;height: 2.6rem;padding:0.3rem 0.2rem;box-sizing: border-box;}

  .line1{font-size: 0.3rem;line-height: 0.5rem;}
  .line1 .s1{color:#3c3c3c;}
  .line1 .s2{color:#f86e0e;float: right;}

  .line2{font-size: 0.24rem;color:#9a9a9a;line-height: 0.5rem;}

  .img1Box{display:inline-block;width:1.4rem;height: 1.4rem;vertical-align: middle;}

  .img1Box .img1{width:100%;height: 100%;}

  .textarea{padding:0;text-indent: 2em;font-size: 0.3rem;color:#999;line-height: 0.4rem;}

  .weui-cell:before{border-top:0;}

  .refundTime{width:100%;height:1.25rem;padding:0.3rem 0.2rem;box-sizing: border-box;}

  .recline1{font-size: 0.24rem;color:#9a9a9a;}
</style>
