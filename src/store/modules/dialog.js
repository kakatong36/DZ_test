import * as types from '../mutation-type';
const state = {
   DialogShow: false,
   show:false,
   cur_style:{},
   cur_stone:{},
   select_product:[],
   cur_sku:{},
   stoneIncut:'',
   stoneWeightRange:''
};
// getters
const getters = {

};

// actions

const actions = {
	close_dialog(context){
		context.commit('CLOSE_DIALOG');
	},
	open_dialog(context){
		context.commit('OPEN_DIALOG');
	},
	set_cur_style(context,_style){
		context.commit('SET_CUR_STYLE',_style)
	},
	set_cur_sku(context,_sku){
		context.commit('SET_CUR_SKU',_sku)
	},
	set_cur_stone(context,_stone){
		context.commit('SET_CUR_STONE',_stone)
	},
	set_select_product(context){
		context.commit('SET_SELECT_PRODUCT');
	},
	delete_product(context,index){
		context.commit('DELETE_PRODUCT',index);
	},
	set_stone_params(context,params){
   		context.commit('SET_STONE_PARAMS',params);
   },
   clear_cache(context){
   	    context.commit('CLEAR_CACHE');
   }
	
};
// mutations
const mutations = {
	CLOSE_DIALOG(state){
		state.show = false;
	},
	OPEN_DIALOG(state){
		state.show = true;
	},
	SET_CUR_STYLE(state,_style){
		state.cur_style = _style;
	},
	SET_CUR_STONE(state,_stone){
		state.cur_stone = _stone;
	},
	SET_SELECT_PRODUCT(state){
		if(state.cur_stone.Id && state.cur_style.Id){
			state.select_product.push({
				Stone:state.cur_stone,
				Style:state.cur_style
			})
		}else{
			state.select_product = [];
		}
		
	},
	SET_CUR_SKU(state,_sku){
		state.cur_sku = _sku;	
	},
	DELETE_PRODUCT(state,index){
		state.select_product.splice(index,1);
	},
	SET_STONE_PARAMS(state,params){
		state.stoneIncut = params.stoneIncut;
		state.stoneWeightRange = params.stoneWeightRange;
	},
	CLEAR_CACHE(state){
		state.cur_style = {};
		state.cur_stone = {};
		state.stoneIncut = '';
		state.stoneWeightRange = '';
	}
};

export default {
  state,
  getters,
  actions,
  mutations
}

