const state = {
    honey:{
      suit:{},
      select_product:{},
      styleSkuList:[],
      skuContent:{},
    },
    love:{
      suit:{},
      select_product:{},
      styleSkuList:[],
      skuContent:{},
    },
    bride:{
      suit:{},
      select_product:{},
      skuContent:{},
      styleSkuList:[]
    },
    sign:''
};
// getters
const getters = {

};

// actions

const actions = {
	set_suit(context,params){
		context.commit('SET_SUIT',params);
	},
  set_suit_product(context,params){
    context.commit('SET_SUIT_PRODUCT',params);
  },
  set_suit_sku(context,params){
    context.commit('SET_SUIT_SKU',params);
  },
  set_skuContent(context,params){
    context.commit('SET_SKUCONTENT',params);
  },
  clear_suit_cache(context,sign){
  	context.commit('CLEAR_SUIT_CACHE',sign);
  }

};
// mutations
const mutations = {
	SET_SUIT(state,params){
    state.sign = params.sign;
		state[params.sign].suit = params.data;
	},
  SET_SUIT_PRODUCT(state,params){
    state.sign = params.sign;
    state[params.sign].select_product = params.data;
  },

  SET_SUIT_SKU(state,params){
    state.sign = params.sign;
    state[params.sign].styleSkuList = params.data;
  },

  SET_SKUCONTENT(state,params){
    state.sign = params.sign;
    state[params.sign].skuContent = params.data;
  },
  
  CLEAR_SUIT_CACHE(state,sign){
  	state[sign].suit = {};
  	state[sign].select_product = {};
  	state[sign].styleSkuList = [];
  	state[sign].skuContent = {};
  	
  }
  
};

export default {
  state,
  getters,
  actions,
  mutations
}
