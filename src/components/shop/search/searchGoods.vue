<template>
  <div class="shopGoodsList">
    <x-header class="xHeader" :msg="title" :left-options="{backText:''}" :right-options="{showMore:false}" >
      <div class="headerTitle" slot="overwrite-title">
        <input class="headerInput" type="text" style="background-color:rgba(154,154,154,0.2)"/><img @click="clearInput" class="clearInput" src="../../../assets/img/clearInput.png"/>
      </div>
    </x-header>
    <div class="content" v-if="hollow">
      <!--tab-->
      <div class="nav" ref="nav">
        <shop-goods-list-nav @shopGoodsListNavVal="navVal"></shop-goods-list-nav>
      </div>
      <!--list-->
      <div class="list" :style="{paddingTop:listH+'px'}">
        <shop-goods-list-item v-for="(item,index) in 10" :key="index"></shop-goods-list-item>
      </div>
    </div>
    <!--搜索结果为空-->
    <div class="content" v-if="!hollow">
      <img src="../img/hollow.png" class="hollow"/>
      <p class="p">抱歉，没有相关搜索</p>
      <p class="p">换个<span>关键词</span>重新搜索</p>
    </div>
  </div>
</template>
<script>
  /**
   * @state hollow:B //搜索结果是否为空
   * @props
   * @emit
   */
  import {XHeader,Search } from 'vux'
  import shopGoodsListNav from '@/components/shop/common/shopGoodsListNav'
  import shopGoodsListItem from '@/components/shop/common/shopGoodsListItem'

  export default {
    data(){
      return{
        title:'男装',
        listH:0,

        hollow:true,   //搜索结果是否为空

      }
    },
    components:{XHeader,Search ,shopGoodsListNav,shopGoodsListItem},
    mounted(){
      console.log('搜索结果是否为空（hollow):'+this.hollow)
      var that = this;
      setTimeout(function () {
        if(that.hollow){
          that.listH = that.$refs.nav.clientHeight;
        }else{

        }
      },20)
    },
    methods:{
      navVal(a){
        console.log(a)
      },
//      清空搜索框
      clearInput(){

      }
    }

  }



</script>
<style scoped>
  .shopGoodsList{background-color: white;height: 100%;}

  .shopGoodsList .content{padding-top:46px;width:100%;height: 100%;box-sizing: border-box;}

  .shopGoodsList .nav{position: fixed;z-index:50;top:46px;width:100%;}
  .shopGoodsList .list{width:100%;height: 100%;background-color: white;overflow: scroll;box-sizing: border-box;}

  .shopGoodsList .headerTitle{position: relative;}
  .shopGoodsList .headerInput{width:6rem;height: 0.6rem;border-radius: 0.05rem;margin:5px 0;padding:0 0.5rem;box-sizing: border-box;background: url("../../../assets/img/searchInput.png") no-repeat 0.1rem;background-size: 0.3rem;}
  .shopGoodsList >>> .vux-header-title-area{margin:0 40px;}
  .shopGoodsList .headerTitle .clearInput{position: absolute;right: 0.1rem;width:0.3rem;top:0.24rem;}

  .xHeader{width:100%;background-color: white;position: fixed;top:0;}
  /*hollow*/
  .hollow{width:3.94rem;display: block;margin: 0.42rem auto;}
  .p{text-align: center;font-size: 0.3rem;line-height: 0.5rem;color:#333}
  .p span{color:#f86e0e}
</style>
