<template>
  <div>
    <div class="address_content">
      <div v-if="itemChildren.addId==tick" class="icon">
        <img style="width: 0.50rem" src="../img/tick.png"/>
      </div>
      <div @click="select" class="select" :class="{'active':itemChildren.addId==tick}">
        <div class="person" >
          <span>{{ itemChildren.userName }}</span>
          <span>{{ itemChildren.phone }}</span>
        </div>
        <div class="person_address">
          <span>{{ itemChildren.province }} {{ itemChildren.city }} {{ itemChildren.area }}</span>
          <span>{{ itemChildren.address }}</span>
        </div>
      </div>
      <div style="margin-left: 0.10rem" @click="editorL">
        <img style="width: 0.5rem; height: 0.5rem;" src="../img/editor.png"/>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    data() {
      return {

      }
    },
    props: {
      itemChildren: {
        type: Object
      },
      tick: {
        type: String,
        default: ''
      },
    },
    mounted() {

    },
    methods: {
      select() {
//        将选中的地址id存入store中
        this.$store.commit('changeCurAddressId',this.itemChildren.addId)
//        将选中的地址信息存入store中
        this.$store.commit('changeCurAddressData',this.itemChildren)
        this.$emit('tick')
      },
      editorL() {
        this.$router.push({path: '/z/editornew', query: {id: this.itemChildren.id}})
      }
    },

  }
</script>
<style scoped>
  .icon {margin-right: 0.10rem}
  .address_content {padding: 0.38rem 0.2rem; font-size: 0.30rem; background-color: #ffffff; margin-bottom: 0.20rem; display: flex; align-items: center}
  .person {display: flex; justify-content: space-between;}
  .person_address {display: flex; padding: 0.30rem 0; flex-wrap: wrap; color: #bebebe; border-bottom: 1px solid #cccccc;}
  .person_address span {margin-right: 0.20rem;}

  .select{width:100%;}
  .active{width:6.4rem;}
</style>
