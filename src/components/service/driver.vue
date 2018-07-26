<template>
  <div class="bb_page">
    <x-header :msg="HeaderText"></x-header>
    <div class="content" :style="{paddingBottom:addPaddingBot+'px'}">
      <shadow-box>
        <housekeep-name-line :serviceType="serviceType" :typeList="classify" :selectVal="selectData.input1.value" @changeType="changeType"></housekeep-name-line>
      </shadow-box>
      <shadow-box>
        <housekeep-photo  :serviceType="serviceType"></housekeep-photo>
      </shadow-box>
      <shadow-box>
        <housekeep-address :serviceType="serviceType" :labelText="addressText" :selectVal="datas.housekeepAddress.input1.value" @toMap="toMap"></housekeep-address>
      </shadow-box>
      <shadow-box>
        <housekeep-address :serviceType="serviceType" :double="true" :labelText="addressText1" :selectVal="datas.housekeepAddress.input3.value" @toMap="toMap1"></housekeep-address>
      </shadow-box>
      <shadow-box>
        <housekeep-time :serviceType="serviceType" @changeTime="changeTime"></housekeep-time>
      </shadow-box>
      <shadow-box>
        <goumai-quicken :serviceType="serviceType" @changeQuicken="changeQuicken" @changeIntegral="changeIntegral"></goumai-quicken>
      </shadow-box>
    </div>
    <x-bottom ref="bot" :serviceType="serviceType" :datas="koudianResult" @submit="sub"></x-bottom>
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
  import xHeader from '@/components/service/common/xHeader'
  import xBottom from '@/components/service/common/xBottom'
  import serviceBanlance from '@/components/service/common/serviceBanlance'
  import { XDialog, } from 'vux'

  import ShadowBox from '@/components/service/common/shadowBox'
  import housekeepNameLine from '@/components/service/common/housekeepNameLine'
  import housekeepPhoto from '@/components/service/common/housekeepPhoto'
  import housekeepAddress from '@/components/service/common/housekeepAddress'
  import housekeepTime from '@/components/service/common/housekeepTime'
  import goumaiQuicken from '@/components/service/common/goumaiQuicken'
  import { serviceClassify,koudian3 } from '@/api/service'
  import { getAddress } from '@/api/personally'
  import { setStore, getStore } from "@/untils/storage"
  import { checkPhone,checkString } from '@/untils/untils'

  export default {
    data(){
      return{
        serviceType:'driver',
        HeaderText:'司机帮',
        showDialogStyle:false,     //dialog状态
        popass:false,              //dialog状态
        addPaddingBot:0,/////////////////添加下padding
        addressText:['出发地址'],
        addressText1:['目的地址'],
        quickenIndex:0,//加速方式
        invoiceVal:[], //发票状态
        addressVal:'', //地址行
        photo5:[],    //图片行
        classify:[],   //二级分类
        roadLen:0,     //距离
        adcode:'',       //adcode
        koudianResult:{},   //扣点数据
        password:'',     //密码未加密
        pwd:'',     //密码加密
        helperId:'',
      }
    },
    beforeRouteEnter(to,from,next){
      next( vm => {
        if(from.path==='/x/serviceMap'){
          vm.getClassify()
          if(vm.$store.state.service.driverAddressState=='00'){
//            vm.$store.state.service.driver.housekeepAddress.input2=vm.$store.state.service.mapAddr;
            vm.$store.state.service.driver.housekeepAddress.input2 = vm.$store.state.service.mapStreet;      //获取街道
//            vm.addressVal = vm.$store.getters['service/mapAdcodeArr'];   //改变selectAddress初始是状态
            vm.$store.state.service.driver.housekeepAddress.input1 = {value:vm.$store.getters['service/mapAdcodeArr'],name:vm.$store.state.service.mapAddressArr}   ////改变三级联动数据
          }else if(vm.$store.state.service.driverAddressState=='01'){
//            vm.$store.state.service.driver.housekeepAddress.input4=vm.$store.state.service.mapAddr;
            vm.$store.state.service.driver.housekeepAddress.input4 = vm.$store.state.service.mapStreet;      //获取街道
//            vm.addressVal = vm.$store.getters['service/mapAdcodeArr'];   //改变selectAddress初始是状态
            vm.$store.state.service.driver.housekeepAddress.input3 = {value:vm.$store.getters['service/mapAdcodeArr'],name:vm.$store.state.service.mapAddressArr}   ////改变三级联动数据
          }else{

          }
          console.log(vm.$store.state.service.mapAddr,'feffe')
          vm.getLoad();
        }else{
          vm.getClassify();
          vm.$store.state.service.addressState='01'
        }
      })
    },
    computed:{
      selectData(){
        return this.$store.state.service.driver.serviceType;
      },
      datas(){
        return this.$store.state.service.driver;
      },
      geocoder(){
        return new AMap.Geocoder();
      },
      riding(){
        return new AMap.Riding();
      }
    },
    components:{xHeader,xBottom,ShadowBox,housekeepPhoto,housekeepNameLine,housekeepAddress,housekeepTime,goumaiQuicken,serviceBanlance,XDialog},
    mounted(){
      this.getClassify();

      setTimeout(()=>{
        this.addPaddingBot = this.$refs.bot.$el.clientHeight;
      },20)
    },
    methods:{
      housekeepval(a){   //获取发票状态
        this.invoiceVal=a;
        console.log(this.invoiceVal)
      },
      getQuickenIndex(a){    //获取加速
        this.quickenIndex = a;
        console.log(this.quickenIndex)
      },
      getAddress(a){     //获取地址
        this.addressVal = a;
        console.log(this.addressVal)
      },
      getPhoto(a){      //获取图片信息
        this.photo5 = a;
        console.log(this.photo5)
      },
      //点击提交按钮
      upload(){
        let img=[]
        if(this.$store.state.service.driver.housekeepPhoto.input2.files.length>0){
          this.$store.commit('setLoading',true)
          this.$store.commit('setLoadingText','正在上传图片...')
          img = this.multipartUpload(this.$store.state.service.driver.housekeepPhoto.input2.files);
        }else{  //用户没有上传图片时，提示并返回.
//          this.$store.commit('setToastText','请上传图片')
//          this.$store.commit('setToastType','error')
//          return false;
        }

        let interval = setInterval(()=>{
          if(img.length==this.$store.state.service.driver.housekeepPhoto.input2.files.length){
            clearTimeout(timeout)
            this.$store.commit('setLoading',false)
            this.submit(img.join(','));
            clearInterval(interval)
          }else{
            console.log('正在上传图片')
          }
        },500)
        let timeout = setTimeout(()=>{
          clearInterval(interval)
          this.$store.commit('setLoading',false)
          this.$store.commit('setToastText','服务器超时')
          this.$store.commit('setToastType','error')
          clearTimeout(timeout)
        },15000)

      },
      //
      sub(){
        if(this.datas.quicken.input2>0){
          this.showDialogStyle = true
          this.popass = true
        }else{
          this.upload();
        }
      },
      //初始化支付密码格式
      pwd_zhifu(){
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
      },
      submit(img){
        this.pwd_zhifu()
        console.log(img)
        let params;
        params = {
          serviceImgs:img,         //用户上传图片
          serviceProjectId:this.datas.serviceType.input1.value,    //服务项目Id(二级分类)
          serviceTypeName:this.datas.serviceType.input1.name,
          contactsPeople:this.datas.serviceType.input2,    //用户姓名
          serviceProviderId:'',    //服务者id
          contactsPeoplePhone:this.datas.serviceType.input3,    //用户联系方式
          serviceContent:this.datas.housekeepPhoto.input1,    //服务内容
          startingAddress:this.datas.housekeepAddress.input2,    //出发地址
          destinationAddress:this.datas.housekeepAddress.input4,    //目的地址
          isInvoice:this.datas.housekeepTime.input2==''?0:this.datas.housekeepTime.input2,    //是否开发票
          accelerateCost:this.datas.quicken.input1==''?0:this.datas.quicken.input1,    //加速费用
          useIntegralNum:this.datas.quicken.input2==null?0:this.datas.quicken.input2,    //积分使用数量
          areaCode1:this.datas.housekeepAddress.input1.value[2],    //出发地址县Adcode
          areaCode2:this.datas.housekeepAddress.input3.value[2],    //到达地址县Adcode
          timeOfAppointment:this.datas.housekeepTime.input1.value,    //预约时间
          road:Math.ceil(this.roadLen/1000),    //路程距离
          password:this.pwd,    //使用积分校验密码（积分为0，可以不传）
          adcode:this.adcode,
          helperId:this.helperId,
        };
        console.log(this.datas.housekeepPhoto)
        if(this.checkInputValue(params)==false){
          return false;
        }
        console.log("下单参数1",params);
        this.requestURL(params)
      },
      //生成订单
      requestURL(params){
        this.$store.commit('setLoading',true)
        this.axios.post('/service/driverOrder/insertDriverOrder',this.qs.stringify(params))
          .then((response)=>{
            this.$store.commit('setLoading',false)
            console.log(response.data,'服务下单数据')
            if(response.data.result==1){
              if(response.data.data==null){      //返回为null,获取错误信息
                console.log('nullnull')
                this.$store.commit('setToastText',response.data.message)
                this.$store.commit('setToastType','warn')
              }else{
                this.$store.commit('service/initDriver')
                this.$router.push({path:'/y/paymentMethod', query: {orderId: response.data.data.orderId,settlementType:4,key:response.data.data.price}})
              }
            }else{
              this.$store.commit('setToastText',response.data.message)
              this.$store.commit('setToastType','warn')
            }
          })
          .catch((error)=>{
            this.$store.commit('setLoading',false)
            console.log("服务下单接口error");
          })
      },
      //  初始化tab
      initTab(){
        if(this.$route.query.serveCatyId!=undefined){
          console.log('地址栏有参数')
          this.classify.map((item)=>{
            if(this.$route.query.serveCatyId== item.value){
              this.$store.state.service.driver.serviceType.input1.value=item.value;
              this.$store.state.service.driver.serviceType.input1.name=item.name;
            }else{

            }
          })
          if(this.$route.query.helperId!=undefined){
            this.helperId = this.$route.query.helperId;
          }else{
            this.helperId = ''
          }
        }else{
          console.log('地址栏无参数')
          if(this.$store.state.service.driver.serviceType.input1.value==''){
            this.$store.state.service.driver.serviceType.input1.value=this.classify[0].value;
            this.$store.state.service.driver.serviceType.input1.name=this.classify[0].name;
          }else{
            this.classify.map((item)=>{
              if(this.$store.state.service.driver.serviceType.input1.value == item.value){
                this.$store.state.service.driver.serviceType.input1.value=item.value;
                this.$store.state.service.driver.serviceType.input1.name=item.name;
              }else{

              }
            })
          }
        }

      },
      //获取服务二级分类
      getClassify(){
        serviceClassify().then((res)=>{
          console.log(res,'serviceClassify')
          this.classify=[];
          let item = {value:'',name:''};
          if(res.message=='success'){
            for(let i=0;i<res.data[3].twoServer.length;i++){
              item={}
              item.value=res.data[3].twoServer[i].serveCatyId;
              item.name=res.data[3].twoServer[i].serveCatyName;
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
      toMap(){
        this.$store.state.service.driverAddressState='00'
      },
      toMap1(){
        this.$store.state.service.driverAddressState='01'
      },
      //计算距离
      getLoad(){
        let addr1 = this.$store.state.service.driver.housekeepAddress.input1.name+this.$store.state.service.driver.housekeepAddress.input2
        let addr2 = this.$store.state.service.driver.housekeepAddress.input3.name+this.$store.state.service.driver.housekeepAddress.input4
        let i3=[],i5=[]
        if(this.$store.state.service.driver.housekeepAddress.input2!=''&&this.$store.state.service.driver.housekeepAddress.input4!=''){      //两个地址输入完整
          this.geocoder.getLocation(addr1, (status, result)=>{
            if (status === 'complete' && result.info === 'OK') {
              i3.push(result.geocodes[0].location.lng)
              i3.push(result.geocodes[0].location.lat)
              this.geocoder.getLocation(addr2, (status, result)=>{
                if (status === 'complete' && result.info === 'OK') {
                  i5.push(result.geocodes[0].location.lng)
                  i5.push(result.geocodes[0].location.lat)
//                  this.roadLen = AMap.GeometryUtil.distance(i3, i5);
                  this.riding.search(i3, i5,(status,result)=>{
                    if (status === 'complete' && result.info === 'OK') {
                      this.roadLen = result.routes[0].distance;
                      this.koudian();
                      console.log("success")
                    }
                  });
                }else{
                  this.$store.commit('setToastText','计算距离失败')
                  this.$store.commit('setToastType','warn')
                  this.roadLen=0;
                  this.koudian();
                }
              })
            }else{
              this.$store.commit('setToastText','计算距离失败')
              this.$store.commit('setToastType','warn')
              this.roadLen=0;
              this.koudian();
            }
          })
        }else{        //地址输入不完整
          console.log('不是两个详细地址')
          this.roadLen=0;
          this.koudian();
        }

      },
      //改变二级分类
      changeType(){
        this.koudian();
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
      //执行扣点
      koudian(){
        //获取adcode
        if (getStore("curCityAdcode")) {
          this.adcode = getStore("curCityAdcode");
        }
        let params = {
          serveCatyId:this.$store.state.service.driver.serviceType.input1.value,        ///二级分类ID
          integralStr:this.$store.state.service.driver.quicken.input2,            //使用积分
          quickenPriceStr:this.$store.state.service.driver.quicken.input1,        //加速费用
          timeStr:this.$store.state.service.driver.housekeepTime.input1.value,                //下单时间
          adcode:this.adcode,                 //行政区划编码
          kmNumStr:Math.ceil(this.roadLen/1000),              //距离
          type:2,        //是否随意买（1.是；2.不是）
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
      checkInputValue(params){
        if(params.contactsPeople===''){
          this.$store.commit('setToastText','请输入用户名')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.contactsPeoplePhone===''){
          this.$store.commit('setToastText','请输入联系方式')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(!checkPhone(params.contactsPeoplePhone).state){
          this.$store.commit('setToastText','手机号输入错误')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.serviceContent===''){
          this.$store.commit('setToastText','请输入服务说明')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(!checkString(params.serviceContent)){
          this.$store.commit('setToastText','请勿输入非法字符')
          this.$store.commit('setToastType','warn')
          return false;
        }
//        else if(params.serviceImgs===''){
//          this.$store.commit('setToastText','请上传照片')
//          this.$store.commit('setToastType','warn')
//          return false;
//        }
        else if(params.areaCode1===''){
          this.$store.commit('setToastText','请选择出发地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.startingAddress===''){
          this.$store.commit('setToastText','请输入详细出发地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.areaCode2===''){
          this.$store.commit('setToastText','请目的地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.destinationAddress===''){
          this.$store.commit('setToastText','请输入详细目的地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.timeOfAppointment===''){
          this.$store.commit('setToastText','请选择预约时间')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.isInvoice===''){
          this.$store.commit('setToastText','请选择是否需要发票')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.accelerateCost===''){
          this.$store.commit('setToastText','请选择加速费用')
          this.$store.commit('setToastType','warn')
          return false;
        }
//        else if(params.useIntegralNum==''){
//          this.$store.commit('setToastText','请使用积分')
//          this.$store.commit('setToastType','warn')
//          return false;
//        }
        else{

        }
      },
      sureBtnCancel() {
        this.showDialogStyle = false
        this.popass = false
      },
      sureBtnSure() {
        this.showDialogStyle = false
        this.popass = false
        this.upload()
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
