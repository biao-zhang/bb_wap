<template>
  <div class="shopIndex">
    <!--购物车链接-->
    <div
      class="cartLink"
      ref="cartLink"
    >
      <router-link :to="{path: '/x/shoppingCart'}"><img src="./img/cart.png" /></router-link>
    </div>
    <!--header-->
    <div class="header">
      <img class="logo" src="./img/name1.png"/>
      <router-link :to="{path: '/z/selectArea'}">
        <span class="dizhi">{{city}}</span>
        <img class="xiangxia" src="./img/xiangxia.png"/>
      </router-link>
      <router-link :to="{path: '/z/search', query: {resource: 'shopIndex'}}"><span class="sousuo">搜索商品</span></router-link>
    </div>
    <!--slider-->
    <div class="index-wraper">
    <div class="sliderBox">
      <swiper loop auto  height="4.5rem" :index="demo07_index" :show-dots="true" dots-position="center" @on-index-change="demo07_onIndexChange">
        <swiper-item v-if="indexLength > 0" v-for="(item,index) in IndexDatas.logoImgVOList" :key="index" >
          <img style="width:100%;height: 100%;" :src='item.advertisement_type' @click="carousel(item.activity_type,item.advlinks,item.categoryId,item.categoryName)">
        </swiper-item>
        <swiper-item v-if="indexLength == 0">
          <img style="width:100%;height: 100%;" src="https://img.oxnice.com/indexImg/banner.jpg">
        </swiper-item>
        <!--<swiper-item><img style="width:100%;height: 100%;" src="./img/2018.png"></swiper-item>-->
        <!--<swiper-item><img style="width:100%;height: 100%;" src="./img/2018.png"></swiper-item>-->
      </swiper>
    </div>
    <!--一级菜单-->
    <div class="indexNav">
      <index-nav v-for="(item,index) in IndexDatas.goodsCategoryVOList" :key="index" :index="index" :datas="item"></index-nav>
      <div class="indexNavitem">
        <router-link :to="{path:'/x/classify'}">
          <div class="indexNavImgBox"><img src="./img/more.png" class="img"> </div>
          <p class="titBox">更多</p>
        </router-link>
      </div>
    </div>
    <!--marquee-->
    <!--<div class="marquee">-->
      <!--<img class="marqueeImg" src="./img/notice.png"/>-->
      <!--<div class="marqueeItemBox">-->
        <!--<marquee>-->
          <!--<marquee-item v-for="(item,index) in IndexDatas.advertApiVOList" :key="index" @click.native="onClick(index)" class="marqueeClass">{{item.advname}}<img class="imgNext" src="./img/next.png"/> </marquee-item>-->
        <!--</marquee>-->
      <!--</div>-->
    <!--</div>-->
    <!--广告-->
    <div class="imgAdvBox" >
      <router-link  :to="{path:'/z/getCoupons'}">
        <img v-for="(item,index) in IndexDatas.b2cBannerSettingVOList" v-if="index==0 && item != null" class="imgAdv" @click="indexAdv" :src='item.bannerImgUrl'/>
        <img v-for="(item,index) in IndexDatas.b2cBannerSettingVOList" v-if="index==0 && item == null" class="imgAdv" src="./img/kong.png" alt="">
      </router-link>
    </div>
    <!--促销活动-->
    <div class="activity">
      <floor-tit>促销活动</floor-tit>
      <index-activity v-if="Object.keys(IndexDatas).length != 0" :datas="IndexDatas"></index-activity>
    </div>
    <!--优质商品-->
    <div class="quality">
      <floor-tit>优质商品</floor-tit>
      <index-quality :datas="IndexDatas.advertisingListVOList"></index-quality>
    </div>
    <!--为您推荐-->
    <div class="groom">
      <floor-tit>为您推荐</floor-tit>
      <div class="groomBox">
        <index-groom-item v-for="(item,index) in IndexDatas.priorityGoodsVOListT" :key="index" :datas="item"></index-groom-item>
      </div>
    </div>  
    </div>
    <!--地图-->
    <div id='websocketMap' style="height:200px;display:none;"></div>
  </div>
