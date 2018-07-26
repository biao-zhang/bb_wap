<template>
  <div class="bb_page">
    <x-header :msg="HeaderText" ref="xheader"></x-header>
    <div class="content">
      <div>
        <div style="height: 44px;background-color: white" ref="BBTab">
          <tab v-if="classify.length>0" :animate="false" :line-width=2 active-color="#f86e0e" v-model="index" default-color="#111" custom-bar-width="1.4rem" >
            <tab-item :selected="demo2 == item.value" v-for="(item, index) in classify" @on-item-click="changeTab(item)" :key="index">{{item.name}}</tab-item>
          </tab>
        </div>
        <div class="BBSwiper" :style="{height:tabSwiperHeight+'px'}">
          <swiper v-model="index" :duration="1" :min-moving-distance="10000"  :show-dots="false" height="100%">
            <swiper-item >
              <div style="width: 100%;height: 100%;overflow: scroll">
                <div style="overflow:scroll;">
                  <shadow-box>
                    <span @click="changeAddress('01')">
                      <help-me-qu :serviceType="serviceType"></help-me-qu>
                    </span>
                  </shadow-box>
                  <shadow-box>
                    <goumai-goods :serviceType="serviceType" :label1="label1" :label2="label2" @changeTime = 'changeTime'></goumai-goods>
                  </shadow-box>
                  <shadow-box>
                    <goumai-goods-address  :serviceType="serviceType" @changeRunToMap="changeAddress('00')"></goumai-goods-address>
                  </shadow-box>
                  <shadow-box>
                    <goumai-goods-remarks :serviceType="serviceType"></goumai-goods-remarks>
                  </shadow-box>
                  <shadow-box>
                    <goumai-goods-quicken :serviceType="serviceType" @changeQuicken="changeQuicken" @changeIntegral="changeIntegral"></goumai-goods-quicken>
                  </shadow-box>
                </div>
              </div>
            </swiper-item>
            <swiper-item >
              <div style="width: 100%;height: 100%;overflow: scroll">
                <div style="overflow:scroll;">
                  <shadow-box>
                    <help-me-song :serviceType="serviceType1" @qu="changeAddress('11')" @song="changeAddress('12')"></help-me-song>
                  </shadow-box>
                  <shadow-box>
                    <goumai-goods :serviceType="serviceType1" :label1="label1" :label2="label2" @changeTime = "changeTime1"></goumai-goods>
                      <!--<coupon-line :couponLineText="couponLineText" :serviceType="serviceType1"></coupon-line>-->
                  </shadow-box>
                  <shadow-box>
                    <housekeep-time :labelText="goodsWeightText" :serviceType="serviceType1"></housekeep-time>
                  </shadow-box>
                  <shadow-box>
                    <goumai-goods-remarks :serviceType="serviceType1"></goumai-goods-remarks>
                  </shadow-box>
                  <shadow-box>
                    <goumai-goods-quicken :serviceType="serviceType1" @changeQuicken="changeQuicken1" @changeIntegral="changeIntegral1"></goumai-goods-quicken>
                  </shadow-box>
                </div>
              </div>
            </swiper-item>
          </swiper>
        </div>
      </div>
    </div>
    <x-bottom ref="BBPageBottom" :serviceType="serviceType" :datas="koudianResult" v-if="index===0" @submit="sub('0')"></x-bottom>
    <x-bottom ref="BBPageBottom" :serviceType="serviceType1" :datas="koudianResult1" v-if="index===1" @submit="sub('1')"></x-bottom>
    <!--dialog-->
    <div v-if="popass" class="xdialog">
      <x-dialog v-model="showDialogStyle" :dialog-style="{'background-color': 'transparent'}">
        <div class="dialogBox">
          <div class="sureTitel">
            <div class="titlePassword">请输入密码</div>
            <service-banlance @blur="blur"> </service-banlance>
          </div>
          <div class="sureBtn">
            <div
              class="sureBtnCancel"
              style="border-right: 1px solid #eee"
              @click="sureBtnCancel"
            >取消</div>
            <div class="sureBtnSure"
                 @click="sureBtnSure"
            >确定</div>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import {Tab,TabItem,Swiper,SwiperItem} from 'vux'
  import xHeader from '@/components/service/common/xHeader'
  import xBottom from '@/components/service/common/xBottom'
  import serviceBanlance from '@/components/service/common/serviceBanlance'
  import { XDialog, } from 'vux'

  import ShadowBox from '@/components/service/common/shadowBox'
  import helpMeSong from '@/components/service/common/helpMeSong'
  import goumaiGoods from '@/components/service/common/goumai'
  import goumaiGoodsAddress from '@/components/service/common/goumaiAddress'
  import goumaiGoodsRemarks from '@/components/service/common/remarks'
  import goumaiGoodsQuicken from '@/components/service/common/goumaiQuicken'

  import HelpMeQu from '@/components/service/common/helpMeQu'
  import couponLine from '@/components/service/common/couponLine'
  import housekeepTime from '@/components/service/common/housekeepTime'
  import { serviceClassify,koudian3 } from '@/api/service'
  import { getAddress } from '@/api/personally'
  import { setStore, getStore } from "@/untils/storage";
  import { checkString } from '@/untils/untils'

  export default {
    data(){
      return{
        serviceType:'runTo',
        serviceType1:'runTo1',
        showDialogStyle:false,     //dialog状态
        popass:false,              //dialog状态
        couponLineText:['取件时间',''],
        HeaderText:'跑腿',
        songTimeText:['取件时间','立即取件'],
        goodsWeightText:['货物重量','kg'],
        label1:'购买说明',
        label2:'购买时间',
        index: 0,
        demo2: '',
        tabSwiperHeight:400,
        goumaiGoods:[],
        goodsWeight:'',//货物重量
        remarkVal:'',//备注信息
        quickenIndex:0,//加速方式
        buyType:[],//购买类型
        classify:[],   //二级分类
        koudianResult:{},      //扣点数据
        koudianResult1:{},      //扣点数据1
        roadLen:0,   //距离
        roadLen1:0,   //距离1
        address01:'',    //
        address11:'',    //
        address12:'',    //
        password:'',     //密码未加密
        pwd:'',     //密码加密
        helperId:'',
      }
    },
    beforeRouteEnter(to,from,next){
      next( vm => {
        if(from.path==='/z/alladdress'){
          serviceClassify().then((res)=>{
            console.log(res,'serviceClassify')
            vm.classify=[];
            let item = {value:'',name:''};
            if(res.message=='success'){
              for(let i=0;i<res.data[0].twoServer.length;i++){
                item={}
                item.value=res.data[0].twoServer[i].serveCatyId;
                item.name=res.data[0].twoServer[i].serveCatyName;
                vm.classify.push(item);     //获取所有二级分类
              }
              vm.initTab();
              vm.koudian();
              let addId = vm.$store.state.address.curAddressId;
              let address = {};
              console.log('addId'+addId)
              getAddress({addId:addId}).then((res)=>{
                address = res.data.province+res.data.city+res.data.area+res.data.address;
                console.log(res.data,address,'当前地址信息')
                if(vm.$store.state.service.addressState=='01'){
                  vm.$store.state.service.runTo.helpMe.id=res.data.addId;
                  vm.$store.state.service.runTo.helpMe.adcode=res.data.areaId;
                  vm.$store.state.service.runTo.helpMe.input1=address;
                  vm.$store.state.service.runTo.helpMe.input2=res.data.userName;
                  vm.$store.state.service.runTo.helpMe.input3=res.data.phone;
                  vm.address01 = res.data.addId;
                  vm.getLoad();
                }else if(vm.$store.state.service.addressState=='11'){
                  vm.$store.state.service.runTo1.helpMe.id=res.data.addId;
                  vm.$store.state.service.runTo1.helpMe.adcode=res.data.areaId;
                  vm.$store.state.service.runTo1.helpMe.input1=address;
                  vm.$store.state.service.runTo1.helpMe.input2=res.data.userName;
                  vm.$store.state.service.runTo1.helpMe.input3=res.data.phone;
                  vm.address11 = res.data.addId;
                  vm.getLoad1();
                }else if(vm.$store.state.service.addressState=='12'){
                  vm.$store.state.service.runTo1.helpMe.id1=res.data.addId;
                  vm.$store.state.service.runTo1.helpMe.adcode1=res.data.areaId;
                  vm.$store.state.service.runTo1.helpMe.input4=address;
                  vm.$store.state.service.runTo1.helpMe.input5=res.data.userName;
                  vm.$store.state.service.runTo1.helpMe.input6=res.data.phone;
                  vm.address12 = res.data.addId;
                  console.log(vm.$store.state.service.runTo1,'lmlm')
                  vm.getLoad1();
                }else{
                  vm.$store.commit('setToastText','参数错误')
                  vm.$store.commit('setToastType','warn')
                }
                console.log(vm.$store.state.service.runTo.helpMe,'feffe')
                console.log(vm.$store.state.service.runTo1.helpMe,'feffe')

              }).catch((err)=>{
                console.log(err,'所选地址获取失败')
                vm.$store.commit('setToastText','服务器错误')
                vm.$store.commit('setToastType','warn')
              })
            }else{
              vm.$store.commit('setToastText',res.message)
              vm.$store.commit('setToastType','warn')
            }
          }).catch((err)=>{
            console.log(err,'获取服务分类失败')
            vm.$store.commit('setToastText','获取服务分类失败!')
            vm.$store.commit('setToastType','warn')
          })

        }else if(from.path==='/x/serviceMap'){
          serviceClassify().then((res)=>{
            console.log(res,'serviceClassify')
            vm.classify=[];
            let item = {value:'',name:''};
            if(res.message=='success'){
              for(let i=0;i<res.data[0].twoServer.length;i++){
                item={}
                item.value=res.data[0].twoServer[i].serveCatyId;
                item.name=res.data[0].twoServer[i].serveCatyName;
                vm.classify.push(item);     //获取所有二级分类
              }
              vm.initTab();
//              this.koudian();      //不需要
              console.log(vm.$store.state.service.mapAddr,'feffe')
              vm.$store.state.service.runTo.goumaiGoodsAddress.input2 = vm.$store.state.service.mapAddr;
              vm.$store.state.service.runTo.goumaiGoodsAddress.adcode = vm.$store.state.service.mapAdcode;
              vm.getLoad();
            }else{
              vm.$store.commit('setToastText',res.message)
              vm.$store.commit('setToastType','warn')
            }
          }).catch((err)=>{
            console.log(err,'获取服务分类失败')
            vm.$store.commit('setToastText','获取服务分类失败!')
            vm.$store.commit('setToastType','warn')
          })
        }else{
          vm.getClassify();
          vm.$store.state.service.addressState='01'
        }
      })
    },
    components:{xHeader,xBottom,Tab,TabItem,Swiper,SwiperItem,ShadowBox,HelpMeQu,helpMeSong,goumaiGoods,goumaiGoodsAddress,goumaiGoodsRemarks,goumaiGoodsQuicken,couponLine,housekeepTime,serviceBanlance,XDialog},
    computed:{
      geocoder(){
        return new AMap.Geocoder();
      },
      riding(){
        return new AMap.Riding();
      },
      datas(){
        return this.$store.state.service.runTo;
      },
      datas1(){
        return this.$store.state.service.runTo1;
      },
    },
    watch:{

    },
    mounted(){
      setTimeout(()=>{
        this.tabSwiperHeight=(window.innerHeight-this.$refs.xheader.$el.clientHeight-this.$refs.BBTab.clientHeight-this.$refs.BBPageBottom.$el.clientHeight);
      },20)
    },
    methods:{

      changeAddress(s){
        this.$store.state.service.addressState = s;
        if(s=='00'){
//          this.$router.push({path: '/z/alladdress', query: {msg: '选择收货地址',id:''}})
        }else if(s=='01'){
          this.$router.push({path: '/z/alladdress', query: {msg: '选择收货地址',id:this.address01}})
        }else if(s=='11'){
          this.$router.push({path: '/z/alladdress', query: {msg: '选择收货地址',id:this.address11}})
        }else if(s=='12'){
          this.$router.push({path: '/z/alladdress', query: {msg: '选择收货地址',id:this.address12}})
        }else{

        }
      },
      changeTab(item){
        this.demo2 = item.value
        this.$store.state.service.runToState=item.value;
        if(item.name == '帮我买'){
          this.koudian();
        }else{
          this.koudian1();
        }
      },
      //  初始化tab
      initTab(){
        if(this.$route.query.serveCatyId!=undefined){
          console.log('地址栏有参数')
          if(this.$store.state.service.runToState==''){    // 没有Tab
            this.classify.map((item)=>{
              if(this.$route.query.serveCatyId== item.value){
                this.$store.state.service.runToState=item.value;
                this.demo2=this.$store.state.service.runToState;
              }else{

              }
            })
          }else{                    //  已有Tab
            this.demo2=this.$store.state.service.runToState;
          }
          if(this.$route.query.helperId!=undefined){
            this.helperId = this.$route.query.helperId;
          }else{
            this.helperId = ''
          }
        }else{
          console.log('地址栏无参数')
          if(this.$store.state.service.runToState==''){
            this.$store.state.service.runToState=this.classify[0].value;
            this.demo2=this.$store.state.service.runToState;
          }else{
            this.classify.map((item)=>{
              if(this.$store.state.service.runToState == item.value){
                this.$store.state.service.runToState=item.value;
                this.demo2=this.$store.state.service.runToState;
              }else{

              }
            })
          }
        }

      },
      //
      sub(a){
        if(a=='0'){
          if(this.datas.quicken.input2>0){
            this.showDialogStyle = true
            this.popass = true
          }else{
            this.submit(a);
          }
        }else if(a=='1'){
          if(this.datas1.quicken.input2>0){
            this.showDialogStyle = true
            this.popass = true
          }else{
            this.submit(a);
          }
        }else{

        }
      },
      //初始化支付密码格式
      pwd_zhifu(a){
        if(a=='0'){
          this.pwd = '';
          if(this.datas.quicken.input2>0){  //输入的积分>0
            if(this.password.length!=6){
              this.$store.commit("setToastText",'支付密码输入有误!')
              this.$store.commit("setToastType",'warn')
              this.pwd = '';
            }else{
              this.pwd = md5(this.password);
            }
          }else{
            this.pwd='';
          }
        }else if(a=='1'){
          this.pwd = '';
          if(this.datas1.quicken.input2>0){  //输入的积分>0
            if(this.password.length!=6){
              this.$store.commit("setToastText",'支付密码输入有误!')
              this.$store.commit("setToastType",'warn')
              this.pwd = '';
            }else{
              this.pwd = md5(this.password);
            }
          }else{
            this.pwd='';
          }
        }else{

        }

      },
      //点击提交按钮
      submit(type){
        let params;
        if(type=='0'){
          this.pwd_zhifu('0');
          params = {
            runOrderType:1,         //跑腿订单类型 1:帮我买 2:帮我取送
            receivingAddressId:this.datas.helpMe.id,   //收货地址id(帮我买、帮我取送)
            purchaseAddress:this.datas.goumaiGoodsAddress.input2,      //购买地址(指定购)
//            takeAddress:1,      //取货地址id (帮我取送)
            remarks:this.datas.remarks.input2,      //备注
//            cargoWeight:1,      //货物重量kg(帮我取送)
            road:Math.ceil(this.roadLen/1000),      //路程距离km(向上取整)
            serviceProjectId:this.$store.state.service.runToState,      //服务项目id(二级分类)
            serviceContent:this.datas.goumaiGoods.input1,      //服务内容说明
            timeOfAppointment:this.datas.goumaiGoods.input2.value,      //购买时间/取件时间（毫秒值）
            isInvoice:this.datas.goumaiGoodsAddress.input3==''?0:this.datas.goumaiGoodsAddress.input3,      //是否开发票( 0:否 1:是)
            accelerateCost:this.datas.quicken.input1,      //加速费用
            useIntegralNum:this.datas.quicken.input2==null?0:this.datas.quicken.input2,      //积分使用数量
//            customerId:this.$store.state.userId,      //用户Id（token获取）
            helperId:this.helperId,      //帮工Id(预约单必传)
            password:this.pwd,      //使用积分校验密码（积分为0，可以不传）
            adcode:this.adcode,      //adcode
//            token:'36827d11e76aee5c5c6442edc88f42f6'

          };
          if(!this.checkInputValue(params)){
            return false;
          }
          console.log("下单参数",params);
          this.requestURL(params)
        }else{
          this.pwd_zhifu('1')
          params = {
            runOrderType:2,         //跑腿订单类型 1:帮我买 2:帮我取送
            receivingAddressId:this.datas1.helpMe.id1,   //收货地址id(帮我买、帮我取送)
            takeAddress:this.datas1.helpMe.id,      //取货地址id (帮我取送)
            remarks:this.datas1.remarks.input2,      //备注
            cargoWeight:this.datas1.housekeepTime.input1==null?0:this.datas1.housekeepTime.input1,      //货物重量kg(帮我取送)
            road:Math.ceil(this.roadLen1/1000),      //路程距离km(向上取整)
            serviceProjectId:this.$store.state.service.runToState,      //服务项目id(二级分类)
            serviceContent:this.datas1.goumaiGoods.input1,      //服务内容说明
            timeOfAppointment:this.datas1.goumaiGoods.input2.value,      //购买时间/取件时间（毫秒值）
            isInvoice:this.datas1.housekeepTime.input2==''?0:this.datas1.housekeepTime.input2,      //是否开发票( 0:否 1:是)
            accelerateCost:this.datas1.quicken.input1,      //加速费用
            useIntegralNum:this.datas1.quicken.input2==null?0:this.datas1.quicken.input2,      //积分使用数量
//            customerId:this.$store.state.userId,      //用户Id（token获取）
            helperId:this.helperId,      //帮工Id(预约单必传)
            password:this.pwd,      //使用积分校验密码（积分为0，可以不传）
            adcode:this.adcode,      //adcode

          };
          if(!this.checkInputValue1(params)){
            return false;
          }
          console.log("下单参数",params);
          this.requestURL(params)
        }
      },
      //生成订单
      requestURL(params){
        this.$store.commit('setLoading',true)
        this.axios.post('/service/runErrandsOrder/insertRunErrands',this.qs.stringify(params))
          .then((response)=>{
            this.$store.commit('setLoading',false)
            console.log(response.data,'服务下单数据')
            if(response.data.result==1){
              if(response.data.data==null){      //返回为null,获取错误信息
                this.$store.commit('setToastText',response.data.message)
                this.$store.commit('setToastType','warn')
              }else{
                this.$store.commit('service/initRunTo')
                this.$store.commit('service/initRunTo1')
                this.$router.push({path:'/y/paymentMethod', query: {orderId: response.data.data.orderId,settlementType:4,key:response.data.data.price}})
              }
            }else{

            }
          })
          .catch((error)=>{
            this.$store.commit('setLoading',false)
            console.log("服务下单接口error");
          })
      },
      //获取服务二级分类
      getClassify(){
        serviceClassify().then((res)=>{
          console.log(res,'serviceClassify')
          this.classify=[];
          let item = {value:'',name:''};
          if(res.message=='success'){
            for(let i=0;i<res.data[0].twoServer.length;i++){
              item={}
              item.value=res.data[0].twoServer[i].serveCatyId;
              item.name=res.data[0].twoServer[i].serveCatyName;
              this.classify.push(item);     //获取所有二级分类
            }
            this.initTab();
            this.koudian();
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          console.log(err,'获取服务分类失败')
          this.$store.commit('setToastText','获取服务分类失败!')
          this.$store.commit('setToastType','warn')
        })
      },
      remarkInputVal(a){  //获取备注
        this.remarkVal = a;
        console.log(this.remarkVal)
      },
      getWeight(a){    //获取重量
        this.goodsWeight = a;
        console.log(this.goodsWeight)
      },
      getQuickenIndex(a){    //获取加速
        this.quickenIndex = a;
        console.log(this.quickenIndex)
      },
//      getData(a){   //购买商品详情
//        this.goumaiGoods = a;
//        console.log(this.goumaiGoods)
//      },
      getBuyType(a){
        this.buyType = a;
        console.log(this.buyType)
      },

      //改变预约时间
      changeTime(){
        this.koudian();
      },
      //加速发生改变
      changeQuicken(){
        this.koudian();
      },
      //积分发生改变
      changeIntegral(){
        this.koudian();
      },
      //计算距离
      getLoad(){
        this.$store.commit('setLoading',true)
        let i3=[],i5=[]
        if(this.$store.state.service.runTo.helpMe.input1!=''){    //有收获地址
          this.geocoder.getLocation(this.$store.state.service.runTo.helpMe.input1, (status, result)=>{
            if (status === 'complete' && result.info === 'OK') {
              i3.push(result.geocodes[0].location.lng)
              i3.push(result.geocodes[0].location.lat)
              if(this.$store.state.service.runTo.goumaiGoodsAddress.input2!=''){
                this.geocoder.getLocation(this.$store.state.service.runTo.goumaiGoodsAddress.input2, (status, result)=>{
                  if (status === 'complete' && result.info === 'OK') {
                    i5.push(result.geocodes[0].location.lng)
                    i5.push(result.geocodes[0].location.lat)
//                    this.roadLen = AMap.GeometryUtil.distance(i3, i5);
                    console.log(i3,i5)
                    this.riding.search(i3, i5,(status,result)=>{
                      console.log(status,result)
                      if (status === 'complete' && result.info === 'OK') {
                        this.$store.commit('setLoading',false)
                        this.roadLen = result.routes[0].distance;
                        this.koudian();
                        console.log("success")
                      }else{
                        this.$store.commit('setLoading',false)
                        this.$store.commit('setToastText','计算距离失败')
                        this.$store.commit('setToastType','warn')
                        this.koudian();
                      }
                    });
                  }else{
                    this.$store.commit('setLoading',false)
                    console.log('地址2 计算失败')
                    this.$store.commit('setToastText','计算距离失败2')
                    this.$store.commit('setToastType','warn')
                    this.roadLen=0;
                    this.koudian();
                  }
                })
              }else{
                this.$store.commit('setLoading',false)
                console.log('无地址2')
                this.roadLen=0;
                this.koudian();
              }
            }else{
              this.$store.commit('setLoading',false)
              console.log('地址1 计算失败')
              this.$store.commit('setToastText','计算距离失败1')
              this.$store.commit('setToastType','warn')
              this.roadLen=0;
              this.koudian();
            }
          })
        }else{                //没有输入收获地址
          this.$store.commit('setLoading',false)
          console.log("无地址1")
          this.roadLen=0;
          this.koudian();
        }

      },
      //计算距离
      getLoad1(){
        this.$store.commit('setLoading',true)
        let i3=[],i5=[]
        if(this.$store.state.service.runTo1.helpMe.input1!=''&&this.$store.state.service.runTo1.helpMe.input4!=''){      //两个地址输入完整
          this.geocoder.getLocation(this.$store.state.service.runTo1.helpMe.input1, (status, result)=>{
            if (status === 'complete' && result.info === 'OK') {
              i3.push(result.geocodes[0].location.lng)
              i3.push(result.geocodes[0].location.lat)
              this.geocoder.getLocation(this.$store.state.service.runTo1.helpMe.input4, (status, result)=>{
                if (status === 'complete' && result.info === 'OK') {
                  i5.push(result.geocodes[0].location.lng)
                  i5.push(result.geocodes[0].location.lat)
//                  this.roadLen1 = AMap.GeometryUtil.distance(i3, i5);
                  this.riding.search(i3, i5,(status,result)=>{
                    if (status === 'complete' && result.info === 'OK') {
                      this.$store.commit('setLoading',false)
                      this.roadLen1 = result.routes[0].distance;
                      this.koudian1();
                      console.log("success")
                    }else{
                      this.$store.commit('setLoading',false)
                      this.$store.commit('setToastText','计算距离失败3')
                      this.$store.commit('setToastType','warn')
                      this.koudian1();
                    }
                  });
                }else{
                  this.$store.commit('setLoading',false)
                  this.$store.commit('setToastText','计算距离失败2')
                  this.$store.commit('setToastType','warn')
                  this.roadLen1=0;
                  this.koudian1();
                }
              })
            }else{
              this.$store.commit('setLoading',false)
              this.$store.commit('setToastText','计算距离失败1')
              this.$store.commit('setToastType','warn')
              this.roadLen1=0;
              this.koudian1();
            }
          })
        }else{        //地址输入不完整
          this.$store.commit('setLoading',false)
          this.roadLen1=0;
          this.koudian1();
        }

      },
      //执行扣点
      koudian(){
        //获取adcode
        if (getStore("curCityAdcode")) {
          this.adcode = getStore("curCityAdcode");
        }
        let params = {
          serveCatyId:this.demo2,        ///二级分类ID
          integralStr:this.$store.state.service.runTo.quicken.input2,            //使用积分
          quickenPriceStr:this.$store.state.service.runTo.quicken.input1,        //加速费用
          timeStr:this.$store.state.service.runTo.goumaiGoods.input2.value,                //下单时间
          adcode:this.adcode,                 //行政区划编码
          kmNumStr:Math.ceil(this.roadLen/1000),              //距离
          type:this.$store.state.service.runTo.goumaiGoodsAddress.input2==''?1:2,        //是否随意买（1.是；2.不是）
        }
        console.log('扣点参数',params)
        koudian3(params).then((res)=>{
          console.log(res,'扣点数据')
          if(res.message=='success'){
            this.koudianResult = res.data;
          }else{
            this.$store.commit('setToastText',res.message)
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          this.$store.commit('setToastText','服务器错误')
          this.$store.commit('setToastType','warn')
        })
      },

      //改变预约时间
      changeTime1(){
        this.koudian1();
      },
      //加速发生改变
      changeQuicken1(){
        this.koudian1();
      },
      //积分发生改变
      changeIntegral1(){
        this.koudian1();
      },
      //执行扣点
      koudian1(){
        //获取adcode
        if (getStore("curCityAdcode")) {
          this.adcode = getStore("curCityAdcode");
        }
        let params = {
          serveCatyId:this.demo2,        ///二级分类ID
          integralStr:this.$store.state.service.runTo1.quicken.input2,            //使用积分
          quickenPriceStr:this.$store.state.service.runTo1.quicken.input1,        //加速费用
          timeStr:this.$store.state.service.runTo1.goumaiGoods.input2.value,                //下单时间
          adcode:this.adcode,                 //行政区划编码
          kmNumStr:Math.ceil(this.roadLen1/1000),              //距离
          type:2,        //是否随意买（1.是；2.不是）
        }
        console.log('扣点参数',params)
        koudian3(params).then((res)=>{
          console.log(res,'扣点数据')
          if(res.message=='success'){
            this.koudianResult1 = res.data;
          }else{
            this.$store.commit('setToastText','价格计算错误')
            this.$store.commit('setToastType','warn')
          }
        }).catch((err)=>{
          console.log(err,'扣点错误')
          this.$store.commit('setToastText','服务器错误')
          this.$store.commit('setToastType','warn')
        })
      },
      checkInputValue(params){
        if(params.receivingAdcode===''){
          this.$store.commit('setToastText','请选择送货地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.serviceContent===''){
          this.$store.commit('setToastText','请填写购买说明')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(!checkString(params.serviceContent)){
          this.$store.commit('setToastText','请勿输入非法字符')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.timeOfAppointment===''){
          this.$store.commit('setToastText','请选择购买时间')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.takeAdcode===''){
          this.$store.commit('setToastText','请选择购买地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.isInvoice===''){
          this.$store.commit('setToastText','请选择是否开发票')
          this.$store.commit('setToastType','warn')
          return false;
        }else{
          if(params.remarks!=''){
            if(!checkString(params.remarks)){
              this.$store.commit('setToastText','请勿输入非法字符')
              this.$store.commit('setToastType','warn')
              return false;
            }else{
              return true;
            }
          }else{
            return true;
          }

        }
      },
      checkInputValue1(params){
        if(params.receivingAdcode===''){
          this.$store.commit('setToastText','请选择取货地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.takeAddress===''){
          this.$store.commit('setToastText','请选择送货地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.serviceContent===''){
          this.$store.commit('setToastText','请填写取件说明')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(!checkString(params.serviceContent)){
          this.$store.commit('setToastText','请勿输入非法字符')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.timeOfAppointment===''){
          this.$store.commit('setToastText','请选择取件时间')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.cargoWeight===''){
          this.$store.commit('setToastText','请填写货物重量')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.isInvoice===''){
          this.$store.commit('setToastText','请选择是否开发票')
          this.$store.commit('setToastType','warn')
          return false;
        }else{
          if(params.remarks!=''){
            if(!checkString(params.remarks)){
              this.$store.commit('setToastText','请勿输入非法字符')
              this.$store.commit('setToastType','warn')
              return false;
            }else{
              return true;
            }
          }else{
            return true;
          }
        }
      },
      sureBtnCancel() {
        this.showDialogStyle = false
        this.popass = false
      },
      sureBtnSure() {
        this.showDialogStyle = false
        this.popass = false
        if(this.$store.state.service.runToState == this.classify[0].value){
          this.submit('0')
        }else{
          this.submit('1')
        }
      },
      blur(val) {
        this.password = val
      },
    }
  }

</script>
<style scoped>
  .bb_page{background-color: #f5f5f5;height: 100%;padding:46px 0 1rem;box-sizing: border-box;position: relative;}

  .content{height: 100%;padding:0;overflow: scroll}

  .vux-tab{height: 1rem;box-shadow: 0px 1px 5px #999;z-index: 2}
  .vux-tab .vux-tab-item{line-height: 1.1rem;font-size: 0.34rem;}
  .vux-tab >>> .vux-tab-ink-bar{bottom: 0.1rem;}
  .BBSwiper .vux-slider{height: 100%;}

  .dialogBox {
    /*border-radius: 0.20rem;*/
    font-size: 0.34rem;
    background-color: #fff;
  }
  .sureTitel {
    padding: 0.20rem 0;
    text-align: center;
  }
  .sureBtn {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
  }
  .sureBtnCancel,.sureBtnSure {
    padding: 0.35rem 0;
    text-align: center;
    width: 3.25rem;
  }
  .sureBtnSure {
    color: #fff;
    background-color: #f15352;
  }
  .titlePassword {
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 0.20rem;
    margin-bottom: 0.20rem;
  }
  .xdialog >>> .weui-dialog {
    display: block !important;
    height: 3.62rem !important;
    min-width: 6.00rem !important;
  }
</style>
