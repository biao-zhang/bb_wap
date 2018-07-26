<template>
  <div class="selSex" v-transfer-dom>
    <popup v-model="show" height="3.33rem" position="bottom" max-height="3.33rem" :hide-on-blur="false">
      <div class="line" @click="cli(1)">男</div>
      <div class="line" @click="cli(2)">女</div>
      <div class="line" @click="cli(0)">取消</div>
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
//      this.show_one=true;
    },
    methods: {
      cli(q){
        this.$emit("getSex",q)
      }
    }
  }



</script>
<style scoped>
  .selSex{width:100%;background-color: white;}

  .line{width:100%;line-height: 1.11rem;box-sizing: border-box;border-bottom:1px solid #ededed;text-align: center;font-size: 0.32rem;color:#333;background-color: white;}

</style>
