<template>
  <div class='cashAccount'>
    <!--头部-->
    <x-header class="xheader"  :left-options="{backText:''}" :title="msg" :right-options="{showMore:false}">
      <a slot="right" ><router-link to="" class="titleRight">现金说明</router-link></a>
    </x-header>



    <div class="integral_top">
      <img src="./img/zhanghu_bg.png" alt="">
    </div>
    <!--积分头部-->
    <!--<div class="integral_top">-->
      <!--<img src="../img/yue.png" alt="">-->
      <!--<p>余额：<span>{{ account }}</span></p>-->
    <!--</div>-->
    <!--切换-->

    <div class="award">
      <div class="award_1">
        <div class="one"><img src="./img/yue_1.png" alt=""></div>
        <div class="two">
          <p>余额</p>
          <p>￥{{ advance }}</p>
        </div>
      </div>
      <div class="award_2">
        <router-link  :to="{path:'/y/awardRanking'}">
        <div class="one"><img src="./img/jiang_1.png" alt=""></div>
        <div class="two">
          <p>在途奖励</p>
          <p>￥{{ stayBackMoney }}</p>
          <!--<p>￥0.00</p>-->
        </div>
        </router-link>
      </div>
    </div>


    <div class="tab-box">
      <input type="radio" name="demo" id="tab-switch-input1" checked="">
      <input type="radio" name="demo" id="tab-switch-input2">
      <input type="radio" name="demo" id="tab-switch-input3">
      <div class="tab-box-label">
        <label for="tab-switch-input1">充值</label>
        <img src="../img/line1.png" alt="">
        <label for="tab-switch-input2">资金明细</label>

      </div>
      <div class="tab-contents">
        <div class="tab-content">
          <rech-arge :account="advance"> </rech-arge>
        </div>
        <div class="tab-content content">
          <div class="integral_img" v-if="moneySelectList == ''">
            <img src="./img/capital.png" alt="">
            <p>暂时还没有资金流动哦~</p>
          </div>
          <red-envelope :datas="item" v-for="(item,index) in moneySelectList" :key="index"> </red-envelope>
          <!--<chong-zhi></chong-zhi>-->
          <!--<with-draw></with-draw>-->
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
  import {XHeader} from 'vux'

  import rechArge from '@/components/my/accountBook/common/rechArge'

  import redEnvelope from '@/components/my/accountBook/common/redEnvelope'
  import chongZhi from '@/components/my/accountBook/common/chongZhi'
  import withDraw from '@/components/my/accountBook/common/withDraw'
  import { moneySelectList, selAdvance , cashAward } from "@/api/personally"

  export default{
    components:{
      XHeader,
      rechArge,
      redEnvelope,
      chongZhi,
      withDraw
    },
    data(){
      return{
        msg:"现金账户",

        pageNum: 1,
        pageSize: 10,
        moneySelectList: [],
        account: '',
        advance:'', //余额
        stayBackMoney:'', //在途奖励
      }
    },
    props:{

    },

    mounted(){
      this._moneySelectList()
      this._selAdvance()
      cashAward().then(res => {
        console.log('现金与在途奖励',res)
        if(res.message = 'success'){
          this.advance = Number(res.data.advance).toFixed(2)
          this.stayBackMoney = Number(res.data.stayBackMoney).toFixed(2)
        }
      })
    },
    methods:{
      _selAdvance() {
        selAdvance().then( res => {

            this.account = res.data
            console.log('余额', res)

          })
      },
      // 余额明细
      _moneySelectList() {
        moneySelectList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
          .then( res => {

            this.moneySelectList = res.data.list
            console.log('余额明细', res)

          })
      },
//      award(){
//        this.$store.state.toastText='此功能暂未开放'
//        this.$store.state.toastType='text'
//      }
    }
  }
</script>
<style scoped>
  .xheader{width:100%;background-color: white;}

  .cashAccount >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
  .cashAccount >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
  .vux-header .vux-header-right a .titleRight{font-size: 0.28rem;color:#f86e0e}

  .integral_top{width:100%;height:2.66rem;}

  .integral_top img{width:100%;height:100%;}
  .integral_top p{text-align:center;line-height:0.8rem;font-size:0.24rem;color:#fff;}
  .integral_top p span{font-size:0.4rem;font-weight:normal;}


  /*begin*/
  .tab-box input {
    display: none;
  }
  .tab-box-label{
    margin: auto;
    width:100%;
    height:1rem;
    background:#fff;
    display: flex;
    justify-content: space-between;
    box-shadow:0 0 0.06rem #aaaaaa;
  }
  .tab-box label {
    width:100%;
    height:1rem;
    background:#fff;
    color:#6a6a6a;
    display: inline-block;
    text-align: center;
    font-size:0.32rem;
    line-height:1rem;
  }
  .tab-box-label img{height:0.6rem;margin-top:0.2rem;width:0.02rem;}
  .tab-content {
    width: 100%;
    height:100%;
    display: none;
  }
  .tab-box input:nth-of-type(1):checked ~ .tab-contents .tab-content:nth-of-type(1),
  .tab-box input:nth-of-type(2):checked ~ .tab-contents .tab-content:nth-of-type(2),
  .tab-box input:nth-of-type(3):checked ~ .tab-contents .tab-content:nth-of-type(3){
    display: block;
  }
  .tab-box input:nth-of-type(1):checked ~ .tab-box-label label:nth-of-type(1),
  .tab-box input:nth-of-type(2):checked ~ .tab-box-label label:nth-of-type(2),
  .tab-box input:nth-of-type(3):checked ~ .tab-box-label label:nth-of-type(3){
    color:#f86e0e;
  }
  /*列表*/
  .content{margin-top:0.1rem;padding:0 0.2rem 0.9rem;box-sizing:border-box;background:#fff;height: 7.8rem;overflow: scroll;}

  .integral_img{text-align:center;margin-top:1rem;}
  .integral_img img{width:3.4rem;height:3.3rem;}
  .integral_img p{font-size:0.3rem;color:#333;line-height:1rem;}

  .award{display:flex;width:100%; height:1.4rem; padding:0 0.3rem;box-sizing:border-box;justify-content:space-between;align-items:center;}
  .award>div{width:3rem; height:0.88rem;padding:0 0.2rem;box-sizing:border-box;}
  .award_1{background:url("./img/yue.png") no-repeat; background-size:100% 100%;display:flex;align-items:center;}
  .award_2{background:url("./img/jiang.png") no-repeat;background-size:100% 100%;display:flex;align-items:center;}
  .award_2 a{display:flex;width:3rem;align-items:center;}
  .one{width:0.49rem;height:0.49rem;}
  .two{flex:1;}
  .two p:first-child{font-size:0.26rem;color:#333;text-align:center;}
  .two p:last-child{font-size:0.3rem;color:#333;text-align:center;}
  .award_1 div img{width:100%;height:100%;}
  .award_2 div img{width:100%;height:100%;}
</style>

