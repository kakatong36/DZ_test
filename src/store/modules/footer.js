import * as types from '../mutation-type';
const state = {
   textBtn: '',
   isShow: false,
   isPrice: false,
   isbtn:false,
   isStep:false,
   fStyle:false,
   cate:{
   		inlay:'d329e8ce-107d-418a-ac1b-caacb3b4d531'
   },
   submit:{},
   totalPrice:0,
   progress:['选款','选石','结算','完成']
};
// getters
const getters = {
	
};

// mutations
const mutations = {
	SET_ISPRICE(state,sign){
		state.isPrice = sign;
  },
  SET_TOTALPRICE(state,sign){
    state.totalPrice = sign;
  }
};

// actions
const actions = {
   set_isPrice(context,sign){
   	 context.commit('SET_ISPRICE',sign);
   }
};


export default {
  state,
  getters,
  actions,
  mutations
}

