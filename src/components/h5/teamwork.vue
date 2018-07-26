<template>
  <div class='teamwork'>
    <x-header :msg="msg" ref="xheader"></x-header>

    <div class="box">
      <div class="teamwork_list">
        <div class="div_bg">
          <div class="btn_bg">运营中心入驻</div>
          <div class="div_img">
            <img src="./img/about_logo.png" alt="">
            <p>如果您有实体店铺，有服务工人，欢迎您免费申请奈斯牛入驻商。</p>
          </div>
        </div>
        <div class="div_bg">
          <div class="btn_bg">B2C本地入驻</div>
          <div class="div_img">
            <img src="./img/about_logo.png" alt="">
            <p>如果您有实体店铺，有服务工人，欢迎您免费申请奈斯牛入驻商。</p>
          </div>
        </div>
        <div class="div_bg">
          <div class="btn_bg">B2B本地入驻</div>
          <div class="div_img">
            <img src="./img/about_logo.png" alt="">
            <p>如果您有实体店铺，有服务工人，欢迎您免费申请奈斯牛入驻商。</p>
          </div>
        </div>
                <div class="div_bg">
          <div class="btn_bg">B2B全国入驻</div>
          <div class="div_img">
            <img src="./img/about_logo.png" alt="">
            <p>如果您有实体店铺，有服务工人，欢迎您免费申请奈斯牛入驻商。</p>
          </div>
        </div>
                <div class="div_bg">
          <div class="btn_bg">合作终端入驻</div>
          <div class="div_img">
            <img src="./img/about_logo.png" alt="">
            <p>如果您有实体店铺，有服务工人，欢迎您免费申请奈斯牛入驻商。</p>
          </div>
        </div>
                   <div class="div_bg">
          <div class="0 btn_bg">服务提供商入驻</div>
          <div class="div_img">
            <img src="./img/about_logo.png" alt="">
            <p>如果您有实体店铺，有服务工人，欢迎您免费申请奈斯牛入驻商。</p>
          </div>
        </div>
                         <div class="div_bg">
          <div class="btn_bg">帮工入驻</div>
          <div class="div_img">
            <img src="./img/about_logo.png" alt="">
            <p>如果您有实体店铺，有服务工人，欢迎您免费申请奈斯牛入驻商。</p>
          </div>
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
  import xHeader from '@/components/my/common/xHeader'
  export default{
    components:{
      xHeader
    },
    data(){
      return{
        msg: '我要合作',
      }
    },
    props:{

    },
    mounted(){

    },
    methods:{

    },
  }
</script>
<style scoped>
  .vux-header { background: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  body{padding:0 0.2rem;box-sizing:border-box;background:url("./img/teamwork_bg.png") no-repeat;background-clip:border-box; background-size:auto 100%;background-position: center;padding-top:2rem;box-sizing:border-box;}
  .teamwork_top{text-align:center;}

  .box{width:100%;height:100%;padding-bottom:0.2rem;box-sizing:border-box;padding-top:46px;}


  .div_bg{width:100%;height:4rem;background:url("./img/teamwork_div.png") no-repeat;background-clip:border-box; background-size:100%;overflow:hidden;margin-bottom:0.3rem;}
  .teamwork_list{overflow: auto;height: 100%;}
  .btn_bg{background:url("./img/teamwork_btn.png") no-repeat;background-clip:border-box;width:4.44rem;height:0.63rem;background-size:100%;margin:0.3rem auto 0.4rem;text-align:center;line-height:0.63rem;font-size:0.3rem;color:#fff;}

  .div_img{display:flex;padding:0 0.35rem;}
  .div_img img{width:1.4rem;height:1.4rem;}
  .div_img p{flex:1;font-size:0.3rem;color:#666666;margin-left:0.5rem;margin-top:0.25rem;}
</style>
