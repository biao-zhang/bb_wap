<template>
  <div>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{msg}}</x-header>
    </div>
    <div class="addressContent">
      <div class="perInfo">
          <div class="rece_man">收货人：<input type="text" v-model="rece_man"/></div>
          <div class="rece_tel">手机号：<input type="text" maxlength="11" v-model="rece_tel"/></div>
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
            <x-switch title="设为默认地址" ></x-switch>
          </group>
        </span>
      </div>
    </div>
    <div class="serve" @click="serve">保存</div>
  </div>
</template>
<script>
  import { XHeader, XSwitch, Group, XTextarea } from 'vux'
  import selfAddress from '../../../vux/selfAddress'
  import { insertSelective } from "@/api/personally"

  export default {
    components: {
      XHeader,
      XSwitch,
      Group,
      XTextarea,
      selfAddress,
    },
    data() {
      return {
        title: '所在地区：',
        msg: '新建收货地址',
        tips: '请输入地址',

        rece_man: '',
        rece_tel: '',
        deatil_ads: '',
        rece_area: [],
        areaCode: '',  // 区县编码
        isdefault: false, // 1:默认收货地址 0:非
      }
    },
    mounted() {

    },
    methods: {
      // 所选地区
      getAddressVal(a,b){
        // a区县编码数组，b地址数组
        console.log(a);console.log(b);
        this.areaCode = a[2]
      },
      /*保存地址*/
      serve() {

        let reg = /^1\d{10}$/

        if(reg.test(this.rece_tel)) {

          insertSelective({
            userName: this.rece_man,   // 收件人姓名
            phone: this.rece_tel,    // 手机号
            areaCode: this.areaCode,  // 区县编码
            address: this.deatil_ads,  // 详细地址
            isdefault: this.isdefault ? 1 : 0, // 1:默认收货地址 0:非
          })
            .then( res => {

              this.$router.push({path: '/z/alladdress', query: {msg: '收货地址管理'}})
              console.log('添加收获地址', res)

            })

        } else {

          this.$store.commit('setToastText', '手机号输入有误')
          this.$store.commit('setToastType', 'warn')

        }

      },
      /*设为默认地址*/
      rece_defau_click() {
        this.isdefault = !this.isdefault
      },
    }
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
  .addressContent{background-color: #ffffff; font-size: 0.30rem;}

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
  .rece_area >>> .weui-cells:before { border:0;}
  .rece_area >>> .weui-cells:after { border:0;}
  .rece_area >>> .weui-cell{ padding: 0;}
</style>
