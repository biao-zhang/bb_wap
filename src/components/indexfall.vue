<template>
  <div class="hello">
    <div class="lContent">
      <router-view></router-view>
      <!--<group>-->
      <!--<cell is-link title="Simple" link="/component/tabbar-simple"></cell>-->
      <!--<cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>-->
      <!--</group>-->
    </div>
  </div>
</template>
<script>
//this is 没有头部和底部
  export default {
    name: 'IndexFall',
    components:{},
    data () {
      return {
        
      }
    },
    mounted(){

    },
    methods:{

    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{height: 100%;background-color: #f5f5f5;}

  .lContent{width:100%;height: 100%;}

</style>
