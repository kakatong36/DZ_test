import Vue from 'vue'

let load = Vue.extend(require('../components/loading/loading'));

let loadInstance ;

const loading = function(options){
	var  datas = options || {}
	
	
	
	loadInstance = new load({
		data:datas
	});
    loadInstance.vm = loadInstance.$mount();
	
	document.body.appendChild(loadInstance.vm.$el);

	return loadInstance.vm;
}

export default loading;