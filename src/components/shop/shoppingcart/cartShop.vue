<template>
  <div class='cartShop'>
    <x-header class="xheader" :title="tit" :left-options="{backText:''}" :right-options="{showMore:false}">
      <a slot="right" class="titleRight" @click="moreState=!moreState" v-html="moreState?'编辑':'完成'"></a>
    </x-header>
    <div class="content">
      <div class="itemBox" v-for="(item,index) in datas.list" >
        <cart-shop-item @itemRadioState="itemRadioState" @changeNum="changeNum" :datas="item" :index="index"></cart-shop-item>
      </div>
    </div>
    <div class="bottom" v-if="moreState">
      <div class="bottomL">
        <img class="img1" v-if="datas.checkStatus==1?1:0" @click="changeAllState" src="../img/cartRadioTrue.png"/>
        <img v-if="datas.checkStatus==0?1:0" class="img1" @click="changeAllState" src="../img/cartRadioFalse.png"/>全选
        <div class="all" ><span class='s1'>总计:</span><span class="s2">￥{{datas.totalMoney}}</span></div>
      </div>
      <div class="bottomR" @click="sub">结算({{datas.totalCount}})</div>
    </div>
    <div class="bottom" v-if="!moreState">
      <div class="bottomL1">
        <img class="img1" v-if="datas.checkStatus==1?1:0" @click="changeAllState" src="../img/cartRadioTrue.png"/>
        <img v-if="datas.checkStatus==0?1:0" class="img1" @click="changeAllState" src="../img/cartRadioFalse.png"/>全选
      </div>
      <div class="bottomL2" @click="moveIntoCollectionF">收藏({{datas.totalCount}})</div>
      <div class="bottomR" @click="detailItem">删除({{datas.totalCount}})</div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */


  import {XHeader} from 'vux'
  import cartShopItem from '@/components/shop/shoppingcart/components/cartShopItem'
  import { getO2OCartList,o2oChangeOrderState,o2oChangeCartNumber,o2oCartDetailGoods } from '@/api/personally'
  import { moveIntoCollection } from '@/api/shop'

  export default{
    data(){
      return{
        tit:'终端店购物车',
        moreState:true,
        datas:{},
        checkedArr:[false,false,false,false],
        shopId:'',      //790371529483
      }
    },
    components:{XHeader,cartShopItem},
    computed:{
      cartIDs(){
        let ids = ''
        for(let i=0;i<this.datas.list.length;i++){
          if(this.datas.list[i].isCheck==1){
            ids+=this.datas.list[i].cartId+',';
          }
        }
        return ids.substring(0,ids.length-1)
      }
    },
    props:{

    },
    mounted(){
      if(this.$route.query.shopId!==undefined){
        this.shopId = this.$route.query.shopId;
      }else{
        this.$store.state.toastText='shopId参数错误'
        this.$store.state.toastType='text'
      }
      this.init()
    },
    methods:{
      //获取购物车数据
      init(){
        getO2OCartList({shopId:this.shopId}).then((res)=>{
          console.log(res,'购物车数据')
          if(res.message=='success'){
            this.datas = res.data;
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          this.$store.commit('setToastText','获取购物车数据失败')
          this.$store.commit('setToastType','warn')
        })
      },
      sub(){
        if(this.datas.totalCount==0){    //如果没有选择购物车商品，直接返回
          this.$store.commit('setToastText','请选择将要操作的商品')
          this.$store.commit('setToastType','warn')
          return false;
        }
        this.$router.push({path:'/z/confirmOrder1',query:{orderType:'cartOrder',shopId:this.shopId}})
      },
      //单选
      itemRadioState(cartId,checked){
        console.log(cartId,checked)
        let params = {
//          check:0,         //全选或全不选
          status:checked==1?0:1,        //
          cartIds:cartId,        //按照自己选择的单选，多选的选中
          shopId:this.shopId,
          terminalType:'wap',
        }
        o2oChangeOrderState(params).then((res)=>{
          if(res.message=='success'){
            this.init();
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','error')  // success, warn, cancel, text
          }
        }).catch((err)=>{
          this.$store.commit('setToastText','请求失败')
          this.$store.commit('setToastType','error')  // success, warn, cancel, text
        })
      },
      //全选或全不选
      changeAllState(){
        let params = {
          check:this.datas.checkStatus==1?0:1,         //全选或全不选
          shopId:this.shopId,
          terminalType:'wap',
        }
        o2oChangeOrderState(params).then((res)=>{
          if(res.message=='success'){
            this.init();
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','error')  // success, warn, cancel, text
          }
        }).catch((err)=>{
          this.$store.commit('setToastText','请求失败')
          this.$store.commit('setToastType','error')  // success, warn, cancel, text
        })
      },
      //改变购物车中商品的数量
      changeNum(cartId,num){
        o2oChangeCartNumber({cartId:cartId,num:num}).then((res)=>{
            if(res.message=='success'){
              this.init()
            }else{
              this.$store.commit('setToastText',res.message)
              this.$store.commit('setToastType','error')  // success, warn, cancel, text
            }
        }).catch((err)=>{
          this.$store.commit('setToastText','请求失败')
          this.$store.commit('setToastType','error')  // success, warn, cancel, text
        })
      },
      //删除购物车中的商品
      detailItem(){
        if(this.datas.totalCount==0){    //如果没有选择购物车商品，直接返回
          this.$store.commit('setToastText','请选择将要操作的商品')
          this.$store.commit('setToastType','warn')
          return false;
        }
        let params = {
          cartIds:this.cartIDs,
          ischeck:0,
          shopId:this.shopId,
          terminalType:'wap',
        }
        o2oCartDetailGoods(params).then((res)=>{
          if(res.message=='success'){
            this.init();
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','error')  // success, warn, cancel, text
          }
        }).catch((err)=>{
          this.$store.commit('setToastText','请求失败')
          this.$store.commit('setToastType','error')  // success, warn, cancel, text
        })
      },
      //购物车商品移动到收藏
      moveIntoCollectionF(){
        if(this.datas.totalCount==0){    //如果没有选择购物车商品，直接返回
          this.$store.commit('setToastText','请选择将要操作的商品')
          this.$store.commit('setToastType','warn')
          return false;
        }
        let params = {
          cartIds:this.cartIDs,             //商品ID字符串以逗号分隔
          shopType:'1',            //平台类型(2、b2c本地；1、合作终端；3、b2b本地；4、b2b全国)
          goodsIds:this.shopId,              //购物车Id
        }
        console.log(params)
        this.axios.post('/personally/user/selectBasicById').then((res)=>{       //判断是否登录
          if(res.data.message=='tokenIsNull'){
            this.$router.push({path:'/y/logIn'})
          }else{
            moveIntoCollection(params).then((res)=>{
              if(res.message=='success'){
                this.$store.commit('setToastText','加入终端店购物车成功')
                this.$store.commit('setToastType','success')  // success, warn, cancel, text
                this.init();
              }else{
                this.$store.commit('setToastText',res.message)
                this.$store.commit('setToastType','warn')  // success, warn, cancel, text
              }
            }).catch((err)=>{
              this.$store.commit('setToastText','服务器错误')
              this.$store.commit('setToastType','warn')  // success, warn, cancel, text
            })
          }
        }).catch((err)=>{
          this.$store.commit('setToastText','服务器错误')
          this.$store.commit('setToastType','warn')
        })


      }

    },
  }
</script>
<style scoped>
  .xheader{width:100%;background-color: white;position: fixed;top:0;z-index: 10}

  .cartShop >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
  .cartShop >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
  .vux-header .vux-header-right .titleRight{font-size: 0.28rem;color:#f86e0e}

.cartShop{ width:100%;height: 100%;}

.content{width:100%;height: 100%;box-sizing: border-box;padding-top:46px;padding-bottom:1.2rem;background-color: #f5f5f5;overflow: scroll;}
.content .itemBox{width:100%;background-color: white;}


  .bottom{display: flex;line-height: 1.2rem;position: fixed;bottom: 0;z-index: 10;height: 1.2rem;}
  .bottomL{width:5.5rem;background-color: white;font-size: 0.3rem;color:#666;}
  .bottomL .img1{width:0.4rem;height: 0.4rem;vertical-align:text-bottom;margin:0 0.3rem 0 0.33rem;}
  .bottomL .all{float: right;}
  .bottomL .s1{color:#333;}
  .bottomL .s2{color:#f86e0e;margin-right: 0.3rem;}
  .bottomL1{width:3.5rem;font-size: 0.3rem;background-color: white;color:#666;}
  .bottomL1 .img1{width:0.4rem;height: 0.4rem;vertical-align:text-bottom;margin:0 0.3rem 0 0.33rem;}
  .bottomL2{text-align: center;background-color: #3c3c3c;font-size:0.3rem;color:white;width:2rem;}
  .bottomR{width:2rem;background-color: #f86e0e;text-align: center;color:white;font-size: 0.3rem;}
</style>
