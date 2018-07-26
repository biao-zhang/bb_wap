<template>
  <div class="hello">
    <!--<x-header class="xheader" @on-click-back="title_back('title')" @on-click-more="title_more('title')" :right="'aaa'" @on-click-title="title_click(msg)" :left-options="{backText:''}" :title="msg" :right-options="{showMore:true}"></x-header>-->
    <div class="lContent">
      <router-view></router-view>
      <!--<group>-->
        <!--<cell is-link title="Simple" link="/component/tabbar-simple"></cell>-->
        <!--<cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>-->
      <!--</group>-->
    </div>
    <tabbar class="tabbarpos">
      <tabbar-item v-bind:selected="bottomIndex==1" link="/shop">
        <img slot="icon" src="../assets/img/menu1.png">
        <img slot="icon-active" src="../assets/img/menu1_1.png">
        <span slot="label">商城</span>
      </tabbar-item>
      <tabbar-item v-bind:selected="bottomIndex==2" link="/nearby">
        <img slot="icon" src="../assets/img/menu2.png">
        <img slot="icon-active" src="../assets/img/menu2_1.png">
        <span slot="label">附近</span>
      </tabbar-item>
      <tabbar-item v-if="weixin" v-bind:selected="bottomIndex==3" link="/y/issueOrder">
        <img slot="icon" style="width:40px;height: 40px;margin-left:-6px;" src="../assets/img/menuVoice.png">
        <span slot="label" style="display: none">服务1</span>
      </tabbar-item>
      <tabbar-item v-bind:selected="bottomIndex==4" link="/service">
        <img slot="icon" src="../assets/img/menu3.png">
        <img slot="icon-active" src="../assets/img/menu3_1.png">
        <span slot="label">服务</span>
      </tabbar-item>
      <tabbar-item v-bind:selected="bottomIndex==5" link="/my">
        <!--<x-icon slot="icon-active" type="navicon" size="25" style="fill:#fff;"></x-icon>-->
        <img slot="icon" src="../assets/img/menu4.png">
        <img slot="icon-active" src="../assets/img/menu4_1.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { XHeader, Tabbar, TabbarItem, Group, Cell } from "vux";
import { isWeiXin } from "@/untils/untils";

export default {
  name: "Index",
  components: { XHeader, Tabbar, TabbarItem, Group, Cell, isWeiXin },
  data() {
    return {
      msg: "Welcome",
      lTabbarClass: true,
      weixin: 0
    };
  },
  computed: {
    bottomIndex() {
      return this.$store.state.bottomIndex;
    }
  },
  mounted() {
    // this.getNavData(0); //手机+86
    if (isWeiXin()) {
      this.weixin = 1;
    }

    var that = this;
    setTimeout(function() {
      //      console.log(that.$store.state.getStaticData.jilianDatas)
    }, 2000);
  },
  methods: {
    disableTab() {
      this.$store.commit("setToastText", "正在开发中，敬请期待");
      this.$store.commit("setToastType", "text");
      return false;
    },
    // getNavData(pid) {
    //   //获取nav的数据
    //   var that = this;
    //   this.axios
    //     .post(
    //       "/api/region/get_address_list",
    //       this.qs.stringify({
    //         // token: "04f8ca66f98577a9ddb3a9514ae43980",
    //         pid: pid
    //       })
    //     )
    //     .then(response => {
    //       console.log(response.data);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    title_back(back) {
      console.log("titleBack" + back);
    },
    title_more(more) {
      console.log("titleMore" + more);
    },
    title_click(cli) {
      console.log("titleClick" + cli);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
}

.xheader {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
}

.lContent {
  width: 100%;
  height: 100%;
  padding: 0 0 53px;
  box-sizing: border-box;
}

.tabbarpos {
  position: fixed;
}

.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label span {
  color: #f86e0e;
}
</style>
