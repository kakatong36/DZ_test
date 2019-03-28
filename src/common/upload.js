/*
export default {
	install:function(Vue){
		Vue.prototype.upload = function (options,cb){
			
			var i = 0;
			console.log(http);
			function transer (index) {
				var _file = options.files[index]
				if(_file){
					const reader = new FileReader();
					reader.onload = function(evt){
						var lastindex = _file.name.lastIndexOf(".");
		   	    		var extension = _file.name.substring(lastindex,_file.name.length);
						var fileobj = {
					       fileLength:_file.size,
						   fileName:_file.name,
						   extension:extension,
						   strContext:e.target.result
					    };
					    options.params.files.push(fileobj);
					    i++;
					    transer(options.files);
					};
					reader.readAsDataURL(_file);
				}else{
					upToServer();
				}
				
			};
			
			function upToServer () {
				console.log(Vue.http);
			}
			
		}
	}
}
*/