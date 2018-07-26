
 // <html xmlns:wb="http://open.weibo.com/wb">
 //  <script src="//tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=1475693511" type="text/javascript" charset="utf-8"></script>
 //  <wb:login-button type="3,3" onlogin="login" onlogout="logout">登录按钮</wb:login-button>
 var url1 = 'https://api.weibo.com/oauth2/authorize?' +
   'client_id=1475693511' +
   '&response_type=code' +
   '&redirect_uri=http://www.donghengwangluo.com';
 var url2 = 'http://www.donghengwangluo.com/?' +
   'code=8f038ed6836c91749605bc7da5a69961';
 var url3 = 'https://api.weibo.com/oauth2/access_token?' +
   'client_id=1475693511' +
   '&client_secret=552763a97f319eea226bc7cef52d964e' +
   '&grant_type=authorization_code' +
   '&redirect_uri=http://www.donghengwangluo.com' +
   '&code=b0243d819d5d0f278d81f5320938c160';
 // access_token:"2.00yKgloGPSrrbBcbb2c5ca7c0CLTsf"
 // expires_in:157679999
 // status:1
 // success:1
 // uid:6246977336


 // 分享到新浪微博
 //    <html xmlns:wb="http://open.weibo.com/wb">
 //   <script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js" type="text/javascript" charset="utf-8"></script>
 //   <wb:share-button appkey="1475693511" addition="number" type="button"></wb:share-button>
