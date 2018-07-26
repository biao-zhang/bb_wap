<template>
  <div class='integralAccount'>
    <!--头部-->
    <div style="position: fixed; top: 0; left: 0; right: 0">
      <x-header class="xheader"  :left-options="{backText:''}" :title="msg" :right-options="{showMore:false}">
        <a slot="right" ><router-link to="" class="titleRight">积分说明</router-link></a>
      </x-header>
    </div>
    <!--积分头部-->
    <div class="integral_top" style="padding-top: 92px">
      <img src="../img/jifenzh.png" alt="">
      <p>积分：<span>{{ account }}</span></p>
    </div>
    <!--切换-->
    <div class="tab-box">
      <input type="radio" name="demo" id="tab-switch-input1" checked="">
      <input type="radio" name="demo" id="tab-switch-input2">
      <div class="tab-box-label">
        <label for="tab-switch-input1">积分明细</label>
        <img src="../img/line1.png" alt="">
        <label for="tab-switch-input2">兑换</label>
      </div>
      <div class="tab-contents">
        <div class="tab-content content">
          <div v-if="integralList == ''" class="integral_img">
            <img src="./img/integral.png" alt="">
            <p>快去赚取积分吧~</p>
          </div>
          <shop-add v-if="integralList != ''" :datas="item" v-for="(item,index) in integralList" :key="index"> </shop-add>
          <!--<consume-minus></consume-minus>-->
        </div>
        <div class="tab-content">
            <exch-ange :datas="integralAccount.exchAngeList" @amount="amount"> </exch-ange>
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

  import exchAnge from '@/components/my/accountBook/common/exchAnge'
  import shopAdd from '@/components/my/accountBook/common/shopAdd'
  import consumeMinus from '@/components/my/accountBook/common/consumeMinus'
  import { integralList, selIntegral } from "@/api/personally"

  export default{
    components:{
      XHeader,
      exchAnge,
      shopAdd,
      consumeMinus
    },
    data(){
      return{
        msg:"积分账户",

        integralAccount:{
          //兑换列表
          exchAngeList:[
            {value:1,jifen:'100'},
            {value:2,jifen:'200'},
            {value:3,jifen:'500'},
            {value:4,jifen:'1000'},
            {value:5,jifen:'5000'},
            {value:6,jifen:'10000'},
          ],
        },

        pageNum: 1,
        pageSize: 10,
        integralList: [],
        account: '',
      }
    },
    props:{

    },

    mounted(){
      this._selIntegral()
      this._integralList()
    },
    methods:{
      // 总积分
      _selIntegral() {
        selIntegral().then( res => {

          this.account = res.data
          console.log('总积分', res)

        })
      },
      // 积分列表
      _integralList() {
        integralList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
          .then( res => {

            this.integralList = res.data.list
            console.log('积分明细', res)

          })
      },
      // 重新请求总积分
      amount() {
        this._selIntegral()
      }
    }
  }
</script>
<style scoped>
  .xheader{width:100%;background-color: white;}

  .integralAccount >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
  .integralAccount >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
  .vux-header .vux-header-right a .titleRight{font-size: 0.28rem;color:#f86e0e}

    .integral_top{padding-top:46px;width:100%;height:2.6rem;background:url("../img/zhanghu_bg.png") no-repeat;background-size:100% 100%;}

    .integral_top img{width:1rem;height:1rem;display:flex;margin:0.4rem auto 0;}
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
    .tab-box-label img{height:0.6rem;margin-top:0.2rem;width:0.02rem;}
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
    .tab-content {
      width: 100%;
      height:100%;
      display: none;
      margin-top:0.1rem;
    }
    .tab-box input:nth-of-type(1):checked ~ .tab-contents .tab-content:nth-of-type(1),
    .tab-box input:nth-of-type(2):checked ~ .tab-contents .tab-content:nth-of-type(2){
      display: block;
      background-color: #ffffff;
    }
    .tab-box input:nth-of-type(1):checked ~ .tab-box-label label:nth-of-type(1),
    .tab-box input:nth-of-type(2):checked ~ .tab-box-label label:nth-of-type(2){
      color:#f86e0e;
    }

    /*列表*/
    .content{padding:0 0.2rem 0;box-sizing:border-box; height:7.8rem;overflow: scroll;}
    .integral_img{text-align:center;margin-top:1rem;}
    .integral_img img{width:3.4rem;height:3.3rem;}
    .integral_img p{font-size:0.3rem;color:#333;line-height:1rem;}
</style>

