<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ msg_m }}</x-header>
    </div>
    <div class="padding" v-if="!(shopIsNull&&dataType=='cart')">
      <div class="receiveAdd" @click="toSelectAddressPage" v-if="addressShow">
        <div class="receiveAddImg">
          <div style="display: flex; align-items: center"><i class="iconfont icon-dingwei"></i></div>
          <!--默认收货地址-->
          <div class="address_content" v-if="!no_defaultAddress">
            <div class="person">
              <span>收货人:{{datas.defaultAddress.userName}}</span>
              <span>{{datas.defaultAddress.phone}}</span>
            </div>
            <div class="person_address">
              <span>收货地址：</span><span >{{datas.defaultAddress.province}}{{datas.defaultAddress.city}}{{datas.defaultAddress.area}}    {{datas.defaultAddress.address}}</span>
            </div>
          </div>
          <!--没有默认收货地址-->
          <div class="address_content" v-if="no_defaultAddress">
            没有默认收货地址
          </div>
          <div style="display: flex; align-items: center"><i class="iconfont icon-youjiantou1"></i></div>
        </div>
      </div>
      <!--ordercontent-->
      <div >
        <span v-if="datas!=null" v-for="(item,index) in datas.shopList" :key="index">
          <order-content :datas="item" @changeCoupon="changeCoupon" @distributionType="distributionTypeF"> </order-content>
        </span>
      </div>
      <!--other-->
      <div >
        <other-distribution @pullIntegral="getIntegral" @order_other_invoice_child="invoiceShow" :invoiceLabel = 'invoceTemplateLabel' :ratio="ratio"> </other-distribution>
      </div>
    </div>
    <div class="padding" v-if="shopIsNull&&dataType=='cart'">
      <p class="pTitle">终端店购物车商品已经生成订单!</p>
      <p class="pQuestion">
        <span @click="toPay">去结算</span>
        <span @click="toCart">返回购物车</span>
      </p>
    </div>
    <!--提交订单按钮-->
    <div class="submitOrder" v-if="!(shopIsNull&&dataType=='cart')">
      <div class="submitOrder_two">
        <span>合计金额：</span>
        <div class="submitOrderMoney">
          <span>￥</span>
          <span>{{datas.shouldPayTotalMoney}}</span>
        </div>
      </div>
      <div class="submitOrderBtn" @click="sub">提交订单</div>
    </div>
    <!--发票弹窗-->
    <div v-transfer-dom>
      <popup v-model="show13" position="bottom">
        <div class="popup_title">发票</div>
        <div class="popup_nav">
          <span class="popup_nav_1">发票抬头</span>
          <div class="popup_nav_two">
            <div class="popup_nav_two_com" v-bind:class="{company: isCompany}" @click="companyClick">公司</div>
            <div class="popup_nav_two_com" v-bind:class="{company: isPerself}" @click="perselfClick">个人</div>
          </div>
        </div>
        <div class="popup_name">
            <span class="popup_nav_2">名称</span>
            <input type="text" v-model="invoceTemplateName" placeholder="请输入名称" style="font-size: 0.24rem" />
        </div>
        <div class="popup_name" v-if="isCompany">
          <span class="popup_nav_2">税号</span>
          <input type="text" v-model="invoceTemplateNumber" placeholder="请输入纳税人识别号" style="font-size: 0.24rem" />
        </div>
        <div style="height: 5.00rem; background-color: #ffffff;position: relative">
          <div class="popupBtn" @click="popupBtn">确认</div>
        </div>
      </popup>
    </div>
    <!--dialog-->
    <div v-if="cursorState" class="xdialog">
      <x-dialog v-model="showDialogStyle" :dialog-style="{'background-color': 'transparent'}">
        <div class="dialogBox">
          <div class="sureTitel">
            <div class="titlePassword">请输入密码</div>
            <banlance @blur="blur"> </banlance>
          </div>
          <div class="sureBtn">
            <div
              class="sureBtnCancel"
              style="border-right: 1px solid #eee"
              @click="sureBtnCancel"
            >取消</div>
            <div class="sureBtnSure"
                 @click="sureBtnSure()"
            >确定</div>
          </div>
        </div>
      </x-dialog>
    </div>

  </div>
