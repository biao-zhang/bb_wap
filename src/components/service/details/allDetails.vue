<template>
  <div>
    <!--<div class="top">-->
      <!--<x-header :left-options="{backText: ''}">{{msg}}</x-header>-->
    <!--</div>-->
    <x-header :msg="msg" ref="xheader"></x-header>

    <div class="center">
      <scroller :on-infinite="loadmore" v-if="applyDatas!=''"  style="padding-top:46px" :on-refresh = "refresh">
      <div v-if="isRelease" style="padding: 0 0.20rem; margin-top: 0.20rem">
        <div class="lanPerF">
          <div class="lanPer">
            <div style="display: flex">
              <div class="title">姓名：</div>
              <div class="title-l">{{this.author}}</div>
            </div>
            <div style="display: flex">
              <div class="title">联系电话：</div>
              <div class="title-l">{{authorPhone}}</div>
            </div>
          </div>
        </div>
      </div>


          <div v-for="(item,index) in applyDatas" :key="index">
            <sdetails :datas="item"> </sdetails>
          </div>
        </scroller>

      <div v-if="applyDatas == '' || applyDatas == null" class="null_one">
        <img src="../img/null.png" alt="">
        <p>暂时还没有人报名哦</p>
        <p>快去抢沙发吧~</p>
      </div>
    </div>
  </div>
</template>
<script>
  import sdetails from './details'
  import xHeader from '@/components/my/common/xHeader'
  import { applyDetails , publicParticulars} from "@/api/service";

  import VueScroller from "vue-scroller";
  import Vue from "vue";
  Vue.use(VueScroller);
  export default {
    components: {
      sdetails,
      xHeader
    },
    data() {
      return {
        msg: '报名详情',
        welfareId:'',
        applyDatas:[],
        imgBg:'',
        isRelease:false , //是否是自己发布的
        author:'',
        authorPhone:'',
        pageNum: 1,
        pageSize:6,
        sliderHeight:''
      }
    },
    mounted(){
      setTimeout(() => {
        //计算滑动区域的高度
        this.sliderHeight = window.innerHeight - 46;
      }, 20);


      if(this.$route.query.welfareId!==undefined){
        this.welfareId = this.$route.query.welfareId;
      }
      if(this.$route.query.isRelease!==undefined && this.$route.query.isRelease == 1){
        this.isRelease = true
        publicParticulars({orderId:this.welfareId}).then(res => {
          console.log('接收公益详情111',res)
          if(res.message = 'success'){
              this.author = res.data.author
              this.authorPhone = res.data.authorPhone
          }
        })
      }

    this._applyDetails()

    },
    methods: {
      // 上拉加载
      loadmore(loaded) {
        this.pageNum++;
        setTimeout(() => this._applyDetails(loaded, "loaded"), 1000);
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1;
        setTimeout(() => this._applyDetails(loaded, "refresh"), 1000);
      },
      //报名列表
      _applyDetails(loaded, type) {
        applyDetails({welfareId:this.welfareId,pageNum:this.pageNum,pageSize:this.pageSize}).then(res => {
//          console.log('接收报名详情',res)
//          if(res.message = 'success'){
//            this.applyDatas = res.data
//          }

          if (loaded) {
            if (type === "refresh") this.applyDatas = []; // 下拉刷新只显示第一页数据

            this.applyDatas = this.applyDatas.concat(res.data);

            loaded("done");

            console.log("接收报名详情", this.applyDatas);
          } else {
            // 页面第一次加载的数据
            this.applyDatas = res.data;
          }
        })
      }
    }
  }
</script>
<style scoped>
  .vux-header { background: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .lanPerF {
    width: 100%;
    background-color: #fdb491;
    box-shadow: 1px 5px 5px #ccc;
    height:2.28rem;
  }
  .lanPer {
    height: 1.40rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.30rem;
    line-height: 1.5rem;
  }
  .title-l,.title {
    /*display: inline-block;*/
  }
  .title {
    width: 2.00rem;
    margin-left: 0.40rem;
    text-align: right;
    margin-right: 0.20rem;
  }
  .null_one{text-align:center;margin-top:2rem;}
  .null_one img{width:4.36rem;height:3.08rem;}
  .null_one p{color:#333;font-size:0.3rem;line-height:0.4rem;}

  .lanPerF{background:url("../img/bg_1.png") no-repeat;background-size:100% 100%;}
  .center{padding:46px 0 0.3rem 0;}
</style>
