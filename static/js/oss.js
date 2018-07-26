var client = new OSS.Wrapper({
  region : 'oss-cn-beijing',
  accessKeyId : 'LTAIQcg212bnGxA0',
  accessKeySecret : 'y2Bb7oiKYkZSqXZb2ucI4jW3DgGgjr',
  bucket : 'ltest666',
  // region : 'oss-cn-hongkong',
  // accessKeyId : 'LTAIPOcxLTWiB6yH',
  // accessKeySecret : 'XWwSMQFfcFEisPBJXoYOoGuDHwL66N',
  // bucket : 'sjjimg'
});


function on_click_upload_file(){

  var f = document.getElementById("file").files[0];
  var val= document.getElementById("file").value;
  var suffix = val.substr(val.indexOf("."));
  var obj=timestamp();  // 这里是生成文件名

  // var storeAs = 'upload-file/'+"/"+obj+suffix;  //命名空间
  var storeAs = 'lwap'+"/"+obj+suffix;  //命名空间


  client.multipartUpload(storeAs, f).then(function (result) {
    console.log(result); //返回对象
    console.log(result.url); //返回链接
  }).catch(function (err) {
    console.log("lerror")
    console.log(err);
  });

}


function timestamp(){
  var time = new Date();
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return ""+y+add0(m)+add0(d)+add0(h)+add0(mm)+add0(s);
}

function add0(m){
  return m<10?'0'+m : m;
}



