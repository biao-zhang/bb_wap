<template>
  <div class='selfAddress'>
    <x-address
      :title="title"
      v-model="val"
      :list="list"
      placeholder="请选择地址"
      :show.sync="s"
      @on-shadow-change="change"
      @on-hide="hide"
    > </x-address>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XAddress } from 'vux'

  export default{
    components: {
      XAddress
    },
    data(){
      return{

        changea:[],
        changeb:[]
      }
    },
    computed:{
      val:{
        get(){
          return this.value;
        },
        set(a){
          this.$emit('change',this.changea,this.changeb)
        }
      },
      s:{
        get(){
          return this.state;
        },
        set(){

        }
      },

    },
    props:{
      list:{
        type:Array,
        default:()=>{
          return cityDatas_name_value_parent_json;
        }
      },
      state:{
        type:Boolean,
        default:false
      },
      value:{
        type:Array,
        default:()=>{
          return ['410000', '410100', '410103']  //二七区
//          return ['110000', '110100', '110101']  //东城区
        }
      },
      title:{
        type:String,
        default:'标题'
      },
    },
    mounted(){

    },
    methods:{
      change(a,b){
        this.changea=a;
        this.changeb=b;
      },
      hide(a){
        if(a){

        }else{

        }
        this.$emit('close')
      }
    },
  }
</script>
<style scoped>
.selfAddress>>>.weui-cell{display:flex;line-height:1rem;}
   .selfAddress>>>.weui-cell__hd{display:flex;}
   .selfAddress>>>.weui-cell__hd label{font-size: 0.3rem;color: #333;}
   .selfAddress>>>.vux-popup-picker-select span{font-size: 0.3rem;}
</style>
