<template>
  <div class="serviceMap">
    <div id="container">

    </div>
    <div class="tit">
      <img src="./img/back.png" class="titImg" onclick="javascript:history.go(-1)">
      选择地址
    </div>
    <img src="../../assets/img/mapCenterIcon.png" class="icon" :style="{top:t+'px',left:l+'px'}">
    <div id="panel">
      <div class="line"><div class="line1">{{address}}</div><img class="weizhiImg" src="../service/img/weizhi.png"/></div>
      <div class="line"><input type="text" v-model="inputValue" class="line2" placeholder="补充地址"/><span class="true" @click="sub">确定</span></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cen: [], //中心点
      pluginArr: [
        "AMap.ToolBar",
        "AMap.AdvancedInfoWindow",
        "AMap.Geolocation",
        "AMap.CloudDataSearch",
        "AMap.CloudDataLayer",
        "AMap.Geocoder"
      ], //组件
      t: 0,
      l: 0,
      address: "",
      addressArr: [],
      street: "",
      geolocation: null, //定位
      inputValue: "",
      adcode: "", //adcode
      flag: ""
    };
  },
  watch: {},
  computed: {
    map: function() {
      //定义地图
      return new AMap.Map("container", {
        resizeEnable: true,
        zoom: 15
      });
    },
    geocoder: function() {
      //中心点
      return new AMap.Geocoder({});
    },
    toolBar: function() {
      return new AMap.ToolBar({});
    }
  },
  mounted() {
    this.t = (window.innerHeight + 26.05) / 2;
    this.l = (window.innerWidth + 16) / 2;
    this.map.plugin(this.pluginArr, function() {
      // console.log('我执行了111111111');
    });
    this.map.on("moveend", this.move);
    this.dingwei();
  },
  methods: {
    move() {
      let that = this;
      this.cen = [];
      this.cen.push(this.map.getCenter().lng);
      this.cen.push(this.map.getCenter().lat);
      this.geocoder.getAddress(this.cen, function(status, result) {
        if (status === "complete" && result.info === "OK") {
          console.log(result);
          that.adcode = result.regeocode.addressComponent.adcode;
          that.address = result.regeocode.formattedAddress;
          that.addressArr = [
            result.regeocode.addressComponent.province,
            result.regeocode.addressComponent.city,
            result.regeocode.addressComponent.district
          ];
          that.street =
            result.regeocode.addressComponent.township +
            result.regeocode.addressComponent.street +
            result.regeocode.addressComponent.streetNumber;
        } else {
          console.log("获取地址失败");
        }
      });
    },
    dingwei() {
      this.geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: "RB"
      });
      this.map.addControl(this.geolocation);
      this.geolocation.getCurrentPosition();
      AMap.event.addListener(this.geolocation, "complete", this.onComplete);
      AMap.event.addListener(this.geolocation, "error", this.onError);
    },
    onComplete(data) {
      console.log(data);
      this.flag = "1";
      //        this.map.setCenter([data.position.getLng(),data.position.getLat()]);
    },
    onError(data) {
      this.$store.commit("setToastText", "定位失败!");
      this.$store.commit("setToastType", "warn");
      this.flag = "1";
    },
    sub() {
      console.log(this.address + this.inputValue);
      if (this.flag == "1") {
        this.$store.state.service.mapAddr = this.address + this.inputValue;
        this.$store.state.service.mapAddressArr = this.addressArr;
        this.$store.state.service.mapAdcode = this.adcode;
        this.$store.state.service.mapStreet = this.street;
        history.go(-1);
      } else {
        this.$store.commit("setToastText", "定位中");
        this.$store.commit("setToastType", "warn");
      }
    }
  }
};
</script>

<style scoped>
.serviceMap {
  width: 100%;
  height: 100%;
}
#container {
  height: 100%;
}

.tit {
  width: 100%;
  height: 46px;
  text-align: center;
  position: fixed;
  top: 0;
  z-index: 99;
  background-color: white;
  border-bottom: 1px solid #ccc;
  line-height: 46px;
  font-size: 0.36rem;
}
.titImg {
  width: 10px;
  position: absolute;
  left: 15px;
  top: 13px;
}
#panel {
  width: 7.1rem;
  height: 2rem;
  position: fixed;
  top: 1.2rem;
  margin: 0 0.2rem;
  z-index: 83;
  background-color: white;
  border-radius: 0.1rem;
  box-shadow: 0 0 8px #999;
}
#panel .line {
}
#panel .line .line1 {
  width: 5.5rem;
  height: 0.99rem;
  line-height: 0.99rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border-bottom:1px solid #ededed;
  margin: 0 0 0 0.55rem;
  font-size: 0.3rem;
  color: #333;
}
#panel .line .weizhiImg {
  position: absolute;
  right: 0.36rem;
  top: 0.32rem;
  width: 0.28rem;
}
#panel .line .line2 {
  width: 5.5rem;
  height: 1rem;
  padding: 0.3rem 0;
  margin: 0 0 0 0.55rem;
  box-sizing: border-box;
  font-size: 0.3rem;
}
#panel .line .true {
  display: inline-block;
  margin-left: 0.3rem;
  font-size: 0.3rem;
  color: #f66e26;
}

.icon {
  position: fixed;
  z-index: 10;
  width: 16px;
  height: 26.05px;
}
</style>
