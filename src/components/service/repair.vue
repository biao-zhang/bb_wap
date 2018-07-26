<template>
  <div class="bb_page">
    <x-header :msg="HeaderText"></x-header>
    <div class="content" :style="{paddingBottom:addPaddingBot+'px'}">
      <shadow-box>
        <repair-name-line :serviceType="serviceType" :typeList="classify" @changeType="changeType"></repair-name-line>
      </shadow-box>
      <shadow-box>
        <housekeep-photo :serviceType="serviceType"></housekeep-photo>
      </shadow-box>
      <shadow-box>
        <housekeep-address :serviceType="serviceType" :selectVal="addressVal"></housekeep-address>
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
  import repairNameLine from '@/components/service/common/repairNameLine'
  import housekeepPhoto from '@/components/service/common/housekeepPhoto'
  import housekeepAddress from '@/components/service/common/housekeepAddress'
  import housekeepTime from '@/components/service/common/housekeepTime'
  import goumaiQuicken from '@/components/service/common/goumaiQuicken'
  import { setStore, getStore } from "@/untils/storage";
  import { serviceClassify,koudian1 } from '@/api/service'
  import { checkPhone,checkString } from '@/untils/untils'

  export default {
    data(){
      return{
        serviceType:'repair',
        HeaderText:'维修帮',
        addPaddingBot:0,/////////////////添加下padding
        showDialogStyle:false,     //dialog状态
        popass:false,              //dialog状态

        quickenIndex:0,//加速方式
        invoiceVal:[], //发票状态
        addressVal:[], //地址行,
        nameLineVal:[],   //nameLine行
        photo5:[],    //图片行
        classify:[],       //二级分类
        adcode:'',
        koudianResult:{},
        password:'',     //密码未加密
        pwd:'',     //密码加密
        helperId:'',
      }
    },
    beforeRouteEnter(to,from,next){
      next( vm => {
        if(from.path==='/x/serviceMap'){
          vm.getClassify()
          console.log(vm.$store.state.service.mapAddr,'feffe')
//          vm.$store.state.service.repair.housekeepAddress.input2 = vm.$store.state.service.mapAddr;
          vm.$store.state.service.repair.housekeepAddress.input2 = vm.$store.state.service.mapStreet;      //获取街道
          vm.addressVal = vm.$store.getters['service/mapAdcodeArr'];   //改变selectAddress初始是状态
          vm.$store.state.service.repair.housekeepAddress.input1 = {value:vm.addressVal,name:vm.$store.state.service.mapAddressArr}   ////改变三级联动数据
        }else{
          vm.getClassify();  //获取服务二级分类
          vm.addressVal = vm.$store.state.service.repair.housekeepAddress.input1.value;
        }
      })
    },
    computed:{
      datas(){
        return this.$store.state.service.repair;
      }
    },
    components:{xHeader,xBottom,ShadowBox,repairNameLine,housekeepPhoto,housekeepAddress,housekeepTime,goumaiQuicken,serviceBanlance,XDialog},
    mounted(){

      setTimeout(()=>{
        this.addPaddingBot = this.$refs.bot.$el.clientHeight;
//        this.addressVal = this.$store.state.service.repair.housekeepAddress.input1.value;
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
//      getNameLineData(a){    //获取name行
//        this.nameLineVal = a;
//        console.log(this.nameLineVal)
//      },
      getPhoto(a){      //获取图片信息
        this.photo5 = a;
        console.log(this.photo5)
      },

      //  初始化tab
      initTab(){
        if(this.$route.query.serveCatyId!=undefined){
          console.log('地址栏有参数')
          this.classify.map((item)=>{
            if(this.$route.query.serveCatyId== item.value){
              this.$store.state.service.repair.serviceType.input1.value=item.value;
              this.$store.state.service.repair.serviceType.input1.name=item.name;
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
          if(this.$store.state.service.repair.serviceType.input1.value==''){
            this.$store.state.service.repair.serviceType.input1.value=this.classify[0].value;
            this.$store.state.service.repair.serviceType.input1.name=this.classify[0].name;
          }else{
            this.classify.map((item)=>{
              if(this.$store.state.service.repair.serviceType.input1.value == item.value){
                this.$store.state.service.repair.serviceType.input1.value=item.value;
                this.$store.state.service.repair.serviceType.input1.name=item.name;
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
            for(let i=0;i<res.data[2].twoServer.length;i++){
              item={}
              item.value=res.data[2].twoServer[i].serveCatyId;
              item.name=res.data[2].twoServer[i].serveCatyName;
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
      //二级分类发生变化
      changeType(){
        this.koudian();
      },
      //预约时间改变
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
          serveCatyId:this.$store.state.service.repair.serviceType.input1.value,        ///二级分类ID
          integralStr:this.$store.state.service.repair.quicken.input2,            //使用积分
          quickenPriceStr:this.$store.state.service.repair.quicken.input1,        //加速费用
          timeStr:this.$store.state.service.repair.housekeepTime.input1.value,                //下单时间
          adcode:this.adcode,                 //行政区划编码
        }
        console.log('扣点参数',params)
        koudian1(params).then((res)=>{
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
            return false;
          }else{
            this.pwd = md5(this.password);
          }
        }else{
          this.pwd='';
        }
      },
      //点击提交按钮
      upload(){
        this.pwd_zhifu();
        let img=[]
        if(this.$store.state.service.repair.housekeepPhoto.input2.files.length>0){
          this.$store.commit('setLoading',true)
          this.$store.commit('setLoadingText','正在上传图片...')
          img = this.multipartUpload(this.$store.state.service.repair.housekeepPhoto.input2.files);
        }else{  //用户没有上传图片时，提示并返回.
//          this.$store.commit('setToastText','请上传图片')
//          this.$store.commit('setToastType','warn')
//          return false;
        }

        let interval = setInterval(()=>{
          if(img.length==this.$store.state.service.repair.housekeepPhoto.input2.files.length){
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
          this.$store.commit('setToastType','warn')
          clearTimeout(timeout)
        },15000)

      },
      submit(img){
        console.log(img)
        let params;
        params = {
          serviceImgs:img,         //用户上传图片
          serviceProjectId:this.datas.serviceType.input1.value,    //服务分类
          brand:this.datas.serviceType.input2,    //品牌型号
          contactsPeople:this.datas.serviceType.input3,    //用户姓名
          serviceProviderId:'',    //服务者id
          contactsPeoplePhone:this.datas.serviceType.input4,    //用户联系方式
          faultContent:this.datas.housekeepPhoto.input1,    //故障说明
          serviceAddress:this.datas.housekeepAddress.input2,    //服务地址
          areaCode:this.datas.housekeepAddress.input1.value[2],    //县Adcode
          timeOfAppointment:this.datas.housekeepTime.input1.value,    //预约时间（毫秒值）
          isInvoice:this.datas.housekeepTime.input2==''?0:this.datas.housekeepTime.input2,    //是否开发票( 0:否 1:是)
          accelerateCost:this.datas.quicken.input1,    //加速费用
          useIntegralNum:this.datas.quicken.input2==null?0:this.datas.quicken.input2,    //积分使用数量
          password:this.pwd,
          adcode:this.adcode,
          helperId:this.helperId
        };
        if(this.checkInputValue(params)==false){
          return false;
        }
        console.log("下单参数1",params);
        this.requestURL(params)
      },
      //生成订单
      requestURL(params){
        this.$store.commit('setLoading',true)
        this.axios.post('/service/repairOrder/insertRepairOrder',this.qs.stringify(params))
          .then((response)=>{
            this.$store.commit('setLoading',false)
            console.log(response.data,'服务下单数据')
            if(response.data.result==1){
              if(response.data.data==null){      //返回为null,获取错误信息
                this.$store.commit('setToastText',response.data.message)
                this.$store.commit('setToastType','warn')
                console.log('nullnull')
              }else{
                this.$store.commit('service/initRepair')
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
      checkInputValue(params){
        if(params.brand===''){
          this.$store.commit('setToastText','请填写品牌')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.contactsPeople===''){
          this.$store.commit('setToastText','请填写联系人姓名')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.contactsPeoplePhone===''){
          this.$store.commit('setToastText','请填写联系方式')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(!checkPhone(params.contactsPeoplePhone).state){
          this.$store.commit('setToastText','手机号输入错误')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.faultContent===''){
          this.$store.commit('setToastText','请填写故障说明')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(!checkString(params.faultContent)){
          this.$store.commit('setToastText','请勿输入非法字符')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.areaCode===''){
          this.$store.commit('setToastText','请选择服务地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.serviceAddress===''){
          this.$store.commit('setToastText','请选择详细地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.timeOfAppointment===''){
          this.$store.commit('setToastText','请选择预约时间')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.isInvoice===''){
          this.$store.commit('setToastText','请选择是否开发票')
          this.$store.commit('setToastType','warn')
          return false;
        }else{

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
