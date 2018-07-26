<template>
  <div>
    <div id="container">

    </div>
    <div id="tip"></div>
    <div id="panel"></div>
    <div id="board">
      <div id="msg"><span id="name"></span><span id="km"></span></div>
      <!--<img id="goImg" src="./logo.png">-->
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
        // 点标注移动
        prev:require('@/components/nearby/img/map1.png'),
        infoWindow:{}
      }
    },
    props: {
      labelText: {
        type: String
      }
    },
    watch:{
      labelText(one,two){
        this.move()
      }
    },
    computed:{
      map:function () {
        return new AMap.Map('container', {
          resizeEnable: true,
          zoom:15,
        })
      },
      centerDot:function () {
        return new AMap.Marker({     //中心点
          //map:this.map,
          offset:new AMap.Pixel(-16,-32),
          icon:new AMap.Icon({
            /*image:'http://vdata.amap.com/icons/b18/1/2.png',*/
            imageSize:new AMap.Size(26,41),
            image:require('@/components/nearby/img/centerDots.png'),
            size:new AMap.Size(26,41)
          })
        });
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
      //实例化信息窗体
      var content = [];
      content.push('<div>技能：<span style="font-size:14px;color:#f87012;">家电维修</span></div>');
      content.push('<div>评价：010-64733333</div>');
      content.push('<div>服务：<span style="font-size:14px;color:#f87012;">78单</span></div>');
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: that.createInfoWindow(content),
        offset: new AMap.Pixel(16, -45)
      });
    },
    methods:{
      onError(data) {
        this.$store.state.toastText='定位失败！'
        this.$store.state.toastType='text'
      },

      move(){
        console.log("移动"+this.labelText)
        if(this.labelText === "红包"){
          this.prev = require('@/components/nearby/img/map1.png')
        }else if(this.labelText === "帮工"){
          this.prev = require('@/components/nearby/img/map2.png')
        }else{
          this.prev = require('@/components/nearby/img/map3.png')
        }
        let that =this;
        let icon = new AMap.Icon({
          imageSize:new AMap.Size(40,40),
          image: that.prev,
          size:new AMap.Size(40,40)
        })
        for(var i = 0;i<this.marker.length;i++){
          this.marker[i].setMap(null)
        }
        this.marker=[]
        this.cen=[];
        this.cen.push(this.map.getCenter().lng)
        this.cen.push(this.map.getCenter().lat)
        this.centerDot.setPosition(this.cen)
        this.search.searchNearBy(this.cen,1000, function(a,b){
           console.log('b is',b)
          that.markers=b;
          for(var i in that.markers.datas){
            that.marker[i] = new AMap.Marker({            //其他坐标点
              icon: icon,
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
                console.log(that.labelText)
                if(that.labelText == "帮工"){
                  console.log(that.marker[i])
                  that.infoWindow.open(that.map, that.marker[i].getPosition());
                }else if(that.labelText == "服务站"){
                  console.log(that.marker[i])
                  that.$router.push({path: '/x/storeGoodsClassify'})
                }
              }
            })(i));
          }
        });
      },
      pluginF(){

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

      // 实例化信息窗体
      createInfoWindow(content) {
        var info = document.createElement("div");
        info.className = "info";

        //可以通过下面的方式修改自定义窗体的宽高
        info.style.width = "175px";
        info.style.background = "#fff";
        // 定义顶部标题
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        var closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = content;
        closeX.src = "http://oxl8xel6j.bkt.clouddn.com/null.png";
        closeX.onclick = this.closeInfoWindow;

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        return info;
      },
      //关闭信息窗体
      closeInfoWindow() {
        this.map.clearInfoWindow();
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
