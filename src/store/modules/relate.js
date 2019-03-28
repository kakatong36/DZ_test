const state = {
	cur_province:'',
	cur_city:'',
	cur_district:'',
	fashioinObj:{
		finness: "",
		stylePrice: ''
	},
	isSroneOrStyle: true,
	style: false,
	detail: false,
	stone: false,
	settlement: false,
	shape: '',
	selectGoods:[],
	lightFashion:{
		finness: '',
		Size: ''
	},
	styleLight: false,
	detailLight: false,
	settlementLight: false,
	stoneSize: '',
	//y
	distinguishFashionOrSuits: '',
	distinguishLightOrSuits: ''
}

const getters = {
	cur_province: state => state.cur_province,
	cur_city: state => state.cur_city,
	cur_district: state => state.cur_district
}

const mutations = {
	SET_STONESIZE(state,data){
		state.stoneSize = data;
	},
	SET_STYLELIGHT(stae,data){
		state.styleLight = data;
	},
	SET_DETAILLIGHT(stae,data){
		state.detailLight = data;
	},
	SET_SETTLEMENTLIGHT(stae,data){
		state.settlementLight = data;
	},
	SET_SIZELIGHT(state,obj) {
		state.lightFashion.finness = obj.finness;
		state.lightFashion.Size = obj.Size;
	},
	SET_PROVINCE(state,province){
		state.cur_province = province;
	},
	SET_CITY(state,city){
		state.cur_city = city;
	},
	SET_DISTRICT(state,district){
		state.cur_district = district;
	},
	SET_FASHION(state,obj){
		state.fashioinObj.finness = obj.finness;
		state.fashioinObj.stylePrice = obj.stylePrice;
	},
	SET_ISSTONEORSTYLE(state,data){
		state.isSroneOrStyle = data;
	},
	SET_STYLE(state,data){
		state.style = data;
	},SET_DETAIL(state,data){
		state.detail = data;
	},
	SET_STONE(state,data){
		state.stone = data;
	},
	SET_SETTLEMENT(state,data){
		state.settlement = data;
	},
	SET_SHAPE(state, data) {
		state.shape = data
	},
	SET_SELECTGOOD(state, data) {//购物车选中的数据
		state.selectGoods = data;
	},
	//y 
	SET_DISTINGUISH_FASHION_OR_SUITS (state, data) { //区分返回到时尚定制页面还是套装定制页面
		state.distinguishFashionOrSuits = data
	},
	SET_DISTINGUISH_LIGHT_OR_SUITS (state, data) { //区分返回到轻奢定制页面还是套装定制页面
		state.distinguishLightOrSuits = data
	}
}

const actions = {
	set_province(context,province){
		context.commit('SET_PROVINCE',province);
	},
	set_city(context,city){
		context.commit('SET_CITY',city);
	},
	set_district(context,district){
		context.commit('SET_DISTRICT',district);
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
