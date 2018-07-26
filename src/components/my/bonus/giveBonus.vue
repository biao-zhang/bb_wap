<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div class='giveBonus'>
      <div class='giveBonusContent'>
        <div>
          <div class="giveBonusItem">
            <div>红包类型</div>
            <div @click="changeTypeState">
              <span>{{type.name}}</span>
              <i class="iconfont icon-xiangxiajiantou"></i>
            </div>
          </div>
          <div class="tip">每人领到金额随机</div>
        </div>
        <div class="giveBonusItem">
          <div>红包金额</div>
          <div>
            <input type="number" v-model="money" @change="moneyChange" placeholder="输入金额"/>
            <span>元</span>
          </div>
        </div>
        <div class="giveBonusItem">
          <div>红包个数</div>
          <div>
            <input type="number" v-model="num" @change="numChange" placeholder="输入个数"/>
            <span>个</span>
          </div>
        </div>
        <div class="giveBonusItem">
          <div>时间间隔</div>
          <div>
            <input type="number" v-model="time" @change="timeChange" placeholder="输入时间"/>
            <span>分钟</span>
          </div>
        </div>
      </div>
      <div class="bonusMoney">
        <span style="font-size: 0.60rem">￥</span>
        <span style="font-size: 0.60rem">{{money!=''?money:0}}</span>
      </div>
    </div>
    <div @click="getLngLat">
      <my-btn :btn-text="btnMessage"> </my-btn>
    </div>
    <self-address v-if="typeState" :state="typeState" :list="typeList" @close="typeState=false" @change="getAddressVal"></self-address>
  </div>

</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XHeader } from 'vux'
  import myBtn from '../common/myBtn'
  import selfAddress from '@/vux/selfAddress'
  import { setRed } from '@/api/promotion'
  import { setStore, getStore } from "@/untils/storage";

  export default{
    components: {myBtn,XHeader,selfAddress},
    data(){
      return{
        typeState:false,
        typeList:[{value:'1',name:'手气红包'},{value:'0',name:'普通红包'}],
        topMessage: '发红包',
        btnMessage: '塞钱进红包',
        type:{value:'1',name:'手气红包'},
        money:'',
        num:'',
        time:'',
        adcode:'',
        mapAdcode:'',
        lnglat:['',''],
      }
    },
    props:{

    },
    mounted(){
      //获取adcode
      if (getStore("curCityAdcode")) {
        this.adcode = getStore("curCityAdcode");
      }
    },
    methods:{
      moneyChange(){
//        let money = parseInt(this.money);
//        if(money<=0){
//          this.money=0;
//        }else{
//          this.money = money;
//        }
      },
      numChange(){
//        let num = parseInt(this.num);
//        if(num<=0){
//          this.num=0;
//        }else{
//          this.num = num;
//        }
      },
      timeChange(){
//        let time = parseInt(this.time);
//        if(time<=0){
//          this.time=0;
//        }else{
//          this.time = time;
//        }
      },
      getAddressVal(a,b){
        console.log(a,b)
        this.type={value:a[0],name:b[0]}
      },
      changeTypeState(){
        this.typeState=true;
      },
      pay(){
        let params = {
          adcode:this.adcode,
          shop_address_x:this.lnglat[0],
          shop_address_y:this.lnglat[1],
//          shop_address_x:'113.63283',
//          shop_address_y:'34.70376',
          price:this.money,
          num:this.num,
          gap_time:this.time,
          red_attribute:parseInt(this.type.value),
        }
        console.log(params)
        setRed(params).then((res)=>{
          console.log(res)
          if(res.message=='success'){
            this.$store.commit('setLoading',false)
            this.$router.push({path:'/y/paymentMethod',query:{orderId:res.data.orderId,settlementType:5}})
          }else{
            this.$store.commit('setLoading',false)
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          this.$store.commit('setLoading',false)
          console.log(err)
          this.$store.commit('setToastText','网络错误!')
          this.$store.commit('setToastType','warn')
        })
      },
      // 获取经纬度
      getLngLat() {
        if(this.money==''||this.num==''||this.time==''){
          this.$store.commit('setToastText','红包信息输入不完整')
          this.$store.commit('setToastType','text')
          return false
        }else if(this.money<1){
          this.$store.commit('setToastText','总金额不能小于1')
          this.$store.commit('setToastType','text')
          return false;
        }else if(this.num<1||this.num%1!=0){
          this.$store.commit('setToastText','红包数量输入不正确')
          this.$store.commit('setToastType','text')
          return false;
        }else if(this.time<1||this.time%1!=0){
          this.$store.commit('setToastText','只能输入整分钟数')
          this.$store.commit('setToastType','text')
          return false;
        }else if((this.money/this.num)<1){
          this.$store.commit('setToastText','所发红包的平均金额不能小于1')
          this.$store.commit('setToastType','text')
          return false;
        }else{

        }
        this.$store.commit('setLoading',true)
        var map, geolocation;
        var that = this;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map("container", {
          resizeEnable: true
        });
        map.plugin("AMap.Geolocation", function() {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: "RB"
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", that.onComplete); //返回定位信息
          AMap.event.addListener(geolocation, "error", that.onError); //返回定位出错信息
        });
      },
      onError(data) {
        console.log("定位失败!");
        this.$store.commit('setLoading',false)
      },
      onComplete(data) {
        this.mapAdcode = data.addressComponent.adcode;
        this.lnglat = [data.position.getLng(),data.position.getLat()];
        console.log(this.lnglat,'22222222')
        if(this.mapAdcode==this.adcode){
          this.pay();
        }else{
          this.$store.commit('setToastText','您当前定位地区与您当前所选择的运营中心不一致，请选取您定位地区所在的运营中心，否则您无法参与任务红包活动')
          this.$store.commit('setToastType','text')
          this.$store.commit('setLoading',false)
        }
      },

    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

 .giveBonus {
   padding: 0.60rem 0.20rem;
   background-color: #fff4ed;
 }
 .giveBonusContent {
   height: 5.50rem;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
 }
  .giveBonusItem {
    padding: 0.30rem 0.15rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
  }
  .giveBonusItem input {
    width: 1.50rem;
    text-align: right;
  }
  .tip {
    color: #b6b2b0;
    font-size: 0.24rem;
    margin-left: 0.20rem;
    margin-top: 0.20rem;
  }
  .bonusMoney {
    padding: 0.70rem 0 0 0;
    text-align: center;
    color: #f86e0e;
  }
</style>
