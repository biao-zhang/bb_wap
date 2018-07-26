<template>
  <div class="swiperItem">
    <!--信息-->
    <div class="ioFo">
      <div class="ioFo1">
        <div class="shAre">
          <span style="display:none;" v-if="datas.isZy===1"></span>
          <span v-if="datas.isZy===2">运营中心自营</span>
          <span v-if="datas.isZy===3">平台自营</span>
          <span>{{datas.goodsName}}</span>
        </div>
        <div class="shAre1" @click="share">
          <img src="../img/share.png" alt="" />
        </div>
      </div>
      <!--价格-->
      <div class="money">
        <div style="display: flex">
          <p class="onep">￥{{datas.goodsPrice}}</p>
          <p class="twop" v-if="setGoodsType!=1 && setGoodsType!=3">￥{{datas.activePrice}}</p>
        </div>
        <span class="time" v-if="setGoodsType!=1 && setGoodsType!=3">
          <span class="blackBox">{{s1}}</span>:<span class="blackBox">{{s2}}</span>:<span class="blackBox">{{s3}}</span>
        </span>
      </div>
      <!--月销-->
      <div class="monthlySales">
        <p>月销{{datas.saleNum}}{{datas.goodsUnit}}</p>
        <p>河南郑州</p>
      </div>
    </div>
    <!--分享弹窗-->
    <div v-transfer-dom class="popup_zong1">
      <popup v-model="show_share" position="bottom" >
        <div class="share_list">
            <div>
                <div>
                  <img src="../img/fenxiang1.png" alt="">
                </div>
                <p>朋友圈</p>
            </div>
          <div>
            <div>
              <img src="../img/fenxiang2.png" alt="">
            </div>
            <p>QQ空间</p>
          </div>
          <div>
            <div>
              <img src="../img/fenxiang3.png" alt="">
            </div>
            <p>微博</p>
          </div>
          <div>
            <div>
              <img src="../img/fenxiang4.png" alt="">
            </div>
            <p>微信好友</p>
          </div>
          <div>
            <div>
              <img src="../img/fenxiang5.png" alt="">
            </div>
            <p>QQ好友</p>
          </div>
        </div>
        <!--底部-->
        <div class="share_quxiao" @click="btn_closeone()">取消分享</div>
      </popup>
    </div>
  </div>
</template>
<script>
  import {TransferDom, Popup} from 'vux'
  export default {
    data(){
      return{
        s1:88,  //时
        s2:88,  //分
        s3:88,  // 秒
        show_share:false
      }
    },
    props:{
      datas:{
        type:Object,
        default:function () {
          return {}
        }
      }
    },
    directives: {
      TransferDom
    },
    components:{Popup},
    computed:{
      setGoodsType(){
        console.log('获取类型',this.$store.state.goodsDetail.goodsType)
        return this.$store.state.goodsDetail.goodsType;
      }
    },
    mounted() {
      this.initCountdown();
    },
    methods: {
//      分享开启
      share() {
        this.show_share = true;
        console.log('分享')
      },
      btn_closeone(){
        this.show_share = false;
        console.log('分享关闭')
      },
      formatTime(a){    //格式化倒计时时间
        if(parseInt(a)<10){
          return '0'+parseInt(a)
        }else{
          return parseInt(a)
        }
      },
      initCountdown(){
        var date = new Date();
        var toDate = new Date(2018,4,4,18,0,0);
        var dateGetTime = date.getTime()
        var toDateGetTime = toDate.getTime()
        var DValue = (toDateGetTime-dateGetTime)/1000;
        var that = this;
        var interval1 = setInterval(function () {
          DValue--;
          that.s3=that.formatTime(DValue%60)
          that.s2=that.formatTime(DValue/60%60)
          that.s1=that.formatTime(DValue/3600)
          if(DValue<0){
            clearInterval(interval1)
          }
        },1000);
      }
    }
  }



</script>
<style scoped>
  .shopIndex{background-color: #f5f5f5;height: 100%;}

  .shopIndex .pullTos{width:100%;height: 100%;padding-top:0.54rem;}

  .black img{
    height:7.5rem;
  }

  .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
    background-color:#248;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot, .vux-slider .vux-indicator-right > a > .vux-icon-dot{
    background-color:#843f0d;
  }
  /*信息*/
  .ioFo{
    width:100%;
    padding:0.24rem 0.2rem;
    box-sizing: border-box;
  }
  .ioFo1{
    display:flex;
    justify-content: space-between;
  }
  .shAre{
    /*width:60%;*/
    flex:1;
  }
  .shAre span:first-child{
    color:#fff;
    font-size:0.24rem;
    display:inline-block;
    background:#fa6e00;
    padding:0.1rem 0.14rem;
    border-radius:0.1rem;
  }
  .shAre span:last-child{
    color:#3c3c3c;
    font-size:0.3rem;
    font-weight:600;
    line-height:0.55rem;
  }
  .shAre1{
    width:0.46rem;
    height:0.76rem;
    margin-right:0.1rem;
    margin-left:0.4rem;
  }
  .shAre1 img{
    width:0.46rem;
    height:100%;
    display: inline-block;
  }
  /*价格*/
  .money{
    line-height:0.48rem;
    display:flex;
    justify-content: space-between;
  }
  .money .onep{
    color:#f86e0e;
    font-weight:600;
    font-size:0.3rem;
  }
  .money .twop{
    margin-left:0.4rem;
    color:#9a9a9a;
    text-decoration:line-through;
  }
  /*月销*/
  .monthlySales{
    font-size:0.24rem;
    color:#666666;
    display:flex;
    justify-content: space-between;
    line-height:0.45rem;
  }
  /*线*/
  .wire{
    width:100%;
    height:0.2rem;
    background:#f5f5f5;
  }
  /*分享取消*/
  .share_quxiao{
    line-height:1rem;
    background:#fff;
    text-align:center;
    font-size:0.3rem;
    color:#333333;
  }

  .share_list{
    display:flex;
    padding:0.4rem 0.2rem;
    flex-wrap:wrap;
  }
  .share_list div{
    width:33.33%;
    display: flex;
    flex-direction: column;
  }
  .share_list div div{
    width:1.3rem;
    height:1.3rem;
    align-self: center;
  }
  .share_list div p{
    text-align: center;
    line-height:0.8rem;
    font-size:0.3rem;
    color:#333333;
  }
  .share_list div div img{
    width:100%;
    height:100%;
  }
  .time{float: right;}
  .time .blackBox{background-color: #212121;width:0.3rem;height:0.3rem;line-height:0.3rem;display: inline-block;color:white;}
</style>
