<template>
  <div class="refundList">
    <!--xHeader-->
    <div class="header">
      <x-header :msg="titleText"></x-header>
    </div>
    <div class="content">
      <pull-to
        :bottom-load-method="loadmore"
        :top-load-method="refresh"
      >
        <div v-for="(item,index) in pullToDatas" :key="index">
          <refund-list-item @reMoney="reMoney" :item-children="item"> </refund-list-item>
        </div>
      </pull-to>
    </div>
  </div>
</template>
<script>
  import xHeader from '@/components/shop/common/xHeader'
  import refundListItem from '@/components/shop/refund/components/refundListItem'
  import { selectByUserId } from "@/api/personally"
  import PullTo from 'vue-pull-to'

  export default {
    data(){
      return{
        titleText:'退款',    //headerTitle

        pullToDatas: [],
        pageNum: 1,
        pageSize: 3,

      }
    },
    components:{xHeader,refundListItem,PullTo},
    mounted() {
      // 初始化列表
      this._selectByUserId()
    },
    methods: {
      // 上拉加载
      loadmore(loaded) {
        this.pageNum ++
        setTimeout(() => this._selectByUserId(loaded, 'loaded'), 1000)
      },
      // 下拉刷新
      refresh(loaded) {
        this.pageNum = 1
        setTimeout(() => this._selectByUserId(loaded, 'refresh'), 1000)
      },

      _selectByUserId( loaded, type ) {
        selectByUserId({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
          .then( res => {

            console.log('b2c退款列表', res)

            this.pullToDatas = res.data

            if (loaded) {

              if (type === 'refresh') this.pullToDatas = []  // 下拉刷新只显示第一页数据

              this.pullToDatas =  this.pullToDatas.concat(res.data);

              loaded('done');

              console.log('this.pullToDatas', this.pullToDatas)

            }  else {

              // 页面第一次加载的数据
              this.pullToDatas = []
              this.pullToDatas =  this.pullToDatas.concat(res.data);

            }

          })
      },
      reMoney() {
        this._selectByUserId()
      }
    }
  }
</script>
<style scoped>
  .refundList{width:100%;height: 100%;}

  .content{margin-top:46px;padding-top:0.1rem;}


</style>
