<template>
  <div class='myIndex'>
    <div class="header">
      <div class="headerImg1"></div>
      <router-link to="/y/newsCentre"><img src="./img/personalMsg.png" class="headerImg2"></router-link>
      <div class="msgBoard" :class="{'msgBoardColor1':!loginState}">
        <div v-if="loginState">
          <div class="personalLogoBox">
            <router-link to="/x/personalData">
              <img v-if="persionData.portrait != null" :src="persionData.portrait" class="personalLogo heardPhoto">
              <img v-if="persionData.portrait == null" src="./img/oxniceDefault.png" class="personalLogo heardPhoto">
            </router-link>
            <div class="dengji">
              <router-link class="dengji_1" to="/y/gradeClass">
                <img v-bind:src="persionData.rankPicture" class="personalLogo">
              </router-link>
            </div>
          </div>
          <div class="personalName re-overFlowes">{{persionData.nickName}}</div>
          <div class="personalSay re-overFlowes">{{persionData.autograph}}</div>
        </div>
        <div class="notLogin" v-else>
          <div class="pleaseLoginText">Hi,等你好久了!</div>
          <div class="loginBtnsBox">

          <div class="btns" @click="login">登录</div>
         <div class="btns" @click="reg" >注册</div>
          </div>
        </div>
        <div class="care">
          <div>
            <router-link :to="{path:'/x/myCollect',query:{}}">
              <div class="careNun" v-if="!loginState || persionData.collectionNumber == null">0</div>
              <div class="careNun" v-else>{{persionData.collectionNumber}}</div>
              <div class="careName">我的收藏</div>
            </router-link>
          </div>
          <div>
            <router-link :to="{path:'/x/MyCommonweal',query:{}}">
              <div class="careNun" v-if="!loginState || persionData.charitableNumber == null">0</div>
              <div class="careNun" v-else>{{persionData.charitableNumber}}</div>
              <div class="careName">公益活动</div>
            </router-link>
          </div>
          <div>
            <router-link :to="{path:'/z/serviceOrderList',query:{}}">
              <div class="careNun" v-if="!loginState || persionData.serviceOrderNumber == null">0</div>
              <div class="careNun" v-else>{{persionData.serviceOrderNumber}}</div>
              <div class="careName">服务订单</div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="accountBox">
        <!--<div class="accountItem">
          <router-link :to="{path:'/z/account',query:{title:'precard'}}">
            <img class="accounLogo1" src="./img/accountLogo1.png">
            <div class="text">预付卡账户</div>
          </router-link>
        </div>-->
        <div class="accountItem">
          <router-link :to="{path:'/y/cashAccount',query:''}">
            <img class="accounLogo2" src="./img/accountLogo2.png">
            <div class="text"> 现金账户</div>
          </router-link>
        </div>
        <div class="accountItem">
          <router-link :to="{path:'/z/lowPriceBonus',query:''}">
            <img class="accounLogo3" src="./img/accountLogo3.png">
            <div class="text">折扣账户</div>
          </router-link>
        </div>
        <div class="accountItem">
          <router-link :to="{path:'/y/integralAccount',query:{}}">
            <img class="accounLogo4" src="./img/accountLogo4.png">
            <div class="text">积分账户</div>
          </router-link>
        </div>
      </div>
    </div>
    <order-line :datas="persionData"></order-line>
    <bottom-line-index ref="bottom"></bottom-line-index>
    <router-link to="/x/reservationOrder"><img class="reservationOrder" :style="{top:t+'px',left:l+'px'}" @touchmove="touchmove" ref="reservationOrder" src="./img/reservationOrder.png"/></router-link>
  </div>
</template>
<script>
/**
 * @props
 * @emit
 */
import orderLine from "@/components/my/common/orderLineIndex";
import bottomLineIndex from "@/components/my/common/bottomLineIndex";
import { GetSelectBasicByIdDetail, tempLogin } from "@/api/personally";
import { isWeiXin } from "@/untils/untils";
import { wxloginJsp } from "@/api/personally";
export default {
  data() {
    return {
      loginState: false, //是否有用户登录
      t: 300,
      maxT: 320,
      l: 300,
      maxL: 350,
      range: 0,
      persionData: {},

      temp: ""
    };
  },
  components: { orderLine, bottomLineIndex },
  props: {},
  mounted() {
    this.temp = this.$route.query.temp;

    if (this.temp) {
      this._tempLogin();
    } else {
    }

    //改变bottomIndex
    this.$store.commit("getBottomIndex", 5);

    function getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    }
    // var session_id = getCookie("session_id");
    // if (session_id == "" || session_id == null || session_id == undefined) {
    //   this.loginState = false;
    // } else {
    //   this.loginState = true;
    // }
    this._GetSelectBasicByIdDetail();
    var that = this;
    setTimeout(function() {
      that.range = that.$refs.reservationOrder.clientWidth;
      that.maxL = window.innerWidth - that.range;
      that.l = that.maxL;
      that.maxT = window.innerHeight - 53 - that.range;
    }, 20);
  },
  methods: {
    isEmpty(obj) {
      for (var name in obj) {
        return false;
      }
      return true;
    },
    login() {
      if (isWeiXin()) {
        wxloginJsp().then(res => {
          if (res.data) {
            window.location = res.data;
          }
        });
      } else {
        this.$router.push({ path: "/y/logIn" });
      }
    },
    reg() {
      if (isWeiXin()) {
        wxloginJsp().then(res => {
          if (res.data) {
            window.location = res.data;
          }
        });
      } else {
        this.$router.push({ path: "/y/regIster"});
      }
    },
    touchmove(e) {
      this.t = e.touches[0].clientY - this.range / 2;
      this.l = e.touches[0].clientX - this.range / 2;
      if (this.t < 0) {
        this.t = 0;
      } else if (this.t > this.maxT) {
        this.t = this.maxT;
      } else {
      }
      if (this.l < 0) {
        this.l = 0;
      } else if (this.l > this.maxL) {
        this.l = this.maxL;
      } else {
      }
      e.preventDefault();
    },
    _GetSelectBasicByIdDetail() {
      let params = {};
      var that = this;
      GetSelectBasicByIdDetail(params).then(res => {
        console.log('个人中心',res)
        if (!this.isEmpty(res.data)) {
          that.loginState = true;
          this.persionData = res.data;
        } else {
          that.loginState = false;
        }
      });
    },

    _tempLogin() {
      tempLogin({
        temp: this.temp
      }).then(res => {
        if (res.data) {

          this.persionData = res.data;
          this.loginState = true;
          
        }

        console.log("根据temp登录", res);
      });
    }
  }
};
</script>
<style scoped>
.myIndex {
  background-color: #f5f5f5;
  padding-bottom: 1.2rem;
}

