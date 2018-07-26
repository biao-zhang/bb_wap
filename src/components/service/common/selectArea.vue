<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{msg}}</x-header>
    </div>
    <div class="selectArea_content">
      <div class="area_img">
        <div class="area_two">
          <div class="area_dw">
            <i class="iconfont icon-dingwei"></i>
            <span>{{curCityName}}</span>
          </div>
          <div class="area_tips" v-if="state">
            <span>当前定位地区还没有开通服务</span>
            <span>抱歉给您带来不便</span>
          </div>
        </div>
      </div>
      <div class="area_info">
        <div class="info_title">已有地区：</div>
        <div class="info_city">
          <div class="info_city_list" v-for="(item,index) in DistrictLists" @click="selectArea(index,item.adcode,item.localName)" onclick="history.back()">
            <span v-if="item.localName == null">123</span>
            <span v-if="item.localName != null">{{ item.localName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { XHeader } from 'vux'
  import { searchRegion } from "@/api/shop"
  export default {
    components: {XHeader},
    data() {
      return {
        msg: '选择地区',
        curCityName:'',
        adcode:'',
        state:false
      }
    },
    computed:{
      DistrictLists(){
        return this.$store.state.shop.DistrictList;
      }
    },
    mounted(){
      this.adcode = localStorage.getItem('curFirstCityAdcode');
      this.curCityName = localStorage.getItem('curFirstCityName');
      //收藏商品
      searchRegion({adcode:this.adcode}).then( res => {
        console.log('判断运营总新结果', res)
        if(res.result == 1){
          this.state = false
        }else {
          this.state = true
        }
      })

      this.$store.dispatch({
        type:'shop/getDistrictList',
      })


    },
    methods: {
      selectArea(index,adcode,localName) {
        console.log(localName);
        localStorage.setItem('curCityAdcode', adcode);
        localStorage.setItem('curCityName', localName);
        this.$store.dispatch({
          type:'shop/getIndexDatas',
          adcode:localStorage.getItem('curCityAdcode')
        })
        this.$router.push({path: '/shop/shopIndex'})
      }
    }
  }
</script>
<style scoped>
  .vux-header { background: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .selectArea_content { padding: 0.20rem 0.20rem 0 0.20rem;background:#f5f5f5;}
  .area_img {
    width: 7.1rem;
    height: 2.6rem;
    display: flex;
    align-items: center;
    background-image: url("../img/area_img.png");
    background-size: 100% 100%;
  }
  .area_two {
    margin-left: 0.20rem;
  }
  .area_dw {
    font-size: 0.34rem;
  }
  .area_dw i {
    color: #f86e0e;
  }
  .area_tips {
    margin-top: 0.40rem;
    font-size: 0.24rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #666666;
  }
  .info_title {
    padding: 0.35rem 0;
    font-size: 0.35rem;
    color: #a4a4a4;
  }
  .info_city {
    padding: 0 0.30rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .info_city_list {
    width: 1.60rem;
    height: 0.75rem;
    box-shadow: 1px 5px 5px #ccc;
    text-align: center;
    line-height: 0.75rem;
    font-size: 0.35rem;
    margin-bottom: 0.50rem;
    margin-right: 0.20rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
