
const serviceOrder = {
  state: {
    serviceOrder: [
      {
        id: 0,
        orderName: '司机',
        orderStatus: '服务中',
        orderTime: '2018-02-20-18：30',
        totalPrice: '36',
        detailStatusArr: ['服务中'],
      },
      {
        id: 1,
        orderName: '找帮手',
        orderStatus: '待接单',
        orderTime: '2018-02-20-18：30',
        totalPrice: '36',
        detailStatusArr: ['取消订单', '待接单'],
      },
      {
        id: 2,
        orderName: '家政',
        orderStatus: '已接单',
        orderTime: '2018-02-20-18：30',
        totalPrice: '36',
        detailStatusArr: ['取消订单', '去支付'],
      },
      {
        id: 3,
        orderName: '维修',
        orderStatus: '待评价',
        orderTime: '2018-02-20-18：30',
        totalPrice: '36',
        detailStatusArr: ['去追评'],
      },
    ],
  },
  mutations: {

  },
  actions: {

  }
}

export default serviceOrder
