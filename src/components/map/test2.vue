<template>
  <div>
    <div id="container">

    </div>
    <div id="tip"></div>
    <div id="panel"></div>
    <div id="board">
      <div id="msg"><span id="name"></span><span id="km"></span></div>
      <img id="goImg" src="./logo.png">
    </div>
  </div>
</template>

<script>

  function gaodeMap() {
//    init
    var map = new AMap.Map('container', {
      resizeEnable: true,
      zoom:15,
    });
    var cen=[];
    var search;
    var markers=[];
    function onComplete(data) {
      map.setCenter([data.position.getLng(),data.position.getLat()]);
      walk([data.position.getLng(),data.position.getLat()],[113.60000, 34.70000]);
    }
    function walk(arr1,arr2) {
      var walking = new AMap.Walking({
        map: map,
//      panel: "panel",
        complete:abc()
      });
      walking.search(arr1,arr2);
    }
    function abc() {
      console.log("规划路线完成")
    }
    function onError(data) {
//      alert("定位失败！")
      this.$store.state.toastText='定位失败！'
      this.$store.state.toastType='text'
    }
//    标注
    var centerDot = new AMap.Marker({
//      position: [113.65423, 34.70704],
      map:map,
      offset:new AMap.Pixel(-16,-32),
      icon:new AMap.Icon({
        image:'/src/assets/logo.png',
        imageSize:new AMap.Size(32,32),
        size:new AMap.Size(32,32)
      })
    });
//    move
    var markers;
    var marker=[];
    map.on('moveend',function () {
      for(var i = 0;i<marker.length;i++){
        marker[i].setMap(null)
      }
      marker=[]
      cen=[];
      cen.push(this.getCenter().lng)
      cen.push(this.getCenter().lat)
      centerDot.setPosition(cen)
      search.searchNearBy(cen,1000, function(a,b){
        markers=b;
        console.log(markers)
        for(var i in markers.datas){
          marker[i] = new AMap.Marker({
            position: [markers.datas[i]._location.lng, markers.datas[i]._location.lat],
            map:map,
            offset:new AMap.Pixel(-16,-32),
          });
          AMap.event.addListener(marker[i], 'click', (function (a) {
            return function () {
              var fromplace = cen;
              var toplace = [markers.datas[a]._location.lng,markers.datas[a]._location.lat];
              document.getElementById("name").innerHTML=toplace;
              document.getElementById("km").innerHTML=fromplace;
              console.log("ft")
              walk(fromplace,toplace)
            }
          })(i));
        }
      });
    })
    var geolocation;
    map.plugin(['AMap.ToolBar','AMap.AdvancedInfoWindow','AMap.Geolocation','AMap.CloudDataSearch','AMap.CloudDataLayer'], function() {
      var toolBar = new AMap.ToolBar();
      map.addControl(toolBar);
      var infowindow = new AMap.AdvancedInfoWindow({
        content: '<div class="info-title">高德地图</div>',
        offset: new AMap.Pixel(0, -30)
      });
//      infowindow.open(map,[113.65423, 34.70704]);
//      添加云图
      var searchOptions = {
//        map:map,
        pageSize:20,
//      panel:'result',
        keywords:'',
        autoFitView:false
      };
      search = new AMap.CloudDataSearch('5a5323992376c17f01085ada', searchOptions);
//    定位
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition:'LB'
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', onComplete);
      AMap.event.addListener(geolocation, 'error', onError);
    });
  }
  export default {
    data(){
      return{

      }
    },
    watch:{

    },
    computed:{

    },
    mounted(){
      this.gaodeMap();
    },
    methods:{
      gaodeMap(){
        gaodeMap();
      }
    }
  }
</script>

<style scoped>

  #panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
  }

  #board{width: 90%;height:1rem;margin: 0.1rem 5%;position: fixed;bottom: 0;background-color: white;}
  #msg{display: inline-block;}
  #goImg{width:0.5rem;height: 0.5rem;}
</style>
