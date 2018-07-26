<template>
  <div class='adressCombine'>
    <alladdress v-if="allAddress.length !== 0" :all-address="allAddress"> </alladdress>
    <receive-address-index v-else> </receive-address-index>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import alladdress from './alladdress'
  import receiveAddressIndex from './receiveAddressIndex'

  export default{
    components: {
      alladdress,
      receiveAddressIndex
    },
    data(){
      return{

      }
    },
    computed: {
      allAddress() {
        return this.$store.state.address.allAddressList
      },
    },
    props:{

    },
    mounted(){
      console.log('allAddress', this.allAddress)
    },
    methods:{

    },
  }
</script>
<style scoped>

</style>
