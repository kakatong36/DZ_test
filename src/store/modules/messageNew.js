const state = {
	state: {
		saleId:'',
		saleName: '',
		memberName: '',
		memberMobile: ''
	},
	isSubmit: false
}
const mutations = {
	messageNew_state: (state,data) => {
		if(state.isSubmit){
			Object.keys(data).forEach(function(key){
				if(typeof state.state[key] !== "undefined"){
					state.state[key] = data[key];
				}
			});
			state.isSubmit = false;
		}
	},
	messageNew_isSubmit: (state, data) => {
		state.isSubmit = data
	}
}

export default {
	state,
	mutations
}