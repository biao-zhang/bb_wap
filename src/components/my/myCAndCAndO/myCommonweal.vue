<template>
  <div class='myCommonweal'>
    <!--nav-->
    <!--<div class="tab" ref="tab">-->
      <!--<c-tab @tabVal="tabVal" :curIndex="navIndex"></c-tab>-->
    <!--</div>-->
    <!--content-->
    <!--<div class="content" style="padding-top: 1.02rem;">-->
      <!--<swiper v-model="navIndex"  :show-dots="false" height="100%">-->
          <!--<div style="width: 100%;height: 100%;overflow: scroll">-->
            <!--<div v-if="benefitData != '' || benefitData != null" style="overflow: scroll;background-color: white;">-->

                <!--<div class="commonwealItemBox" v-if="navIndex==0" v-for="(item,index) in benefitData" :key="index">-->
                  <!--<router-link :to="{path: '/x/commonwealDetail', query: {orderId: item.orderId,issue:1}}">-->
                    <!--<c-item1 @gaussian="gaussian" :datas="item"></c-item1>-->
                  <!--</router-link>-->
                <!--</div>-->

                <!--<div class="commonwealItemBox" v-if="navIndex==1" v-for="(item,index) in benefitData" :key="index">-->
                  <!--<router-link :to="{path: '/x/commonwealDetail', query: {orderId: item.orderId}}">-->
                    <!--<c-item :datas="item"></c-item>-->
                  <!--</router-link>-->
                <!--</div>-->

            <!--</div>-->
            <!--<div v-if="benefitData==''" class="null">-->
              <!--<img src="./img/null.png" alt="">-->
              <!--<p>暂无公益</p>-->
            <!--</div>-->
          <!--</div>-->
      <!--</swiper>-->
    <!--</div>-->
    <div class="back_one" onclick="javascript:history.go(-1)">
      <img src="./img/back.png" alt="">
    </div>
    <!--头部-->
    <div class="tab-box">
      <input type="radio" name="demo" id="tab-switch-input1" ref="input1" checked>
      <input type="radio" name="demo" id="tab-switch-input2" ref="input2">
      <div class="tab-box-label">
        <label for="tab-switch-input1">我发布的</label>
        <label for="tab-switch-input2">我参与的</label>
      </div>
      <!--<x-button type="primary">Middle</x-button>-->
      <div class="tab-contents">
        <div class="tab-content">
          <scroller  v-if="benefitData != ''" :on-infinite="loadmore" :on-refresh = "refresh" style="padding-top:1rem;">
            <c-item1 v-for="(item,index) in benefitData" @gaussian="gaussian" :datas="item" :key="index"></c-item1>
          </scroller>

          <div v-else class="null">
            <img src="./img/null.png" alt="">
            <p>暂无公益</p>
          </div>

        </div>
        <div class="tab-content">
          <scroller  v-if="benefitDataTwo != ''" :on-infinite="loadmore1" :on-refresh = "refresh1" style="padding-top:1rem;">
            <c-item2 v-for="(item,index) in benefitDataTwo" :datas="item" :key="index"></c-item2>
          </scroller>
          <div v-else class="null">
            <img src="./img/null.png" alt="">
            <p>暂无公益</p>
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
  import {Swiper,SwiperItem} from 'vux'
  import CTab from '@/components/my/myCAndCAndO/common/tab'
  import CItem from '@/components/my/myCAndCAndO/common/cItem'
  import CItem1 from '@/components/my/myCAndCAndO/common/cItem1'
  import CItem2 from '@/components/my/myCAndCAndO/common/cItem2'

  import { releasedBenefit , participationBenefit } from "@/api/service";
  export default {
    data(){
      return{
        navIndex:0,
        pageNum:1,
        pageSize:6,
        benefitData:[],
        benefitDataTwo:[]
      }
    },
    components:{Swiper,SwiperItem,CTab,CItem,CItem1,CItem2},
    mounted(){
      this._releasedBenefit()
      this._participationBenefit()
    },
    methods:{
      // 上拉加载
      loadmore(loaded) {
        this.pageNum++;
        setTimeout(() => this._releasedBenefit(loaded, "loaded"), 1000);
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1;
        setTimeout(() => this._releasedBenefit(loaded, "refresh"), 1000);
      },

      // 上拉加载
      loadmore1(loaded) {
        this.pageNum++;
        setTimeout(() => this._participationBenefit(loaded, "loaded"), 1000);
      },
      // 下拉刷新
      refresh1(loaded) {
        this.pageNum = 1;
        setTimeout(() => this._participationBenefit(loaded, "refresh"), 1000);
      },




      //我发布的
      _releasedBenefit(loaded, type){
        releasedBenefit({pageNum:this.pageNum,pageSize:this.pageSize}).then(res => {
          console.log('接收我发布的公益列表',res)
//          if(res.message = 'success'){
//            this.benefitData = res.data
//          }
          if (loaded) {
            if (type === "refresh") this.benefitData = []; // 下拉刷新只显示第一页数据

            this.benefitData = this.benefitData.concat(res.data);

            loaded("done");

            console.log("接收报名详情", this.benefitData);
          } else {
            // 页面第一次加载的数据
            this.benefitData = res.data;
          }
        })
      },
      //我参与的
      _participationBenefit(loaded, type){
        participationBenefit({pageNum:this.pageNum,pageSize:this.pageSize}).then(res => {
          console.log('接收我参与的公益列表',res)
          if (loaded) {
            if (type === "refresh") this.benefitDataTwo = []; // 下拉刷新只显示第一页数据

            this.benefitDataTwo = this.benefitDataTwo.concat(res.data);

            loaded("done");

            console.log("接收报名详情", this.benefitDataTwo);
          } else {
            // 页面第一次加载的数据
            this.benefitDataTwo = res.data;
          }
        })
      },
      gaussian(){
        this.pageNum = 1
        this._releasedBenefit()
      }
    }

  }
