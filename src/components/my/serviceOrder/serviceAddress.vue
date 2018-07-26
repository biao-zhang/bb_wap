<template>
  <div class='serviceAddressL'>
    <div class="serviceAddressContent" v-if="serviceChildren.serviceProjectName === '帮我买'">
      <div class="serviceAddressPic">
        <i class="iconfont icon-shouhuoren" style="margin-right: 0.12rem; font-size: 0.60rem;"></i>
      </div>
      <div class="serviceAddressInfo">
        <div class="serviceAddressTop">
          <span>{{ serviceChildren.contactsPeople }}</span>
          <span>{{ serviceChildren.contactsPeoplePhone }}</span>
        </div>
        <div class="serviceAddressFoot">
          <span>{{ serviceChildren.receivingAddress }}</span>
        </div>
      </div>
    </div>
    <div class="serviceAddressContent" v-if="serviceChildren.serviceProjectName === '帮我取送'">
      <div class="serviceAddressPic">
        <i class="iconfont icon-shouhuoren" style="margin-right: 0.12rem; font-size: 0.60rem;"></i>
      </div>
      <div class="serviceAddressInfo">
        <div class="serviceAddressTop">
          <span>{{ serviceChildren.picker }}</span>
          <span>{{ serviceChildren.pickerPhone }}</span>
        </div>
        <div class="serviceAddressFoot">
          <span>{{ serviceChildren.purchaseAddress }}</span>
        </div>
      </div>
    </div>
    <div class="serviceAddressContent" v-if="serviceChildren.serviceProjectName === '帮我取送'">
      <div class="serviceAddressPic">
        <i class="iconfont icon-shouhuoren" style="margin-right: 0.12rem; font-size: 0.60rem;"></i>
      </div>
      <div class="serviceAddressInfo">
        <div class="serviceAddressTop">
          <span>{{ serviceChildren.contactsPeople }}</span>
          <span>{{ serviceChildren.contactsPeoplePhone }}</span>
        </div>
        <div class="serviceAddressFoot">
          <span>{{ serviceChildren.receivingAddress }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  export default{
    data(){
      return{

      }
    },
    props: ['serviceChildren'],
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
  .serviceAddressContent {
    margin: 0.20rem 0;
    padding: 0.35rem 0.20rem;
    background-color: #ffffff;
    display: flex;
    font-size: 0.30rem;
    border:1px solid #eee;
  }
  .serviceAddressPic {
    display: flex;
    align-items: center;
  }
  .serviceAddressTop {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.20rem;
  }
  .serviceAddressInfo {
    width: 6.34rem;
  }
</style>
