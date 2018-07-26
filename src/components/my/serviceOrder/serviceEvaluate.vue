<template>
  <div class='serviceEvaluate'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div class="person">
      <div class="personPic">
        <img :src="serviceOrderDetail.serviceProviderImg ? serviceOrderDetail.serviceProviderImg : require('../img/oxniceDefault.png')"/>
      </div>
      <div class="personName">{{ serviceOrderDetail.serviceProvider }}</div>
      <!--<div class="personTime">
        <div class="personTimeLine"></div>
        <div class="personTimeM"><span>12</span>月<span>18</span>日<span>10：00</span>开始服务</div>
        <div class="personTimeLine"></div>
      </div>-->
      <div class="personHeart" style="margin-top: 0.20rem">
        <rater v-model="rate" star="✩" active-color="#fd593d"> </rater>
      </div>
    </div>
    <div class='orderInfo'>
      <span class="serviceTitle">服务评价：</span>
      <div class="xTextarea">
        <group>
          <x-textarea v-model="text" :max="140" :placeholder="tips"  :height="80"> </x-textarea>
        </group>
      </div>
      <div class="add_picture">
        <upload
          :maxUploadNumber="5"
          @uploadItems="getInputItems"
          @uploadUrls="getInput"
        > </upload>
      </div>
    </div>
    <div @click="hideNAme" class="hideNAme">
      <i class="iconfont icon-iconfontxuanzhong1" v-bind:class="{hideNAmeComment: ishideNAme }"></i>
      <span>匿名评价</span>
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XHeader, Group, XTextarea, Rater } from 'vux'
  const getImgURL = require('@/assets/js/getImgURL.js')
  import { serviceOrderDetail, commentOrder } from "@/api/service"
  import upload from "@/components/common/upload"

  export default{
    components: {
      XHeader,
      Group,
      XTextarea,
      Rater,
      upload,
    },
    data(){
      return{
        topMessage: '评价',
        tips: '亲，对这次服务有什么想说的吗？',
        ishideNAme: false,

        serviceOrderDetail: {},
        text: '',
        rate: 5,
        imgs: '',
      }
    },
    props:{

    },
    mounted(){
      this.orderId = this.$route.query.orderId
      this.adcode = localStorage.getItem('curCityAdcode')

      this._serviceOrderDetail()
    },
    methods:{
      submit() {

        if (!this.text) {

          this.$store.commit('setToastText','评价内容不能为空')
          this.$store.commit('setToastType','warn')

        }  else {

          this._commentOrder()

        }

      },
      // 上传图片
      getInputItems(a){
        console.log('a', a)

      },
      getInput(b){
        console.log('b', b)

        if(b!=''){   //更改了用户头像
          var url=[];
          url = this.multipartUpload(b);
          var interval,timeout;
          interval = setInterval(()=>{                     //头像上传成功后，提交接口 21
            if(url.length>0){
              this.imgs = url.join(',')

              clearTimeout(timeout)
              clearInterval(interval)

              console.log('this.imgs',url.join(','))
            }

          },500)
          timeout = setTimeout(()=>{                       //头像上传超时
            this.$store.state.toastText='服务器错误'
            this.$store.state.toastType='text'
            clearInterval(interval)
            clearTimeout(timeout)
          },10000)
        }
      },
      // 是否匿名
      hideNAme() {
        if (this.ishideNAme) {
          this.ishideNAme = false
        } else {
          this.ishideNAme = true
        }
        console.log('您将匿名发布')
      },
      // 服务详情
      _serviceOrderDetail() {
        serviceOrderDetail({
          orderId: this.orderId,
          adcode: this.adcode,
        })
          .then( res => {

            this.serviceOrderDetail = res.data
            console.log('service服务详情', res)

          })
      },
      // 服务评价
      _commentOrder() {
        commentOrder({
          orderId: this.orderId,
          text: this.text,
          lv: this.rate,
          isniming: this.ishideNAme ? 1 : 0,  // 是否匿名（0：否，1：是）
          imgs: this.imgs,
        })
          .then( res => {

            if(res.message === 'success') {

              this.$store.commit('setToastText','评价成功')
              this.$store.commit('setToastType','success')
              this.$router.push('/z/serviceOrderList')

            }
            else{
              this.$store.commit('setToastText','评价失败')
              this.$store.commit('setToastType','warn')

            }

            // console.log('服务评价', res)

          })
      }
    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .serviceEvaluate {
    font-size: 0.30rem;
  }
  .person {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.20rem 0;
    background-color: #ffffff;
  }
  .personPic img {
    width: 1.60rem;
  }
  .personTime {
    display: flex;
    align-items: center;
  }
  .personTimeM {
    font-size: 0.20rem;
    color: #666666;
    margin: 0.20rem 0;
  }
  .personTimeLine {
    height: 1px;
    width: 1.50rem;
    background-color: #cccccc;
    margin: 0 0.20rem;
  }
  .orderInfo {
    padding: 0.20rem;
    background-color: #ffffff;
    margin: 0.30rem 0;
  }

  .imgPhoto { width: 1.40rem; height: 1.40rem; }
  .hideNAmeComment {color: #fd593d;}
  .hideNAme {
    text-align: right;
    margin-right: 0.20rem;
    padding: 0.2rem 0;
  }

  .xTextarea >>> .vux-x-textarea {
    border:1px solid #eee;
    border-radius: 5px;
    margin-bottom: 0.20rem;
  }
  .xTextarea >>> .weui-cells:before {
    border: 0;
  }
  .xTextarea >>> .weui-cells:after {
    border: 0;
  }
  .submit {
    height: 1.00rem;
    position: absolute;
    left: 0;
    bottom: 0;
    line-height: 1.00rem;
    text-align: center;
    background-color: #f15352;
    color: #ffffff;
    width: 100%;
  }
</style>
