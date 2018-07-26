function SHA2(file,img) {
  if(!!file){
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      img.src =  reader.result;
      console.log("upload")
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
module.exports = SHA2
