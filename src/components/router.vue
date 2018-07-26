<template>
  <div class='router'>
    <span>lml  <span @click="show">show</span><span @click="hide">hide</span></span>
    <lml></lml>
    <span>zb</span>
    <zb></zb>
    <span>lyb</span>
    <lyb></lyb>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  import lml from '@/components/lml'
  import zb from '@/components/zb'
  import lyb from '@/components/lyb'
  export default{
    data(){
      return{

      }
    },
    components:{lml,zb,lyb},
    props:{

    },
    mounted(){

    },
    methods:{
      show(){
        // 显示
        this.$vux.loading.show()
        var that = this;
        setTimeout(function () {
          that.$vux.loading.hide()
        },2000)
      },
      hide(){
        // 隐藏
        this.$vux.loading.hide()
      },
     }
  }
</script>
<style scoped>
.router{  }

  .router div{text-decoration: underline;line-height: 0.4rem;text-align: center;}
  span{color:red}
</style>
