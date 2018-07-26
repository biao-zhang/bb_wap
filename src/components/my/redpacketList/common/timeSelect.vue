<template>
  <div class="timeSelect" v-transfer-dom>
    <popup v-model="show" height="5.6rem" position="bottom" max-height="5.6rem" :hide-on-blur="false">
      <div class="line" @click="cli(1)">2018</div>
      <div class="line" @click="cli(2)">2017</div>
      <div class="line" @click="cli(3)">2016</div>
      <div class="line" @click="cli(4)">2015</div>
      <div class="line line_pa" @click="cli(5)">2014</div>
      <div class="line line_qu" @click="cli(0)">取消</div>
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
        this.$emit("getTime",q)
      }
    }
  }



</script>
<style scoped>
  .timeSelect{width:100%;background-color: white;}

  .line{width:100%;line-height: 1.1rem;box-sizing: border-box;border-bottom:1px solid #ededed;text-align: center;font-size: 0.32rem;color:#333;background-color: white;}

  .line_qu{position:fixed; bottom:0;border:none;}
  .line_pa{margin-bottom:1.1rem;}
</style>
