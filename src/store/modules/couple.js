const state = {
	formData:{
		
	},
	stoneIndex : null,//石头下标
	selectIndex : null, //结算下标
	showFlag : false, //是否编辑
	activeArr : []  //选中数组
  };
  // getters
  const getters = {
	addOutboundOrderStore: state => state.addOutboundOrderStore,
  };
  
  // actions
  
  const actions = {};
  // mutations
  const mutations = {
		setSelectIndex(state,index){
			state.selectIndex = index;
		},
		setFormData(state , formData){
			state.formData = formData;
		},
		setStoneList(state , list){
			let index = state.selectIndex;
			state.formData.StyleList[index].stone = list;
		},
		setActiveArr(state , list){
			state.activeArr = list;
			console.log(state.activeArr);
		},
		setShowFlag(state , flag){
			state.showFlag = flag;
			console.log(state.showFlag);
		}
  };
  export default {
	state,
	getters,
	actions,
	mutations
  }
  