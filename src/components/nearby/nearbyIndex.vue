<template>
  <div style="padding:100px 0 0 0 " >
    <div class="hello" style="width:100%;height:380px;">
      <pull-to :bgColor="pullToBgColor" :state="pullToState" @refresh="refresh" @load="load">
        <div class="pageboxContainer">
          <ul class="pullUl" v-for="(data,index) in pullToDatas">
            <li class="pullLi" v-for="(item,index) in data">{{item.goodsName}}</li>
          </ul>
        </div>
      </pull-to>
    </div>
  </div>
</template>

<script>

  import  pullTo from '@/components/common/pullTo'
  export default {
    components: {pullTo},
    data(){
      return{
        pullToBgColor:'#666',
        pagenum:1,
        pagesize:20,
        pullToState:'pull',   //pullTo状态
        pullToDatas:[]    //列表数据
      }
    },
    computed:{

    },
    mounted(){
      //改变bottomIndex
      this.$store.commit('getBottomIndex',2)

      this.getData(1,this.pagesize,1)
    },
    methods: {
//      获取数据
      getData(pagenum,pagesize,pageState){     //pageState 1：refresh，2：load
        this.axios.post("/shop/api/goodsB2C/searchB2CGoodsList",this.qs.stringify({token:'123456',pageNum:pagenum,pageSize:pagesize,adcode:'410103'}))
          .then((response) => {
          console.log('1')
            if(response.data.data.length!=0){
              if(pageState===1) this.pullToDatas = [];      //刷新时清空数据，仅仅加载第一页的数据
              this.pullToDatas.push(response.data.data);
              this.changePullToState(0)
            }else{
              this.changePullToState(1)
            }
          })
          .catch((err) => {
            this.changePullToState(2)
          })
      },
//    改变状态
      changePullToState(a){
        if(a==0){
          this.pullToState='done'
          setTimeout(()=>{
            this.pullToState='pull'
          },1000)
        }else if(a==1){
          this.pullToState='done'
          setTimeout(()=>{
            this.pullToState='pull'
          },1000)
        }else if(a==2){
          this.pullToState='done'
          setTimeout(()=>{
            this.pullToState='pull'
          },1000)
        }else{}
      },
//      下拉刷新
      refresh() {
        this.pagenum=1;
        setTimeout(()=>{
          this.getData(1,this.pagesize,1)
        },2000)
      },
//      上拉加载更多
      load(){
        this.pagenum++;
        setTimeout(()=>{
          this.getData(this.pagenum,this.pagesize,2)
        },2000)
      },
    }
  }
</script>
<style scope>
  .hello{}
  .scroll-container{min-height: 100%;}
  .loading-bar{line-height: 50px;text-align: center;}
  .pageboxContainer{min-height: 100%;}
  .pullUl{width:100%;height: 100%;display: inline-block;}
  .pullLi{line-height: 130px;display:block;text-align: center}
</style>
