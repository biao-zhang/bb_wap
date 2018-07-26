<template>
  <div>
    <div id="container">

    </div>
    <!--定位信息-->
    <div id="tip"></div>
    <div id="panel"></div>
    <div id="result"></div>
  </div>
</template>

<script>

  function gaodeMap() {

    var map = new AMap.Map('container', {
      resizeEnable: true,
      zoom:11,
      center: [113.65423, 34.70704],
    });

//    search = new AMap.CloudDataSearch('5a5323992376c17f01085ada', {map:map,pageSize:20,keywords:'',});
//    search.searchNearBy(map.getCenter(),2000, function(a,b){
//      console.log('AMap.CloudDataLayer');
//    });



//    var marker = new AMap.Marker({
//      position: [113.65423, 34.70704],
//      map:map,
//      icon:new AMap.Icon({
//        image:'/src/assets/logo.png',
//        imageSize:new AMap.Size(32,32)
//      })
//    });

//    AMap.plugin(['AMap.ToolBar','AMap.AdvancedInfoWindow'],function(){
//      //创建并添加工具条控件
//      var toolBar = new AMap.ToolBar();
//      console.log(toolBar)
//      map.addControl(toolBar);
//      //创建高级信息窗体并在指定位置打开
//      var infowindow = new AMap.AdvancedInfoWindow({
//        content: '<div class="info-title">高德地图</div><div class="info-content">'+
//        '<img src="http://webapi.amap.com/images/amap.jpg">'+
//        '高德是中国领先的数字地图内容、导航和位置服务解决方案提供商。<br>'+
//        '<a target="_blank" href="http://mobile.amap.com/">点击下载高德地图</a></div>',
//        offset: new AMap.Pixel(0, -30)
//      });
////      infowindow.open(map,[113.65423, 34.70704]);
//    })

//    步行导航
    var walking = new AMap.Walking({
      map: map,
//      panel: "panel",
      complete:abc()
    });
    //根据起终点坐标规划步行路线
    walking.search([113.65423, 34.70704], [113.60000, 34.70000]);
    function abc() {
      console.log("abc")
    }


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
</style>
