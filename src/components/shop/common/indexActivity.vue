<template>
  <div class="indexActivityBox">
      <div class="item">
        <router-link :to="{path:'/x/seckill',query:{seckillPageTitle:'秒杀'}}">
        <div class="line1">秒杀</div>
        <div class="line2">
          <!--<span >10点场</span>-->
          <span class="time" v-if="countdown">
            <span class="blackBox">{{s1}}</span>:<span class="blackBox">{{s2}}</span>:<span class="blackBox">{{s3}}</span>
          </span>
          <span v-if="countdown1">活动已结束</span>
          <span v-if="bebeing">活动正在进行</span>
        </div>
        <div class="line3">
          <img v-for="(item,index) in datas.b2cBannerSettingVOList" v-if="index===1 && item != null" class="img1" :src='item.bannerUrl'/>
          <img v-for="(item,index) in datas.b2cBannerSettingVOList" v-if="index===1 && item == null" class="img1" src="../img/kong3.png" alt="">
        </div>
        </router-link>
      </div>

    <div class="item">
      <router-link :to="{path:'/x/seckill',query:{seckillPageTitle:'生鲜'}}">
        <div class="line1">生鲜</div>
        <div class="line2">
          <!--<span >10点专场</span><span></span>-->
          <span class="time"  v-if="countdown_1">
            <span class="blackBox">{{s4}}</span>:<span class="blackBox">{{s5}}</span>:<span class="blackBox">{{s6}}</span>
          </span>
          <span v-if="countdown1_1">活动已结束</span>
          <span v-if="bebeing_1">活动正在进行</span>
        </div>
        <div class="line3">
          <img v-for="(item,index) in datas.b2cBannerSettingVOList" v-if="index===2 && item != null" class="img1" :src='item.bannerUrl'/>
          <img v-for="(item,index) in datas.b2cBannerSettingVOList" v-if="index===2 && item == null" class="img1" src="../img/kong3.png" alt="">
        </div>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/y/newArrivals">
        <div class="line1">新品</div>
        <div class="line2">
          <span>海量积分</span><span></span>
        </div>
        <div class="line3">
          <img v-for="(item,index) in datas.b2cBannerSettingVOList" v-if="index===3 && item != null" class="img1" :src='item.bannerUrl'/>
          <img v-for="(item,index) in datas.b2cBannerSettingVOList" v-if="index===3 && item == null" class="img1" src="../img/kong3.png" alt="">
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return{
        s1:'00',  //时
        s2:'00',  //分
        s3:'00',  // 秒
        countdown:true,//倒计时 (秒杀)
        countdown1:false,//活动结束 (秒杀)
        bebeing:false,//正在进行 (秒杀)


        s4:'00',  //时
        s5:'00',  //分
        s6:'00',  // 秒
        countdown_1:true,//倒计时 (生鲜)
        countdown1_1:false,//活动结束 (生鲜)
        bebeing_1:false,//正在进行 (生鲜)


//        nowTime:'',//现在时间
//        startTime:'',//开始时间
//        endTime:'', //结束时间
      }
    },
    props:{
      datas:{
        type:Object,
        default:function () {
          return {}
        }
      }
    },
    mounted(){
      //秒杀倒计时
      if(this.datas.seckillTimeVOListm[0] == '' || this.datas.seckillTimeVOListm[0] == null){
        this.countdown = false
        this.countdown1 = true
      }else{
          this.nowTime = this.datas.seckillTimeVOListm[0].nowTime  //现在时间
          this.startTime = this.datas.seckillTimeVOListm[0].startTime    //秒杀开始时间
          this.endTime = this.datas.seckillTimeVOListm[0].endTime        //秒杀结束时间
          console.log(this.startTime)
          this.countdown = true
          this.countdown1 = false
          if( this.startTime < this.nowTime && this.nowTime < this.endTime){
            this.bebeing = true
            this.countdown = false
          }else {
            var Time1 =  new Date(this.startTime)
            var endTime1 = new Date(this.endTime)
            var toDate1 = new Date(Time1.getFullYear(),Time1.getMonth(),Time1.getDate(),Time1.getHours(),Time1.getMinutes(),Time1.getSeconds());
            var toDate2 = new Date(endTime1.getFullYear(),endTime1.getMonth(),endTime1.getDate(),endTime1.getHours(),endTime1.getMinutes(),endTime1.getSeconds());

//              var toDate1 = new Date(2018,5,26,10,10,0);
//              var toDate2 = new Date(2018,5,26,10,11,0);
            console.log(toDate1)
            console.log(toDate2)
            this.initCountdown(toDate1,toDate2)
          }
      }
      //生鲜倒计时
      if(this.datas.seckillTimeVOLists[0] == '' || this.datas.seckillTimeVOLists[0] == null){
        this.countdown_1 = false
        this.countdown1_1 = true
      }else {
        this.nowTime = this.datas.seckillTimeVOLists[0].nowTime  //现在时间
        this.startTime = this.datas.seckillTimeVOLists[0].startTime    //秒杀开始时间
        this.endTime = this.datas.seckillTimeVOLists[0].endTime        //秒杀结束时间
        console.log(this.startTime)
        this.countdown_1 = true
        this.countdown1_1 = false
        if( this.startTime < this.nowTime && this.nowTime < this.endTime){
          this.bebeing_1 = true
          this.countdown_1 = false
        }else {
          var Time2 =  new Date(this.startTime)
          var endTime2 = new Date(this.endTime)
          var toDate3 = new Date(Time2.getFullYear(),Time2.getMonth(),Time2.getDate(),Time2.getHours(),Time2.getMinutes(),Time2.getSeconds());
          var toDate4 = new Date(endTime2.getFullYear(),endTime2.getMonth(),endTime2.getDate(),endTime2.getHours(),endTime2.getMinutes(),endTime2.getSeconds());
//              var toDate3 = new Date(2018,5,26,10,39,0);
//              var toDate4 = new Date(2018,5,26,10,40,0);
          this.initCountdown_1(toDate3,toDate4)
        }
      }

    },
    methods:{
      formatTime(a){    //格式化倒计时时间
        if(parseInt(a)<10){
          return '0'+parseInt(a)
        }else{
          return parseInt(a)
        }
      },

      initCountdown(a,b){
        var date = new Date();
        var toDate1 = new Date(a);
        var toDate2 = new Date(b);

        var dateGetTime = date.getTime()

        var toDateGetTime1 = toDate1.getTime()
        var toDateGetTime2 = toDate2.getTime()

        var DValue1 = (toDateGetTime1-dateGetTime)/1000;
        var DValue2 = (toDateGetTime2-dateGetTime)/1000;

        var that = this;
        var interval1 = setInterval(function () {
          DValue1--;
          DValue2--;
          that.s3=that.formatTime(DValue1%60)
          that.s2=that.formatTime(DValue1/60%60)
          that.s1=that.formatTime(DValue1/3600)
          if(DValue1<=0){
            that.bebeing = true
            that.countdown = false
            if(DValue2 <= 0){
              that.countdown1 = true
              that.bebeing = false
              clearInterval(interval1)
            }
          }
        },1000);
      },
      initCountdown_1(c,d){
        var date = new Date();
        var toDate3 = new Date(c);
        var toDate4 = new Date(d);

        var dateGetTime = date.getTime()

        var toDateGetTime3 = toDate3.getTime()
        var toDateGetTime4 = toDate4.getTime()

        var DValue3 = (toDateGetTime3-dateGetTime)/1000;
        var DValue4 = (toDateGetTime4-dateGetTime)/1000;

        var that = this;
        var interval2 = setInterval(function () {
          DValue3--;
          DValue4--;
          that.s6=that.formatTime(DValue3%60)
          that.s5=that.formatTime(DValue3/60%60)
          that.s4=that.formatTime(DValue3/3600)
          if(DValue3<=0){
            that.bebeing_1 = true
            that.countdown_1 = false
            if(DValue4 <= 0){
              that.countdown1_1 = true
              that.bebeing_1 = false
              clearInterval(interval2)
            }
          }
        },1000);
      }
    }

  }
</script>
<style scoped>
.indexActivityBox{height: 3rem;padding:0.3rem 0.27rem;display: flex;justify-content: space-between}

  .item{width:2.25rem;background-color: #fee3e3;height: 3rem;padding: 0.1rem 0.2rem;box-sizing: border-box;}
  .item .line1{font-size: 0.3rem;color:#fe3842;font-weight: bold;}
  .item .line2{font-size: 0.24rem;color:#666;height: 0.5rem;
    line-height: 0.5rem;}
  /*.item .line2 .time{float: right;}*/
  .item .line2 .time .blackBox{background-color: #212121;width:0.3rem;height:0.3rem;line-height:0.3rem;display: inline-block;color:white;}
  .item .line3{width:1.86rem;height:1.86rem;box-sizing: border-box;display: flex;justify-content: space-between;flex-wrap: wrap;}
  .item .line3 .img1{width:100%;height: 100%;}
  .item .line3 .img2{width:100%;height: 100%;}
  /*.item .line3 .img2{width:0.8rem;height:0.8rem;margin-bottom: 0.2rem;}*/



</style>
