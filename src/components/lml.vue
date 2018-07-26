<template>
  <div class='lml'>
    <router-link to="/my/persionDatailMsg"><div>个人中心首页(未登录：!loginState)</div></router-link>
    <router-link to="/x/MyCommonweal"><div>我的公益活动</div></router-link>
    <router-link to="/x/myCollect"><div>帮工/商品</div></router-link>
    <router-link to="/x/mySetting"><div>设置</div></router-link>
    <router-link to="/x/myBindAccount"><div>快捷账号绑定</div></router-link>
    <router-link to="/x/realName"><div>实名注册</div></router-link>
    <router-link to="/x/personalData"><div>个人信息</div></router-link>
    <router-link to="/x/changePwd"><div>修改密码、修改支付密码，密码，忘记密码</div></router-link>
    <router-link to="/x/boundPrepaidCard"><div>绑定预付卡</div></router-link>
    <router-link to="/x/reservationOrder"><div>预约订单</div></router-link>
    <router-link to="/x/cartShop"><div>终端店购物车</div></router-link>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  import { getAllList } from '@/api/personally'
//  import { getAllList } from '@/api/shop'
//  import { getAllList } from '@/api/service'
//  import { getAllList } from '@/api/promotion'
  export default{
    data(){
      return{

      }
    },
    props:{

    },
    mounted(){
      this._b2cCartList()
    },
    methods:{
//商品整合详情
      _b2cCartList() {
//        const { goodsId, goodsType, adcode } = this.params;
        let params = {
//          terminalType: 'wap'
        };
        getAllList(params).then(res => {
          if (res.result) {
            console.log(res.data)
          } else {

          }
        }).catch((err)=>{

        });

      },
    },
  }
</script>
<style scoped>
.lml{ }
</style>
