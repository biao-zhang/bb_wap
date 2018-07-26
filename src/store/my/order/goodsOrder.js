
const goodsOrder = {
  state: {
    // 弹窗显示与隐藏
    showDialogStyle: false,
    // 弹窗id
    showId: '',
    // 订单列表
    arrOrder: [
      {
        id: 0,
        orderName: '上海仓',
        orderStatus: '待付款',
        storeDetailsTitle: '2017布艺沙发新品草绿色新品草绿色',
        storeHC: '尺寸：W210XD91-XH8-X-101cm...',
        storeMoney: 179999,
        storeQua: 1,
        freight: '0.00',   // 运费
        detailStatusArr: ['删除订单', '查看物流', '追加评价'],
      },
      {
        id: 1,
        orderName: '爱家家居',
        orderStatus: '待发货',
        storeDetailsTitle: '2017布艺沙发新品草绿色新品草绿色',
        storeHC: '尺寸：W210XD91-XH8-X-101cm...',
        storeMoney: 180000,
        storeQua: 11,
        freight: '20.00',   // 运费
        detailStatusArr: ['查看物流', '申请退款'],
      },
      {
        id: 2,
        orderName: '爱家家居',
        orderStatus: '待收货',
        storeDetailsTitle: '2017布艺沙发新品草绿色新品草绿色',
        storeHC: '尺寸：W210XD91-XH8-X-101cm...',
        storeMoney: 180000,
        storeQua: 11,
        freight: '20.00',   // 运费
        detailStatusArr: ['取消订单', '去支付'],
      },
      {
        id: 3,
        orderName: '爱家家居',
        orderStatus: '待评价',
        storeDetailsTitle: '2017布艺沙发新品草绿色新品草绿色',
        storeHC: '尺寸：W210XD91-XH8-X-101cm...',
        storeMoney: 180000,
        storeQua: 11,
        freight: '20.00',   // 运费
        detailStatusArr: ['删除订单'],
      },
    ],
  },
  mutations: {
    // 初始化订单列表
    initSelectList() {

    },
    // 弹窗显示
    orderItemDialog(state, payload) {
      state.showDialogStyle = payload.showDialogStyle
      state.id = payload.id

      console.log('监听：', state.id)
    },
    // 点击弹窗确定按钮
    sureBtnSure(state, payload) {
      state.showDialogStyle = payload.showDialogStyle;
      console.log('确定')

      state.arrOrder = state.arrOrder.filter((ipra) => ipra.id !== state.id)
      console.log(state.arrOrder)

      console.log('确定删除mutations')
    },
    // 点击弹窗取消按钮
    sureBtnCancel(state, payload) {
      state.showDialogStyle = payload.showDialogStyle;
      console.log('取消')
    },
  },
  actions: {
    // 初始化订单列表
    initSelectList({ commit }, payload) {
      commit('initSelectList', payload)
    },
    // 弹窗显示
    orderItemDialog({ commit }, payload) {
      commit('orderItemDialog', payload)
      console.log('弹窗actions')
    },
    // 删除订单
    sureBtnSure({ commit }, payload) {
      commit('sureBtnSure', payload)
      console.log('确定删除actions')
    },
    // 点击弹窗取消按钮
    sureBtnCancel({ commit }, payload) {
      commit('sureBtnCancel', payload)
      console.log('取消')
    },
  }
}

export default goodsOrder
