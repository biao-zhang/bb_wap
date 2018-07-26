<template>
  <div class="shopIndex">
    <div class="back_one" @click="back_go" >
      <img src="../img/back.png" alt="">
    </div>
    <!--头部-->
    <div class="tab-box">
      <input type="radio" name="demo" id="tab-switch-input1" ref="input1" checked>
      <input type="radio" name="demo" id="tab-switch-input2" ref="input2">
      <input type="radio" name="demo" id="tab-switch-input3" ref="input3">
      <div class="tab-box-label">
        <label for="tab-switch-input1">商品</label>
        <label for="tab-switch-input2">详情</label>
        <label for="tab-switch-input3">评价</label>
      </div>
        <!--<x-button type="primary">Middle</x-button>-->
      <div class="tab-contents">
        <div class="tab-content">
          <goods-detail-swiper-item v-if="Object.keys(GoodsDetailData).length !== 0" :datas="GoodsDetailData" @toDiscuss="toDiscuss"></goods-detail-swiper-item>
        </div>
        <div class="tab-content">
          <store-picture :datas="GoodsDetailsHtml"> </store-picture>
        </div>
        <div class="tab-content">
            <evaluation-display> </evaluation-display>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import goodsDetailSwiperItem from "@/components/shop/common/goodsDetailSwiperItem";
import storePicture from "@/components/shop/storedetails/storePicture";
import evaluationDisplay from "@/components/shop/storedetails/assembly/evaluationDisplay";
import { getSearchGdById, getSearchGdInfoById } from "@/api/shop";
import { getStore, setStore } from "@/untils/storage";
import { setTimeout } from "timers";
import { XButton } from "vux";

export default {
  components: {
    goodsDetailSwiperItem,
    storePicture,
    evaluationDisplay,
    XButton
  },
  data() {
    return {
      params: {
        goodsId: "",
        goodsType: "",
        activityId: "",
        adcode: "",
        gtVal: "", //商品类型
        startTime: "", //秒杀开始时间
        firstImg:'',
    

      },
      routerFrom:'1',//来源页面 空则没有来源页面
      GoodsDetailData: {},
      GoodsDetailsHtml: {},
      pullTosHeight: 0 //LR滚动的高度
    };
  },
  beforeCreate() {
    this.$store.commit("setLoading", true);
  },
  created() {
    this.params.goodsId = this.$route.query.recommendId;
    this.params.goodsType = this.$route.query.goodsType;
    this.params.activityId = this.$route.query.activityId;
    if(this.$route.query.adcode!=undefined){
      setStore('curCityAdcode',this.$route.query.adcode);
      this.params.adcode = this.$route.query.adcode;
    }else{
      this.params.adcode = getStore("curCityAdcode");
    }
  },
   beforeRouteEnter(to,from,next){
    //  console.log(from.fullPath,'12321');
     if(from.fullPath.length<2)
     {
       sessionStorage.setItem('shopDetailFrom','0');
     }
  
     next();
     
   },
  mounted() {
    this._getSearchGdInfoById();
    this._getSearchGdById();
    setTimeout(() => this.pullTosHeight = window.innerHeight - 46, 20);

  },
  methods: {
    back_go(){
      if(sessionStorage.getItem('shopDetailFrom')=='0'){
        sessionStorage.removeItem('shopDetailFrom');
        this.$router.push('/');

      }
      else{
        this.$router.go(-1)
      }
    },

    // 商品整合详情
    _getSearchGdInfoById() {
      const { goodsId, goodsType, adcode, activityId } = this.params;

      let params = {
        goodsId: goodsId,
        goodsType: goodsType,
        adcode: adcode,
        activityId: activityId
      };
      getSearchGdInfoById(params).then(res => {
        if (res.result && !this.isEmpty(res.data)) {
          this.GoodsDetailData = res.data;

            document.title = '奈斯牛-'+res.data.goodsName;
            this.firstImg = res.data.goodsImgMaster?res.data.goodsImgMaster:'';
            this.initShare();
            // console.log(this.firstImg);
        } /*else {
          this.$store.state.toastText = "数据异常";
          this.$store.state.toastType = "warn";
          setTimeout(function(){
          history.go(-1);
          },2000);
        }*/
        console.log("商品详情", res);
      });
    },
    //商品富文本
    _getSearchGdById() {
      const { goodsId, goodsType, adcode } = this.params;

      let params = {
        goodsId: goodsId,
        goodsType: goodsType,
        adcode: adcode
      };
      getSearchGdById(params).then(res => {
        if (res.result) {
          // console.log('富文本1',res);
          let data = res.data;
          this.GoodsDetailsHtml = data;
          // Console.log(data);
        } else {
          clearTimeout(this.timer);
          this.busy = true;
        }
      });
    },
    ////////// 跳转到评论tab
    toDiscuss() {
      console.log("a");
      this.$refs.input3.click();
    },
    /*
    * 检测对象是否是空对象(不包含任何可读属性)。
    * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。
    */
    isEmpty(obj) {
      for (var name in obj) {
        return false;
      }
      return true;
    },
    isOwnEmpty(obj) {
      for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
          return false;
        }
      }
      return true;
    },
    initShare(){
      //分享加上图片
      var date = parseInt((new Date().getTime())/1000);
      this.axios.post('/personally/wxJspLoginContriller/permissionsSign',this.qs.stringify({noncestr:'DiezASFKolejsDmF',timestamp:date,url:location.href}))
        .then((res)=>{
          console.log(res)
          if(res.data.data.length>0){
            wx.config({
//              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wx070f1e1cb0797cbd', // 必填，公众号的唯一标识wx200cd3b413c4e6ef
              timestamp:date, // 必填，生成签名的时间戳
              nonceStr: 'DiezASFKolejsDmF', // 必填，生成签名的随机串
              signature: res.data.data,// 必填，签名，见附录1
              jsApiList: ['startRecord','stopRecord','translateVoice','onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(()=>{
              wx.onMenuShareAppMessage({
                title: document.title,  // 分享标题
                desc: document.title, // 分享描述
                link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.firstImg, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: ()=>{
                  console.log('success')
                  // 用户点击了分享后执行的回调函数
                },
                error:(res)=>{
                  console.log(res)
                }
              });
              wx.onMenuShareTimeline({
                title: document.title, // 分享标题
                link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.firstImg, // 分享图标
                success: function () {
                  // 用户点击了分享后执行的回调函数
                },
              });
            })
            wx.error((res)=>{
              console.log(res)
            });
          }else{
            this.$store.commit('setToastText','权限获取失败')
            this.$store.commit('setToastType','warn')
          }
        })
        .catch((err)=>{
          console.log(err)
          this.$store.commit('setToastText','权限获取失败!')
          this.$store.commit('setToastType','warn')
        })
    },
  },
  updated() {
    this.$store.commit("setLoading", false);
  }
};
</script>
<style scoped>
.shopIndex {
  background-color: #fff;
  height: 100%;
}

