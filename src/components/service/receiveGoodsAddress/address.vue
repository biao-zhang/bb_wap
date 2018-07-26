<template>
  <div>
    <div class="address_content">
      <div class="person">
        <span>{{ itemChildren.userName }}</span>
        <span>{{ itemChildren.phone }}</span>
      </div>
      <div class="person_address">
        <span>{{ itemChildren.province }} {{ itemChildren.city }} {{ itemChildren.area }}</span>
        <span>{{ itemChildren.address }}</span>
      </div>
      <div class="person_default">
        <div>
          <span @click="defaultAds(itemChildren.id)"><i class="iconfont icon-iconfontxuanzhong1" v-bind:class="{icolor: itemChildren.isdefault === 1}"></i>默认地址</span>
        </div>
        <div>
          <span class="editor" @click="editor"><i class="iconfont icon-bianji"></i>编辑</span>
          <span @click="deleteAds"><i class="iconfont icon-shanchu"></i>删除</span>
        </div>
      </div>
    </div>
    <!--dialog-->
    <div v-transfer-dom>
      <confirm
        v-model="show"
        :title="'操作提示'"
        @on-cancel="sureBtnCancel"
        @on-confirm="sureBtnSure"
      >
        <p style="text-align:center;">确定删除地址？</p>
      </confirm>
    </div>
    <!--dialog-->
  </div>

</template>
<script>
  import { deleteByPrimaryKey, updateisdefault } from '@/api/personally'
  import { XDialog, Confirm, TransferDomDirective as TransferDom } from 'vux'

  export default {
    components: {
      XDialog,
      Confirm
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        isIcolor: false,

        show: false,
      }
    },
    props: {
      itemChildren: {
        type: Object
      }
    },
    methods: {
      //编辑
      editor() {
        this.$store.commit('editorAddress', this.itemChildren)

        this.$router.push({path:'/z/editornew', query: {id: this.itemChildren.id}})
        console.log('编辑111')
      },
      // 显示删除弹窗
      deleteAds() {
        this.show = true
      },
      // 默认地址
      defaultAds(id) {
        this._updateisdefault(id)
      },
      // 弹窗确定与取消
      sureBtnSure() {
        this.show = false;
        this._deleteByPrimaryKey()
      },
      sureBtnCancel() {
        this.show = false;
        console.log('取消')
      },

      // 删除地址
      _deleteByPrimaryKey() {
        deleteByPrimaryKey({
          id: this.itemChildren.id
        })
          .then( res => {

            this.$emit('deleteAddress')
            console.log('删除地址', res)

          })
      },
      // 修改为默认地址
      _updateisdefault( parms ) {
        updateisdefault({
          id: parms
        })
          .then( res => {

            this.$emit('deleteAddress')
            console.log('修改为默认地址', res)

          })
      }
    }
  }
</script>
<style scoped>
  .address_content {padding: 0.38rem 0.2rem; font-size: 0.30rem; background-color: #ffffff; margin-bottom: 0.20rem;}
  .person {display: flex; justify-content: space-between;}
  .person_address {display: flex; padding: 0.30rem 0; flex-wrap: wrap; color: #bebebe; border-bottom: 1px solid #cccccc;}
  .person_address span {margin-right: 0.20rem;}
  .person_default{display: flex; justify-content: space-between; padding-top: 0.20rem; color: #666666;}
  .editor {margin-right: 0.40rem}
  .icon-bianji,.icon-shanchu,.icon-iconfontxuanzhong1 {margin-right: 0.20rem;}

  .dialogBox {
    border-radius: 0.20rem;
    font-size: 0.34rem;
    background-color: #fff;
  }
  .sureTitel {
    padding: 0.80rem 0;
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
  .icolor{color: #f86e0e}

 /* .xdialog >>> .weui-dialog {
    display: block;
    top: 30%;
  }*/
</style>
