export default{
	install:function(Vue){
		
		Vue.prototype.bombox = {
			
			tomast(options){//自动消失弹框
				var tomast = document.createElement("div");
				tomast.className = "tomast" + " " +options.type;
				tomast.innerText = options.msg;
				if(document.querySelectorAll(".tomast").length>0){
					return;
				};
				document.querySelector("body").appendChild(tomast);
				tomast.style.cssText = 'transform:translate3d(-50%,-50%,0);opacity:1';
				var time = options.time || 2000;
				setTimeout(function(){
					tomast.remove();
				},time)
			},

			confirm(message,sure,cancel){
				if(document.querySelectorAll('.confirm').length>0){
					return;
				};
				var confirm = document.createElement("div");
				confirm.className = 'confirm';
				document.querySelector(".content").appendChild(confirm);
				var confirmbox = document.createElement('div');
				confirmbox.className = 'confirmbox';
				confirm.appendChild(confirmbox);
				var msg = document.createElement("div");
				msg.className = 'msg';
				confirmbox.appendChild(msg);
				msg.innerText= message ;
				var confirmBtn = document.createElement('button');
				confirmBtn.className='confirmBtn';
				confirmBtn.innerText = '确定';
				var cancelBtn = document.createElement('button');
				cancelBtn.className = 'cancelBtn';
				cancelBtn.innerText = '取消';
				confirmbox.appendChild(confirmBtn);
				confirmbox.appendChild(cancelBtn);

                cancelBtn.onclick=function(){
                	if(cancel){
                		cancel();
                		confirm.remove();
                	}else{
                		confirm.remove();
                	}
                };

                confirmBtn.onclick=function(){
                	if(sure){
                		sure();
                		confirm.remove();
                	}else{
                		confirm.remove();
                	}
                }

				
			},
			
			loading(options){
				
				
				if(options.show ){
					if(document.querySelectorAll('.loading-warpper').length>0){
						return;
					}
					var warpper = document.createElement("div");
					warpper.className = 'loading-warpper';
					var inner = document.createElement("div");
					inner.className = 'loading-inner';
					warpper.appendChild(inner);
					document.body.appendChild(warpper);
					
					setTimeout(function(){
						if(document.querySelectorAll('.loading-warpper').length>0){
							document.querySelector('.loading-warpper').remove();
						};
					},5000)
					
				}else{					
					if(document.querySelectorAll('.loading-warpper').length>0){
						setTimeout(function(){
							document.querySelector('.loading-warpper').remove();
						},1000)
						
					}
				}			
			}
			
		}
		
	}
}
