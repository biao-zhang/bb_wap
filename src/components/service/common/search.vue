<template>
  <div>
    <div class="search">
      <search
        :placeholder="placeholder"
        :results="results"
        v-model="value"
        auto-scroll-to-top
        @on-result-click="resultClick"
        @on-change="getResult"
        @on-cancel="onCancel"
        ref="search"
      > </search>
    </div>
    <!--搜索建议-->
    <div class="search_content">
      <div class="search_content_title" v-if="searchShow">您是不是想找：</div>
    </div>
    <!--历史纪录-->
    <div class="search_content" v-if="temp.length !== 0 && searchHisShow">
      <div class="search_content_name">
        <div class="histo">
          <div>历史记录：</div>
          <i @click="del" class="iconfont icon-lajitong"></i>
        </div>
        <div class="histo_pa">
          <div class="histo_item" v-for="item in temp" @click="itemClick(item)">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <!--历史记录（无）-->
    <div class="search_content" v-if="temp.length === 0 && permant">
      <div class="search_content_name">
        <div class="histo">
          <div>历史记录：</div>
          <i v-if="false" class="iconfont icon-lajitong"></i>
        </div>
        <div class="permant">暂无历史记录</div>
      </div>
    </div>

  </div>
</template>
<script>
  import { Search } from 'vux'
  import { searchGnList, searchB2CGoodsList } from '@/api/shop'
  import { searchByCatyName } from '@/api/service'

  export default {
    components: { Search },
    data() {
      return {
        results: [],  // 搜索列表
        value: '',    // 表单值
        permant: true,
        searchShow: false,
        searchHisShow: true,
        temp: [], // 临时存储搜索记录
        arrGoodsName: [], // 商品搜索记录
        arrServiceGoodsName: [], // 服务搜索记录
        res: '', // 输入框来源
        placeholder: '', // 输入框中的提示文字
        searchGnList: [],
        adcode: '',

      }
    },
    mounted() {

      /*this.$refs.search.setFocus()*/
      /*this.setFocus()*/

      this.adcode = localStorage.getItem('curCityAdcode')

      this.res = this.$route.query.resource

      if (this.res === 'shopIndex') {
        // 商城首页
        this.placeholder = '输入商品名称'

        this.temp = Array.from(new Set(JSON.parse(localStorage.getItem('arrGoodsName'))))  // 数组去重

      } else if (this.res === 'serviceIndex') {
        // 服务首页
        this.placeholder = '输入服务名称'

        this.temp = Array.from(new Set(JSON.parse(localStorage.getItem('arrServiceGoodsName'))))  // 数组去重

      } else {

        this.$store.state.toastText='参数错误'
        this.$store.state.toastType='text'
      }
    },
    methods: {
      /*setFocus () {
        this.$refs.search.setFocus()
      },*/
      // 清除搜索记录
      del() {
        this.temp = []
      },
      // 点击搜索记录进行搜索
      itemClick(val) {

        if (this.res === 'shopIndex') {

          this.$router.push({path: '/x/shopGoodsList', query: {goodsName: val.title}})

        } else if (this.res === 'serviceIndex') {

          if (val.type === 1) {

            this.$router.push({path: '/bb/runTo', query: {serveCatyId: val.serveCatyId}})

          } else if (val.type === 2) {

            this.$router.push({path: '/bb/housekeep', query: {serveCatyId: val.serveCatyId}})

          } else if (val.type === 3) {

            this.$router.push({path: '/bb/repair', query: {serveCatyId: val.serveCatyId}})

          } else if (val.type === 4) {

            this.$router.push({path: '/bb/driver', query: {serveCatyId: val.serveCatyId}})

          } else if (val.type === 5) {

            this.$router.push({path: '/bb/helper', query: {serveCatyId: val.serveCatyId}})

          } else if (val.type === 6) {

            this.$router.push({path: '/bb/commonweal', query: {serveCatyId: val.serveCatyId}})

          }

        }

      },
      // 取消
      onCancel() {
        this.$router.go(-1)
      },
      // 搜索结果
      resultClick(item) {

        if (this.res === 'shopIndex') {
          // 商城
          this.$router.push({path: '/x/shopGoodsList', query: {goodsName: item.title}})

          if (this.temp) {

            this.temp.push(item)

            localStorage.setItem('arrGoodsName', JSON.stringify(this.temp))

          } else {

            this.arrGoodsName.push(item)

            localStorage.setItem('arrGoodsName', JSON.stringify(this.arrGoodsName))

          }

        } else if (this.res === 'serviceIndex') {
          // 服务 type 1:跑腿帮 2:家政帮 3:维修帮 4:司机帮 5:找帮手 6:公益帮
          if (item.type === 1) {

            this.$router.push({path: '/bb/runTo', query: {serveCatyId: item.serveCatyId}})

          } else if (item.type === 2) {

            this.$router.push({path: '/bb/housekeep', query: {serveCatyId: item.serveCatyId}})

          } else if (item.type === 3) {

            this.$router.push({path: '/bb/repair', query: {serveCatyId: item.serveCatyId}})

          } else if (item.type === 4) {

            this.$router.push({path: '/bb/driver', query: {serveCatyId: item.serveCatyId}})

          } else if (item.type === 5) {

            this.$router.push({path: '/bb/helper', query: {serveCatyId: item.serveCatyId}})

          } else if (item.type === 6) {

            this.$router.push({path: '/bb/commonweal', query: {serveCatyId: item.serveCatyId}})

          }

          if (this.temp) {

            this.temp.push(item)

            localStorage.setItem('arrServiceGoodsName', JSON.stringify(this.temp))

          } else {

            this.arrGoodsName.push(item)

            localStorage.setItem('arrServiceGoodsName', JSON.stringify(this.arrServiceGoodsName))

          }

        }

      },
      // 表单值
      getResult(val) {

        console.log(val)
        this.searchShow = true
        this.searchHisShow = false
        this.permant = false

        if (this.res === 'shopIndex') {
          // 商城
          this._searchGnList()

        } else if (this.res === 'serviceIndex') {
          // 服务
          this._searchByCatyName()

        }

      },

      // 商品模糊查询
      _searchGnList() {
        searchGnList({
          adcode: this.adcode,
          goodsName: this.value,
        })
          .then( res => {

            // 防止后台给的数据为null
            if (res.data) {

              this.searchGnList = res.data
              this.results = getResultArr(this.searchGnList)

            }

            console.log('商品模糊查询', res)

          })
      },
      // 服务模糊查询
      _searchByCatyName() {
        searchByCatyName({
          scName: this.value,
        })
          .then( res => {

            // 防止后台给的数据为null
            if (res.data) {

              this.searchGnList = res.data
              this.results = getResultArrService(this.searchGnList)

            }

            console.log('服务模糊查询', res)

          })
      },
    }
  }
  // 商品
  function getResultArr(val) {
    let rs = []
    if (val) {
      for (let i = 0; i < val.length; i++) {
        rs.push({
          title: val[i],
        })
      }
    }

    return rs
  }
  // 服务
  function getResultArrService(val) {
    let rs = []
    if (val) {
      for (let i = 0; i < val.length; i++) {
        rs.push({
          title: val[i].serveCatyName,
          serveCatyId: val[i].serveCatyId,
          type: val[i].type
        })
      }
    }

    return rs
  }

