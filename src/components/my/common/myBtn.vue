<template>
  <div class='myBtn'>
    <div class="back">{{ btnText }}</div>
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
    props:{
      btnText: {
        type: String
      }
    },
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
  .myBtn {
    padding: 0 0.4rem;
    margin-bottom: 0.40rem;
  }
  .back {
    width: 100%;
    height: 0.80rem;
    color: #fff;
    border-radius: 0.05rem;
    text-align: center;
    line-height: 0.80rem;
    font-size: 0.32rem;
    background-color: #f86e0e;
  }
</style>