.header {
  width: 100%;
  padding-top: 0.25rem;
  box-sizing: border-box;
  background: url("img/myBoardBg.png") no-repeat;
  background-size: 100% auto;
  background-color: white;
}

.header .notLogin {
  font-size: 0.26rem;
  color: #f86e0e;
  text-align: center;
  margin-top: 0.52rem;
}
.header .notLogin .loginBtnsBox {
  width: 3rem;
  line-height: 0.5rem;
  display: flex;
  margin: auto;
  justify-content: space-between;
  margin-top: 0.63rem;
}
.header .notLogin .loginBtnsBox .btns {
  width: 1.2rem;
  background-color: white;
  border-radius: 0.25rem;
  text-align: center;
  font-size: 0.26rem;
  color: #f86e0e;
}

.header .headerImg2 {
  float: right;
  width: 0.45rem;
  margin: 0.1rem 0.33rem;
}
.header .headerImg1 {
  width: 0.4rem;
  height: 0.4rem;
  margin: 0.1rem 0.33rem;
  display: inline-block;
}

.header .msgBoard {
  width: 6rem;
  height: 3.75rem;
  border-radius: 0.1rem;
  background-color: white;
  text-align: center;
  box-shadow: 0 0 25px #999;
  margin: 0.2rem auto;
  padding: 0.1rem;
  box-sizing: border-box;
}
.header .msgBoard.msgBoardColor1 {
  background-color: #ffe7e0;
}
.header .msgBoard .personalLogoBox {
  width: 1.3rem;
  height: 1.4rem;
  box-sizing: border-box;
  /* border: 0.04rem solid #ffb47f; */
  /*border-radius: 50%;*/
  margin: auto;
  position: relative;
}

.personalLogoBox > a {
  display: block;
}
.dengji {
  width: 18px;
  height: 18px;
  position: absolute;
  right: -6px;
  bottom: 0;
  z-index: 99;
}
.header .msgBoard .personalLogo {
  width: 100%;
  height: 100%;
}
.header .msgBoard .personalName {
  font-size: 0.34rem;
  color: #3c3c3c;
  line-height: 0.5rem;
  padding: 0 1rem;
}
.header .msgBoard .personalSay {
  font-size: 0.26rem;
  color: #6a6a6a;
  line-height: 0.45rem;
  padding: 0 0.3rem;
  overflow: hidden;
}
.header .msgBoard .care {
  width: 100%;
  padding: 0.4rem 0.1rem;
  box-sizing: border-box;
  display: flex;
}
.header .msgBoard .care > div {
  width: 33.33%;
  text-align: center;
  border-right: 1px solid #ffb47f;
  height: 0.6rem;
}
.header .msgBoard .care > div:last-child {
  border-right: 0;
}
.header .msgBoard .care .careNun {
  font-size: 0.32rem;
  color: #f86e0e;
  line-height: 0.5rem;
  margin-top: -0.2rem;
}
.header .msgBoard .care .careName {
  font-size: 0.3rem;
  color: #6a6a6a;
  line-height: 0.5rem;
}

.header .accountBox {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0.3rem 0 0.2rem;
}
.header .accountBox .accountItem {
  width: 23%;
  text-align: center;
}
.header .accountBox .accountItem .text {
  width: 100%;
  text-align: center;
  font-size: 0.28rem;
  color: #6a6a6a;
  line-height: 0.6rem;
}
.header .accountBox .accountItem .accounLogo1 {
  width: 0.54rem;
}
.header .accountBox .accountItem .accounLogo2 {
  width: 0.54rem;
}
.header .accountBox .accountItem .accounLogo3 {
  width: 0.54rem;
}
.header .accountBox .accountItem .accounLogo4 {
  width: 0.54rem;
}

.reservationOrder {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  position: fixed;
  z-index: 101;
}
.header .msgBoard .heardPhoto {
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  border: 0.04rem solid #ffb47f;
}
</style>
