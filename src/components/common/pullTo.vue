<template>
  <div class="hello" style="width:100%;height: 100%;overflow: hidden;box-sizing: border-box;" :style="{'backgroundColor':bgColor}">
    <pull-to :top-load-method="refresh" :is-throttle="false" :top-config="topConfig" :bottom-config="bottomConfig" @top-state-change="topChangeState" :bottom-load-method="load" @bottom-state-change="bottomChangeState" >
      <!--<template slot="top-block" slot-scope="props">{{ props.stateText }}</template>-->
      <slot></slot>
      <div class="loading-bar" >{{loadingBar}}</div>
    </pull-to>
  </div>
</template>

<script>
  import PullTo from 'vue-pull-to'
  import { mapState,mapMutations } from 'vuex'

  export default {
    components: {PullTo},
    data(){
      return{
        pageLoadF:function () {},
      }
    },
    computed:{
      ...mapState('page',[
        'loadingBar',
        'topConfig',
        'bottomConfig',
      ]),
      s:{
        get(){
          return this.state;
        },
        set(a){

        }
      }
    },
    props:{
      bgColor:{
        type:String,
        default:'#ccc'
      },
      state:{
        type:String,
        default:'a'
      },
    },
    watch:{
      s:{
        handler(n,o){
          console.log(n)
          this.pageLoadF(n)

        },
        deep:true
      }
    },
    mounted(){
//      console.log(navigator)
    },
    methods: {
      //    mapMutations
      ...mapMutations('page',[
        'bottomChangeState',    //bottom文字
        'topChangeState',         //top文字
        'theEnd'         //top文字
      ]),
      refresh(a){
        this.pageLoadF=a;
        this.$emit('refresh')
      },
      load(a){
        this.pageLoadF=a;
        this.$emit('load')
      }
    }
  }
</script>
<style scope>
  .hello{}
  .scroll-container{min-height: 100%;}
  .loading-bar{line-height: 50px;text-align: center;}

</style>
