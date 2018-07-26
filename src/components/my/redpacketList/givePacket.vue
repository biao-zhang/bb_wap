<template>
  <div class='givePacket'>
    <!--头部-->
    <x-header class="xheader"  :left-options="{backText:''}" :title="msg" :right-options="{showMore:false}">
      <a slot="right" ><a @click="toSendRed" class="titleRight">{{red}}</a></a>
    </x-header>
    <div style="height: 46px"></div>
    <div class="give_top">
      <div class="top_img">
        <img src="../img/tou_1.png" alt="">
      </div>
      <p>共发出<span>{{listLen}}</span>个红包</p>
      <!--time-->
      <div class="time" @click="changeTime=true">
        <p>{{selectYear}}</p>
        <img src="../img/red_bottom.png" alt="">
      </div>
    </div>
    <!--中部-->

    <div class="center" :style="{height:sliderHeight+'px'}">
      <pull-to :bottom-load-method="loadmore" :top-load-method="refresh">
        <router-link :to="{path:'/z/bonusDetails',query:{id:item.red_id}}" v-for="(item,index) in list" :key="index">
          <packet-list v-if="state" :datas="item"></packet-list>
        </router-link>
        <packet-empty v-if="!state"></packet-empty>
      </pull-to>
    </div>
    <time-select :show="changeTime" @getTime="getTime"></time-select>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import {XHeader} from 'vux'
  import packetEmpty from '@/components/my/redpacketList/common/packetEmpty'
  import packetList from '@/components/my/redpacketList/common/packetList'

  import timeSelect from "@/components/my/redpacketList/common/timeSelect"
  import { getMyRedSended,getRedIng } from '@/api/promotion'
  import PullTo from 'vue-pull-to'
  export default{
    data(){
      return{
        msg:'发出的红包',
        changeTime:false,     //选择时间
        state:true,
        selectYear:'2018',      //所选年份
        pageSize:10,
        pageNum:1,
        list:[],
        listLen:0,
        sliderHeight:0,      //滑动区域高度
      }
    },
    computed:{
      red(){
        if(this.state){
          return '发红包'
        }else{
          return ''
        }
      }
    },
    props:{

    },
    components:{XHeader,packetEmpty,packetList,timeSelect,PullTo},
    mounted(){
      //初始化已发红包列表
      this.init();
      setTimeout(()=>{
        this.sliderHeight = window.innerHeight-46-this.$store.state.fontSize*4.2;
      },20)
      console.log(this.$store.state.fontSize)
    },
    methods:{
      init(){
        let params = {
          pageSize:this.pageSize,
          pageNum:this.pageNum,
          year:this.selectYear,
        }
        console.log(params)
        getMyRedSended(params).then((res)=>{
          console.log(res,'已发红包列表')
          if(res.message == 'success'){
            this.list = res.data.list;
            this.listLen = res.data.num;
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          console.log(err)
          this.$store.commit('setToastText','获取列表数据失败')
          this.$store.commit('setToastType','warn')
        })
      },
      // 上拉加载
      loadmore(loaded) {
        this.pageNum ++
        setTimeout(() => this.getMyRedList(loaded, 'loaded'), 1000)
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1
        setTimeout(() => this.getMyRedList(loaded, 'refresh'), 1000)
      },
      getMyRedList(loaded,type){
        let params = {
          pageSize:this.pageSize,
          pageNum:this.pageNum,
          year:this.selectYear,
        }
        console.log(params)
        getMyRedSended(params).then((res)=>{
          console.log(res,'已发红包列表')
          if(res.message == 'success'){
            if (loaded) {
              if (type === 'refresh') this.list = [];  // 下拉刷新只显示第一页数据
              this.list =  this.list.concat(res.data.list);
              loaded('done');
            }  else {
              // 页面第一次加载的数据
              this.list = res.data.list;
            }
            this.listLen = res.data.num;
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          console.log(err)
          this.$store.commit('setToastText','获取列表数据失败')
          this.$store.commit('setToastType','warn')
        })
      },
      //去发放红包
      toSendRed(){
        getRedIng().then((res)=>{
          console.log(res)
          let that = this;
          if(res.message == 'success'){
            this.$vux.confirm.show({
              title: '',
              content: '<span style="font-size: 0.26rem;display: inline-block;margin-bottom:0.2rem;color:#333;">您当前有一个正在发放的红包，</span><br><span style="font-size: 0.26rem;color:#333;">是否继续进行？</span>',
              confirmText:'继续',
              onConfirm () {
                that.$router.push({path:'/'})
              }
            })
          }else{
            this.$router.push({path:'/z/giveBonus'})
          }
        }).catch((err)=>{
          this.$store.commit('setToastText','服务器错误')
          this.$store.commit('setToastType','warn')
        })
      },
//      时间
      getTime(q){
        this.changeTime=false;
        if(q===0){
          console.log("取消")
        }else if(q===1){
          this.selectYear = '2018'
        }else if(q===2){
          this.selectYear = '2017'
        }else if(q===3){
          this.selectYear = '2016'
        }else if(q===4){
          this.selectYear = '2015'
        }else if(q===5){
          this.selectYear = '2014'
        }else{

        }
        this.list = [];
        this.listLen = 0;
        this.init()
      }
    },
  }
</script>
<style scoped>
  .xheader{width:100%;background-color: white;position: fixed}

  .givePacket >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
  .givePacket >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
  .vux-header .vux-header-right a .titleRight{font-size: 0.28rem;color:#f86e0e}
  .givePacket{height:100%;background:#fff;overflow: hidden;}
  /*头部*/
  .give_top{position:relative;height:4rem;z-index:1;background:url("../img/give_red_bg.png") no-repeat;background-size:100% 100%;margin:0.2rem 0.2rem 0 0.2rem;overflow:hidden;}

  .give_top>p{text-align:center;line-height:1.6rem;font-size:0.3rem;color:#fff;}
  .give_top>p>span{font-size:0.6rem;}
  .top_img{margin:0.55rem auto 0;width:1.2rem;height:1.2rem;}
  .top_img img{width:100%;height:100%;border-radius:50%;}
  .center{padding:0 0.2rem;}
  /*time*/
  .time{position:absolute;top:0.5rem;right:0.4rem;text-align:center;}
  .time p{text-align:center;font-size:0.3rem;color: rgba(255, 255, 255, 0.6)}
  .time img{width:0.35rem;height:0.14rem;}
</style>
