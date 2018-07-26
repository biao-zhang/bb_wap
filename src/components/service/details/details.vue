<template>
  <div>
    <div class="details">
      <div class="details_item" v-bind:style="{ backgroundImage: imgbgMessage }">
        <div class="details_img">
          <img class="img_img1" :src="datas.userPortrait" />
        </div>
        <div class="details_info" >
          <div class="info_name">{{datas.userName}}</div>
          <div class="info_tel">{{phone}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgbgMessage:'',
        phone:''
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
      this.phone = this.datas.phone.substr(0,3)+"****"+this.datas.phone.substr(7);
      if(this.datas.joinState == 1){
        this.imgbgMessage = 'url(' + require("../img/notails.png") + ')'
      }else if(this.datas.joinState == 3){
        this.imgbgMessage = 'url(' + require("../img/deatils_y.png") + ')'
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
</style>
