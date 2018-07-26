<template>
<!-- import { constants } from 'http2'; -->
  <div class="storePicture">
      <div class="picture_picture" v-html="datas">
        <!--<img src="../img/ban1.png" alt="">-->
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {

  },
  props: {
    datas: ""
  },

};
</script>
<style>
.picture_picture {
  width: 100%;
  height: 5.6rem;
}
  .picture_picture p img{width:100%;height:100%;}
</style>
