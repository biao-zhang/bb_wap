<template>
  <div class='bindAccount'>
    <xHeader :msg="tit"></xHeader>
    <div class="contentBox">
      <div class="box">
       <div v-if="!isWx">
         <div v-if="!wxBind" @click="bindWechat(line1.lLabel)">
           <set-cell :lImgSrc="line1.lImgSrc" :lLabel="line1.lLabel" :rLabel="line1.rLabel" :rLabelColor="line3.rLabelColor"> </set-cell>
         </div>
         <div v-if="wxBind" @click="bindWechat(line1.lLabel)">
           <set-cell :lImgSrc="line1.lImgSrc" :lLabel="line1.lLabel" :rLabel="line1.rLabelY" > </set-cell>
         </div>
       </div>
       <!-- <div @click="bindWechat(1)"><set-cell :lImgSrc="line2.lImgSrc" :lLabel="line2.lLabel" :rLabel="line2.rLabel" :rLabelColor="line2.rLabelColor"></set-cell></div>-->
       <div v-if="isWx">
         <div v-if="!qqBind" @click="bindWechat(line3.lLabel)">
           <set-cell :lImgSrc="line3.lImgSrc" :lLabel="line3.lLabel" :rLabel="line3.rLabel" :rLabelColor="line3.rLabelColor"> </set-cell>
         </div>
         <div v-if="qqBind" @click="bindWechat(line3.lLabel)">
           <set-cell :lImgSrc="line3.lImgSrc" :lLabel="line3.lLabel" :rLabel="line3.rLabelY"> </set-cell>
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
  import xHeader from "@/components/my/common/xHeader"
  import setCell from "@/components/my/setting/common/setCell"
  import JsonImg from '@/components/my/setting/common/img.json'
  import { qqUnbundle, qqwaplogin, wxloginJsp, GetSelectBasicByIdDetail } from "@/api/personally"

  export default{
    data(){
      return {
        tit:'快捷账号绑定',
        line1:{
          lImgSrc:JsonImg.img[0].wechatLogo,
          lLabel:'微信',
          rLabel:'未绑定',
          rLabelY:'已绑定',
          rLabelColor:'#9a9a9a'
        },
       /* line2:{
          lImgSrc:JsonImg.img[0].weiboLogo,
          lLabel:'微博',
          rLabel:'已绑定',
          rLabelColor:'#9a9a9a'
        },*/
        line3:{
          lImgSrc:JsonImg.img[0].qqLogo,
          lLabel:'qq',
          rLabel:'未绑定',
          rLabelY:'已绑定',
          rLabelColor:'#9a9a9a'
        },

        wxBind: false,
        qqBind: false,
        isWx: '',

        // 个人信息
        persionData: {},
      }
    },
    components:{xHeader,setCell},
    mounted() {

      this._GetSelectBasicByIdDetail()

      var that = this

      function is_weixn(){

        console.log(navigator)

        var ua = navigator.userAgent.toLowerCase();

        if(ua.match(/MicroMessenger/i)=="micromessenger") {

          that.isWx = false

        } else {

          that.isWx = true

        }
      }
      is_weixn()
    },
    methods:{
      bindWechat(val){
        var that = this;
        let htmlY = '' +
          '<span style="font-size: 0.26rem;display: inline-block;margin-bottom:0.2rem;color:#333;">您的' + val +'解绑后，将不能使用' + val +'登录。</span>'
        let htmlN = '' +
          '<span style="font-size: 0.26rem;display: inline-block;margin-bottom:0.2rem;color:#333;">绑定' + val +'后可以使用' + val +'快捷登录</span>'

        if (val === '微信') {

          this.$vux.confirm.show({
            title: '确定' + (that.wxBind ? '解绑' : '绑定') + val,
            content: that.wxBind ? htmlY : htmlN,
            confirmText:'继续',
            onConfirm () {
              /*that.wxBind = !that.wxBind*/
              if (that.wxBind) {

                qqUnbundle({

                  type: 2

                }).then( res => {

                  that.wxBind = false

                  this.setCookie('session_id', "", -1);

                  console.log('wx解绑', res)

                })

              }  else {

                wxloginJsp().then( res => {

                  window.location = res.data
                  console.log('wx绑定', res)

                })

              }
            }
          })

        } else if (val === 'qq') {

          this.$vux.confirm.show({
            title: '确定' + (that.qqBind ? '解绑' : '绑定') + val,
            content: that.qqBind ? htmlY : htmlN,
            confirmText:'继续',
            onConfirm () {
              /*that.qqBind = !that.qqBind*/
              if (that.qqBind) {

                qqUnbundle({

                  type: 1

                }).then( res => {

                  that.qqBind = false
                  console.log('qq解绑', res)

                })

              }  else {

                qqwaplogin().then( res => {

                  window.location = res.data
                  console.log('qq绑定', res)

                })

              }

            }
          })

        }
      },
      // 个人信息
      _GetSelectBasicByIdDetail() {
        GetSelectBasicByIdDetail().then(res => {

          if (res.data) {

            this.persionData = res.data

            if (!this.isWx) {

              if (this.persionData.openId) {

                this.wxBind = true

              } else {

                this.wxBind = false

              }

            } else {

              if (this.persionData.qq) {

                this.qqBind = true

              } else {

                this.qqBind = false

              }

            }

            console.log('个人信息', this.persionData)

          }

        })
      },
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
    },
  }
</script>
<style>
  /*confirm*/
  .weui-dialog__btn_primary{color:white;background-color: #f15352;}
</style>
<style scoped>
.bindAccount{width:100%;height: 100%;}

.contentBox{width:100%;height: 100%;box-sizing: border-box;padding-top:46px;background-color: #f5f5f5;}
.contentBox .box{margin:0.3rem 0;}
</style>
