<template>
  <div id="app">
    <router-view/>
    <loading :show="loadingState" :text='loadingText'></loading>
    <toast  :type="toastType" width="auto" :text="'<div style=\'min-width:7.6em;font-size:18px;color:white;\'>'+toastText+'</div>'" v-model="toastState" @on-hide="toastHide"></toast>
  </div>
</template>

<script>
import { Loading,Toast } from 'vux'
export default {
  name: 'app',
  components:{Loading,Toast},
  data(){
    return {

    }
  },
  computed:{
    loadingState(){
      return this.$store.state.loading;
    },
    loadingText(){
      return this.$store.state.loadingText;
    },
    toastText(){
      return this.$store.state.toastText;
    },
    toastType(){
      return this.$store.state.toastType;
    },
    toastState:{
      get(){
        return this.$store.state.toastState;
      },
      set(){

      }
    }
  },
  watch:{
    toastText:{
      handler(n,o){
        if(n!==''){
          this.$store.commit('changeToastState',true);
        }
      },
      deep:true
    },
    loadingState:{
      handler(n,o){
        if(n==false){
          this.$store.commit('setLoadingText','加载中...');
        }
      },
      deep:true
    }
  },
  mounted(){
    setTimeout(()=>{
      let fontSize = document.getElementsByTagName('html')[0].style.fontSize;
      this.$store.commit('setFontSize',fontSize.substring(0,fontSize.length-2));
    },20)
  },
  methods:{
    toastHide(){
      this.$store.commit('changeToastState',false);
      this.$store.state.toastText='';
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
  height: 100%; /*注释1*/
}
  #app .weui-toast{
    /* width:12em; */
    /* min-height: 10em; */
  }
</style>
