<template>
  <div>
    <div style="width:100px;height: 100px">
      <popup-radio title="options" :options="options1" v-model="option1"></popup-radio>
    </div>
  </div>
</template>
<script>
  import { PopupRadio } from 'vux'
  export default {
    data(){
      return{
        option1: 'A',
        options1: ['A', 'B', 'C'],
      }
    },
    components:{PopupRadio},
  }
</script>
