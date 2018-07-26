<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{msg}}</x-header>
    </div>
    <div class="addressContent">
      <div class="perInfo">
        <div class="rece_man">收货人：<input type="text" v-model="rece_man"/></div>
        <div class="rece_tel">手机号：<input type="text" v-model="rece_tel"/></div>
      </div>
      <div class="rece_area">
        <group>
          <self-address :title="title" :value="rece_area" @change="getAddressVal"> </self-address>
        </group>
      </div>
      <div class="deatil_ads">
        <span>
          <group>
            <x-textarea :placeholder="tips" title="详细地址：" v-model="deatil_ads"></x-textarea>
          </group>
        </span>
      </div>
      <div class="rece_defau" @click="rece_defau_click">
        <span>
          <group>
            <x-switch title="设为默认地址" v-model="isdefault" > </x-switch>
          </group>
        </span>
      </div>
    </div>
    <div class="serve" @click="serve">保存</div>
  </div>
</template>
<script>
  import { XHeader, XSwitch, Group, XTextarea, XAddress } from 'vux'
  import { updateAdress,getCurAddress } from '@/api/personally'
  import selfAddress from '../../../vux/selfAddress'

  export default {
    components: {XHeader, XSwitch, Group, XTextarea, XAddress, selfAddress},
    data() {
      return {
        msg: '编辑收货地址',
        tips: '请输入地址',
        title: '所在地区：',

        rece_man: '',
        rece_tel: '',
        deatil_ads: '',
        rece_area: [],
        id: '',      //收货地址中的id
        areaCode: '',  // 区县编码
        areaCodeChanged:'',//改变的adCode
        isdefault: false, // 1:默认收货地址 0:非

      }
    },
    computed: {
      editorAddress() {
        return this.$store.state.address.editorAddress
      }
    },
    mounted() {
      //获取地址栏的id
      if(this.$route.query.id!=undefined){
        this.id = this.$route.query.id;
      }else{
        this.$store.state.toastText='参数缺失'
        this.$store.state.toastType='text'
      }
      //获取当前收货地址信息
      getCurAddress({id:this.id}).then((res)=>{
        console.log(res.data,'当前收货地址信息')
        if(res.message=='success'){
          this.rece_man = res.data.userName;
          this.rece_tel = res.data.phone;
          this.deatil_ads = res.data.address;
          this.rece_area = [res.data.province,res.data.city, res.data.area]
          this.areaCodeChanged = res.data.areaId;
          res.data.isdefault ? this.isdefault = true : this.isdefault = false
        }else{
          this.$store.commit('setToastText',res.message)
          this.$store.commit('setToastType','warn')
        }
      }).catch((err)=>{
        this.$store.commit('setToastText','服务器错误')
        this.$store.commit('setToastType','warn')
      })

    },
    methods: {
      getAddressVal(a,b){
        // a区县编码数组，b地址数组
        console.log('a区县编码数组', a);console.log('b地址数组', b);
        this.areaCode = a[2]
      },
      /*保存地址*/
      serve() {

        let reg = /^1\d{10}$/

        if(reg.test(this.rece_tel)) {

          updateAdress({
            userName: this.rece_man,
            phone: this.rece_tel,
            areaCode: this.areaCode=='110101'?this.areaCodeChanged:this.areaCode,
            address: this.deatil_ads,
            isdefault: this.isdefault ? 1 : 0, // 1:默认收货地址 0:非,
            id: this.id,
          })
            .then( res => {

              /*this.$router.push({path: '/z/alladdress', query: {msg: '收货地址管理'}})*/
              this.$router.go(-1)
              console.log('编辑保存收获地址', res)

            })

        } else {

          this.$store.commit('setToastText', '手机号输入有误')
          this.$store.commit('setToastType', 'warn')

        }

      },
      /*设为默认地址*/
      rece_defau_click() {
        this.isdefault = !this.isdefault
      }
    },

  }


</script>
<style scoped>
  .vux-header { background: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}
  .addressContent{
    margin-top: 0.10rem;
    padding: 0 0.20rem;
  }
  .addressContent{background-color: #ffffff; font-size: 0.30rem; color: #3c3c3c;}
  .perInfo input { font-size: 0.30rem; color: #3c3c3c; }
  .rece_tel {padding: 0.37rem 0;}
  .rece_man,.rece_area,.rece_defau {padding: 0.37rem 0; border-bottom: 1px solid #eeeeee;}
  .rece_area {border-top: 1px solid #eeeeee; padding-top: 0;}
  .deatil_ads{ border-bottom: 1px solid #eeeeee;}
  .serve {
    margin: 1.30rem auto 0 auto;
    width: 5.85rem;
    height: 0.80rem;
    background-color: #f86e0e;
    text-align: center;
    line-height: 0.80rem;
    color: #ffffff;
    font-size: 0.32rem;
    border-radius: 5px;
  }
  /*覆盖vux样式*/
  .rece_defau >>> .vux-no-group-title,.weui-cells{ margin: 0;}
  .rece_defau >>> .weui-cells:before { border:0;}
  .rece_defau >>> .weui-cells:after { border:0;}
  .rece_defau >>> .vux-x-switch.weui-cell_switch { padding: 0;}
  .deatil_ads >>> .weui-cells:before { border:0;}
  .deatil_ads >>> .weui-cells:after { border:0;}
  .deatil_ads >>> .weui-cell{ padding: 0;}
  .deatil_ads >>> .weui-textarea{ font-size: 0.30rem; color: #666;}
  .rece_area >>> .weui-cells:before { border:0;}
  .rece_area >>> .weui-cells:after { border:0;}
  .rece_area >>> .weui-cell{ padding: 0;}
</style>
