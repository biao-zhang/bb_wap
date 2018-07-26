<template>
  <div class="bluetoothadsum">
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--列表-->
    <red-one v-if="state" v-for="(item,index) in 2" :key="index"></red-one>
    <!--空-->
    <bluetooth-null v-if="!state"></bluetooth-null>
  </div>
</template>
<script>
  import xHeader from '@/components/nearby/common/xHeader'

  import redOne from '@/components/nearby/setbluetooth/setbluetoothmodule/redOne'
  import bluetoothNull from '@/components/nearby/setbluetooth/setbluetoothmodule/bluetoothNull'
  export default {
    data(){
      return{
        top:"搜索蓝牙红包",
        state:true
      }
    },
    components:{xHeader,redOne,bluetoothNull},
  }
</script>
<style scoped>
  .bluetoothadsum{height:100%;padding-top:46px;box-sizing: border-box;}
</style>
