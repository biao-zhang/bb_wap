$(function () {
  var mySwiper1 = new Swiper('.swiper-container', {
    init:false,
    autoplay: true,
    loop : true,
    pagination: {
      el: '.swiper-pagination',
      bulletClass : 'my-bullet',
      bulletActiveClass: 'my-bullet-active',
    },
  })
  // var mySwiper2 = new Swiper('.marquee-container', {
  //   init:false,
  //   autoplay: true,
  //   loop : true,
  //   direction: 'vertical',
  //   allowTouchMove: false,
  // })

  function getQueryVariable(variable)
  {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
    }
    return(false);
  }

  var adcode =  getQueryVariable("adcode")
  if (adcode == '' || adcode == 'undefined' || adcode == 'null'){
    adcode = '410104'
  }
  $.ajax({
    url: LybApiUrl+"/shop/api/SeckillGoodsB2c/searchAppHomePage",
    type: "POST",
    data:{
      adcode:adcode,
      shopType:2
    },
    success: function (data) {
      var data = data.data
      console.log(data)
      if(data == '' || data == null){
        $('.indexNavItem').css('display','none')
      }
      // 轮播图
      var logoImgVOList = ''
      console.log(data.logoImgVOList)
      if (data.logoImgVOList.length>0){
        for (var i = 0;i < data.logoImgVOList.length; i++) {
          logoImgVOList += '<div class="swiper-slide" onclick="banner_1(\''+data.logoImgVOList[i].activity_type+'\',\''+ data.logoImgVOList[i].advlinks +'\',\''+ data.logoImgVOList[i].categoryId +'\',\''+ data.logoImgVOList[i].categoryName +'\')">' +
            '<img src= ' + data.logoImgVOList[i].advertisement_type_app + '>' +
            '</div>'
        }
      }else {
        logoImgVOList =  '<div class="swiper-slide">' +
          '<img src="https://img.oxnice.com/indexImg/banner.jpg">' +
          '</div>'
      }

      // 列表
      var goodsCategoryVOList = ''
      for (var i = 0;i < data.goodsCategoryVOList.length; i++){
        goodsCategoryVOList+='<div class="indexNavItem" onclick="goodsType(\''+data.goodsCategoryVOList[i].categoryName+'\',\''+data.goodsCategoryVOList[i].categoryId+'\')">'+
          '<div class="indexNavImgBox"><img src='+ data.goodsCategoryVOList[i].categoryUrl +' class="img"> </div>' +
          '<div class="titBox" contenteditable="false">'+ data.goodsCategoryVOList[i].categoryName +'</div>' +
          '</div>'
      }
      // 新闻
      // var advertApiVOList = ''
      // for (var i = 0;i < data.advertApiVOList.length; i++){
      //   advertApiVOList+='<div class="swiper-slide" onclick="news(\''+ data.advertApiVOList[i].advertisingId +'\')">' +
      //     '<span class="span2"></span>' +
      //     '<span class="span1" contenteditable="false">'+ data.advertApiVOList[i].advname +'</span>' +
      //     '<img class="imgNext" src="img/next.png"/>' +
      //     '</div>'
      // }
      // 图片
      // 广告图片
      console.log(data.b2cBannerSettingVOList)
      if (data.b2cBannerSettingVOList[0] != null){
        advertisingImg = '<img class="imgAdv" src='+ data.b2cBannerSettingVOList[0].bannerImgUrl +'>'
      }else {
        advertisingImg = '<img class="imgAdv" src="./img/kong.png">'
      }

      if (data.b2cBannerSettingVOList[1] != null){
        seckillImg = '<img class="img1" src='+ data.b2cBannerSettingVOList[1].bannerImgUrl +'>'
      }else {
        seckillImg = '<img class="img1" src="./img/kong3.png">'
      }

      if (data.b2cBannerSettingVOList[2] != null){
        freshImg = '<img class="img1" src='+ data.b2cBannerSettingVOList[2].bannerImgUrl +'>'
      }else {
        freshImg = '<img class="img1" src="./img/kong3.png">'
      }

      if (data.b2cBannerSettingVOList[3] != null){
        newproductImg = '<img class="img1" src='+ data.b2cBannerSettingVOList[3].bannerImgUrl +'>'
      }else {
        newproductImg = '<img class="img1" src="./img/kong3.png">'
      }




      // 优选商品
      var priorityGoodsVOList = ''
      var priorityGoodsVOList2 = ''
      for (var i = 0;i < data.advertisingListVOList.length; i++){
        if(i<2){
          priorityGoodsVOList+='<img class="item1" onclick="prefComm(\''+data.advertisingListVOList[i].advname +'\',\''+ data.advertisingListVOList[i].categoryId +'\')" src='+data.advertisingListVOList[i].advertisement_type+'>'
        }else {
          priorityGoodsVOList2+='<img class="item1" onclick="prefComm(\''+data.advertisingListVOList[i].advname +'\',\''+ data.advertisingListVOList[i].categoryId +'\')" src='+data.advertisingListVOList[i].advertisement_type+'>'
        }

      }

      // 推荐商品
      var priorityGoodsVOListT = ""
      for (var i = 0;i < data.priorityGoodsVOListT.length; i++){
        priorityGoodsVOListT+='<div class="indexGroomItem" onclick="goods(\''+ data.priorityGoodsVOListT[i].goodsId +'\',\'1\')">' +
          '<div class="box"><img class="img1" src='+data.priorityGoodsVOListT[i].goodsImgMaster+'> </div>' +
          '<div class="tit">'+ data.priorityGoodsVOListT[i].goodsName +'</div>' +
          '<div class="price">￥'+ data.priorityGoodsVOListT[i].goodsPrice +'</div>' +
          '</div>'
      }

      //秒杀倒计时
      if(data.seckillTimeVOListm == '' || data.seckillTimeVOListm == null){
        $('.ms_1').html('活动已结束')
      }else {
        var nowTime = data.seckillTimeVOListm[0].nowTime
        var startTime = data.seckillTimeVOListm[0].startTime
        var endTime = data.seckillTimeVOListm[0].endTime
        if( startTime < nowTime&& nowTime < endTime){
          $('.ms_1').html('活动正在进行')
        }else {
          var Time1 =  new Date(startTime)
          var endTime1 = new Date(endTime)
          var s1 = $("#s1");
          var s2 = $("#s2");
          var s3 = $("#s3");
          var date = new Date();
          var toDate1 = new Date(Time1.getFullYear(),Time1.getMonth(),Time1.getDate(),Time1.getHours(),Time1.getMinutes(),Time1.getSeconds());
          var toDate2 = new Date(endTime1.getFullYear(),endTime1.getMonth(),endTime1.getDate(),endTime1.getHours(),endTime1.getMinutes(),endTime1.getSeconds());

          // var toDate1 = new Date(2018,5,25,20,11,0);
          // var toDate2 = new Date(2018,5,25,20,12,0);


          var dateGetTime = date.getTime()


          var toDateGetTime1 = toDate1.getTime()
          var toDateGetTime2 = toDate2.getTime()

          var DValue1 = (toDateGetTime1-dateGetTime)/1000;
          var DValue2 = (toDateGetTime2-dateGetTime)/1000;
          function formatTime(a) {
            if(parseInt(a)<10){
              return '0'+parseInt(a)
            }else{
              return parseInt(a)
            }
          }
          var interval1 = setInterval(function () {
            DValue1--;
            DValue2--;
            s3.html(formatTime(DValue1%60))
            s2.html(formatTime(DValue1/60%60))
            s1.html(formatTime(DValue1/3600))
            if(DValue1<=0){
              $('.ms_1').html('活动正在进行')
              if(DValue2 <= 0){
                $('.ms_1').html('活动已结束')
                clearInterval(interval1)
              }
            }
          },1000);
        }
      }


      // //生鲜倒计时
      if(data.seckillTimeVOLists == '' || data.seckillTimeVOLists == null){
        $('.sx_2').html('活动已结束')
      }else {
        var nowTime = data.seckillTimeVOLists[0].nowTime
        var startTime = data.seckillTimeVOLists[0].startTime
        var endTime = data.seckillTimeVOLists[0].endTime
        if( startTime < nowTime&& nowTime < endTime){
          $('.sx_2').html('活动正在进行')
        }else {
          var Time2 =  new Date(startTime)
          var endTime2 = new Date(endTime)
          var s4 = $("#s4");
          var s5 = $("#s5");
          var s6 = $("#s6");
          var date1 = new Date();
          var toDate3 = new Date(Time2.getFullYear(),Time2.getMonth(),Time2.getDate(),Time2.getHours(),Time2.getMinutes(),Time2.getSeconds());
          var toDate4 = new Date(endTime2.getFullYear(),endTime2.getMonth(),endTime2.getDate(),endTime2.getHours(),endTime2.getMinutes(),endTime2.getSeconds());

          // var toDate3 = new Date(2018,5,25,20,7,0);
          // var toDate4 = new Date(2018,5,25,20,8,0);

          var dateGetTime1 = date1.getTime()


          var toDateGetTime3 = toDate3.getTime()
          var toDateGetTime4 = toDate4.getTime()

          var DValue3 = (toDateGetTime3-dateGetTime1)/1000;
          var DValue4 = (toDateGetTime4-dateGetTime1)/1000;

          function formatTime(a) {
            if(parseInt(a)<10){
              return '0'+parseInt(a)
            }else{
              return parseInt(a)
            }
          }
          var interval2 = setInterval(function () {
            DValue3--;
            s6.html(formatTime(DValue3%60))
            s5.html(formatTime(DValue3/60%60))
            s4.html(formatTime(DValue3/3600))
            DValue4--;
            if(DValue3<=0){
              $('.sx_2').html('活动正在进行')
              if(DValue4 <= 0){
                $('.sx_2').html('活动已结束')
                clearInterval(interval2)
              }
            }
          },1000);
        }
      }




      $('#lunbo').html(logoImgVOList);   //轮播图
      $('.groomBoxList').html(priorityGoodsVOListT);   //推荐商品
      $('#line1').html(priorityGoodsVOList);   //优质商品
      $('#line2').prepend(priorityGoodsVOList2);
      // $('#advertising').html(advertApiVOList);  //广告
      $('.navBox').prepend(goodsCategoryVOList);  //列表
      $('.imgAdvBox').html(advertisingImg);  //广告图片
      $('.seckillImg').html(seckillImg);  //秒杀图片
      $('.freshImg').html(freshImg);  //秒杀图片
      $('.newproductImg').html(newproductImg);  //生鲜图片
      $('.navBox').append('<div class="indexNavItem" onclick="goodsType(\'更多\',\'-1\')">\n' +
        '<div class="indexNavImgBox"><img src="img/more.png" class="img"> </div>\n' +
        '<div class="titBox" contenteditable="false">更多</div>\n' +
        '</div>')
      mySwiper1.init()
      // mySwiper2.init()
    }
  })
  //商品详情





  //倒计时1
  var s1 = $("#s1");
  var s2 = $("#s2");
  var s3 = $("#s3");
  var date = new Date();
  var toDate = new Date(2018,4,14,18,0,0);
  var dateGetTime = date.getTime()
  var toDateGetTime = toDate.getTime()
  var DValue = (toDateGetTime-dateGetTime)/1000;
  function formatTime(a) {
    if(parseInt(a)<10){
      return '0'+parseInt(a)
    }else{
      return parseInt(a)
    }
  }
  var interval1 = setInterval(function () {
    DValue--;
    s3.html(formatTime(DValue%60))
    s2.html(formatTime(DValue/60%60))
    s1.html(formatTime(DValue/3600))
    if(DValue<0){
      clearInterval(interval1)
    }
  },1000);
  // //////////////倒计时2
  // var s4 = $("#s4");
  // var s5 = $("#s5");
  // var s6 = $("#s6");
  // var date1 = new Date();
  // var toDate1 = new Date(2018,5,23,23,0,0);
  // var dateGetTime1 = date1.getTime()
  // var toDateGetTime1 = toDate1.getTime()
  // var DValue1 = (toDateGetTime1-dateGetTime1)/1000;
  // var interval2 = setInterval(function () {
  //   DValue1--;
  //   s6.html(formatTime(DValue1%60))
  //   s5.html(formatTime(DValue1/60%60))
  //   s4.html(formatTime(DValue1/3600))
  //   if(DValue1<0){
  //     clearInterval(interval2)
  //   }
  // },1000);
  /////////////////////////////////////////
})