</template>
<script>
import { Swiper, SwiperItem, Marquee, MarqueeItem } from "vux";
import indexNav from "@/components/shop/common/indexNav";
import floorTit from "@/components/common/floorTit";
import indexActivity from "@/components/shop/common/indexActivity";
import indexQuality from "@/components/shop/common/indexQuality";
import indexGroomItem from "@/components/shop/common/indexGroomItem";
import { setStore, getStore } from "@/untils/storage";
import { wxloginJsp } from '@/api/personally'

export default {
  data() {
    return {
      demo07_index: 0,
      location: "",
      adcode: "", //定位adcode
      city: "", //定位城市
      map: {}
    };
  },
  beforeCreate() {
    this.$store.commit("setLoading", true);
  },
  components: {
    Swiper,
    SwiperItem,
    Marquee,
    MarqueeItem,
    indexNav,
    floorTit,
    indexActivity,
    indexQuality,
    indexGroomItem
  },
  computed: {
    //判断
    judgeDatas() {
      return this.$store.state.shop.judgeData;
    },
    //首页
    IndexDatas() {
      let indexDatas = this.$store.state.shop.IndexData;
      this.$store.commit("setLoading", false);
      //        console.log(this.$store.state.shop.IndexData)
      return indexDatas;
    },
    indexLength() {
      let newP  = this.IndexDatas.logoImgVOList
      return newP ? newP.length : 0
    }
  },
  mounted() {
    // if(getStore("curCityAdcode")){
    //  this.getIndexDatas();
    // }
    // else{
    // this.city = '二七区';
    // this.adcode = '410103';
    // setStore('curCityAdcode',this.adcode);
    // setStore('curCityName',this.city);
    // }

    //改变bottomIndex
    this.$store.commit('getBottomIndex',1)

    if (getStore("curCityAdcode")) {
      this.city = getStore("curCityName");
      this.adcode = getStore("curCityAdcode");

      this.getIndexDatas();
    } else {
      this.getLngLat();
    }

    // 判断是否是微信浏览器
    this.isWeiXin() ? this._wxloginJsp() : null

  },
  methods: {
    isWeiXin() {
      console.log('用户代理', navigator)
      let ua = navigator.userAgent.toLowerCase();
      return ua.match(/MicroMessenger/i)=="micromessenger"
    },
    _wxloginJsp() {
      wxloginJsp().then( res => {
        if(res.data) {
          window.location = res.data
        }
      })
    },
    demo07_onIndexChange(index) {
      this.demo07_index = index;
    },
    onClick(index) {
      console.log(index);
    },
    indexAdv() {
      console.log("indexAdv");
    },
    //解析定位结果
    onComplete(data) {
      this.location = data.position.getLng() + "," + data.position.getLat();
      var that = this;
      this.axios
        .post(
          "https://restapi.amap.com/v3/geocode/regeo",
          this.qs.stringify({
            key: "2cd4e4bfbe967908a8b8be4592c1d485",
            location: that.location
          })
        )
        .then(function(response) {
          let datas = response.data;
          if (datas.regeocode.addressComponent.city.length === 0) {
            //解析失败
            that.city = datas.regeocode.addressComponent.province;
          } else {
            that.city = datas.regeocode.addressComponent.district; //定位城市
            that.adcode = datas.regeocode.addressComponent.adcode;
            setStore("curCityAdcode", that.adcode);
            setStore("curCityName", that.city);
            //定位城市和adcode
            setStore("curFirstCityAdcode", that.adcode);
            setStore("curFirstCityName", that.city);
            that.getIndexDatas();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getIndexDatas() {
      //调起首页接口
      this.$store.dispatch({
        type: "shop/getIndexDatas",
        adcode: this.adcode
      });
      //调起判断接口
      this.$store.dispatch({ type: "shop/getJudge", adcode: this.adcode });
    },
    onError(data) {
      // console.log("定位失败!");
      this.$store.commit('setToastText','定位失败')
      this.$store.commit('setToastType','warn')
      setStore("curCityAdcode", '410103');
      setStore("curCityName", '二七区');
        setStore("curFirstCityAdcode", '410103');
      setStore("curFirstCityName", '二七区');
      this.city = '二七区';
        this.getIndexDatas();
    },
    // 获取经纬度
    getLngLat() {
      var map, geolocation;
      var that = this;
      //加载地图，调用浏览器定位服务
      map = new AMap.Map("container", {
        resizeEnable: true
      });
      map.plugin("AMap.Geolocation", function() {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: "RB"
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", that.onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", that.onError); //返回定位出错信息
      });
    },
//    点击轮播图

    carousel(a,b,c,d){
      var that = this
      console.log(a)
      console.log(b)
      console.log(c)
      if(a != '' && a != null && a != 0 && a != '0'){
        if(a == 1){
          that.$router.push({path:'/x/seckill',query:{seckillPageTitle:'秒杀'}})
        }else if(a == 2){
          that.$router.push({path:'/x/seckill',query:{seckillPageTitle:'生鲜'}})
        }else if(a == 4){
          that.$router.push({path:'/y/newArrivals'})
        }
      }else if(b != '' && b != null) {
        console.log(b)
      }else if(c != '' && c != null){
        that.$router.push({path:'/x/shopGoodsList',query:{shopGoodsListTitle:d,categoryId:c}})
      }
    }
  },
  updated() {


  }
};
</script>
<style scoped>
.index-wraper{
  height: 100%;
  
    padding-top: 1rem;
}
.sliderBox >>> .vux-slider > .vux-indicator > a > .vux-icon-dot {
  background-color: white;
}
.sliderBox >>> .vux-slider > .vux-indicator > a > .vux-icon-dot.active {
  background-color: black;
}

.shopIndex {
  background-color: #f5f5f5;
  padding-bottom: 1.05rem;
}
.shopIndex .header {
  
  height: 0.6rem;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  padding: 0.2rem 0;
  background-color: #f86e0e;
}

.header .logo {
  width: 0.44rem;
  height: 0.44rem;
  margin-left: 0.18rem;
  vertical-align: middle;
}
.header a{display:inline-block;}
.header .dizhi {
  width: 1rem;
  line-height: 0.44rem;
  font-size: 0.3rem;
  color: #f4f4f4;
  margin-left: 0.12rem;
  vertical-align: middle;
  overflow: hidden;
  display:inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header .xiangxia {
  width: 0.23rem;
}
.header .sousuo {
  display: inline-block;
  width: 4.7rem;
  height: 0.6rem;
  line-height: 0.6rem;
  margin-left: 0.2rem;
  font-size: 0.24rem;
  color: #919191;
  border-radius: 0.05rem;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.6);
  vertical-align: middle;
}

.shopIndex .indexNav {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: white;
}

.marquee {
  margin: 0.2rem 0;
  background-color: white;
  display: flex;
}
.marquee .marqueeImg {
  width: 0.52rem;
  height: 0.52rem;
  display: inline-block;
  margin: 0.14rem 0.1rem 0.14rem 0.2rem;
}
.marquee .marqueeItemBox {
  width: 6.4rem;
  display: inline-block;
}
.marquee .marqueeItemBox .imgNext {
  float: right;
  width: 0.12rem;
  margin: 0.28rem 0.2rem;
}
.marquee .marqueeClass {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.imgAdvBox {
  width: 100%;
  height: 2.8rem;
}
.imgAdvBox .imgAdv {
  width: 100%;
  height: 100%;
}

.activity {
  background-color: white;
  margin: 0.2rem 0;
}

.quality {
  background-color: white;
  margin: 0.2rem 0;
}

.groom {
  width: 100%;
  padding: 0.2rem;
  background-color: white;
  box-sizing: border-box;
}
.groom .groomBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.cartLink {
  width: 0.8rem;
  height: 0.8rem;
  position: fixed;
  right: 0;
  bottom: 2rem;
  z-index: 9999;
  cursor: pointer;
}
.cartLink img {
  width: 100%;
}

.indexNavitem {
  width: 25%;
  margin: 0.2rem auto;
}
.indexNavitem .img {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
}
.indexNavImgBox {
  width: 1.2rem;
  height: 1.2rem;
  margin: auto;
}
.titBox {
  text-align: center;
  font-size: 0.3rem;
  color: #3c3c3c;
  line-height: 0.64rem;
}
</style>
