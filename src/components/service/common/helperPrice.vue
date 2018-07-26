<template>
  <div class="helperPrice">
    <div class="line1">
      <span class="s1">{{labelText[0]}}</span><span class="s2"><input style="text-align: right;" type="number" v-model="inputValue" @change="change" placeholder="服务价格最低为5元"/> </span>
    </div>
    <div class="hr"></div>
    <div class="line2">
      <div class="lineCon">
        <span class="s1">服务发票</span>
        <span class="s2" :class="{orange:(datas.input2==''||datas.input2==0)}" @click="datas.input2=0">否</span>
        <span class="s3" :class="{orange:datas.input2==1}" @click="datas.input2=1">是</span>
      </div>
    </div>
  </div>
</template>
<script>

  import { mapState } from 'vuex'
  import { getHelperLowerPrice } from '@/api/service'
  export default {
    data(){
      return{
//        num:0,
        inputValue:'',
        lower:1,
      }
    },
    computed:{
      ...mapState('service',{
        datas (state) {
          return state[this.serviceType].priceLine
        }
      }),
//      inputValue:{
//        get(){
//          return this.datas.input1;
//        },
//        set(a){
//          let num = parseInt(a)
//          if(num<0||a==''){
//            this.datas.input1 = 0;
//          }else{
//            this.datas.input1 = num;
//          }
//        }
//      }
    },
    props:{
      serviceType:{
        type:String,
        default:''
      },
      labelText:{
        type:Array,
        default:()=>{
          return ['服务价格','']
        }
      },
      serveCatyId:{
        type:String,
        default:''
      }
//      val:{
//        type:Number,
//        default:0,
//      }
    },
    watch:{
      serveCatyId(n,o){
        this.getLowPrice();
      }
    },
    mounted(){
      setTimeout(()=>{
        this.inputValue = this.datas.input1;
//        this.num = this.val;
      },20)
    },
    methods:{
      getLowPrice(){
        getHelperLowerPrice({serveCatyId:this.serveCatyId}).then((res)=>{
          if(res.message = 'success'){
            this.lower = res.data;
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          this.$store.commit('setToastText','服务器错误')
          this.$store.commit('setToastType','warn')
        })
      },
      change(){
        let val = parseInt(this.inputValue);
        if(val<this.lower||this.inputValue==''){
          this.$store.commit('setToastText','服务价格不可以小于'+this.lower+'元!')
          this.$store.commit('setToastType','warn')
          this.inputValue = this.lower;
        }else{
          this.inputValue = val;
        }
        this.datas.input1 = val;
        this.$emit('getMoney')
      },
    }
  }
</script>
<style scoped>
  .orange{color:#f86e0e}

  .helperPrice{height: 2.02rem;font-size: 0.3rem;color:#333;}

  .line1{height: 0.99rem;line-height:0.4rem;padding:0.3rem 0;box-sizing: border-box;}
  .line1 .s1{margin:0 0 0 0.17rem;}
  .line1 .s2{float: right;padding-right: 0.23rem;}
  .line1 .s2 .input1{text-align: right}
  .line1 .s2 .s3{color:#f86e0e;}

  .hr{width:6.5rem;margin-left: 0.56rem;height: 1px;background-color: #efefef;}

  .line2{display: flex;margin-top: 0.36rem;}
  .line2 .lineCon{width:6.58rem;font-size: 0.3rem;line-height: 0.45rem;}
  .line2 .lineCon .s1{padding-left: 0.17rem;}
  .line2 .lineCon .s2{margin-left:1.14rem;}
  .line2 .lineCon .s3{margin-left: 2.91rem;}
</style>
