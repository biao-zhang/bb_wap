<template>
  <div class="shadow">

    <slot></slot>
  </div>
</template>
<script>
  export default {

    mounted(){

    }
  }
</script>
<style scoped>
  .shadow{margin:0.3rem 0.2rem;background-color:white;border-radius: 0.05rem;box-shadow: 2px 3px 10px #ccc;}

</style>