</script>
<style scoped>

/*.myCommonweal{width: 100%;height: 100%;}*/

/*.myCommonweal .tab{position: fixed;z-index: 60;width:100%;}*/

/*.myCommonweal .content{width:100%;height: 100%;box-sizing: border-box;overflow: scroll;background-color: #f5f5f5;}*/

/*.content .vux-slider{height: 100%;}*/


/*.commonwealItemBox{width:7.1rem;margin:0 auto;padding: 0.25rem 0;border-bottom:1px solid #ededed}*/
/*.commonwealItemBox:last-child{border:0;}*/

.null{text-align:center;margin-top:3.5rem;}
.null img {width: 4.36rem;height: 3.08rem;}
.null p{ color: #333;
  font-size: 0.3rem;
  line-height:0.8rem;}

/*返回按钮*/
.back_one {
  position: fixed;
  width: 0.19rem;
  top: 0.29rem;
  left: 0.29rem;
  z-index: 9;
}
.back_one img {
  width: 100%;
  height: 100%;
}
/*begin*/
.tab-box input {
  display: none;
}
.tab-box-label {
  padding: 0 1.3rem;
  box-sizing: border-box;
  width: 100%;
  height: 0.9rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 6;
}
.tab-box label {
  height: 0.86rem;
  background: #fff;
  color: #111111;
  display: inline-block;
  text-align: center;
  width: 2rem;
  font-size: 0.32rem;
  line-height: 0.9rem;
}
.tab-content {
  width: 100%;
  height: 100%;
  display: none;
  padding-top: 0.9rem;
}
.tab-box
input:nth-of-type(1):checked
~ .tab-contents
.tab-content:nth-of-type(1),
.tab-box
input:nth-of-type(2):checked
~ .tab-contents
.tab-content:nth-of-type(2){
  display: block;
}
.tab-box input:nth-of-type(1):checked ~ .tab-box-label label:nth-of-type(1),
.tab-box input:nth-of-type(2):checked ~ .tab-box-label label:nth-of-type(2){
  border-bottom: 0.04rem solid #f86e0e;
  color:#f86e0e;
}

.box:first-child{margin-top:0.1rem;}
.box{display: flex;justify-content: space-between;background:#fff;border-bottom:1px solid #ededed;padding:0.24rem 0.2rem;}
</style>
