<template>
  <div class='setting'>
    <xHeader :msg="tit"></xHeader>
    <div class="contentBox">
      <div class="box">
        <router-link to="/x/personalData"><set-cell :lLabel="line1.lLabel"></set-cell></router-link>
        <router-link :to="{path:'/x/changePwd',query:{isChange:1}}"><set-cell :lLabel="line2.lLabel"></set-cell></router-link>

        <router-link v-if="this.state == 0" :to="{path:'/x/getSms'}"><set-cell :lLabel="line3.lLabel" :bBorder="true"></set-cell></router-link>
        <router-link v-else :to="{path:'/x/changePwd',query:{isChange:0}}"><set-cell :lLabel="line3.lLabel" :bBorder="true"></set-cell></router-link>

      </div>
      <div class="box">
        <router-link :to="{path: '/z/alladdress', query: {msg: '收货地址管理'}}"><set-cell :lLabel="line4.lLabel"></set-cell></router-link>
        <router-link to="/x/myBindAccount"><set-cell :lLabel="line5.lLabel" :bBorder="true"></set-cell></router-link>
      </div>
      <div class="box">
        <router-link to="/y/aboutUs"><set-cell :lLabel="line6.lLabel"></set-cell></router-link>
        <!--<router-link to="/x/realName">-->
        <div @click="autonym">
          <set-cell :lLabel="line7.lLabel" :rLabel="line7.rLabel" :rImgState="line7.rImgState" :rLabelColor="line7.rLabelColor"></set-cell>
        </div>
        <!--</router-link>-->
      </div>
      <div class="button" @click="delToken">退出登录</div>
      <div>
        <confirm
          v-model="show_3"
          @on-confirm="onConfirm"
          :title="title">
          <p style="text-align:center;">确定退出吗？</p>
        </confirm>
      </div>
      <!--<set-cell :lImgSrc="lImgSrc1" :lLabel="lLabel" :rLabel="rLabel" :bBorder="false" :rLabelColor="rLabelColor"></set-cell>-->
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import xHeader from "@/components/my/common/xHeader";
  import setCell from "@/components/my/setting/common/setCell";
  import { getPhone } from "@/api/personally";
  import { Confirm } from "vux";
  export default {
    data() {
      return {
        show_3: false,
        title: "退出后您将不能查看相关信息",
        realNameAuthen:'', //认证状态
        state: "", //支付密码的状态
        line1: {
          lLabel: "账号管理"
        },
        line2: {
          lLabel: "登录密码"
        },
        line3: {
          lLabel: "支付密码"
        },
        line4: {
          lLabel: "收货地址"
        },
        line5: {
          lLabel: "快捷账号绑定"
        },
        line6: {
          lLabel: "关于我们"
        },
        line7: {
          lLabel: "实名认证",
          rLabel: "未审核",
          rLabelColor: "#ccc",
          rImgState:false
        },
        tit: "设置"
      };
    },
    components: { setCell, xHeader, Confirm },
    props: {},
    mounted() {
      getPhone({}).then(res => {
        console.log("获取手机号结果1", res);
        if (res.message == "success") {
          this.state = res.data.payPasswordStatus;
          this.realNameAuthen = res.data.realNameAuthen;
          if(this.realNameAuthen == 0){
            this.line7.rLabel = '未实名'
            this.line7.rImgState = true
          } else if(this.realNameAuthen == 1){
            this.line7.rLabel = '已实名'
            this.line7.rImgState = false
          }else if(this.realNameAuthen == 2) {
            this.line7.rLabel = '审核中'
            this.line7.rImgState = false
          }
        }
      })




    },
    methods: {
      setCookie(name, value, days) {
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          var expires = "; expires=" + date.toGMTString();
        } else {
          var expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
      },
      // 删除cookie
      deleteCookie: function(name) {
        this.setCookie(name, "", -1);
      },
      delToken() {
        this.show_3 = true;
      },
      onConfirm() {
        this.deleteCookie("session_id");
        this.$router.push({ path: "/my/persionDatailMsg" });
      },
      autonym(){
        var that = this
        if (this.realNameAuthen == 0){
          that.$router.push({ path: "/x/realName"});
        }
      }
    }
  };
</script>
<style scoped>
  .setting {
    width: 100%;
    height: 100%;
  }

  .contentBox {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 50px;
    background-color: #f5f5f5;
  }
  .contentBox .box {
    margin: 0.3rem 0;
  }

  .button {
    font-size: 0.3rem;
    color: #f78748;
    text-align: center;
    background-color: white;
    line-height: 1rem;
    width: 100%;
  }
</style>
