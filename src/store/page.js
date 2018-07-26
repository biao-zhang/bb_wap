const page = {
  namespaced: true,
  state: {
    loadingBar:"上拉加载",
    topConfig:{
      pullText: '下拉刷新', // 下拉时显示的文字
      triggerText: '释放更新', // 下拉到触发距离时显示的文字
      loadingText: '加载中...', // 加载中的文字
      doneText: '加载完成', // 加载完成的文字
      failText: '加载失败', // 加载失败的文字
      loadedStayTime: 400, // 加载完后停留的时间ms
      stayDistance: 50, // 触发刷新后停留的距离
      triggerDistance: 50 // 下拉刷新触发的距离
    },
    bottomConfig:{
      pullText: '',
      triggerText: '',
      loadingText: '',
      doneText: '',
      failText: '',
      loadedStayTime: 400,
      stayDistance: 0,
      triggerDistance: 40
    }
  },
  mutations:{
    bottomChangeState(state,param){
      console.log(param)
      switch (param){
        case "pull":
          state.loadingBar='上拉加载';
          break;
        case "loaded-pull":
          state.loadingBar='上拉加载';
          break;
        case "trigger":
          state.loadingBar='释放加载';
          break;
        case "loading":
          state.loadingBar='加载中...';
          break;
        case "loaded-done":
          state.loadingBar='加载完成';
          setTimeout(() => {
            state.loadingBar='上拉加载'
          },2000)
          break;
        case "loaded-fail":
          state.loadingBar='加载失败';
          setTimeout(() => {
            state.loadingBar='上拉加载'
          },2000)
          break;
        case 'loaded-over':
          state.loadingBar='没有更多数据';
          break;
      }
    },
    topChangeState(state,param){
      // console.log(param)
    },
    theEnd(state){
      // console.log('theEnd')
    }
  }
}

module.exports = page;
