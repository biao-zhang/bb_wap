<template>
  <div class="serviceIndexBox" ref="serviceIndexBox">
      <div class="sliderBox1" :class="{'Y175':Y175}">
        <router-link to="/z/selectArea"><div class="dizhi1"><img src="./img/dizhi.png"><div class="dizhi1span">{{curCityName}}</div> </div></router-link>
        <router-link :to="{path: '/z/search', query: {resource: 'serviceIndex'}}"><div class="search1">搜索您需要发的服务，例如：家政</div></router-link>
      </div>
      <div class="sliderBox">
        <router-link to="/z/selectArea"><span class="weizhi">{{curCityName}}<img src="./img/xiangxia.png"/></span></router-link>
        <swiper loop auto :list="demo07_list" height="4.5rem" :index="demo07_index" :show-dots="true" dots-position="center" @on-index-change="demo07_onIndexChange">
          <swiper-item v-for="(item,index) in PublicList" :key="index">
            <img style="width:100%;height: 100%;" :src="item.advertisement_type">
          </swiper-item>
        </swiper>
        <router-link :to="{path: '/z/search', query: {resource: 'serviceIndex'}}"><span class="search"><img src="./img/sousuo.png"> 搜索您需要发的服务，例如：家政</span></router-link>
      </div>
    <!--跑马灯-->
    <!--<swiper loop auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">-->
      <!--<swiper-item><p>义务爱了 完成传奇世界H5-王者归来任务 获得20金币</p></swiper-item>-->
      <!--<swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>-->
      <!--<swiper-item><p>零哥章魚 完成传奇世界H5-王者归来任务 获得30金币</p></swiper-item>-->
    <!--</swiper>-->
    <!--帮帮一级分类-->
    <div class="module module1">
      <floor-tit>有你所梦</floor-tit>
      <div class="swiper-point">
        <swiper-point></swiper-point>
      </div>
    </div>
    <!--公益活动列表-->
    <div class="module module2">
      <floor-tit>公益活动</floor-tit>
      <div >
        <div class="commonwealItemBox" v-for="(item,index) in PublicActivityData" :key="index">
          <router-link :to="{path: '/x/commonwealDetail', query: {orderId: item.orderId}}">
            <commonweal-list-item :datas="item"></commonweal-list-item>
          </router-link>
        </div>
      </div>
      <router-link to="/x/allCommonweal">
        <click-more></click-more>
      </router-link>
    </div>
  </div>
</template>
<script>
  import { Swiper, GroupTitle, SwiperItem,Divider } from 'vux'
  import floorTit from '@/components/common/floorTit'
  import swiperPoint from '@/components/common/swiperPoint'
  import commonwealListItem from '@/components/common/commonwealListItem'
  import clickMore from '@/components/common/clickMore'

  import { threePublicActivity , servicePicture } from "@/api/service";

  const baseList = [
//    {
//    url: 'javascript:',
//    img: 'img/2018.png',
//    title: '',
//    fallbackImg: 'https://static.vux.li/demo/3.jpg'
//  }
  ]
  const only2ClickList = baseList.slice(0, 2).map(item => {
    item.url = 'http://m.baidu.com'
    return item
  })
  export default {
    components:{Swiper,GroupTitle,SwiperItem,Divider,floorTit,swiperPoint,commonwealListItem,clickMore},
    data(){
      return{
        msg:'home',
        Y175:false,
        demo07_index: 0,
        demo07_list: only2ClickList,
        curCityName:'',
        PublicActivityData:[],
        adcode:'',
        PublicList:[]
      }
    },
    mounted(){
      this.adcode = localStorage.getItem('curCityAdcode');


      this.curCityName = localStorage.getItem('curCityName');

      //改变bottomIndex
      this.$store.commit('getBottomIndex',4)

      window.addEventListener('scroll', this.a)
      //底部公益活动列表
      threePublicActivity({adcode:this.adcode,pageNum:1,pageSize:3}).then(res => {
        console.log('接收公益列表',res)
        if(res.message = 'success'){
          this.PublicActivityData = res.data
        }
      })
      //首页轮播图
      servicePicture({adcode:this.adcode}).then(res => {
        console.log('接收首页轮播图',res)
        if(res.message = 'success'){
          this.PublicList = res.data
        }
      })
    },
    methods:{
      a(){
        if(window.scrollY>=175){
          this.Y175=true;
        }else{
          this.Y175=false;
        }
      },
      demo07_onIndexChange (index) {
        this.demo07_index = index
      }
    }
  }
</script>
<style scope>
  .serviceIndexBox{padding-bottom: 1.2rem;background-color: #f5f5f5;position: relative;}

  .sliderBox1{width:100%;background-color: #ed7826;height: 1rem;position: fixed;top:-1rem;z-index: 6;transition: all 0.25s;padding:0.15rem 0;box-sizing: border-box;}
  .sliderBox1.Y175{top:0;box-shadow: 0 1px 2px #999;}
  .search1{width:80%;height: 0.6rem;text-align: center;border-radius: 0.05rem;background-color: white;color:#111;display: inline-block;vertical-align: middle;line-height: 0.6rem;}
  .dizhi1{width:10%;text-align: center;display: inline-block;vertical-align: middle}
  .dizhi1 img{width: 0.4rem;}
  .dizhi1 .dizhi1span{line-height: 0.3rem;height:0.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}

  .sliderBox{position: relative;}
  .sliderBox .weizhi{position: absolute;line-height: 0.5rem;background-color: #5e4a54;border-radius: 0.25rem;top:0.25rem;left: 0.2rem;z-index: 5;display: inline-block;padding:0 0.2rem;font-size: 0.24rem;color:#f4f4f4;overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;width:0.8rem;}
  .sliderBox .weizhi img{padding-left: 0.14rem;width:0.24rem;}
  .sliderBox .search{position:absolute;bottom:0.5rem;width:6.9rem;height: 0.8rem;line-height:0.8rem;font-size:0.3rem;color:#919191;border-radius: 0.1rem;background-color: rgb(255,255,255);text-align: center;display: inline-block;margin:0 0.3rem;}
  .sliderBox .search img{width:0.35rem;height: 0.35rem;vertical-align: text-bottom;}
  .text-scroll {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
  }
  .text-scroll p{
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
  /*模块*/
  .module{margin-top:0.2rem;background-color: #fff;}
  /*一级分类*/
  .swiper-point{}
  /*公益*/
  .commonwealItemBox{width:7.1rem;margin:0 auto;padding: 0.25rem 0;border-bottom:1px solid #ededed}
  .commonwealItemBox:last-child{border:0;}
  .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
    background-color:#fff;
  }
</style>
