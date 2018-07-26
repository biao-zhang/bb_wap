<template>
  <div class='awardList'>
    <div class="name_1">
      <div>
        <p>第{{ranking}}名：</p>
        <p>{{datas.nickname}}</p>
      </div>
      <div>
        <p>{{money}}/{{allMoney}}元</p>
      </div>
    </div>
    <div class="time_1">
      <div>
        <p>{{phone}}</p>
      </div>
      <div>
        <p>下单时间：{{orderTime[0]}}.{{orderTime[1]}}.{{orderTime[2]}}</p>&nbsp;
        <p>{{orderTime[3]}}:{{orderTime[4]}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { time } from "../../../untils/untils";
  export default{
    data(){
      return{
        phone:'', //手机号
        orderTime:'', //下单时间
        money:'', //名次金额
        allMoney:'',  //名次金额2
        ranking:'',  //名次
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
      this.phone = this.datas.phone.substr(0,3)+"****"+this.datas.phone.substr(7);
      this.orderTime = time(this.datas.orderTime)

      this.money = Number(this.datas.money).toFixed(2)
      this.allMoney = Number(this.datas.allMoney).toFixed(2)

      this.ranking = this.numToChinaese(this.datas.ranking)
    },
    methods:{
      numToChinaese(num) {
          num = Number(num);
          var upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];
          var length = String(num).length;
          if (length == 1) {
            return upperCaseNumber[num];
          } else if (length == 2) {
            if (num == 10) {
              return upperCaseNumber[num];
            } else if (num > 10 && num < 20) {
              return '十' + upperCaseNumber[String(num).charAt(1)];
            } else {
              return upperCaseNumber[String(num).charAt(0)] + '十' + upperCaseNumber[String(num).charAt(1)].replace('零', '');
            }
          }
        }
    },
  }
</script>
<style scoped>
  /*列表*/
  .list{width:100%;padding:0 0.2rem;box-sizing:border-box;display:flex;}
  .list_one{width:100%;border-bottom:1px solid #ededed;box-sizing:border-box;padding:0.12rem 0;}


  .name_1{display:flex;justify-content:space-between;line-height:0.5rem;margin-left:0.6rem;}
  .name_1 div{display:flex;}
  .name_1 div p{font-size:0.3rem;color:#333;}

  .time_1{display:flex;justify-content:space-between;line-height:0.5rem;margin-left:0.6rem;}
  .time_1 div{display:flex;}
  .time_1 div p{font-size:0.28rem;color:#666;}

  .list_one img{width:0.5rem;height:0.5rem;position:absolute;}
</style>
