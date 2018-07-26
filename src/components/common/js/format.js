
// 获取年月日
export const time = (time) => {
  let DValue = time / 1000;
  let formatTime = (a) => parseInt(a) < 10 ? '0' + parseInt(a) : parseInt(a)
  let t = new Date();
  t.setTime(1526397488 * 1000);
  let year = t.getFullYear();
  let month = t.getMonth()+1;
  let day = t.getDate();
  let hours = t.getHours();
  let minutes = t.getMinutes();
  let seconds = t.getSeconds();
  return new Array(year,month,day,hours,minutes,seconds)
}