</script>
<style scoped>
  .search{height: 44px;}
  .search >>> .weui-search-bar__cancel-btn {color: #f86e0e;}
  .search >>> .weui-search-bar__box .weui-search-bar__input { padding: 2px 0;}
  .search >>> .weui-cells.vux-search_show { margin-top: 45px !important;}
  .search >>> .weui-cells.vux-search_show .weui-cell:last-child { margin-bottom: 0}
  .search_content {
    padding: 0 0.20rem;
    font-size: 0.30rem;
    background-color: #f5f5f5;
  }
  .search_content_title {
    padding: 0.25rem 0.15rem;
  }
  .search_content_name {
    padding-left: 0.30rem;
    box-shadow: 1px 5px 5px #cccccc;
    background-color: #ffffff;
    border-radius: 5px;
  }
  .search_content_name_item {
    padding: 0.30rem 0;
  }
  .histo {
    display: flex;
    justify-content: space-between;
    font-size: 0.30rem;
    padding-right: 0.20rem;
    padding-top: 0.20rem;
  }
  .histo div {
    color: #f86e0e;
    margin-bottom: 0.45rem;
  }
  .histo_pa {
    display: flex;
    flex-wrap: wrap;
  }
  .histo_item {
    padding: 0.23rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.23rem;
    margin-right: 0.30rem;
    margin-bottom: 0.30rem;
    background-color: #fdb491;
  }

  .permant {
    padding: 0.20rem;
    color: #cccccc;
  }

</style>
