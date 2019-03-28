const state = {
	state: {
		isGoldWeight: false,
		isTabGoldWeight: true,
		isKownGoldWeight: false,
		isNoKownGoldWeight: false
	},
	isSelected: false
}

const mutations = {
	toMap_state: (state,data) =>{
		if(!state.isSelected){
			Object.keys(data).forEach(function(key){
				if(typeof state.state[key] !== "undefined"){
					state.state[key] = data[key];
				}
			});
			state.isSelected = true;
		}
	},
	toMap_isSelected: (state,data) =>{
		state.isSelected = data;
	}
}

export default {
	state,
	mutations
}