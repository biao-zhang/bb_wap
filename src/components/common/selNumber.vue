<template>
  <div class='selNumber'>
    <span class="selNumberL" @click="l">-</span>
    <!--<span class="selNumberVal">{{value}}</span>-->
    <input
      style="width: 0.8rem; height: 20px; border: 1px solid #ccc;text-align: center;vertical-align: middle"
      type="number"
      @change="change"
      v-model="val"
    />
    <span class="selNumberR" @click="r">+</span>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  export default{
    data(){
      return{
        val:0,
      }
    },
    components:{},
    props:{
      value:{
        type:Number,
        default:1
      },
      min:{
        type:Number,
        default:1
      },
      max:{
        type:Number,
        default:5
      }
    },
    mounted(){
      this.val = this.value;
    },
    methods:{
      change(){
        if(this.val<this.min){
          this.val=this.min;
        }else if(this.val>this.max){
          this.val = this.max;
        }else{

        }
        this.$emit('changeNum',this.val)
      },
      l(){
        if(this.val<=this.min){
          this.$emit('changeNum',this.val)
        }else{
          this.val=parseInt(this.val)-1;
          this.$emit('changeNum',this.val)
        }
      },
      r(){
        if(this.val>=this.max){
          this.$emit('changeNum',this.val)
        }else{
          this.val=parseInt(this.val)+1;
          this.$emit('changeNum',this.val)
        }
      }
    },
  }
</script>
<style scoped>
.selNumber{ font-size: 0 }
  .selNumberL{
    font-size: 14px;
    font-weight: bold;
    color:#f86e0e;
    width:20px;
    line-height: 20px;
    display: inline-block;
    text-align: center;
    border: 1px solid #ccc;
    border-right: 0;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    vertical-align: middle;
  }
  .selNumberR{
    font-size: 14px;
    font-weight: bold;
    color:#f86e0e;
    width:20px;
    line-height: 20px;
    display: inline-block;
    text-align: center;
    border:1px solid #ccc;
    border-left: 0;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    vertical-align: middle;
  }
  .selNumberVal{
    font-size: 14px;
    min-width:30px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    border:1px solid #ccc;
  }
</style>
