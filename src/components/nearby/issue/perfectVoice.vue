<template>
  <div class="porfect">
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--是不是-->
    <div class="want">
      <div class="want_to">您是不是想找：</div>
      <div class="center">
        <checker default-item-class="checkerDefault" selected-item-class="checkerSelected">
          <checker-item :value="index" @on-item-click="clickCheckerItem(item.type,item.serveCatyId)" v-for="(item,index) in result" :key="index">{{item.serveCatyName}}</checker-item>
        </checker>
      </div>
    </div>
    <!--描述请求-->
    <div class="request">
        <div class="request_top">描述你的请求</div>
        <textarea v-model="voice" :style="{height:areaH+'px'}" @keydown="keydown" placeholder="请输入您的请求..." ref="area"></textarea>
    </div>
    <!--按钮-->
    <!--<div class="btn">提交</div>-->
  </div>
</template>
<script>
  import xHeader from '@/components/nearby/common/xHeader'
  import { searchByCatyName } from '@/api/service'

  import {Checker,CheckerItem} from 'vux'

  export default {
    data(){
      return{
        top:"完善语音识别",
        result:[],
        voice:'',
        areaH:'100',
      }
    },
    components:{xHeader,Checker,CheckerItem},
    watch:{
      voice(n,o){
        this.getResult(n)
      }
    },
    mounted(){
      this.voice = this.$route.query.scName;
      if(this.$route.query.scName!=''){
        this.getResult(this.$route.query.scName)
      }else{
        this.$store.commit('setToastText','参数错误')
        this.$store.commit('setToastType','warn')
      }
    },
    methods:{
      keydown(){
        this.areaH = this.$refs.area.scrollHeight;
      },
      getResult(scName){
        searchByCatyName({scName:scName}).then((res)=>{
          console.log(res)
          if(res.data.length>0){
            this.result = res.data;
          }else{
            this.$store.commit('setToastText','没有匹配的服务类型')
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          console.log(err)
          this.$store.commit('setToastText','服务器错误')
          this.$store.commit('setToastType','warn')
        })
      },
      clickCheckerItem(type,serveCatyId){
        this.toService(type,serveCatyId)
      },
      toService(type,serveCatyId){
        // 服务 type 1:跑腿帮 2:家政帮 3:维修帮 4:司机帮 5:找帮手 6:公益帮
        if (type === 1) {

          this.$router.push({path: '/bb/runTo', query: {serveCatyId: serveCatyId}})

        } else if (type === 2) {

          this.$router.push({path: '/bb/housekeep', query: {serveCatyId: serveCatyId}})

        } else if (type === 3) {

          this.$router.push({path: '/bb/repair', query: {serveCatyId: serveCatyId}})

        } else if (type === 4) {

          this.$router.push({path: '/bb/driver', query: {serveCatyId:serveCatyId}})

        } else if (type === 5) {

          this.$router.push({path: '/bb/helper', query: {serveCatyId: serveCatyId}})

        } else if (type === 6) {

          this.$router.push({path: '/bb/commonweal', query: {serveCatyId: serveCatyId}})

        }
      },
    }
  }
</script>
<style scoped>
  .porfect{height:100%;padding-top:46px;box-sizing: border-box;}
  /*想找*/
  .want{width:7.1rem;background:#fff;margin:0.3rem auto 0; padding:0.12rem;box-sizing:border-box;}
  .want_to{line-height:0.99rem;font-size:0.3rem;color: #333333;}

  .center{min-height:1rem;}
  .vux-checker-box{width:100%;}
  .vux-tap-active{height:0.6rem;display: inline-block;text-align:center; line-height:0.6rem;border:1px solid #cccccc;border-radius:0.4rem;font-size:0.3rem;color: #333333;padding:0 0.1rem;margin:0.1rem;}
  .checkerSelected{color:#f86e0e;border:1px solid #f86e0e;}
  /*描述*/
  .request{width:7.1rem;background:#fff;margin:0.3rem auto 0; padding:0.12rem;box-sizing:border-box;}
  .request_top{line-height:0.99rem;font-size:0.3rem;color: #333333;border-bottom:1px solid #ededed;}
  .request textarea{width:100%; min-height:2rem; padding:0.2rem;box-sizing:border-box;font-size:0.3rem;border:1px solid #ccc;overflow: hidden;resize:none;outline: none;}

  /*按钮*/
  .btn{width:6.75rem;height:0.8rem;background:#f86e0e; margin:1.7rem auto 0;text-align:center;line-height:0.8rem;color:#fff;font-size:0.32rem;border-radius:0.04rem;}
</style>
