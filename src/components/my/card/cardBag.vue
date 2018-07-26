<template>
  <div class='cardBag'>
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--包-->
    <div class="bag">
      <bag></bag>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from '@/components/my/common/xHeader'
  import bag from '@/components/my/card/common/bag'
  export default{
    data(){
      return{
        top:"卡包",
      }
    },
    props:{

    },
    components:{xHeader,bag},
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
  .bag{padding:46px 0.22rem 0;}
</style>
