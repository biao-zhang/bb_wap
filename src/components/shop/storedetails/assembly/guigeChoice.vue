<template>
  <div class="guige_cen">
      <p>{{datas.specName}}</p>
    <div class="choice">
      <div class="item"
           v-for="(item,index) in datas.gsvdList"
           :key="index"
           :class="{'show':curIndex===index}"
           @click="change(index,item.specValueId)"
      >
        <span class="s1">{{item.goodsSpecValueName}}</span>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        curIndex:-1,
      }
    },
    props:{
      datas:{
        type:Object,
        default:function () {
          return {}
        }
      },
      index:{
        type:Number,
        default:0
      }
    },
    components:{},
    methods:{
      change(a,b){
        this.curIndex=a;
        // console.log(b)
        this.$emit('clickgs',this.index,b)
      }
    }
  }



</script>
<style scoped>
    .guige_cen{background:#fff;padding:0.2rem 0.2rem;}
    .guige_cen p{font-size:0.34rem;color:#3c3c3c;font-weight: 600;}

    .choice{display: flex;flex-wrap:wrap;}
    .choice .item{width:1.48rem;height:0.48rem;border:1px solid #999999;margin-left:0.35rem;text-align: center;line-height:0.48rem;margin-top:0.2rem;color:#999999;border-radius:0.05rem;}
    .choice .item:first-child{margin-left:0;}
    .choice .item:nth-child(4n+1){margin-left:0;}
    .choice .item.show {border:1px solid #fd593d; color:#fd593d;}
</style>
