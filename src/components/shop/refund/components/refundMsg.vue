<template>
  <div class="refundMsg">
    <div class="line1"><span class="s1">退款信息：</span> </div>
    <div class="line2">
      <div class="img1Box">
        <img src="../../img/name.png" class="img1">
      </div>
      <div class="img1BoxR">
        <div class="name">{{datas.name}}</div>
        <div class="type">{{datas.type}}</div>
        <div class="number">x{{datas.number}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    props:{
      datas:{
        type:Object,
        default:()=>{
          return {
            "name":'2017没事咯累了乐乐死爱而家飞啊飞撒啊威锋网撒死',
            "type":'awe分啊王菲菲阿色色色方式份额个啊分哇违法哥哥哥仨哇微风是',
            "number":1,
          }
        }
      }
    }
  }
</script>
<style scoped>
  .refundMsg{width:100%;height: 2.63rem;padding:0.3rem 0.2rem;box-sizing: border-box;}

  .line1{width:100%;margin-bottom:0.3rem;}
  .line1 .s1{font-size: 0.3rem;color:#3c3c3c;}
  .line2{width:100%;display: flex;justify-content: space-between}

  .line2 .img1Box{display:inline-block;width:1.4rem;height: 1.4rem;vertical-align: middle;}
  .line2 .img1Box .img1{width:100%;height: 100%;}

  .line2 .img1BoxR{display: inline-block;width:5.23rem;vertical-align: middle;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
  .line2 .img1BoxR .name{font-size: 0.3rem;color:#3c3c3c;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
  .line2 .img1BoxR .type{font-size: 0.24rem;color:#9a9a9a;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;line-height: 0.7rem;}
  .line2 .img1BoxR .number{font-size: 0.24rem;color:#9a9a9a;text-align: right;}

</style>
