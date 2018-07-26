
var co = require('co');
var OSS = require('ali-oss');
var axios = require('axios');
var qs = require('qs');
var client;
axios.get('/etc/sts/token/02906148')
  .then(function (response) {
    client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: response.data.accessKeyId,
      accessKeySecret: response.data.accessKeySecret,
      stsToken: response.data.securityToken,
      bucket: response.data.bucketName,
    });
  }).catch(function (error) {
  console.log(error);
  })
function random_string(len) {
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    if(i===len/2){
      pwd+=new Date().getTime().toString().slice(3,12);
    }else{
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
  }
  return pwd;
}
function get_suffix(filename) {
  var pos = filename.lastIndexOf('.')
  var suffix = ''
  if (pos != -1) {
    suffix = filename.substring(pos)
  }
  return suffix;
}
var multipartUpload = function (filesId,name) {
  var result,allResult=[],files=filesId;
  co(function* () {
    for(let i =0;i<files.length;i++){
      let a = name || random_string(24);
      var result = yield client.put('web/'+a+get_suffix(files[i].name),files[i]);
      // allResult.push(result.res.requestUrls)
      allResult.push(result.res.requestUrls[0].substring(result.res.requestUrls[0].length-41,result.res.requestUrls[0].length))
    }
  }).catch(function (err) {
    console.log(err);
  });
//   co(function* () {
//     for(let i =0;i<files.length;i++){
//       let a = name || random_string(24);
//       result = yield client.multipartUpload('web/'+a+get_suffix(files[i].name), files[i], {
//         progress: function* (p) {
// //            console.log('Progress: ' + p);
//         },
// //          meta: {
// //            year: 2017,
// //            people: 'test'
// //          },
// //          mime: 'image/jpeg'
//       });
//       allResult.push(result.res.requestUrls)
//     }
//   }).catch(function (err) {
//     console.log(err);
//   });
  return allResult;
}

export default multipartUpload;           //function(){}


