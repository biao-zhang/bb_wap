<template>
  <div class="logistic">
    <!--xHeader-->
    <x-header :msg="msg"></x-header>
    <div class="content" ref="content">
      <div class="goodsBox">
        <logistic-goods></logistic-goods>
      </div>
      <!--<div class="detailBox" :style="{height:detailBoxH +'px'}">
        <logistic-detail></logistic-detail>
      </div>-->
    </div>
    <div class="checkLogistics_r">
      <div ref="die" class="checkLogistics_r_con" :style="{height: direct ? '250px' : 'auto', overflow: direct ? 'hidden' : 'auto'}">
        <div v-for="(item, index) in checkLogistics" :key="index + 'random'">
          <div>
            <img :src="index === 0 ? require('../img/stepred.png') : require('../img/stepdot.png')"/>
            <span style="margin-left: 20px">{{ item.time }}</span>
            <span style="margin-left: 20px">{{ item.context }}</span>
          </div>
          <div style="padding-left: 6px">
            <img src="../img/stepline.png"/>
          </div>
        </div>
      </div>
      <div v-if="checkLogistics && checkLogistics.length > 5" style="text-align: center; cursor: pointer; margin-top: 10px">
        <img @click="imgClick" :src="direct ? require('../img/xiala.png') : require('../img/shangla.png')"/>
      </div>
    </div>
  </div>
</template>
<script>
  import xHeader from '@/components/shop/common/xHeader'
  import logisticGoods from '@/components/shop/logistic/components/logisticGoods'
  import logisticDetail from '@/components/shop/logistic/components/logisticDetail'
  import { checkLogistics } from "@/api/personally"

  export default {
    data(){
      return{
        msg:'物流详情',    //title
        /*detailBoxH:0,*/
        checkLogistics: [],
        direct: true,
      }
    },
    components:{xHeader,logisticGoods,logisticDetail},
    mounted(){
      this.orderId = this.$route.query.orderId

      this._checkLogistics()

     /* var that = this;
      setTimeout(function () {
        that.detailBoxH = window.innerHeight-that.$refs.content.clientHeight;
      },20)*/
    },
    methods: {
      _checkLogistics() {
        checkLogistics({
          orderId: this.orderId
        }).then( res => {

          this.checkLogistics = res.data
          console.log('b2c查看物流', res)

        })
      },
      imgClick() {
        this.direct = !this.direct
      }
    }
  }
</script>
<style scoped>
  .logistic{width:100%;}

  .content{width:100%;padding-top:46px;}

  .content .goodsBox{}

  .content .detailBox{padding-top:0.1rem;overflow: hidden;}

  .checkLogistics_r {
    padding: 0.10rem;
  }

  .l-t {
    color: #999999;
    /*width: 1.5px;*/
    text-align: left;
  }
  .checkLogistics_r_con {
    margin-left: 0.70px;
  }

</style>