.shopIndex .pullTos {
  width: 100%;
  height: 100%;
  padding-top: 0.54rem;
}
/*返回按钮*/
.back_one {
  position: fixed;
  width: 0.19rem;
  top: 0.29rem;
  left: 0.29rem;
  z-index: 9;
}
.back_one img {
  width: 100%;
  height: 100%;
}
/*begin*/
.tab-box input {
  display: none;
}
.tab-box-label {
  padding: 0 2rem;
  box-sizing: border-box;
  width: 100%;
  height: 0.8rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 6;
}
.tab-box label {
  height: 0.76rem;
  background: #fff;
  color: #111111;
  display: inline-block;
  text-align: center;
  width: 1rem;
  font-size: 0.28rem;
  line-height: 1.1rem;
}
.tab-content {
  width: 100%;
  height: 100%;
  display: none;
    transform: translateZ(0);
  padding-top: 0.8rem;
}
.tab-box
  input:nth-of-type(1):checked
  ~ .tab-contents
  .tab-content:nth-of-type(1),
.tab-box
  input:nth-of-type(2):checked
  ~ .tab-contents
  .tab-content:nth-of-type(2),
.tab-box
  input:nth-of-type(3):checked
  ~ .tab-contents
  .tab-content:nth-of-type(3) {
  display: block;
}
.tab-box input:nth-of-type(1):checked ~ .tab-box-label label:nth-of-type(1),
.tab-box input:nth-of-type(2):checked ~ .tab-box-label label:nth-of-type(2),
.tab-box input:nth-of-type(3):checked ~ .tab-box-label label:nth-of-type(3) {
  border-bottom: 0.04rem solid #f86e0e;
}
</style>
