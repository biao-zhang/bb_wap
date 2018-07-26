<template>
  <div class='RealName'>
    <x-header class="xheader"  :left-options="{backText:''}"  :title="msg" :right-options="{showMore:false}" ref="head">
      <a slot="right" ><span @click="title_more()" class="titleRight">{{xHeaderRText}}</span></a>
    </x-header>
    <div class="contentBox">
      <div class="box">
        <div class="line1">
          <span class="s1">姓名</span><input type="text" placeholder="请输入姓名" v-model="line1.name" class="input1"/>
        </div>
        <div @click="showSex"><set-cell :lLabel="line2.lLabel" :rLabel="line2.rLabel" :bBorder="false"></set-cell></div>
      </div>
      <div class="box">
        <div class="line1">
          <span class="s1">身份证号</span><input type="text" class="input1" v-model="line3.value" placeholder="请输入身份证号"/>
        </div>
      </div>
      <div class="box">
        <div class="line1">
          <self-address :state="addressState" :value="line4.value" :title="this.line4.title" @close="addressState=false" @change="getAddressVal"></self-address>
      </div>
      </div>
      <div class="box">
        <!--<div @click="showAddress"><set-cell :lLabel="line4.lLabel" :rLabel="line4.rLabel" :rLabelColor="line4.rLabelColor" ></set-cell></div>-->
        <!--<router-link to=""><set-cell :lLabel="line5.lLabel" :rLabel="line5.rLabel" :rLabelColor="line5.rLabelColor"  :bBorder="false" :rImgState="false"></set-cell></router-link>-->
        <div class="line1">
          <span class="s1">{{line5.lLabel}}</span><input type="text" class="input1" v-model="line5.rLabel" placeholder="请填写详细地址"/>
        </div>
      </div>
      <div class="photo">
        <div class="photoTit">上传身份证正反照</div>
        <div class="photoCon">
          <div class="con1">
            <div class="img1">
              <upload :width="uploadWidth" :maxUploadNumber="1" @uploadUrls="getFiles1"   @uploadItems="getItems1"></upload>
            </div>
            <div class="d1">正面照片</div>
          </div>
          <div class="con1">
            <div class="img1">
              <upload :width="uploadWidth" :maxUploadNumber="1" @uploadUrls="getFiles2"   @uploadItems="getItems2"></upload>
            </div>
            <div class="d1">反面照片</div>
          </div>
        </div>
      </div>
    </div>
    <sel-sex :show="changeSexState" @getSex="getSex"></sel-sex>

    <!-- <sel-photo :show="changePhotoState" @getPhoto="getPhoto"></sel-photo> -->
  </div>
</template>
<script>
/**
 * @props
 * @emit
 */
import { XHeader } from "vux";
import setCell from "@/components/my/setting/common/setCell";
// import selPhoto from "@/components/common/selPhoto"
import selSex from "@/components/common/selSex";
import selfAddress from "@/vux/selfAddress";
import upload from "@/components/common/upload";
import { SetinsertSelective } from "@/api/personally";
import { error } from "util";
import { setInterval, clearInterval, setTimeout, clearTimeout } from "timers";

