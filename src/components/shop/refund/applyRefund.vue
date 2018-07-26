<template>
  <div class="applyRefund">
    <!--xHeader-->
    <div class="header">
      <x-header class="xheader" @on-click-back="" @on-click-title="title_click(msg)" :left-options="{backText:''}" :title="msg" :right-options="{showMore:false}">
        <a slot="right" ><span class="titleRight" @click="subBtn" style="cursor: pointer">提交</span></a>
      </x-header>
    </div>
    <div class="content">
      <div class="refundMsg">
        <div class="line1"><span class="s1">退款信息：</span> </div>
        <div class="line2">
          <div class="img1Box">
            <img :src="singleGoods.goodsImgMaster" class="img1">
          </div>
          <div class="img1BoxR">
            <div class="name re-twoLineOverFlow">{{ singleGoods.goodsName }} {{ singleGoods.goodsSpecs }}</div>
            <!--<div class="type">{{datas.type}}</div>-->
            <div class="number">x{{ singleGoods.saleNum }}</div>
          </div>
        </div>
      </div>
      <div class="money">
        <div class="remoney"><span class="s1">退款金额：</span><span class="s2" style="color: #db3b23;">￥{{ singleGoods.needPayMoney }}</span> </div>
      </div>
      <div class="explain">
        <div class="reex"><span class="s1">退款说明：</span> </div>
        <x-textarea class="textarea" v-model="textarea" :placeholder="placeHolder" :max="140"> </x-textarea>
      </div>
      <div class="photo">
        <div class="reimg"><span class="s1">退款图片：</span> </div>
        <upload
          :maxUploadNumber="5"
          @uploadItems="getInputItems"
          @uploadUrls="getInput"
        > </upload>
      </div>
    </div>
  </div>
</template>
<script>
  import {XHeader, XTextarea} from 'vux'
  import applyRefundMsg from '@/components/shop/refund/components/applyRefundMsg'
  import applyRefundMoney from '@/components/shop/refund/components/applyRefundMoney'
  import refundExplain from '@/components/shop/refund/components/refundExplain'
  import refundPhoto from '@/components/shop/refund/components/refundPhoto'
  import { selectOrderDetailByItemId, addSellBackAdmin } from "@/api/personally"
  import upload from "@/components/common/upload"

  export default {
    data(){
      return{
        msg:'申请退款',
        singleGoods: '',
        placeHolder: '请输入内容',

        textarea: '',
        imgs: '',
        uploadImg: [],
      }
    },
    components:{XHeader,applyRefundMsg,applyRefundMoney,refundExplain,refundPhoto,XTextarea,upload},
    mounted() {
      this.itemId = this.$route.query.itemId
      this.detail_id = this.$route.query.detail_id

      this._selectOrderDetailByItemId()
    },
    methods: {
      subBtn() {
        console.log('this.imgs', this.uploadImg)
        if(this.uploadImg !== ''){   //更改了用户头像
          var url=[];
          url = this.multipartUpload(this.uploadImg);
          var interval,timeout;
          interval = setInterval(()=>{                     //头像上传成功后，提交接口 21
            if(url.length == this.uploadImg.length){
              this.imgs = url.join(',')

              addSellBackAdmin({
                detail_id: this.$route.query.detail_id, // 小心这里两个id是不一样的
                refundReason: this.textarea, // 原因
                imgs: this.imgs, // 图片
                terminalType: 'wap', // web,wap,ios,android
              })
                .then( res => {


                  if(res.message === 'success') {

                    this.$router.push({path: '/my/persionDatailMsg'})

                  } else {

                    this.$store.commit('setToastText', res.message)
                    this.$store.commit('setToastType', 'warn')

                  }

                  console.log('b2c退款', res)

                })

              clearTimeout(timeout)
              clearInterval(interval)

              console.log('this.imgs',url.join(','))
            }

          },500)
          timeout = setTimeout(()=>{                       //头像上传超时
            this.$store.state.toastText='服务器错误'
            this.$store.state.toastType='text'
            clearInterval(interval)
            clearTimeout(timeout)
          },10000)
        }
      },
      // b2c单个商品详情
      _selectOrderDetailByItemId() {
        selectOrderDetailByItemId({
          itemId: this.itemId
        })
          .then( res => {

            this.singleGoods = res.data
            console.log('b2c单个商品详情', res.data)

          })
      },
      // 上传图片
      getInputItems(a){
        console.log('a', a)

      },
      getInput(val){
        this.uploadImg = val
        console.log('val', val)
      },
    }
  }
</script>
<style scoped>
  .applyRefund{width:100%;}

  .header{position: fixed;width:100%;top:0;z-index: 10;}

  .xheader{width:100%;background-color: white;}
  .header >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
  .header >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
  .vux-header .vux-header-right a .titleRight{font-size: 0.28rem;color:#f86e0e}

  .content{padding-top:46px;}

  .message{width:100%;background-color: white;margin-top:0.1rem;}

  .money{width:100%;background-color: white;margin-top:0.1rem;}

  .explain{width:100%;background-color: white;margin-top: 0.1rem;}

  .photo{width:100%;background-color: white;margin-top:0.1rem;}

  .refundMsg{width:100%;height: 3.2rem;padding:0.3rem 0.2rem;box-sizing: border-box;}

  .line1{width:100%;margin-bottom:0.3rem;}
  .line1 .s1{font-size: 0.3rem;color:#3c3c3c;}

  .line2{width:100%;display: flex;justify-content: space-between}

  .line2 .img1Box{display:inline-block;width:2rem;height:2rem;vertical-align: middle;}
  .line2 .img1Box .img1{width:100%;height: 100%;}

  .line2 .img1BoxR{display: inline-block;width:4.7rem;height:2rem;vertical-align: middle;}
  .line2 .img1BoxR .name{font-size: 0.3rem;color:#3c3c3c;height: 0.8rem;line-height: 0.4rem;}
  .line2 .img1BoxR .type{font-size: 0.24rem;color:#9a9a9a;height: 0.8rem;line-height: 0.4rem;}
  .line2 .img1BoxR .number{font-size: 0.24rem;color:#9a9a9a;text-align: right;}

  .remoney,.reex,.reimg {padding:0.3rem 0.2rem;font-size: 0.3rem;color:#3c3c3c;}

  .textarea{padding-left: 0.50em;text-indent: 2em;font-size: 0.3rem;color:#999;line-height: 0.4rem;}

  .weui-cell:before{border-top:0;}

</style>