</template>
<script>
  import { XHeader, TransferDom, Popup } from 'vux'
  import SingleCoupon from '../../singleCoupon/singleCoupon'
  import OrderContent from './orderContent'
  import OtherDistribution from './otherDistribution'
  import { addInvoceTemplate } from '@/api/personally'
  import banlance from '@/components/shop/confirmOrder/banlance'
  import { XDialog, } from 'vux'
  export default {
    directives: {TransferDom},
    components: {XHeader,Popup,SingleCoupon,OrderContent,OtherDistribution,XDialog,banlance},
    data() {
      return {
        msg_m: '确认订单',
        addressShow:true,
        person_address: ['河南','郑州市','二七区航海路与经三路交叉口','安安瓜果菜A座1303'],
        show13: false,
        show14: false,
        isCompany: false,
        isPerself: false,
        distributionType:true,
        imgUrls: [

        ],
        productId:'1',
        num:1,
        activityId:'',
        activityType:'',
        dataType:'cart',
        curIntegral:0,//用户当前积分
        invoceTemplateName:'',//发票模板姓名
        invoceTemplateLabel:'无需发票',//发票Label
        invoceTemplateNumber:'',//发票模板数字
        password:'',
        showDialogStyle:false,   //支付密码弹窗显示或隐藏
        cursorState:false,         //支付密码框是否显示
      }
    },
    computed:{
      datas(){
        if(this.dataType=='cart'){                                    //购物车结算数据
          return this.$store.state.o2oCartOrder.cartOrderDatas;
        }else if(this.dataType=='nowBuy'){                            //立即购买结算数据
          console.log(this.$store.state.o2oNowBuyOrder.nowBuyOrderDatas)
          return this.$store.state.o2oNowBuyOrder.nowBuyOrderDatas;
        }else{
          this.$store.state.toastText='参数错误'
          this.$store.state.toastType='text'
        }
      },
      //      订单是否已经提交
      shopIsNull(){
        return this.$store.state.o2oCartOrder.shopIsNull;
      },
      no_defaultAddress(){
        if(this.dataType==='cart'){
          if(this.$store.state.o2oCartOrder.cartOrderDatas.defaultAddress==null){
            return true;
          }else{
            return false;
          }
        }else if(this.dataType==='nowBuy'){
          if(this.$store.state.o2oNowBuyOrder.nowBuyOrderDatas.defaultAddress==null){
            return true;
          }else{
            return false;
          }
        }else{
          this.$store.state.toastText='参数错误'
          this.$store.state.toastType='text'
          return true;
        }
      },
      ratio(){
        return this.$store.state.o2oCartOrder.ratio;
      },
    },
    watch:{
      datas:{
        handler(n,o){
          if(n==null){

          }
        },
        deep:true
      }
    },
    beforeRouteEnter(to,from,next){
      console.log(from)
      next( vm => {
        if(from.path==='/z/alladdress'){
          console.log(vm.$store.state.address.curAddressId)
          if(vm.$route.query.orderType==='cartOrder'){
            if(vm.$store.state.address.curAddressId==''){
              vm.$store.commit('setToastText','请选择收货地址')
              vm.$store.commit('setToastType','warn')
              return false;
            }
            vm.$store.dispatch({
              type:'o2oCartOrder/changeCartOrderAddress',
              addId:vm.$store.state.address.curAddressId,        //adcode  1000769660
              integral:vm.$store.state.o2oCartOrder.integral,  //抵扣积分
              invoiceTemplateId:vm.$store.state.o2oCartOrder.invoiceTemplateId,    //发票模板id
              redId:vm.$store.state.o2oCartOrder.redIds,         //红包id
              shopId:vm.shopId,
              isDsd:vm.distributionType?0:1,               //方式 : 默认店铺配送 1 上门自取
            })
          }else if(vm.$route.query.orderType==='nowBuyOrder'){
            if(vm.$store.state.address.curAddressId==''){
              vm.$store.commit('setToastText','请选择收货地址')
              vm.$store.commit('setToastType','warn')
              return false;
            }
            vm.$store.dispatch({
              type:'o2oNowBuyOrder/changeNowBuyOrderAddress',
              addId:vm.$store.state.address.curAddressId,        //adcode  1000769660
              integral:vm.$store.state.o2oNowBuyOrder.integral,  //抵扣积分
              invoiceTemplateId:vm.$store.state.o2oNowBuyOrder.invoiceTemplateId,    //发票模板id
              redId:vm.$store.state.o2oNowBuyOrder.redIds,         //红包id
              shopId:vm.shopId,
              goodsId:vm.goodsId,
              productId:vm.productId,
              productNum:vm.num,
              isDsd:vm.distributionType?0:1,             //方式 : 默认店铺配送 1 上门自取
            })
          }else{}

        }else{
          //获取兑换比例
          vm.$store.dispatch('o2oCartOrder/integralRatio')
          //页面初始化
          if(vm.dataType=='cart'){                //购物车结算
            vm.$store.commit('setLoading',true)
            vm.$store.dispatch({
              type:'o2oCartOrder/getCartOrderDatas',
              shopId:vm.shopId,
            })
          }else if(vm.dataType=='nowBuy'){      //商品立即购买结算
            vm.$store.commit('setLoading',true)
            vm.$store.dispatch({
              type:'o2oNowBuyOrder/getNowBuyOrderDatas',
              shopId:vm.shopId,
              goodsId:vm.goodsId,
              productId:vm.productId,
              productNum:vm.num,
            })
          }else{}
        }
      })
    },
    mounted(){
      //      获取query的orderType
      if(this.$route.query.orderType!==undefined){
        if(this.$route.query.orderType==='cartOrder'){
          this.dataType='cart'
          //      获取query的shopId
          if(this.$route.query.shopId!==undefined){
            this.shopId=this.$route.query.shopId
          }else{
            console.log('没有orderType和shopId')
          }
        }else{
          this.dataType='nowBuy'
          //      获取query的id(单品id)
          if(this.$route.query.id!==undefined){
            this.productId=this.$route.query.id
          }else{
            this.$store.state.toastText='参数错误'
            this.$store.state.toastType='text'
          }
          //      获取query的num
          if(this.$route.query.num!==undefined){
            this.num=parseInt(this.$route.query.num);
          }else{
            this.$store.state.toastText='参数错误'
            this.$store.state.toastType='text'
          }
          //      获取query的shopId
          if(this.$route.query.shopId!==undefined){
            this.shopId=this.$route.query.shopId
          }else{
            console.log('没有orderType和shopId')
          }
          //      获取query的goodsId
          if(this.$route.query.goodsId!==undefined){
            this.goodsId=this.$route.query.goodsId
          }else{
            console.log('没有orderType和goodsId')
          }
        }
      }else{
        this.$store.state.toastText='必须传参数orderType'
        this.$store.state.toastType='text'
      }

      setTimeout(()=>{
        console.log(this.$store.state.o2oCartOrder.cartOrderDatas,'cartOrderDatas')
      },5000)
    },
    methods: {
//      跳转到地址选择页面
      toSelectAddressPage(){
        this.$router.push({path:'/z/alladdress',query:{msg:'选择收货地址',id:this.$store.state.address.curAddressId}})
      },
//      积分改变
      getIntegral(a){
        console.log(a)
        if(this.dataType=='cart'){                //购物车结算
          this.$store.commit('o2oCartOrder/setIntegral',a)
          this.$store.commit('setLoading',true)
          this.$store.dispatch({
            type:'o2oCartOrder/changeCartOrderAddress',
            addId:this.$store.state.o2oCartOrder.addId,
            integral:a,  //抵扣积分
            invoiceTemplateId:this.$store.state.o2oCartOrder.invoiceTemplateId,    //发票模板id
            redIds:this.$store.state.o2oCartOrder.redIds,         //红包id
            shopId:this.shopId,
            isDsd:this.distributionType?0:1,               //方式 : 默认店铺配送 1 上门自取
          })
        }else if(this.dataType=='nowBuy'){      //商品立即购买结算
          this.$store.commit('o2oNowBuyOrder/setIntegral',a)
          this.$store.commit('setLoading',true)
          this.$store.dispatch({
            type:'o2oNowBuyOrder/changeNowBuyOrderAddress',
            redIds:this.$store.state.o2oCartOrder.redIds,         //红包id
            addId:this.$store.state.o2oNowBuyOrder.addId,        //adcode  1000769660
            integral:a,  //抵扣积分
            invoiceTemplateId:this.$store.state.o2oNowBuyOrder.invoiceTemplateId,    //发票模板id
            redId:this.$store.state.o2oNowBuyOrder.redIds,         //红包id
            shopId:this.shopId,
            goodsId:this.goodsId,
            productId:this.productId,
            productNum:this.num,
            isDsd:this.distributionType?0:1,             //方式 : 默认店铺配送 1 上门自取
          })
        }else{}
      },
      couponClick() {
        this.show14 = true;
        console.log('使用优惠券')
      },
      popupBtn() {
        this.show13 = false;
        let type = '0',name='',number='';
        console.log('确认使用发票')
        if(this.isCompany!=true&&this.isPerself!=true){         //判断是否选择了发票类型
          this.$store.state.toastText='请选择发票类型'
          this.$store.state.toastType='text'
          return false;
        }
        if(this.isCompany==true) {  //发票类型为公司
          type='1'
          if(this.invoceTemplateNumber==''){    //税号
            this.$store.state.toastText='请填写税号'
            this.$store.state.toastType='text'
            return false
          }else{
            number = this.invoceTemplateNumber;
          }
        }
        if(this.isPerself==true) {  //发票类型为个人
          type='2'
        }
        if(this.invoceTemplateName==''){  //发票上的姓名
          this.$store.state.toastText='请填写发票姓名'
          this.$store.state.toastType='text'
          return false;
        }else{
          name = this.invoceTemplateName;
        }

        //新增发票模板
        var params = {
          invoiceType:type,      //发票类型(2:个人1:企业)
          identifyNumber:number,    //纳税人识别号(只有企业有)
          invoiceTitle:name,    //发票姓名
          isdefault:1,        //0非默认 1默认
        }
        addInvoceTemplate(params).then(res => {
          if (res.result) {
            this.invoceTemplateLabel = res.data.invoiceTitle;
            if(this.dataType=='cart'){                //购物车结算
              this.$store.commit('o2oCartOrder/setInvoiceTemplateId',res.data.id)
              this.$store.commit('setLoading',true)
              this.$store.dispatch({
                type:'o2oCartOrder/changeCartOrderAddress',
                addId:this.$store.state.o2oCartOrder.addId,
                integral:this.$store.state.o2oCartOrder.integral,  //抵扣积分
                invoiceTemplateId:this.$store.state.o2oCartOrder.invoiceTemplateId,    //发票模板id
                redId:this.$store.state.o2oCartOrder.redIds,         //红包id
                shopId:this.shopId,
                isDsd:this.distributionType?0:1,               //方式 : 默认店铺配送 1 上门自取
              })
            }else if(this.dataType=='nowBuy'){      //商品立即购买结算
              this.$store.commit('o2oNowBuyOrder/setInvoiceTemplateId',res.data.id)
              console.log({
                addId:this.$store.state.o2oNowBuyOrder.addId,        //adcode  1000769660
                integral:this.$store.state.o2oNowBuyOrder.integral,  //抵扣积分
                invoiceTemplateId:this.$store.state.o2oNowBuyOrder.invoiceTemplateId,    //发票模板id
                redId:this.$store.state.o2oNowBuyOrder.redIds,         //红包id
                shopId:this.shopId,
                goodsId:this.goodsId,
                productId:this.productId,
                productNum:this.num,
                isDsd:this.distributionType?0:1,             //方式 : 默认店铺配送 1 上门自取
              })
              this.$store.commit('setLoading',true)
              this.$store.dispatch({
                type:'o2oNowBuyOrder/changeNowBuyOrderAddress',
                addId:this.$store.state.o2oNowBuyOrder.addId,        //adcode  1000769660
                integral:this.$store.state.o2oNowBuyOrder.integral,  //抵扣积分
                invoiceTemplateId:this.$store.state.o2oNowBuyOrder.invoiceTemplateId,    //发票模板id
                redId:this.$store.state.o2oNowBuyOrder.redIds,         //红包id
                shopId:this.shopId,
                goodsId:this.goodsId,
                productId:this.productId,
                productNum:this.num,
                isDsd:this.distributionType?0:1,             //方式 : 默认店铺配送 1 上门自取
              })
            }else{}
          } else {

          }
        }).catch((err)=>{
          this.$store.state.toastText='添加发票失败'
          this.$store.state.toastType='text'

        });
      },
      companyClick() {
        this.isCompany = true;
        this.isPerself = false;
        console.log('公司')
      },
      perselfClick() {
        this.isCompany = false;
        this.isPerself = true;
        console.log('个人')
      },
//使用折扣红包
      changeCoupon(id){
        if(this.dataType=='cart'){                //购物车结算
          this.$store.commit('o2oCartOrder/setRedIds',id)
          this.$store.commit('setLoading',true)
          this.$store.dispatch({
            type:'o2oCartOrder/changeCartOrderAddress',
            addId:this.$store.state.o2oCartOrder.addId,        //adcode  1000769660
            integral:this.$store.state.o2oCartOrder.integral,  //抵扣积分
            invoiceTemplateId:this.$store.state.o2oCartOrder.invoiceTemplateId,    //发票模板id
            redId:this.$store.state.o2oCartOrder.redIds,         //红包id
            shopId:this.shopId,
            isDsd:this.distributionType?0:1,               //方式 : 默认店铺配送 1 上门自取
          })
        }else if(this.dataType=='nowBuy'){      //商品立即购买结算
          this.$store.commit('o2oNowBuyOrder/setRedIds',id)
          this.$store.commit('setLoading',true)
          this.$store.dispatch({
            type:'o2oNowBuyOrder/changeNowBuyOrderAddress',
            goodsId:this.goodsId,
            productId:this.productId,
            productNum:this.num,
            shopId:this.shopId,
            redId:this.$store.state.o2oNowBuyOrder.redIds,
            addId:this.$store.state.o2oNowBuyOrder.addId,
            invoiceTemplateId:this.$store.state.o2oNowBuyOrder.invoiceTemplateId,
            integral:this.$store.state.o2oNowBuyOrder.integral,
            isDsd:this.distributionType?0:1,             //方式 : 默认店铺配送 1 上门自取
          })
        }else{}

      },

      /*提交订单*/
      submitOrderBtn() {
        if(this.dataType=='cart'){                //购物车结算
          console.log('020购物车参数',{
            shopId:this.shopId,
            isDsd:this.distributionType?0:1,
            remark:'',
            addId:this.$store.state.o2oCartOrder.addId,
            integral:this.$store.state.o2oCartOrder.integral,
            redId:this.$store.state.o2oCartOrder.redId,
            invoiceTemplateId:this.$store.state.o2oCartOrder.invoiceTemplateId,
            password:parseInt(this.$store.state.o2oCartOrder.integral)>0?md5(this.password):'',
          })
          this.axios.post('/personally/o2o/order/goodsOrderSumbit',this.qs.stringify({
            shopId:this.shopId,
            isDsd:this.distributionType?0:1,
            remark:'',
            addId:this.$store.state.o2oCartOrder.addId,
            integral:this.$store.state.o2oCartOrder.integral,
            redId:this.$store.state.o2oCartOrder.redId,
            invoiceTemplateId:this.$store.state.o2oCartOrder.invoiceTemplateId,
            password:parseInt(this.$store.state.o2oCartOrder.integral)>0?md5(this.password):'',
          }))
            .then((response)=>{
              console.log(response,'购物车结算数据')
              if(response.data.result==1){
                this.$router.push({path:'/y/paymentMethod',query:{orderId:response.data.data.orderId,settlementType:3}})
              }else{
                this.$store.commit('setToastText',response.data.message)
                this.$store.commit('setToastType','error')
              }
            })
            .catch((err)=>{
              this.$store.commit('setToastText',"提交订单失败")
              this.$store.commit('setToastType','error')
            })
        }else if(this.dataType=='nowBuy'){      //商品立即购买结算
          console.log('020商品立即购买参数',{
            shopId:this.shopId,
            isDsd:this.distributionType?0:1,
            remark:'',
            addId:this.$store.state.o2oNowBuyOrder.addId,
            integral:this.$store.state.o2oNowBuyOrder.integral,
            redId:this.$store.state.o2oNowBuyOrder.redId,
            invoiceTemplateId:this.$store.state.o2oNowBuyOrder.invoiceTemplateId,
            password:parseInt(this.$store.state.o2oNowBuyOrder.integral)>0?md5(this.password):'',
            goodsId:this.goodsId,
            productId:this.productId,
            productNum:this.num,
          })
          this.axios.post('/personally/o2o/order/goodsOrderSumbit',this.qs.stringify({
            shopId:this.shopId,
            isDsd:this.distributionType?0:1,
            remark:'',
            addId:this.$store.state.o2oNowBuyOrder.addId,
            integral:this.$store.state.o2oNowBuyOrder.integral,
            redId:this.$store.state.o2oNowBuyOrder.redId,
            invoiceTemplateId:this.$store.state.o2oNowBuyOrder.invoiceTemplateId,
            password:parseInt(this.$store.state.o2oNowBuyOrder.integral)>0?md5(this.password):'',
            goodsId:this.goodsId,
            productId:this.productId,
            productNum:this.num,
          }))
            .then((response)=>{
              console.log(response,'立即购买结算数据')
              if(response.data.result==1){
                this.$router.push({path:'/y/paymentMethod',query:{orderId:response.data.data.orderId,settlementType:3}})
              }else{
                this.$store.commit('setToastText',response.data.message)
                this.$store.commit('setToastType','error')
              }
            })
            .catch((err)=>{
              this.$store.commit('setToastText',"提交订单失败")
              this.$store.commit('setToastType','error')
            })
        }else{}
      },
      invoiceShow(inv) {
        this.show13 = inv;
      },
      distributionTypeF(a){
        console.log(a)
        this.distributionType = (a==1?false:true);
      },
      sub() {
        let integral = 0;
        if(this.dataType=='cart'){                //购物车结算
          integral = this.$store.state.o2oCartOrder.integral;
        }else if(this.dataType=='nowBuy'){      //商品立即购买结算
          integral = this.$store.state.o2oNowBuyOrder.integral;
        }else{}
        if(parseInt(integral)>0){
          this.showDialogStyle = true;
          this.cursorState = true;
        }else{
          this.submitOrderBtn();
        }
      },
      sureBtnCancel() {
        this.showDialogStyle = false
        this.cursorState = false
      },
      sureBtnSure() {
        this.showDialogStyle = false
        console.log(this.password)
        this.submitOrderBtn();
        this.cursorState = false;
      },
      blur(val) {
        this.password = val;
      },
      toPay(){
        this.$router.push({path:'/z/terminalOrder',query:{orderState:'待付款'}})
      },
      toCart(){
        this.$router.push({path:'/x/cartShop',query:{shopId:this.shopId,isShop:1}})
      },
    }
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top{position: fixed;top:0;width:100%;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .padding{padding:46px 0 1.2rem 0;}

  .receiveAdd {
    padding: 0 0 0 0;
  }
  .receiveAddImg {
    height: 1.50rem;
    background-image: url('../../img/readd.png');
    background-size: 100% 100%;
    display: flex;
    font-size: 0.30rem;
    padding: 0.40rem 0.20rem;
  }
  .icon-dingwei {
    font-size: 0.52rem;
    color: #fd593d;
  }
  .icon-youjiantou1 {
    font-size: 0.36rem;
    color: #666666;
  }
  .address_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width:6.4rem;
    padding:0;
    background-color: transparent;
    margin:0;
  }
  .person {
    display: flex;
    justify-content: space-between;
    width:100%;
  }
  .person_address{
    width:100%;
    padding: 0;
    border:0;
    color:rgb(0,0,0)
  }
  .person_address span {
    margin-right: 0.10rem;

  }
  .submitOrder {
    height: 1.20rem;
    box-shadow: 1px 1px 10px #ccc;
    display: flex;
    justify-content: flex-end;
    font-size: 0.30rem;
    position: fixed;width:100%;bottom:0;
    background-color: white;
  }
  .submitOrderMoney {
    color: #f86e0e;
  }
  .submitOrder_two {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.20rem;
  }
  .submitOrderBtn {
    width: 2.00rem;
    height: 1.20rem;
    background-color: #f86e0e;
    color: #ffffff;
    text-align: center;
    line-height: 1.20rem;
  }

  .popup_title {
    font-size: 0.30rem;
    height: 1.00rem;
    text-align: center;
    line-height: 1.00rem;
    background-color: #ffffff;
    border: 1px solid #ccc;
  }
  .popup_nav,.popup_name {
    padding: 0.25rem;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    font-size: 0.30rem;
    display: flex;
  }
  .popup_nav_1,.popup_nav_2 {
    font-size: 0.30rem;
    margin-right: 0.30rem;
  }
  .popup_nav_two {
    display: flex;
  }
  .popup_nav_two_com {
    width: 1.20rem;
    height: 0.50rem;
    border: 1px solid #fd593d;
    border-radius: 0.05rem;
    text-align: center;
    line-height: 0.50rem;
    font-size: 0.24rem;
    color: #fd593d;
    margin-right: 0.30rem;
  }
  .popupBtn {
    height: 1.20rem;
    background-color: #f15352;
    text-align: center;
    line-height: 1.20rem;
    font-size: 0.32rem;
    color: #fff;
    position: absolute;
    width:100%;
    bottom:0;
  }
  .company {
    color: #fff;
    /*background-color: #f15352;*/
    background: linear-gradient(left, #f86d0f, #f15352);
  }
  /*支付密码*/
  .dialogBox {
    border-radius: 0.20rem;
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

  .pTitle{text-align: center;font-size: 0.35rem;margin-top:1rem;line-height: 1rem;}
  .pQuestion{text-align: center;font-size: 0.3rem;color:#f86e0e;margin:0.5rem;}
  .pQuestion span{margin:0 0.5rem;text-decoration: underline}
</style>
