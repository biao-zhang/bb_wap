<template>
  <div class='setCell' :style="{'paddingLeft':lPadding,'paddingRight':rPadding,}" :class="{'bBorder':bBorder}">
    <img v-if="lImgSrcState" :src='lImgSrc' class="lImgSrc"/>
    <span class="lLabel">{{lLabel}}</span>
    <img v-if="rImgState" src="../../img/next.png" class="next" />
    <span class="rLabel" :style="{'color':rLabelColor}">{{rLabel}}</span>
    <div v-if="type==='textarea'" class="textareaBox">
      <textarea v-model="textareaVal"  name="" id="" rows="5" :placeholder="textareaPlaceholder"></textarea>
    </div>
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

      }
    },
    components:{},
    computed:{
      lImgSrcState(){
        if(this.lImgSrc===''){
          return false
        }else{
          return true
        }
      },
      textareaVal:{
        get(){
          return this.textareaValue;
        },
        set(a){
          this.$emit('textareaVal',a)
        }
      }
    },
    props:{
      type:{
        type:String,
        default:''
      },
      textareaPlaceholder:{
        type:String,
        default:''
      },
      textareaValue:{
        type:String,
        default:''
      },
      lPadding:{                    // 右侧距离
        type:String,
        default:'0.3rem'
      },
      rPadding:{                    // 左侧距离
        type:String,
        default:'0.3rem'
      },
      rImgState:{                   // 是否显示next图片
        type:Boolean,
        default:true
      },
      bBorder:{                     // 是否显示下划线
        type:Boolean,
        default:true
      },
      lImgSrc:{                      //  左侧图片
        type:String,
        default:''
      },
      lLabel:{                       //  左侧label
        type:String,
        default:''
      },
      rLabel:{                       //  右侧label
        type:String,
        default:''
      },
      rLabelColor:{
        type:String,
        default:''
      }
    },
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
  .setCell{ width:100%;box-sizing: border-box; line-height: 1rem;background-color: white;}
  .setCell.bBorder{border-bottom: 1px solid #ededed;}

  .setCell .lImgSrc{width:0.4rem;height: 0.4rem;margin-right: 0.2rem;}
  .setCell .lLabel{font-size: 0.3rem;color:#333;}

  .setCell div{display: inline-block;vertical-align: middle;}
  .setCell span{display: inline-block;vertical-align: middle;}
  .setCell img{display: inline-block;vertical-align: middle;}

  .setCell .next{width:0.18rem;height: 0.29rem;float: right;margin-top:0.35rem;margin-left:0.17rem;}
  .setCell .rLabel{float: right;font-size: 0.3rem;color:#333;}

  .setCell .textareaBox{width:100%;display: block;}
  .setCell .textareaBox>textarea{width:100%;resize: none;font-size: 0.24rem;color:#666;}
</style>
