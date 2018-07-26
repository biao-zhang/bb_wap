<template>
  <div style="position: relative">
    <div class="top" ref="topt">
      <x-header :left-options="{backText: ''}">{{ msg_m }}<a slot="right">说明</a></x-header>
    </div>
    <div class="selectChang">
      <div class="selectChangTab" ref="tabt">
        <tab :line-width=2 active-color='#f86e0e' v-model="index" >
          <tab-item class="vux-center" v-for="(item, index) in list2" @click.native="itemClick(item)" :selected="demo2 === item" :key="index">{{item}}</tab-item>
        </tab>
      </div>
      <div ref="midMap" style="position: relative">
        <div v-if="this.demo2 === '红包'" style="height: 100%">
          <redpacket> </redpacket>
        </div>
        <div v-if="this.demo2 === '帮工'" style="height: 100%">
          <helper></helper>
        </div>
        <div v-if="this.demo2 === '合作终端'" style="height: 100%">
           <CooperationShop></CooperationShop>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { XHeader, Tab, TabItem, Swiper, SwiperItem } from 'vux'
  import redpacket  from './redpacket '
  import helper from './helper'
  import CooperationShop from './CooperationShop'
  import {setStore,getStore,removeStore} from '@/untils/storage'
  const list = () => ['红包', '帮工', '合作终端']
  export default {
    components: {
      XHeader,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      helper,
      CooperationShop,
      redpacket
    },
    data() {
      return {
        msg_m: '红动全城',
        list2: list(),
        index: 0,
        demo2: '红包',
      }
    },
    created(){
      
    },
    mounted() {
      //改变bottomIndex
        if(getStore('nearByTabIndex')=='3')
      {
        this.demo2 = '合作终端';
      }
      else if(getStore('nearByTabIndex')=='2')
      {
         this.demo2 = '帮工';
      }
      else{
         this.demo2 = '红包';
      }
      //console.log('demo2',this.demo2);
      this.$store.commit('getBottomIndex',2)
      let self = this
      setTimeout(function() {
        self.$refs.midMap.style.height = window.innerHeight-self.$refs.topt.clientHeight-self.$refs.tabt.clientHeight-1 + 'px' // 1是border的高度
        // console.log(window.innerHeight)
        // console.log(self.$refs.topt.clientHeight)
        // console.log(self.$refs.tabt.clientHeight)
        // console.log('midMap高度：',self.$refs.midMap.style.height)
      }, 0)
    },
    methods: {
      itemClick(val) {
        this.$nextTick(() => this.demo2 = val)
        if(val=='合作终端'){
          setStore('nearByTabIndex','3')
          
        }
        else if(val=='红包'){
          setStore('nearByTabIndex','1')
        }
        else{
          setStore('nearByTabIndex','2')
        }
      },
    }
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}
  .top >>> .vux-header-right a { color: #f86e0e}

  .selectChang {
    border-top: 1px solid #eee;
  }
  .selectChangTab {
    box-shadow: 1px 1px 5px #eee;
  }
  .imgTwo {
    position: fixed;
    top: 7.4rem;
    left: 5.5rem;
  }
  .imgTwo img{
    width: 1.59rem;
  }

</style>
