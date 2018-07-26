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

  export default {
    data(){
      return{
        cen:[],//中心点
        search:null,//search云图
        markers:null,//标注集
        marker:[],//标注
        geolocation:null,//定位
        pluginArr:['AMap.ToolBar','AMap.AdvancedInfoWindow','AMap.Geolocation','AMap.CloudDataSearch','AMap.CloudDataLayer'],//组件

      }
    },
    watch:{

    },
    computed:{
      map:function () {
        return new AMap.Map('container', {
          resizeEnable: true,
          zoom:15,
        })
      },
      centerDot:function () {
        return new AMap.Marker({
//          map:this.map,
          offset:new AMap.Pixel(-16,-32),
          icon:new AMap.Icon({
            image:'/src/assets/logo.png',
            imageSize:new AMap.Size(32,32),
            size:new AMap.Size(32,32)
          })
        });
      },
      walking:function(){
        return new AMap.Walking({
          map: this.map,
//      panel: "panel",
          complete:this.abc()
        })
      },
      toolBar:function () {
        return new AMap.ToolBar({});
      }
    },
    mounted(){
      let that = this;
      this.map.plugin(that.pluginArr);
      this.centerDot.setMap(this.map)
      this.pluginF();
      this.map.on('moveend',this.move);
//      this.walking.search([113.70000, 34.80000],[113.60000, 34.70000]);
    },
    methods:{
      onComplete(data) {
        this.map.setCenter([data.position.getLng(),data.position.getLat()]);
//        this.walk([data.position.getLng(),data.position.getLat()],[113.60000, 34.70000]);
      },
      walk(arr1,arr2) {
        this.walking.search(arr1,arr2);
      },
      abc(){
        console.log("规划路线完成")
      },
      onError(data) {
        this.$store.state.toastText='定位失败！'
        this.$store.state.toastType='text'
      },
      move(){
        let that =this;
        for(var i = 0;i<this.marker.length;i++){
          this.marker[i].setMap(null)
        }
        this.marker=[]
        this.cen=[];
        this.cen.push(this.map.getCenter().lng)
        this.cen.push(this.map.getCenter().lat)
        this.centerDot.setPosition(this.cen)
        this.search.searchNearBy(this.cen,1000, function(a,b){
          that.markers=b;
          for(var i in that.markers.datas){
            that.marker[i] = new AMap.Marker({
              position: [that.markers.datas[i]._location.lng, that.markers.datas[i]._location.lat],
              map:that.map,
              offset:new AMap.Pixel(-16,-32),
            });
            AMap.event.addListener(that.marker[i], 'click', (function (a) {
              return function () {
                var fromplace = that.cen;
                var toplace = [that.markers.datas[a]._location.lng,that.markers.datas[a]._location.lat];
                document.getElementById("name").innerHTML=toplace;
                document.getElementById("km").innerHTML=fromplace;
                that.walk(fromplace,toplace)
              }
            })(i));
          }
        });
      },
      pluginF(){
        this.map.addControl(this.toolBar)
//        var infowindow = new AMap.AdvancedInfoWindow({
//          content: '<div class="info-title">高德地图</div>',
//          offset: new AMap.Pixel(0, -30)
//        });
//      infowindow.open(map,[113.65423, 34.70704]);
//      添加云图
        var searchOptions = {
//        map:map,
          pageSize:20,
//      panel:'result',
          keywords:'',
          autoFitView:false
        };
        this.search = new AMap.CloudDataSearch('5a5323992376c17f01085ada', searchOptions);
//    定位
        this.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition:'LB'
        });
        this.map.addControl(this.geolocation);
        this.geolocation.getCurrentPosition();
        AMap.event.addListener(this.geolocation, 'complete', this.onComplete);
        AMap.event.addListener(this.geolocation, 'error', this.onError);
      },
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