//判断跳转




// banner
function banner_1(a, b, c , d) {
  if (a != '' && a != 'null' && a != 0 && a != '0') {
    if (a == '1') {
      banner('3')
    } else if (a == '2') {
      banner('2')
    } else if (a == '4') {
      banner('4')
    }else {
      alert('error')
    }
  }else if (b != '' && b != 'null') {
    console.log('连接')
  } else if (c != '' && c != 'null') {
    banner('1',d,c)
  }else {
    // alert('error1')
  }
}

function banner1(a) {
  window.AndroidWebView.banner1(a);
}
function banner3(a,b,c) {
  window.AndroidWebView.banner3(a,b,c);
}

function banner(a,b,c) {
  if(b==undefined){

    banner1(a)
  }else{

    banner3(a)
  }
}

// nav
function goodsType(a, b) {
  window.AndroidWebView.goodsType(a, b);
}

// marquee
function news(a) {
  window.AndroidWebView.news(a);
}

// 红包
function redEnvelope() {
  window.AndroidWebView.redEnvelope();
}

// 秒杀
function miaoSha() {
  window.AndroidWebView.miaoSha();
}

// 生鲜
function shengXian() {
  window.AndroidWebView.shengXian();
}

// 新品
function newProduct() {
  window.AndroidWebView.newProduct();
}

// 优选商品
function prefComm(a, b) {
  window.AndroidWebView.prefComm(a, b);
}

// 推荐
function goods(a) {
  window.AndroidWebView.goods(a);
}
