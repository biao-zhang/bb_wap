<template>
  <div class="bb_page">
    <x-header :msg="HeaderText"></x-header>
    <div class="content" :style="{paddingBottom:addPaddingBot+'px'}">
      <shadow-box>
        <helper-tit-line :serviceType="serviceType"></helper-tit-line>
      </shadow-box>
      <shadow-box>
        <housekeep-photo :serviceType="serviceType"></housekeep-photo>
      </shadow-box>
      <shadow-box>
        <housekeep-address :serviceType="serviceType" :selectVal="addressVal"></housekeep-address>
      </shadow-box>
      <shadow-box>
        <remarks :serviceType="serviceType" @changeTime="changeTime"></remarks>
      </shadow-box>
      <shadow-box>
        <helper-price  :serviceType="serviceType" @getMoney="getMoney" :serveCatyId="serviceTypeInput1.value"></helper-price>
      </shadow-box>
      <shadow-box>
        <integral-line :serviceType="serviceType" @changeIntegral = changeIntegral></integral-line>
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
  import helperTitLine from '@/components/service/common/helperTitLine'
  import housekeepPhoto from '@/components/service/common/housekeepPhoto'
  import housekeepAddress from '@/components/service/common/housekeepAddress'
  import remarks from '@/components/service/common/remarks'
  import helperPrice from '@/components/service/common/helperPrice'
  import integralLine from '@/components/service/common/integralLine'
  import { serviceClassify,koudian2 } from '@/api/service'
  import { setStore, getStore } from "@/untils/storage";
  import { checkPhone,checkString } from '@/untils/untils'

  export default {
    data(){
      return{
        serviceType:'helper',
        HeaderText:'找帮手',
        addPaddingBot:0,/////////////////添加下padding
        showDialogStyle:false,     //dialog状态
        popass:false,              //dialog状态

        remarkVal:'',//截止时间
        invoiceVal:[], //发票状态
        addressVal:[], //地址行,
        photo5:[],    //图片行,
        titLineVal:[],   //tit行
        classify:[],      //二级分类列表(就一个)
        serviceTypeInput1:{value:'1',name:'1'},  //唯一一个二级分类
        adcode:'',   //区域编码
        koudianResult:{},  //扣点数据
        password:'',     //密码未加密
        pwd:'',     //密码加密
        helperId:''
      }
    },
    beforeRouteEnter(to,from,next){
      next( vm => {
        if(from.path==='/x/serviceMap'){
          vm.getClassify()
          console.log(vm.$store.state.service.mapAddr,'feffe')
//          vm.$store.state.service.helper.housekeepAddress.input2 = vm.$store.state.service.mapAddr;
          vm.$store.state.service.helper.housekeepAddress.input2 = vm.$store.state.service.mapStreet;      //获取街道
          vm.addressVal = vm.$store.getters['service/mapAdcodeArr'];   //改变selectAddress初始是状态
          vm.$store.state.service.helper.housekeepAddress.input1 = {value:vm.addressVal,name:vm.$store.state.service.mapAddressArr}   ////改变三级联动数据
        }else{
          vm.getClassify();  //获取服务二级分类
          vm.addressVal = vm.$store.state.service.helper.housekeepAddress.input1.value;
        }
      })
    },
    computed:{
      datas(){
        return this.$store.state.service.helper;
      }
    },
    mounted(){
      if(this.$route.query.helperId!=undefined){
        this.helperId = this.$route.query.helperId;
      }else{
        this.helperId = ''
      }
      setTimeout(()=>{
        this.addPaddingBot = this.$refs.bot.$el.clientHeight;
//        this.addressVal = this.$store.state.service.helper.housekeepAddress.input1.value;
      },20)
    },
    components:{xHeader,xBottom,ShadowBox,helperTitLine,housekeepPhoto,housekeepAddress,remarks,helperPrice,integralLine,serviceBanlance,XDialog},
    methods:{
      remarkInputVal(a){  //获取截止时间
        this.remarkVal = a;
        console.log(this.remarkVal)
      },
      housekeepval(a){   //获取发票状态
        this.invoiceVal=a;
        console.log(this.invoiceVal)
      },
      getPhoto(a){      //获取图片信息
        this.photo5 = a;
        console.log(this.photo5)
      },
//      getTitLineVal(a){    //获取titLine信息
//        this.titLineVal = a;
//        console.log(this.titLineVal)
//      }
      //获取价钱
      getMoney(a){
        console.log(a)
        this.koudian()
      },
      //获取使用的积分
      changeIntegral(a){
        this.datas.integralLine.input1=a;
        this.koudian()
      },
      //获取预约时间
      changeTime(){
        console.log(this.$store.state.service.helper.remarks.input2.value)
        this.koudian()
      },
      //执行扣点
      koudian(){
        //获取adcode
        if (getStore("curCityAdcode")) {
          this.adcode = getStore("curCityAdcode");
        }
        let params = {
          serveCatyId:this.serviceTypeInput1.value,        ///二级分类ID
          integralStr:this.$store.state.service.helper.integralLine.input1,            //使用积分
          moneyStr:this.$store.state.service.helper.priceLine.input1,        //加速费用
          timeStr:this.$store.state.service.helper.remarks.input2.value,                //下单时间
          adcode:this.adcode,                 //行政区划编码
        }
        console.log('扣点参数',params)
        koudian2(params).then((res)=>{
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
      //获取服务二级分类
      getClassify(){
        serviceClassify().then((res)=>{
          console.log(res,'serviceClassify')
          this.classify=[];
          let item = {value:'',name:''};
          if(res.message=='success'){
            for(let i=0;i<res.data[4].twoServer.length;i++){
              item={}
              item.value=res.data[4].twoServer[i].serveCatyId;
              item.name=res.data[4].twoServer[i].serveCatyName;
              this.classify.push(item);     //获取所有二级分类
            }
            this.serviceTypeInput1=this.classify[0];
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
      //点击提交按钮
      upload(){
        let img=[]
        if(this.$store.state.service.helper.housekeepPhoto.input2.files.length>0){
          this.$store.commit('setLoading',true)
          this.$store.commit('setLoadingText','正在上传图片...')
          img = this.multipartUpload(this.$store.state.service.helper.housekeepPhoto.input2.files);
        }else{  //用户没有上传图片时，提示并返回.
//          this.$store.commit('setToastText','请上传图片')
//          this.$store.commit('setToastType','warn')
//          return false;
        }

        let interval = setInterval(()=>{
          if(img.length==this.$store.state.service.helper.housekeepPhoto.input2.files.length){
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
        if(this.datas.integralLine.input1>0){
          this.showDialogStyle = true
          this.popass = true
        }else{
          this.upload();
        }
      },
      //初始化支付密码格式
      pwd_zhifu(){
        this.pwd = '';
        if(this.datas.integralLine.input1>0){  //输入的积分>0
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
          serviceProjectName:this.datas.serviceType.input1,      //服务项目名称
          serviceProjectId:this.classify[0].value,    //服务分类
          contactsPeople:this.datas.serviceType.input2,    //用户姓名
          serviceProviderId:'',    //服务者id
          contactsPeoplePhone:this.datas.serviceType.input3,    //用户联系方式
          serviceContent:this.datas.housekeepPhoto.input1,    //服务内容
          serviceCost:this.datas.priceLine.input1,    //服务费用
          isInvoice:this.datas.priceLine.input2==''?0:this.datas.priceLine.input2,    //是否开发票
          useIntegralNum:this.datas.integralLine.input1==null?0:this.datas.integralLine.input1,    //积分使用数量
          address:this.datas.housekeepAddress.input2,    //详细地址
          deadline:this.datas.remarks.input2.value,    //截止时间
          areaCode:this.datas.housekeepAddress.input1.value[2],    //县Adcode
          password:this.pwd,    //使用积分校验密码（积分为0，可以不传）
          adcode:this.adcode,    //adcode
          helperId:this.helperId,
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
        this.axios.post('/service/findHelpOrder/insertFindHelpOrder',this.qs.stringify(params))
          .then((response)=>{
            this.$store.commit('setLoading',false)
            console.log(response.data,'服务下单数据')
            if(response.data.result==1){
              if(response.data.data==null){      //返回为null,获取错误信息
                this.$store.commit('setToastText',response.data.message)
                this.$store.commit('setToastType','warn')
                console.log('nullnull')
              }else{
                this.$store.commit('service/initHelper')
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
        if(params.contactsPeople===''){
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
        }else if(params.serviceContent===''){
          this.$store.commit('setToastText','请填写服务说明')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(!checkString(params.serviceContent)){
          this.$store.commit('setToastText','请勿输入非法字符')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.areaCode===''){
          this.$store.commit('setToastText','请选择服务地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.address===''){
          this.$store.commit('setToastText','请选择详细地址')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.deadline===''){
          this.$store.commit('setToastText','请选择截止时间')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.serviceCost===''){
          this.$store.commit('setToastText','请输入服务费用')
          this.$store.commit('setToastType','warn')
          return false;
        }else if(params.isInvoice===''){
          this.$store.commit('setToastText','请选择是否开发票')
          this.$store.commit('setToastType','warn')
          return false;
        }else{
          return true;
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
