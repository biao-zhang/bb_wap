<template>
  <div class='helpInformation'
       v-if="serviceChildren.orderState === 2 || serviceChildren.orderState === 3 || serviceChildren.orderState === 4 || serviceChildren.orderState === 5"
  >
    <div class="helpInformationContent">
      <div class='helpInformationTitle'>
        <div class='helpInformationTitlePic'>
          <img :src="serviceChildren.serviceProviderImg ? serviceChildren.serviceProviderImg : require('../img/oxniceDefault.png')"/>
        </div>
        <div class='helpInformationTitle-right'>
          <div class="help-two">
            <div class="help-name">{{ serviceChildren.serviceProvider }}</div>
            <div>
              <rater v-model="serviceChildren.helperLevel" star="❤" active-color="#fd593d"> </rater>
            </div>
          </div>
          <div :class="{class1: shoucang}" @click="shoucang1">
            <span><i class="iconfont icon-shoucang"></i></span>
            <span>{{ shoucang ? '已收藏' : '收藏他'}}</span>
          </div>
        </div>
      </div>
      <div class='helpInformationTel'>
        <div class="help-Tel">
          <span style="margin-right: 0.20rem; color: #007aff">
            <i class="iconfont icon-dianhua"></i>
          </span>
          <span><a style="color:#fff" :href="'tel:' + serviceChildren.serviceProviderPhone">联系他</a></span>
        </div>
        <div class="help-kefu" @click="kefu">
          <span style="margin-right: 0.20rem; color: #007aff">
            <i class="iconfont icon-kefu1"></i>
          </span>
          <span>联系客服</span>
        </div>
      </div>
      <div class='helpInformationPic' v-if="serviceChildren.orderState === 2" style="padding-bottom: 1.00rem">
        <!--<img src="../img/service.png"/>-->
        <div style="margin: 0.10rem 0; width: 7.50rem; height: 3.85rem" id="myMap"></div>
      </div>
      <div class='helpInformationPic' v-if="serviceChildren.orderState === 3">
        <img src="../img/service.png"/>
        <div style="margin: 0.10rem 0;">服务正在进行中,请稍后...</div>
      </div>
      <div class='helpInformationPic' v-if="serviceChildren.orderState === 4">
        <img src="../img/evalute.png"/>
        <div style="margin: 0.10rem 0;">感谢您对帮工的支持，希望再次为您服务</div>
      </div>
      <div class='helpInformationPic' v-if="serviceChildren.orderState === 5">
        <img src="../img/evalute.png"/>
        <div style="margin: 0.10rem 0;">感谢您对帮工的支持，希望再次为您服务</div>
      </div>
    </div>
    <!--客服弹窗-->
    <div v-transfer-dom class="popup_zong1">
      <popup v-model="show_kefu" position="bottom" >
        <!--客服-->
        <div class="kefu">
          <div class="kefu_top">
            <div>
              <div>
                <img src="../img/qq.png" alt="">
              </div>
              <p class="lei">QQ客服</p>
              <p>联系客服</p>
            </div>
            <div>
              <div>
                <img src="../img/qq2.png" alt="">
              </div>
              <p class="lei">微信客服</p>
              <p >15523458902</p>
            </div>
            <div>
              <div>
                <img src="../img/qq3.png" alt="">
              </div>
              <p class="lei">电话客服</p>
              <p ><a style="color:#fff" :href="'tel:'+'400-113-7166'">400-113-7166</a></p>
            </div>
          </div>
        </div>
        <!--底部-->
        <div class="kefu_quxiao" @click="close_kefu">取消</div>
      </popup>
    </div>
    <!--end-->
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { Rater, TransferDom, Popup } from 'vux'
  import { userCollectHelper, removeCollectByHelperId } from "@/api/personally"

  export default{
    directives: {
      TransferDom
    },
    components: {
      Rater,
      TransferDom,
      Popup
    },
    data(){
      return{
        shoucang: false,

        show_kefu: false,
      }
    },
    props:['serviceChildren'],
    mounted(){
      this.serviceChildren.isCollect ? this.shoucang = true : this.shoucang = false

      if(this.serviceChildren.orderState === 2) {

        this.myMap()

      }

    },
    methods:{
      kefu() {
        this.show_kefu = true;
        console.log("客服");
      },
      close_kefu() {
        this.show_kefu = false;
        console.log("客服取消");
      },
      shoucang1() {

        if (this.shoucang) {

          removeCollectByHelperId({
            helperId: this.serviceChildren.serviceProviderId
          })
            .then( res => {

              this.shoucang = false
              console.log('取消帮工收藏', res)
            })

        } else {

          userCollectHelper({
            helperId: this.serviceChildren.serviceProviderId
          })
            .then( res => {

              this.shoucang = true
              console.log('添加帮工收藏', res)
            })
        }
      },
      myMap() {
        let markerUser

        let map = new AMap.Map('myMap', {
          zoom: 13,//级别
        })

        let iconHelper = new AMap.Icon({
          image: require('../img/helperPic.png'),
          imageSize:  new AMap.Size(20, 20)
        })

        /* let iconUser = new AMap.Icon({
           image: require('../img/helperPic.png'),
           imageSize:  new AMap.Size(20, 20)
         })*/

        markerUser = new AMap.Marker({
          position: map.getCenter(),
        })

        if(this.serviceChildren.lon && this.serviceChildren.lat) {

          let markerHelper = new AMap.Marker({
            position: [this.serviceChildren.lon, this.serviceChildren.lat],
            icon: iconHelper,
          })

          map.add(markerHelper)

        } else {

          this.$store.commit('setToastText', '暂无帮工位置')
          this.$store.commit('setToastType', 'warn')

        }

        map.add(markerUser)
      }
    },
  }
