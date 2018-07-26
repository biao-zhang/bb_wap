<template>
  <div class="swiperPoint">
    <swiper dots-position="center" :show-dots=true>
      <swiper-item>
        <div class="itemBox">
          <div class="item" v-for="(item,index) in classify">
            <router-link :to="getCurItem(item).url">
              <img :src="getCurItem(item).img">
              <p>{{item.serveCatyName}}</p>
            </router-link>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import {Swiper,SwiperItem} from 'vux'
  import { serviceClassify } from '@/api/service'

  export default {
    data(){
      return{
        classify:[],
        arr:[
          {name:'跑腿帮',url:'/bb/runTo',img:require('./img/paotui.png')},
          {name:'家政帮',url:'/bb/housekeep',img:require('./img/jiazheng.png')},
          {name:'维修帮',url:'/bb/repair',img:require('./img/weixiu.png')},
          {name:'司机帮',url:'/bb/driver',img:require('./img/siji.png')},
          {name:'公益帮',url:'/bb/commonweal',img:require('./img/gongyi.png')},
          {name:'找帮手',url:'/bb/helper',img:require('./img/zhaobangshou.png')},
        ]
      }
    },
    components:{Swiper,SwiperItem},
    mounted(){
      this.getClassify()
    },
    methods:{
      getCurItem(params){
        let i = {}
        for(let a = 0;a<this.arr.length;a++){
          if(this.arr[a].name==params.serveCatyName){
            i = this.arr[a];
            break;
          }else{

          }
        }
        return i;
      },
      //获取服务二级分类
      getClassify(){
        serviceClassify().then((res)=>{
          console.log(res,'serviceClassify')
          this.classify=[];
          if(res.message=='success'){
            this.classify = res.data;
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          console.log(err,'获取服务分类失败')
          this.$store.commit('setToastText','获取服务分类失败!')
          this.$store.commit('setToastType','warn')
        })
      },
    }
  }

</script>
<style scoped>
.swiperPoint{width:100%;height: 3.6rem;}
  .swiperPoint .itemBox{width:100%;height: 100%;display: flex;flex-wrap:wrap;}
  .swiperPoint .itemBox .item{width:33.33%;}
  .swiperPoint .itemBox .item img{width:0.8rem;display: block;margin:0 auto}
  .swiperPoint .itemBox .item p{text-align: center;font-size: 0.3rem;color:#3c3c3c;margin:0.2rem 0;}
</style>
