<template>
  <div class='confirm'>

      <confirm v-model="s"
               :title="title"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
      >
        <p style="text-align:center;" v-if="number===NaN">{{msg}}</p>
        <input type="number" style="text-align: center;border:1px solid #ccc;line-height: 0.5rem;" v-model="num" v-if="number!=NaN" v-number-only autofocus="autofocus">
      </confirm>

  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  import { Confirm } from 'vux'
  export default{
    data(){
      return{
        _num:'',
      }
    },
    components:{Confirm},
    computed:{
      s:{
        get(){
          return this.state;
        },
        set(a){

        }
      },
      num:{
        get(){
          return this.number
        },
        set(a){
          this._num=parseInt(a)
        }
      }
    },
    props:{
      number:{
        type:Number,
        default:NaN
      },
      state:{
        type:Boolean,
        default:true
      },
      title:{
        type:String,
        default:'标题'
      },
      msg:{
        type:String,
        default:'msg'
      }
    },
    directives: {
      numberOnly: {
        bind: function(el) {
          el.handler = function() {
            var formatVal = /^\+?[1-9][0-9]*$/;
            var val = el.value;
            if(!formatVal.test(val)){
              var reg = new RegExp(val,'g');
              el.value = val.replace(reg, parseInt(el.value));
            }
          }
          el.addEventListener('input', el.handler)
        },
        unbind: function(el) {
          el.removeEventListener('input', el.handler)
        }
      }
    },
    mounted(){
      setTimeout(()=>{
        this._num = this.number;
      },20)
    },
    methods:{
      onCancel(){
        this.$emit('cancel')
      },
      onConfirm(a){
        console.log(this._num)
        if(this.number!=NaN){
          this.$emit('confirm',this._num)
        }else{
          this.$emit('confirm','')
        }

      }
    },
  }
</script>
<style scoped>
.confirm{  }
</style>