</script>
<style scoped>
  .helpInformation {
    font-size: 0.30rem;
    margin-top: 0.20rem;
  }
  .helpInformationTitle,.helpInformationTel {
    background-color: #ffffff;
  }
  .helpInformationTitle {
    display: flex;
    padding: 0.40rem 0.20rem;
  }
  .helpInformationTitlePic {
    margin-right: 0.30rem;
  }
  .help-two {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .helpInformationTitlePic img {
    width: 1.36rem;
    height: 1.36rem;
    border-radius: 50%;
  }
  .helpInformationTitle-right {
    width: 5.44rem;
    display: flex;
    justify-content: space-between;
  }
  .helpInformationTel {
    padding: 0.10rem 0.20rem;
    display: flex;
    background-color: #fba86e;
  }
  .help-Tel,.help-kefu {
    line-height: 0.70rem;
    text-align: center;
    color: #ffffff;
  }
  .help-Tel {
    width: 7.00rem;
    height: 0.70rem;
    border-right: 1px solid #ffffff;
  }
  .help-kefu {
    width: 7.10rem;
    height: 0.70rem;
  }
  .helpInformationPic {
    padding-bottom: 1.50rem;
    text-align: center;
    margin-top: 0.10rem;
    background-color: #f5f5f5;
  }
  .helpInformationPic img {
    width: 3.19rem;
  }
  .helpInformationBtn {
    padding: 0.30rem 0.20rem;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
    background-color: #ffffff;
  }
  .help-btn {
    padding: 0.20rem 0.30rem;
    background-color: #f86e0e;
    color: #ffffff;
    border-radius: 3px;
  }
  .class1 {
    color: #f9905a
  }

  #myMap >>> .amap-logo{
    z-index: -1 !important;
  }

  #myMap >>> .amap-copyright{
    z-index: -1 !important;
  }

  /*客服弹窗*/
  .kefu_quxiao {
    line-height: 1rem;
    background: #fff;
    text-align: center;
    font-size: 0.3rem;
    color: #333333;
  }
  .kefu {
    padding: 0.7rem 0.2rem 0.9rem;
  }
  .kefu_top {
    display: flex;
    justify-content: space-between;
  }
  .kefu_top > div {
    width: 2rem;
    display: flex;
    flex-direction: column;
    border-right:1px solid #fff;
    padding-right: 0.24rem;
  }
  .kefu_top > div:last-child {
    border: none;
    padding: 0;
  }
  .kefu_top div div {
    width: 0.9rem;
    height: 0.9rem;
    align-self: center;
  }
  .kefu_top img {
    width: 100%;
    height: 100%;
  }
  .kefu_top div p {
    text-align: center;
  }
  .lei {
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #333333;
  }
  .kefu_top div p:last-child {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.5rem;
    background: -webkit-linear-gradient(left, #f86e0e, #f45f32, #f15451);
    border-radius: 0.1rem;
  }
  .inputBox img2 {
    width: 0.42rem;
    height: 0.42rem;
  }
</style>
