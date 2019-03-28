import load from 'components/loading/loading'

export default{
	install(Vue){
		let c_loading = Vue.extend(load);
		let load_comp ;
		
		const loading = function(){
			if(!load_comp){
				load_comp = new c_loading({
					data:{
						isShow:true
					}
				});
				
				load_comp.vm = load_comp.$mount();
				document.body.appendChild(load_comp.vm.$el);
			}else{
				load_comp.isShow = true;
			}
			
			setTimeout(function(){
				if(load_comp){
					load_comp.isShow = false;
				}
			},5000);
		};
		
		const closeLoad = function(){
			if(load_comp){
				load_comp.isShow = false;
			}
		};
		
		Vue.prototype.loading = loading;
		Vue.prototype.closeLoad = closeLoad;
		
		
	}
}
