<template>
 <div>
    <!-- <div v-if="allAddress.length !== 0"> -->
      <div class="top">
        <x-header :left-options="{backText: ''}">{{msg}}</x-header>
      </div>

      <!-- <div style="padding-top:56px;"> -->
        <scroller v-if="allAddress.length !== 0" :on-infinite="loadmore"  style="padding-top:46px"  :on-refresh = "refresh" ref="my_scroller">
        <div v-for="item in allAddress">
          <address-item v-if="msg === '收货地址管理' && item" :item-children="item" @deleteAddress="deleteAddress"> </address-item>
          <address-children v-if="msg === '选择收货地址'" :item-children="item" :tick="id" @tick="tick"> </address-children>
        </div>
              <router-link to="/z/addnewaddress">
        <div class="addNew">添加新地址</div>
      </router-link>
        </scroller>


          <div v-else>

      <div class="cr_content">
        <img src="../../shop/img/readnew.png" />
        <div class="cr_success">
          <div>还没有收货地址</div>
          <div>快去添加一个吧~</div>
        </div>
        <div class="back_person" @click="newAddress">新建地址</div>
      </div>
    </div>
    <!-- </div> -->
    <!--没地址时的页面-->

</div>
</template>
<script>
import addressItem from "./address";
import addressChildren from "./addressChildren";
import { XHeader, XDialog } from "vux";
import { getAddressList } from "@/api/personally";

export default {
  components: { addressItem, XHeader, addressChildren },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      msg: this.$route.query.msg,

      // 打勾
      /*tickf: 0*/
      allAddress: []
    };
  },
  computed: {
    /* allAddress() {
        return this.$store.state.address.allAddressList
      },*/
    //      tickf() {
    //        return localStorage.getItem('tickf')
    //      },
    //获取选择的id
    id() {
      if (this.$route.query.id !== undefined) {
        return this.$route.query.id;
      } else {
        return "";
      }
    }
  },

  mounted() {
    this._getAddressList();
    //      console.log('tickf',this.tickf)
    /* this.$store.dispatch({
        type:'getMyAddressList',
        pageNum:1,
        pageSize:2,
      })*/
  },
  methods: {
    // 上拉加载
    loadmore(loaded) {
      this.pageNum++;
      setTimeout(() => this._getAddressList(loaded, "loaded"), 1000);
    },
    // 下拉刷新
    refresh(loaded) {
      this.pageNum = 1;
      setTimeout(() => this._getAddressList(loaded, "refresh"), 1000);
    },
    // 打勾
    tick() {
      this.$router.go(-1);
    },
    newAddress() {
      // console.log('新建地址')
      this.$router.push("/z/addnewaddress");
    },
    // 收货地址列表
    _getAddressList(loaded, type) {
      getAddressList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (loaded) {
          if (type === "refresh") this.allAddress = []; // 下拉刷新只显示第一页数据

          this.allAddress = this.allAddress.concat(res.data.list);

          loaded("done");

          // console.log("b2c所有新品推荐列表", this.allAddress);
        } else {
          // 页面第一次加载的数据
          this.allAddress = res.data.list;
        }
        // this.allAddress = res.data.list
        // console.log('收货地址列表', res)
      });
    },
    // 删除地址（默认地址）
    deleteAddress() {
      this.pageNum = 1;
      this._getAddressList();
    }
  }
};
</script>
<style scoped>
.vux-header {
  background-color: #ffffff;
}
.isAddress{
  height: 100%;
}
.top {
  margin-bottom: 0.2rem;
  box-shadow: 0 2px 5px #ccc;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
.top >>> .vux-header-title {
  color: #000;
}
.top >>> .vux-header-left .left-arrow:before {
  border-color: #000;
}
.addNew {
  margin: 0.7rem auto;
  width: 6.7rem;
  height: 0.75rem;
  text-align: center;
  line-height: 0.75rem;
  background-color: #f86e0e;
  color: #ffffff;
  border-radius: 3px;
  font-size: 0.36rem;
}

.cr_content {
  height: 7.15rem;
  background-color: #ffffff;
  margin-top: 0.1rem;
  padding: 1.2rem 0.76rem;
}
.cr_content img {
  width: 100%;
}
.cr_success {
  padding: 0.51rem 0 0.86rem 0;
  text-align: center;
  font-size: 0.3rem;
}
.back_person {
  margin: 0 auto;
  width: 4rem;
  height: 0.8rem;
  border: 1px solid #f86e0e;
  color: #f86e0e;
  border-radius: 0.4rem;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.32rem;
  cursor: pointer;
}
</style>
