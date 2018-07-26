<template>
  <div class="voice">
    <div @click="openVoice()">开始录音</div>
    <div @click="stopVoice()">停止录音</div>
    <div @click="trueVoice()">识别录音</div>
  </div>
</template>
<script>

  export default {
    name:"voice",
    data(){
      return {
        voiceId:'',
      }
    },
    mounted(){

    },
    methods:{
      openVoice(){
        wx.startRecord();
      },
      stopVoice(){
        wx.stopRecord({
          success: function (res) {
            var localId = res.localId;
            console.log(localId)
            voiceId = localId;
          }
        });
      },
      trueVoice(){
        wx.translateVoice({
          localId: voiceId, // 需要识别的音频的本地Id，由录音相关接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
//            alert(res.translateResult); // 语音识别的结果
            this.$store.state.toastText=res.translateResult
            this.$store.state.toastType='text'
          }
        });
      },

    }
  }
</script>
<style scoped>
  .voice{width:100%;}
  .voice>div{width:100%;text-align: center;line-height: 1rem;font-size: 0.4rem;margin-top:1rem;}
</style>
