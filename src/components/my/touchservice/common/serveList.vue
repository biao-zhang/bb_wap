<template>
  <div class='serveList'>
        <div>
          <router-link :to="{path:'/y/familiarProblem',query:{problemId:datas.id}}">
            {{datas.name}}
          </router-link>
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
    props:{
      datas:{
        type:Object
      }
    },
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
    .serveList{width:3.30rem;height:2rem;text-align:center;border:1px solid #cccccc;border-radius:0.1rem;background:#fff;margin-bottom:0.3rem;}
    .serveList div{width:100%;line-height:2rem;color: #333333;font-size:0.3rem;}
    .serveList div a{display:block;}
</style>
