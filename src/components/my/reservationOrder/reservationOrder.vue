<template>
  <div class='reservationOrder'>
    <x-header :msg="msg"></x-header>
    <!--nav-->
    <div class="tab" ref="tab">
      <c-tab @tabVal="tabVal" :curIndex="navIndex"></c-tab>
    </div>
    <!--content-->
    <div class="content" :style="{paddingTop:conHeight+'px'}">
      <swiper v-model="navIndex" :show-dots="false" height="100%">
        <swiper-item v-for="(item,key) in 3" :key="key">
          <div style="width: 100%;height: 100%;overflow: scroll;background:#fff;">
            <div style="overflow: scroll;background-color: white;">
              <div v-if="YuYueOrderData == ''">
                  <div class="kong">
                    <img src="./img/kong.png" alt="">
                  </div>
                  <p class="kong_zi">暂无订单</p>
              </div>

              <div v-else class="commonwealItemBox" v-for="(item,index) in YuYueOrderData">
                <router-link to="">
                  <c-item :reasonState="key" :datas="item"></c-item>
                </router-link>
              </div>

            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from '@/components/my/common/xHeader'
  import {Swiper,SwiperItem} from 'vux'
  import CTab from '@/components/my/reservationOrder/common/tab'
  import CItem from '@/components/my/reservationOrder/common/cItem'
  import { getAllYuYueOrder } from '@/api/service'
  export default {
    data(){
      return{
        conHeight:0,
        msg:'预约订单',
        navIndex:0,

        YuYueOrderData:[],

        params:{
          pageSize:10,
          pageNum:1,
          state:1,
        }
      }
    },
    components:{xHeader,Swiper,SwiperItem,CTab,CItem},
    created() {
      this._getAllYuYueOrder();
    },
    mounted(){
      var that = this;
      setTimeout(function () {
        that.conHeight=that.$refs.tab.clientHeight+46
      },20)
    },
    methods:{
      //预约订单数据
      _getAllYuYueOrder(){
        const { pageSize, pageNum, state } = this.params;
        let params = {
          pageSize: pageSize,
          pageNum: pageNum,
          state: state
        };
        getAllYuYueOrder(params).then(res => {
          console.log(res)
          if (res.result) {
            let data = res.data;
            this.YuYueOrderData = data;
            console.log(this.YuYueOrderData)
          } else {

          }
        });
      },

      tabVal(a){
        this.navIndex=a;
        console.log(this.navIndex)
        if(this.navIndex == 0){
          this.params.state = 1
          this._getAllYuYueOrder()
        }else if(this.navIndex == 1){
          this.params.state = 2
          this._getAllYuYueOrder()
        }else if(this.navIndex == 2){
          this.params.state = 10
          this._getAllYuYueOrder()
        }
      }
    }

  }
</script>
<style scoped>
.reservationOrder{width:100%;height: 100%;}


.reservationOrder .tab{position: fixed;z-index: 60;width:100%;height:0.88rem;margin-top: 46px;box-shadow:0 2px 5px #999;box-sizing: content-box;}

.reservationOrder .content{width:100%;height: 100%;box-sizing: border-box;overflow: scroll;background-color: #f5f5f5;}

.content .vux-slider{height: 100%;}


.commonwealItemBox{}
.commonwealItemBox:last-child{border:0;}
  .kong{width:3rem;height:3rem;margin:2rem auto 0;}
  .kong img{width:100%;height:100%;}
  .kong_zi{text-align:center;line-height:1.5rem;}
</style>
