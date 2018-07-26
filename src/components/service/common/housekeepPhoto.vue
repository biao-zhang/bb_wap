<template>
  <div class="housekeepPhoto">
    <div class="line1">
      <span class="goumaiTit">服务说明</span>
      <textarea rows="2" v-model="datas.input1" :style="{height:areaH+'px'}" @keydown="keydown" placeholder="寻找符合心意的服务" maxlength="100" ref="area"></textarea>
    </div>
    <div class="line2">
      <upload :maxUploadNumber="5" :items="datas.input2.items" @uploadItems="getInputItems" @uploadUrls="getInputUrls"></upload>
    </div>
  </div>
</template>
<script>
  const getImgURL = require('@/assets/js/getImgURL.js')
  import { mapState } from 'vuex'
  import upload from "@/components/common/upload"
  export default {
    data(){
      return{
//        textareaVal:'',  // textarea
        areaH:38,
      }
    },
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].housekeepPhoto
        }
      }),
    },
    components:{upload},
    props:{
      serviceType:{
        type:String,
        default:''
      },
    },
    mounted(){

    },
    methods:{
      changeTextareaVal(a){        //输出textarea说明         new FileReader()
//        this.$emit('getData',[this.textareaVal,''])
      },
//      获取图片信息
      getInputItems(a){
        console.log(a)
        this.datas.input2.items=a;
      },
      getInputUrls(a){
        console.log(a)
        this.datas.input2.files=a;
      },
      keydown(){
        this.areaH = this.$refs.area.scrollHeight;
      },
    }
  }
</script>
<style scoped>
  .housekeepPhoto{min-height: 2.41rem;font-size: 0.3rem;color:#333;}

  .line1{font-size: 0.3rem;color:#333;line-height: 0.45rem;padding-top: 0.19rem;display: flex;}
  .line1 .goumaiTit{margin:0 0.14rem 0 0.17rem;display: inline-block;}
  .line1 textarea{border:0;line-height: 0.38rem;font-size: 0.3rem;color:#515151;width:5.08rem;height: 0.76rem;overflow:hidden; resize:none;outline: none;padding:0;}

  .line2{padding:0.18rem 0.2rem;width: 100%;box-sizing: border-box;}
</style>
