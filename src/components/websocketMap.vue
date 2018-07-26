<template>
  <div style="height: 100%">
    <!--地图容器-->
    <div id='websocketMap' style="height: 100%"></div>
    <!--end-->
    <button class="btn1" @click="websocket1">看红包</button>
    <button class="btn2" @click="websocket2">发红包</button>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  export default{
    data(){
      return{
        // 地图对象(全局)
        map: {},
        remarker: []
      }
    },
    props:{

    },
    mounted() {
      // 地图对象
      let vm = this
      this.map = new AMap.Map('websocketMap',{
        resizeEnable: true,
        zoom: 10,
      })
      // 获取地图中心点经纬度坐标值（而且地图移动时保持地图中心点坐标不变）
      let cen = this.map.getCenter()
      console.log(cen)
      AMap.event.addListener(vm.map, 'mapmove',function(){
        /*console.log(vm.map.getCenter())*/
        vm.map.remove(vm.remarker)
        vm.remarker = new AMap.Marker({
          position: vm.map.getCenter(),
          map: vm.map
        });
      });

      // 逆地址编码与地址编码
      AMap.service('AMap.Geocoder',function(){
        let geocoder = new AMap.Geocoder({
          city: "010"
        });
        // 点标注
        let marker = new AMap.Marker({
          map: vm.map,
        })
        // 地图点击事件
        vm.map.on('click', (e) => {
          // 地址
          let address
          // 点标注位置
          marker.setPosition(e.lnglat)
          // 逆地址编码与地址编码
          geocoder.getAddress(e.lnglat, function(status, result) {
            if (status === 'complete') {
              address = result.regeocode.formattedAddress

              console.log('格式化以后的地址',address)
              console.log('经纬度对象',e.lnglat)

              geocoder.getLocation(address, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {

                  console.log(address)
                  // 经纬度数组
                  console.log(result.geocodes)
                  // 经纬度
                  console.log(result.geocodes[0].location)
                  // 区域编码
                  console.log(result.geocodes[0].adcode)
                }else{
                  //获取经纬度失败
//                  alert('获取经纬度失败')
                  this.$store.state.toastText='获取经纬度失败'
                  this.$store.state.toastType='text'
                  console.log(result.info)
                }
              });
            }else{
//              alert('获取地址失败')
              this.$store.state.toastText='获取地址失败'
              this.$store.state.toastType='text'
              console.log(result.info)
            }
          });

        })
      })
    },
    methods:{
      // 看红包
      websocket1 () {
        /*let ws = new WebSocket('wss://echo.websocket.org')*/
        let ws = new WebSocket('ws://192.168.1.57:8081')
        /*let ws = new WebSocket('ws://192.168.1.138:8081')*/
        let vm = this
        ws.onopen = () => {
          let code = '410103'
          // Web Socket 已连接上，使用 send() 方法发送数据
          ws.send(JSON.stringify({code: code}))
//          alert('数据发送中...')
          this.$store.state.toastText='数据发送中...'
          this.$store.state.toastType='text'
        }
        ws.onmessage = evt => {
          // console.log('数据已接收...')
//          alert('数据已接收...')
          this.$store.state.toastText='数据已接收...'
          this.$store.state.toastType='text'
          console.log(evt)
          let mapData = JSON.parse(evt.data)
          // Icon类
          let icon = new AMap.Icon({
            image: require('../assets/img/mapCenterIcon.png'),
            size: new AMap.Size(75,122), // 图片尺寸大小
            imageSize: new AMap.Size(24,24) // 图片压缩后的大小
          })

          // 显示坐标
          for(let i= 0; i < mapData.data.length; i++) {
            // 经度
            let lon = mapData.data[i].lon
            // 纬度
            let lat = mapData.data[i].lat
            // 红包id
            let redId = mapData.data[i].redId
            // marker
            let marker = new AMap.Marker({
              icon: icon,
              map: vm.map,
              position: [lon, lat]
            })
            console.log('经度',lon, '纬度',lat, '红包id',redId)
          }
          console.log( "Received Message: ", mapData.data);
          console.log( "Received Message: ", mapData.message);
          /*ws.close()*/
        }
        ws.onclose = function () {
          // 关闭 websocket
//          alert('连接已关闭4444...')
          this.$store.state.toastText='连接已关闭4444...'
          this.$store.state.toastType='text'

        }
        // 路由跳转时结束websocket链接
        /* this.$router.afterEach(function () {
           ws.close()
         })*/
      },
      // 发红包
      websocket2 () {
        /*let ws = new WebSocket('wss://echo.websocket.org')*/
        let ws = new WebSocket('ws://192.168.1.57:8082')
        /*let ws = new WebSocket('ws://192.168.1.138:8081')*/
        let vm = this
        ws.onopen = () => {
          let data = {
            code : "410103",
            redId: "1",
            lat: "34.723821",
            lon: "113.668089"
          }
          // Web Socket 已连接上，使用 send() 方法发送数据
          ws.send(JSON.stringify(data))
//          alert('数据发送中...')
          this.$store.state.toastText='数据发送中...'
          this.$store.state.toastType='text'
        }
        ws.onmessage = evt => {
          // console.log('数据已接收...')
//          alert('数据已接收...')
          this.$store.state.toastText='数据已接收...'
          this.$store.state.toastType='text'
          console.log(evt)
          let mapData = JSON.parse(evt.data)

          console.log( "Received Message: ", mapData.message);
          /*ws.close()*/
        }
        ws.onclose = function () {
          // 关闭 websocket
//          alert('连接已关闭4444...')
          this.$store.state.toastText='连接已关闭4444...'
          this.$store.state.toastType='text'
        }
        // 路由跳转时结束websocket链接
        /* this.$router.afterEach(function () {
           ws.close()
         })*/
      }
    },

  }
</script>
<style scoped>
  .btn1 {
    position: absolute;
    top: 0;
    left: 0;
  }
  .btn2 {
    position: absolute;
    top: 0;
    left: 100px;
  }
</style>
<!--红包长连接：

看红包的连接：现在是192.168.1.138:8081（以后放服务区上再修改）
发红包的连接：是192.168.1.138:8082（以后放服务区上再修改）


发红包接数据：
{
  "code" : "410103",
  "redId" : "1",
  "lat" : "34.723821",
  "lon" : "113.668089"
}

看红包接数据：
{
"code": "410103"
}


看红包返回数据：
成功：
message{
  result:1
  message: success
  data:[redId:1,lat:34.0000,lon:113.000;.......]

}
失败：

message{
  result:1
  message: error
}

发红包返回数据：
失败：

message{
  result:1
  message: error
}
成功：
message{
  result:1
  message: success
}
-->
