// 判断      手机号
export const checkPhone = (value) => {
  let reg = /^1[34578]\d{9}$/
  if(!(reg.test(value))){
    // alert("手机号码有误，请重填");
    return {
      state:false,
      code:'',
      msg:'手机号输入错误'
    }
  }else{
    return {
      state:true,
      code:'',
      msg:''
    }
  }
}

// 中文名字
export const chineseName = (value) => {
  let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/;
  if(reg.test(value)){
    return true
  }else{
    return false
  }
}

// 身份证号
export const idNumber = (value) => {
  let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
  if(reg.test(value)){
    return true
  }else{
    return false
  }
}

//银行卡号
export const bankCard = (value) => {
  let reg = /^([1-9]{1})(\d{14}|\d{18})$/;
  if(reg.test(value)){
    return true
  }else{
    return false
  }
}

// 判断      非法字符(表情等)
export const checkString = (value) => {
  let reg = /^[A-Z，。,.？?0-9a-z\u4e00-\u9fa5]+$/;
  if(reg.test(value)){
    return true
  }else{
    return false
  }
}
//验证密码    6-15（字母加数字特殊符号除外）
export const checkPassword = (value) => {
  let str = value.toString();
  if(str.length>=6&&str.length<=15){
    let reg = /^[0-9A-Za-z]+$/g
    if (!(reg.test(str))) {          //密码格式（字母+数字）验证不通过
      return {
        state:false,
        code:'',
        msg:'密码中必须同时包含数字和字母'
      }
    }else{                          //密码正确
      return {
        state:true,
        code:'',
        msg:''
      }
    }
  }else{                            ////////密码长度验证不通过
    return {
      state:false,
      code:'',
      msg:'密码长度应该大于6并且小于15'
    }
  }
}

//验证密码长度    6<len<15
export const isPasswordLen = (value) => {
  let str = value.toString();
  if(str.length>=6&&str.length<=15){
    return true
  }else{                            ////////密码长度验证不通过
    return false
  }
}

//验证密码规范          （字母+数字）
export const isPasswordStr = (value) => {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  if (reg.test(value)) {          //密码正确
    return true
  }else{                          //密码格式（字母+数字）验证不通过
    return false
  }
}

// 规定验证码
export const authCode = (value) => {
  let str = value.toString();
  if(str.length==6){
    let reg = /^[0-9]+$/g
    if (!(reg.test(str))) {          //验证码格式（字母+数字）验证不通过
      return {
        state:false,
        code:'',
        msg:'验证码中必须同时包含数字和字母'
      }
    }else{                          //验证码正确
      return {
        state:true,
        code:'',
        msg:''
      }
    }
  }else{                            ////////验证码长度验证不通过
    return {
      state:false,
      code:'',
      msg:'验证码长度必须4位'
    }
  }
}


//验证支付密码规范          （纯数字）
export const isPaymentStr = (value) => {
  let reg = /^[1-9]\d*$/
  if (reg.test(value)) {          //密码正确
    return true
  }else{                          //密码格式（数字）验证不通过
    return false
  }
}

// 获取年月日
export const time = (time) => {
  let formatTime = (a) => parseInt(a) < 10 ? '0' + parseInt(a) : parseInt(a)
  let t = new Date(time);
  let year = t.getFullYear();
  let month = formatTime(t.getMonth()+1);
  let day = formatTime(t.getDate());
  let hours = formatTime(t.getHours());
  let minutes = formatTime(t.getMinutes());
  let seconds = formatTime(t.getSeconds());
  return [year,month,day,hours,minutes,seconds]
}

// 判断是否是微信浏览器

export const isWeiXin = () => {
  console.log(navigator)
  let ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i)=="micromessenger"
}

// 判断是否是安卓

export const isAndriod = () => {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  return isAndroid;
}

// 判断是否是ios

export const isIOS = () => {
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isiOS;
}



/**
 * 设置cookie
 */
export const setCookie=(name, value, days)=> {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else {
    var expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
/**
 * 删除cookie
 */
export const deleteCookie = (name) => {
  this.setCookie(name, "", -1);
}
/**
 * 读取cookie
*/
export const getCookie = (name) =>{
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * 是否为空
 * 为空返回false
 * 否则返回true
*/
export const isEmpty = (obj)=>{
    for (var name in obj) {
      return true;
    }
    return false;
}



