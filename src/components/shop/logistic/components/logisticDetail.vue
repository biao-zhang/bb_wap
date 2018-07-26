<template>
  <div class="logisticDetail">
    <div class="curBox" ref="curBox">
      <div class="detail">[郑州市]郑州郑州郑州郑州郑州郑州郑州郑州郑州郑州郑州郑州</div>
      <div class="time">2017-2-12 08:30:00</div>
    </div>
    <div class="allBox" :style="{paddingTop:allBoxMarginT +'px'}">
      <div class="moveBox" :style="{maxHeight:moveBoxH}">
        <div v-for="(item,index) in 8">
          <each-detail></each-detail>
        </div>
        <div class="more"><img @click="openMoveBox()" class="img2" src="../../img/name.png"/></div>
      </div>
    </div>
  </div>
</template>
<script>
  import eachDetail from '@/components/shop/logistic/components/eachDetail'
  export default {
    data(){
      return{
        allBoxMarginT:0,
        moveBoxH:'5rem',

      }
    },
    components:{eachDetail},
    props:{
      datas:{

      }
    },
    mounted(){
      var that = this;
      setTimeout(function () {
        that.allBoxMarginT = that.$refs.curBox.clientHeight;
      },20)
    },
    methods:{
      openMoveBox(){
        if(this.moveBoxH===''){
          this.moveBoxH='5rem'
        }else{
          this.moveBoxH=''
        }

      }
    }
  }
</script>
<style scoped>
  .logisticDetail{width:100%;position: relative;height: 100%;}

  .curBox{position:absolute;z-index:30;left:0.55rem;width:6.4rem;background-color: #fffaf7;border-radius: 0.06rem;margin:0 auto;box-shadow: 0 1px 8px #999;}

  .curBox .detail{font-size: 0.3rem;color:#f86e0e;line-height: 0.5rem;width:5.6rem;float: right;margin-right: 0.24rem;margin-bottom:0.3rem;}

  .curBox .time{font-size: 0.24rem;color:#9a9a9a;line-height: 0.4rem;text-align: right;padding-right: 0.24rem;box-sizing: border-box;}

  .allBox{width:6.1rem;height:100%;margin:0 auto;position: absolute;z-index: 20;left:0.7rem;padding:0 0.05rem;box-sizing: border-box;overflow: scroll;}

  .allBox .moveBox{position: relative;background-color: white;box-shadow: 0 1px 5px #999;padding-top: 0.1rem;margin-bottom:0.5rem;border-radius: 0.06rem;overflow: hidden;}

  .allBox .more{position:absolute;bottom:0;width:100%;text-align: center;padding:0.2rem 0;background-color: white;}
  .allBox .more .img2{width:0.38rem;}
</style>
