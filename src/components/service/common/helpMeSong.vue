<template>
  <div class="quBox">
    <div class="qu" @click="clickQu">
      <div class="lBox">
        <img class="img1" src="../img/qu.png">
      </div>
      <div class="cBox" v-if="datas.input1!=''">
        <div class="quAddress">{{datas.input1}}</div>
        <div class="quName"><span class="s1">{{datas.input2}}</span><span class="s2">{{datas.input3}}</span></div>
      </div>
      <div class="cBox" v-if="datas.input1==''">
        <span style="line-height: 2rem;font-size: 0.3rem;">    请选择地址</span>
      </div>
      <div class="rBox">
        <img class="img2" src="../img/next.png">
      </div>
    </div>
    <div class="hr"></div>
    <div class="song" @click="clickSong">
      <div class="lBox">
        <img class="img3" src="../img/song.png">
      </div>
      <div class="cBox" v-if="datas.input4!=''">
        <div class="quAddress">{{datas.input4}}</div>
        <div class="quName"><span class="s1">{{datas.input5}}</span><span class="s2">{{datas.input6}}</span></div>
      </div>
      <div class="cBox" v-if="datas.input4==''">
        <span style="line-height: 2rem;font-size: 0.3rem;">    请选择地址</span>
      </div>
      <div class="rBox">
        <img class="img4" src="../img/next.png">
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].helpMe
        }
      }),
    },
    props:{
      serviceType:{
        type:String,
        default:''
      }
    },
    methods:{
      clickQu(){
        this.$emit('qu')
      },
      clickSong(){
        this.$emit('song')
      },
    }
  }
</script>
<style scoped>
  .quBox{height: 4.2rem;}
  .qu{display: flex;height: 50%;}
  .song{display: flex;height: 50%;}

  .lBox{display: inline-block;width: 0.77rem;height: 100%;text-align: center}
  .lBox .img1{width:0.6rem;height: 0.6rem;margin-top: 0.68rem;}
  .lBox .img3{width:0.6rem;height: 0.6rem;margin-top: 0.65rem;}

  .hr{width:6rem;margin:0rem auto 0 0.56rem;height: 1px;background-color: #efefef;}

  .cBox{display: inline-block;width: 5.74rem;height: 100%;}
  .cBox .quAddress{font-size: 0.3rem;color:#333;margin-top:0.17rem;line-height: 0.45rem;height: 0.9rem;}
  .cBox .quName{font-size: 0.3rem;color:#333;margin-top:0.3rem;}
  .cBox .quName .s1{}
  .cBox .quName .s2{float: right;}

  .rBox{display: inline-block;width: 0.59rem;height: 100%;text-align: center}
  .rBox .img2{width:0.15rem;margin-top: 0.86rem;}
  .rBox .img4{width:0.15rem;margin-top: 0.85rem;}
</style>
