
var url1 = 'https://graph.qq.com/oauth2.0/authorize?' +
  'response_type=code' +
  '&client_id=101453915' +
  '&redirect_uri=http://www.donghengwangluo.com' +
  '&state=lllmmmlll';
var url2 = 'https://graph.qq.com/oauth2.0/token?' +
  'grant_type=authorization_code' +
  '&client_id=101453915' +
  '&client_secret=9ae227049ae013634b4f777dffb67971' +
  '&code=24EABC46CB7155864902759105022C6D' +
  '&redirect_uri=http://www.donghengwangluo.com';
// =>access_token=31CEF82767D0AAEA7D94BDA4ACF99252&expires_in=7776000&refresh_token=78B38FB014745CC191E89A8E8A78356E
var url3 = 'https://graph.qq.com/oauth2.0/authorize?' +
  'response_type=code' +
  '&client_id=101453915' +
  '&redirect_uri=http://www.donghengwangluo.com' +
  '&state=lllmmmlll';
// =>callback( {"client_id":"101453915","openid":"D35325DD9DD4E007153CA2EDD1BF7076"} );
var url4 = 'https://graph.qq.com/user/get_user_info?' +
  'access_token=31CEF82767D0AAEA7D94BDA4ACF99252' +
  '&oauth_consumer_key=101453915' +
  '&openid=D35325DD9DD4E007153CA2EDD1BF7076'
// =>{ "ret": 0, "msg": "", "is_lost":0, "nickname": "前端 李", "gender": "男", "province": "河南", "city": "郑州", "year": "2017", "figureurl": "http:\/\/qzapp.qlogo.cn\/qzapp\/101453915\/D35325DD9DD4E007153CA2EDD1BF7076\/30", "figureurl_1": "http:\/\/qzapp.qlogo.cn\/qzapp\/101453915\/D35325DD9DD4E007153CA2EDD1BF7076\/50", "figureurl_2": "http:\/\/qzapp.qlogo.cn\/qzapp\/101453915\/D35325DD9DD4E007153CA2EDD1BF7076\/100", "figureurl_qq_1": "http:\/\/thirdqq.qlogo.cn\/qqapp\/101453915\/D35325DD9DD4E007153CA2EDD1BF7076\/40", "figureurl_qq_2": "http:\/\/thirdqq.qlogo.cn\/qqapp\/101453915\/D35325DD9DD4E007153CA2EDD1BF7076\/100", "is_yellow_vip": "0", "vip": "0", "yellow_vip_level": "0", "level": "0", "is_yellow_year_vip": "0" }



/*
分享到QQ空间
<script type="text/javascript">
  function share(){
    var p = {
      url:'http://www.baidu.com',
      showcount:'1',/!*是否显示分享总数,显示：'1'，不显示：'0' *!/
      desc:'',/!*默认分享理由(可选)*!/
      summary:'',/!*分享摘要(可选)*!/
      title:'',/!*分享标题(可选)*!/
      site:'',/!*分享来源 如：腾讯网(可选)*!/
      pics:'http://dhtest2.oss-cn-beijing.aliyuncs.com/web/yxYke84dhyWf567937418hbRpHiw27re.png', /!*分享图片的路径(可选)*!/
      style:'102',
      width:145,
      height:30
    };
    var s = [];
    for(var i in p){
      s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
    window.location=['http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&')].join('');
  }
  </script>
  <script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201"charset="utf-8"></script>

分享给QQ好友
<script type="text/javascript">
  function share(){
    var p = {
      url:'http://www.baidu.com', /!*获取URL，可加上来自分享到QQ标识，方便统计*!/
      desc:'', /!*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*!/
      title:'标题', /!*分享标题(可选)*!/
      summary:'摘要', /!*分享摘要(可选)*!/
      pics:'', /!*分享图片(可选)*!/
      flash: '', /!*视频地址(可选)*!/
      site:'qq分享', /!*分享来源(可选) 如：QQ分享*!/
      style:'102',
      width:63,
      height:24
    };
    var s = [];
    for(var i in p){
      s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
    window.location=['http://connect.qq.com/widget/shareqq/index.html?',s.join('&')].join('');
  }
  </script>
  <script src="http://connect.qq.com/widget/loader/loader.js" widget="shareqq" charset="utf-8"></script>*/
