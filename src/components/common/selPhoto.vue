<template>
  <div class="selSex" v-transfer-dom>
    <popup v-model="show" height="2.8rem" position="bottom" max-height="4.32rem" :hide-on-blur="false">
      <div class="box">
        <!--<div class="line" @click="cli(1)">拍照</div>-->
        <div class="line" @click="cli(2)">从相册选择</div>
        <div class="line line1" @click="cli(0)">取消</div>
      </div>
    </popup>
  </div>
</template>
<script>
  import {TransferDom,Popup} from 'vux'

  export default {
    data(){
      return{

      }
    },
    directives: {TransferDom},
    components:{Popup},
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    mounted(){

    },
    methods: {
      cli(q){
        if(q===-1){
          this.$emit("getPhoto",this.show)
        }else{
          this.$emit("getPhoto",q)
        }
      }
    }
  }



</script>
<style scoped>
  .selSex{width:100%;background-color: white;}

  .box{width:100%;height: 100%;background-color: white;box-sizing: border-box;padding-top:0.3rem;}

  .line{width:6.8rem;height:0.8rem;box-sizing: border-box;text-align: center;font-size: 0.32rem;color:#fff;line-height:0.8rem;border-radius: 0.02rem;background-color: #f86e0e;margin:0.3rem auto;}
  .line1{background-color: #999;}

</style>
