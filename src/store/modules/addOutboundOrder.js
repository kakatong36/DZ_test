const state = {
  addOutboundOrderStore: {
    WarehouseId: null,
    WarehouseSeatId: null,
    WarehouseName: null,
    DocumentMaker: null,
    OutSkuData: []
  }
};
// getters
const getters = {
  addOutboundOrderStore: state => state.addOutboundOrderStore,
};

// actions

const actions = {};
// mutations
const mutations = {
  // 选择仓库
  updateWarehouseId(state, warehouseId){
    state.addOutboundOrderStore.WarehouseId = warehouseId
  },
  // 选择库位
  updateWarehouseSeatId(state, warehouseSeatId){
    state.addOutboundOrderStore.WarehouseSeatId = warehouseSeatId
  },
  // 制单人
  updateDocumentMaker(state, documentMaker){
    state.addOutboundOrderStore.DocumentMaker = documentMaker
  },
  // 选择的商品
  updateSelectOutSku(state, outSkuData){
    // 合并
    state.addOutboundOrderStore.OutSkuData.push.apply(state.addOutboundOrderStore.OutSkuData, outSkuData)
  }

};
export default {
  state,
  getters,
  actions,
  mutations
}
