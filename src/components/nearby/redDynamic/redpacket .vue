<template>
<div class="redpacket " style="height:100%">
<div  id="redpacketMap">
</div>    
</div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { getStore } from "@/untils/storage";
export default {
  data() {
    return {
      map: {},
      adcode: getStore("curCityAdcode")
    };
  },
  mounted() {
    var that = this;
    //初始化地图对象，加载地图
    that.map = new AMap.Map("redpacketMap", {
      resizeEnable: true,
      center: [34.72468, 113.6401], //地图中心点
      zoom: 10 //地图显示的缩放级别
    });
    axios
      .post(
        "/shop/operatingApi/searchNearbyCountryId",
        this.qs.stringify({ adcode: getStore("curCityAdcode") })
      )
      .then(res => {
        var markLength = res.data.data.length;
        // console.log('运营中心', res.data.data);
        var aName = [];
        if (res.data.data) {
          var lnglats = [];
          for (var i = 1; i <= markLength; i++) {
            //添加点标记，并使用自己的icon
            var sCur = res.data.data[i - 1].latitudeandlongitude;
            // console.log('scur',sCur);
            var aCur = sCur.split(",");
            lnglats.push(aCur);
            aName.push(res.data.data[i - 1].shopName);
          }
          this.infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -30),
            isCustom: true
          });
          // var content = "";
          for (var i = 0, marker; i < lnglats.length; i++) {
            // console.log('经纬度',lnglats[i]);
            var marker = new AMap.Marker({
              position: lnglats[i],
              map: this.map,
              icon: new AMap.Icon({
                size: new AMap.Size(28, 30), //图标大小
                image: require("../img/w_map_oper@2x.png")
              })
            });
            marker.content = res.data.data[i].shopName;
            marker.on("click", this.markerClick);
            this.map.on("click", function() {
              that.infoWindow.close();
            });
          }
          this.map.setFitView();
        }
        // this.map.setZoomAndCenter(14, [34.7246800000,113.6401000000]);
      })
      .catch(err => {
        console.log("err:" + err);
      });
    //附近红包
    axios
      .post(
        "/promotion/redPacket/findAllBlueCoord",
        this.qs.stringify({ adcode: getStore("curCityAdcode") })
      )
      .then(res => {
        let markLength = res.data.data.length;
        // console.log("附近红包", res.data.data);
        // let aName = [];
        if (markLength > 0) {
          var lnglats = [];
          for (var i = 1; i <= markLength; i++) {
            //添加点标记，
            // let lnglat = [];
            let sCur =
              res.data.data[i - 1].longitude +
              "," +
              res.data.data[i - 1].latitude;
            let aCur = sCur.split(",");
            lnglats.push(aCur);
            // aName.push(res.data.data[i - 1].shopName);
          }
          // console.log("红包经纬度", lnglats);
          this.infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -30)
          });
          for (let i = 0, marker; i < lnglats.length; i++) {
            let marker = new AMap.Marker({
              position: lnglats[i],
              map: this.map,
              icon: new AMap.Icon({
                size: new AMap.Size(40, 60), //图标大小
                image: require("../img/w_map_red1@2x.png")
              })
            });

            marker.content = '在应用商店下载APP领取红包';
            marker.on("click", this.markerClick);
          }
          this.map.setFitView();
          // this.map.setZoomAndCenter(14, [34.7246800000,113.6401000000]);
        }
      });
    //任务红包
    axios
      .post(
        "/promotion/redPacket/findAllTaskCoord",
        this.qs.stringify({ adcode: getStore("curCityAdcode") })
      )
      .then(res => {
        // console.log(res.data);
        let markLength = res.data.data.length;
        // console.log("附近任务红包", res.data.data);
        // let aName = [];
        if (markLength > 0) {
          var lnglats = [];
          for (var i = 1; i <= markLength; i++) {
            //添加点标记，
            // let lnglat = [];
            let sCur =
              res.data.data[i - 1].longitude +
              "," +
              res.data.data[i - 1].latitude;
            let aCur = sCur.split(",");
            lnglats.push(aCur);
            // aName.push(res.data.data[i - 1].shopName);
          }
          // console.log("红包经纬度", lnglats);
          this.infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -30)
          });
          for (let i = 0, marker; i < lnglats.length; i++) {
            let marker = new AMap.Marker({
              position: lnglats[i],
              map: this.map,
              icon: new AMap.Icon({
                size: new AMap.Size(40, 60), //图标大小
                image: require("../img/w_map_red2@2x.png")
              })
            });
            marker.content = '在应用商店下载APP领取红包';
            marker.on("click", this.markerClick);
          }
          this.map.setFitView();
          // this.map.setZoomAndCenter(14, [34.7246800000,113.6401000000]);
        }
      });
    // this.map.setZoomAndCenter(14, [34.7246800000,113.6401000000]);
  },
  methods: {
    markerClick: function(e) {
      let params = {
        type: "1",
        title: e.target.content
      };
      this.infoWindow.setContent(this.openinfo(params));
      this.infoWindow.open(this.map, e.target.getPosition());
    },
    openinfo: function(params) {
      let content = "";
      let infoWindow = {};
      if (params.type == "1") {
        //只有信息
        content = '<div class="mapinfo">' + "" + params.title + "" + "</div>";
        // infoWindow = new AMap.InfoWindow({
        // content: content //使用默认信息窗体框样式，显示信息内容
        // });
        // infoWindow.open(this.map, this.map.getCenter());
        return content;
      } else if (params.type == "2") {
        //帮工弹窗窗体
        content = `<div class="maphelperinfo">
  <ul>
    <li>
      <span class="title">专长:</span>
      <span class="iteminfo">${params.expertise}</span>
    </li>
        <li>
      <span class="title">评价:</span>
      <span class="iteminfo">${params.evaluate}分</span>
    </li>
          <li>
      <span class="title">服务:</span>
      <span class="iteminfo">${params.service}单</span>
    </li>
  </ul>
</div>`;
        return content;
      }
    }
  }
};
</script>
<style >
#redpacketMap {
  height: 100%;
  width: 100%;
}
/* 地图弹窗信息 */
#redpacketMap .mapinfo {
  display: inline-block;
  height: 26px;
  line-height: 26px;
  padding: 2px 5px;
  border-radius: 10px;
  color: #250501;
  font-size: 14px;
  background: #f0893b;
}
#redpacketMap .maphelperinfo {
  background: #fff;
  padding: 10px;
  width: 180px;
  font-size: 14px;
  border-radius: 15px;
}
#redpacketMap .maphelperinfo .iteminfo {
  color: #f6681c;
}
#redpacketMap ul,
#redpacketMap li {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
