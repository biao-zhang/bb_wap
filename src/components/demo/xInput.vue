<template>
  <div>
   <group>
     <x-input v-model="data" type="text" :required="true" is-type="email" title="input1" placeholder="" :show-clear="true" :min="1" :max="5" :disabled="true" :readonly="false"></x-input>
     <x-input v-model="data" type="text" @on-change="a()" :debounce="1000" text-align='right' :should-toast-error="true"></x-input>
     <br>
     <br>
     <x-number :title="'title'" v-model="value" :min="1" :max="8"  :step="1" :fillable="true" button-style="round" align="right"></x-number>
     <br>
     <br>
     <datetime title="时&emsp;&emsp;&nbsp;间" v-model="time1" value-text-align="right" format="YYYY-MM-DD HH:mm" @on-change="datetimeChange"></datetime>
     <br>
     <br>
     <selector title="隐患类别" :options="['苹果','橘子']"  @on-change="selectorChange"></selector>
     <br>
     <br>
     <x-address title="地址选择"  raw-value :list="ChinaAddressData" value-text-align="right" @on-hide="addressChange"></x-address>
     <br>
     <br>
     <inline-x-number :min="1" :max="5" button-style="round" ></inline-x-number>
     <br>
     <br>
     <x-textarea title="textarea" inline-desc="限制字数" :max="20" placeholder="null" :rows="3" :cols="3" @on-change="textareaChange"></x-textarea>
     <br>
     <br>
     <x-switch title="选择" :disabled="false" @on-change="switchChange"></x-switch>
   </group>
  </div>
</template>
<script>
  import { Group, Cell, XInput, XNumber,Datetime,Selector,XAddress,ChinaAddressData,InlineXNumber,XTextarea,XSwitch    } from 'vux'
  export default {
    components:{Group, Cell, XInput,XNumber,Datetime,Selector,XAddress,ChinaAddressData,InlineXNumber,XTextarea,XSwitch   },
    data(){
      return{
        msg:'shop',
        data:'value',
        value:5,
        time1:'1',
        value2:"option0",
        ChinaAddressData:ChinaAddressData
      }
    },
    mounted(){
      console.log(ChinaAddressData)
    },
    methods:{
      a(){
        console.log("change")
      },
      datetimeChange(date){
        console.log("datetimeChange"+date)
      },
      selectorChange(a){
        console.log("selectorChange"+a)
      },
      addressChange(B){
        console.log("addressChange"+B)
      },
      textareaChange(textarea){
        console.log(textarea)
      },
      switchChange(cur){
        console.log(cur)
      }
    }
  }
</script>
