<template>
  <div class="maskBox" v-on:click="cloPicker"><div class="box"><slot ></slot></div></div>
</template>
<script>
  export default {
    methods:{
      cloPicker(){
        this.$emit('cloMask2','close')
        console.log("clo")
      },
    }
  }

</script>
<style scoped>
  .maskBox{width:100%;height: 100%;background-color: rgba(0,0,0,0.5);position: fixed;top:0;left: 0;z-index: 80;}
  .maskBox .box{width:100%;height: 100%}


</style>
