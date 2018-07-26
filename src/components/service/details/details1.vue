<template>
  <div>
    <div class="details">
      <div class="details_item" v-bind:style="{ backgroundImage: imgbgMessage }">
        <div class="details_img" style="width: 1.30rem;height: 1.3rem;">
          <img class="img_img1" :src="datas.userPortrait" />
        </div>
        <div class="details_info" style="flex:1;">
          <div class="info_name">{{datas.userName}}</div>
          <div style="display:flex;justify-content:space-between;">
            <div class="info_tel">{{datas.phone}}</div>
            <div v-if="affirm" class="affirm" @click="affirmBtn(datas.joinId)">
              确认参与
            </div>
            <div v-if="affirm_1" class="affirm_1">
              已参与
            </div>
            <div v-if="affirm_2" class="affirm_1">
              未到达
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { affirmParticipation } from "@/api/service";
  export default {
    data() {
      return {
        imgbgMessage:'',
        affirm:false,
        welfareState:'',
        affirm_1:false,
        affirm_2:false
      }
    },
    props: {
      datas:{
        type:Object,
        default:function () {
          return {}
        }
      }
    },
    mounted(){

      if(this.datas.joinState == 1){
        this.affirm = true
      }else if(this.datas.joinState == 3){
        this.affirm_1 = true
        this.imgbgMessage = 'url(' + require("../img/deatils_y.png") + ')'
      }

      if(this.$route.query.welfareState!==undefined){
        this.welfareState = this.$route.query.welfareState
      }

      if(this.welfareState == 5 && this.datas.joinState == 1){
        this.affirm = false
        this.affirm_1 = false
        this.affirm_2 = false
        this.imgbgMessage = 'url(' + require("../img/notails.png") + ')'
      }else if(this.welfareState == 4 && this.datas.joinState != 3){
        this.affirm = false
        this.affirm_1 = false
        this.affirm_2 = true
        this.imgbgMessage = 'url(' + require("../img/notails.png") + ')'
      }else if(this.welfareState == 4 && this.datas.joinState == 3){
        this.affirm = false
        this.affirm_1 = true
        this.affirm_2 = false
        this.imgbgMessage = 'url(' + require("../img/deatils_y.png") + ')'
      }
    },
    methods:{
      affirmBtn(joinId){
        console.log(joinId)
        affirmParticipation({joinId:joinId}).then(res => {
          console.log('接收确认到达',res)
          if(res.message = 'success'){
            this.imgbgMessage = 'url(' + require("../img/deatils_y.png") + ')'
            this.affirm = false
          }
        })
      }
    }
  }
</script>
<style>
  .details { height:2rem; margin: 0 0.20rem;}
  .details_img{width:1.3rem;height:1.3rem;}
  .details_img .img_img1{width:100%;height:100%;border-radius:50%;}
  .details_item {
    display: flex;
    margin-top: 0.30rem;
    padding: 0.35rem 0.20rem;
    /*background-image: url("../img/deatils_y.png");*/
    background-size: 100% 100%;
    box-shadow: 1px 5px 5px #ccc;
  }
  .details_info {
    margin-left: 0.20rem;
    padding: 0.15rem 0;
    flex:1;
    font-size: 0.34rem;
  }
  .info_name {color: #3c3c3c;}
  .info_tel {color: #838383;}
  .affirm{width:1.4rem;height:0.5rem;background:#f86e0e;color:#fff;font-size:0.24rem;text-align:center;line-height:0.5rem;border-radius:4px;}
  .affirm_1{width:1.4rem;height:0.5rem;background:#ccc;color:#fff;font-size:0.24rem;text-align:center;line-height:0.5rem;border-radius:4px;}
</style>
