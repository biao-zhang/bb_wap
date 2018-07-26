<template>
  <div class="qu">
    <div class="lBox">
      <img class="img1" src="../img/song.png">
    </div>
    <div class="cBox" v-if="editorAddress.input1!=''">
      <div class="quAddress">
        <!--<span v-for="item in editorAddress.person_address">{{ item }}</span>-->
        <span>{{ editorAddress.input1 }}</span>
      </div>
      <div class="quName"><span class="s1">{{editorAddress.input2}}</span><span class="s2">{{editorAddress.input3}}</span></div>
    </div>
    <div class="cBox" v-if="editorAddress.input1==''">
        <span style="line-height: 2rem;font-size: 0.3rem;">    请选择地址</span>
    </div>
    <div class="rBox">
      <img class="img2" src="../img/next.png">
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    computed:{
     /* ...mapState('service',{
        datas (state) {
          return state[this.serviceType].helpMe;
        }
      }),*/
      editorAddress() {
        return this.$store.state.service.runTo.helpMe
      }
    },
    props:{
      serviceType:{
        type:String,
        default:''
      }
    },
    mounted(){
      console.log(this.editorAddress)
    }
  }
</script>
<style scoped>
  .qu{height: 2.1rem;display: flex;}
  .lBox{display: inline-block;width: 0.77rem;height: 100%;text-align: center}
  .lBox .img1{width:0.6rem;height: 0.6rem;margin-top: 0.68rem;}

  .cBox{display: inline-block;width: 5.74rem;height: 100%;}
  .cBox .quAddress{font-size: 0.3rem;color:#333;margin-top:0.17rem;line-height: 0.45rem;height:0.9rem;}
  .cBox .quName{font-size: 0.3rem;color:#333;margin-top:0.3rem;}
  .cBox .quName .s1{}
  .cBox .quName .s2{float: right;}

  .rBox{display: inline-block;width: 0.59rem;height: 100%;text-align: center}
  .rBox .img2{width:0.15rem;margin-top: 0.86rem;}
</style>