export default {
  data() {
    return {
      msg: "实名认证",
      xHeaderRText: "提交",
      changeSexState: false, //选择性别
      addressState: false, //地址
      uploadWidth: "1.4rem",
      imgUrl1: "",
      imgUrl2: "",
      // changePhotoState:true,
      line1: {
        name: ""
      },
      line2: {
        lLabel: "性别",
        rLabel: "请选择",
        rLabelColor: ""
      },
      line3: {
        value: ""
      },
      line4: {
        lLabel: "现居住地",
        rLabel: "请选择",
        value: [],
        title: "地址",
        rLabelColor: "#333"
      },
      line5: {
        lLabel: "详细地址",
        rLabel: "",
        rLabelColor: "333"
      },
      img1: {
        files: [],
        items: []
      },
      img2: {
        files: [],
        items: []
      }
    };
  },
  components: { XHeader, setCell, selSex, selfAddress, upload },
  props: {},
  mounted() {},
  methods: {
    _SetinsertSelective() {
      let params = {
        realName: this.line1.name,
        sex: this.line2.rLabel == "男" ? 1 : 2,
        idNum: this.line3.value,
        address: this.line4.value + this.line5.rLabel,
        cardBehind: this.imgUrl1,
        cardFront: this.imgUrl2
      };
      console.log('params',params);
      SetinsertSelective(params)
        .then(res => {
          if (res.message=='success') {
            this.$store.commit("setToastType", "success");
            this.$store.commit("setToastText", "提交成功,等待审核通过！");
            this.$router.push({path:'/my/persionDatailMsg'});
          } else {
            this.$store.commit("setToastType", "warn");
            this.$store.commit("setToastText", "提交失败！");
          }
        })
        .catch(err => {
          this.$store.commit("setToastType", "warn");
          this.$store.commit("setToastText", "服务器错误");
        });
    },
    fileChange() {
      var that = this;
      let files = this.$refs.file.files;
      if (files[0].type === "image/png" || files[0].type === "image/jpg"||files[i].type==='image/jpeg') {
        if (files[0].size < 1024 * 500) {
          this.headPortraitFile = files[0];
          var reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onloadend = function(e) {
            that.headPortraitItem = e.target.result;
            that.$refs.headPortrait.src = that.headPortraitItem;
          };
        } else {
          this.$store.state.toastText='上传的图片不能超过 500 kb！'
          this.$store.state.toastType='text'
        }
      } else {
        this.$store.state.toastText='只能上传 jpg 或 png 格式的图片！'
        this.$store.state.toastType='text'
      }
    },
    title_more() {
      if (this.line1.name.length == 0 || this.line1.name.length > 10) {
        this.$store.commit("setToastType", "text");
        this.$store.commit("setToastText", "请输入正确的姓名");
        return false;
      }
      if (this.line2.rLabel == "请选择") {
        this.$store.commit("setToastType", "text");
        this.$store.commit("setToastText", "请选择性别");
        return false;
      }
      if (
        !this.line3.value.match(
          /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
        )
      ) {
        this.$store.commit("setToastType", "text");
        this.$store.commit("setToastText", "请输入正确的身份证号");
        return false;
      }
      if (this.line4.value.length !== 3) {
        this.$store.commit("setToastType", "text");
        this.$store.commit("setToastText", "请选择省市区(县)");
        return false;
      }
      if (this.line5.rLabel.length < 5) {
        this.$store.commit("setToastType", "text");
        this.$store.commit("setToastText", "请填写详细地址");
        return false;
      }
      if (!this.img1.files && !this.img2.files) {
        this.$store.commit("setToastType", "text");
        this.$store.commit("setToastText", "请选择上传证件照片");
        return false;
      } else {
        // var arr = new Array(this.img1.files)
        let url = this.multipartUpload(this.img1.files);
        let url1 = this.multipartUpload(this.img2.files);
        var timeout,timer;
        var that = this;
        let timer = setInterval(function() {
          if (url.length && url1.length) {
            clearInterval(timer);
            clearTimeout(timeout);
              console.log('提交',url[0],url1[0])
              that.imgUrl1 = url[0];
              that.imgUrl2 = url1[0];

              // console.log('图片',imgUrl1,imgUrl2);

          }
        }, 500);
        timeout = setTimeout(() => {
          //头像上传超时
          this.$store.state.toastText='服务器错误'
          this.$store.state.toastType='text'
          clearInterval(interval);
          clearTimeout(timeout);
        }, 10000);
      }

      this._SetinsertSelective();
      console.log(
        "提交数据",
        this.line1.name,
        this.line2.rLabel,
        this.line3.value,
        this.line4.value,
        this.line4.rLabel,
        this.line5.rLabel,
        this.img1,
        this.img2
      );
    },
    //显示性别选择
    showSex() {
      this.changeSexState = true;
    },
    //性别
    getSex(q) {
      this.changeSexState = false;
      if (q === 1) {
        this.line2.rLabel = "男";
      } else if (q === 2) {
        this.line2.rLabel = "女";
      } else {
        console.log("性别取消");
      }
    },
    //显示地址选择
    showAddress() {
      this.addressState = true;
    },
    //地址
    getAddressVal(a, b) {
      this.line4.value = a;
      this.line4.rLabel = b.join("");
    },
    //获取图片信息
    getFiles1(a) {
      this.img1.files = a;
    },
    getItems1(a) {
      this.img1.items = a;
    },
    getFiles2(a) {
      this.img2.files = a;
    },
    getItems2(a) {
      this.img2.items = a;
    }
  }
};
</script>
<style scoped>
.RealName {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
}
.xheader {
  width: 100%;
  background-color: white;
}

.RealName >>> .vux-header .vux-header-title {
  font-size: 0.36rem;
  color: #111;
}
.RealName >>> .vux-header .vux-header-left .left-arrow:before {
  border-color: #111;
}
.vux-header .vux-header-right a .titleRight {
  font-size: 0.28rem;
  color: #f86e0e;
}

.contentBox {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.contentBox .box {
  margin: 0.3rem 0;
}

.line1 {
  height: 1rem;
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  border-bottom: 1px solid #ededed;
  background-color: white;
}
.line1 .s1 {
  display: inline-block;
  vertical-align: middle;
  line-height: 1rem;
  font-size: 0.3rem;
  /*color: #333;*/
}
.line1 .img1 {
  width: 0.7rem;
  height: 0.7rem;
  text-align: right;
  margin: 0.15rem;
  float: right;
}
.line1 .input1 {
  width: 5.5rem;
  text-align: right;
  float: right;
  line-height: 0.5rem;
  margin: 0.25rem 0;
}

.photo {
  width: 100%;
  height: 3.81rem;
  background-color: white;
  box-sizing: border-box;
  padding: 0 0.3rem;
}
.photo .photoTit {
  line-height: 1rem;
  font-size: 0.32rem;
  color: #343434;
}
.photo .photoCon {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-around;
}
.photo .photoCon .con1 {
  width: 50%;
}
.photo .photoCon .con1:first-child {
  border-right: 1px solid #ededed;
}
.photo .photoCon .con1 .img1 {
  width: 1.4rem;
  height: 1.4rem;
  text-align: center;
  margin: auto;
}
.photo .photoCon .con1 .d1 {
  text-align: center;
  font-size: 0.26rem;
  color: #9a9a9a;
  padding-top: 0.37rem;
}
</style>
