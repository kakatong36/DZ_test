<template>
    <div class="upload-control">
		<input type="file" :multiple="type == 1" @change='uploadImg' accept="image/*" />
    </div>
</template>

<script>
  export default {
    data () {
      return {
      	Account:{},
      	params:{
      		CompanyCode:'',
      		UserType:'',
      		Moudle:'',
      		files:[]
      	},
      	//imgUrl:this.$store.state.header.imgUrl,
      	//upModel:this.$store.state.header.upModel
      }
    },
    props:{
      type:{
      	type:Number,
      	default(){
      		return ''
      	}
      }
    },
    mounted(){
    	this.Account = JSON.parse(localStorage.getItem('user'));
    	//this.params.CompanyCode = this.Account.SelUser.SellerId;
    	//this.params.UserType = this.Account.SelUser.UserClass;
    	this.params.Moudle = this.upModel;
    },
    methods:{
    	ImgTranser(evt){
    		var that = this;
    		
    		this.loading();
    		
    		var files = evt.target.files;
    		var i = 0;
    		transer(files);
    		
    		function transer(files){
    			var _file = files[i];
    			if(_file){
    				const reader = new FileReader();
					reader.onload = function(evt){
						var fileobj = {
					       fileLength:_file.size,
						   fileName:_file.name,
						   extension:"."+_file.type.split("/")[1],
						   strContext:evt.target.result
					    };
					    that
					    .params.files.push(fileobj);
					    i++;
					    transer(files);
					};
					reader.readAsDataURL(_file);
    			}else{
    				evt.target.value='';
    				that.uploadImg();
    			}
    		}
    	},
    	uploadImg(evt){
			var that = this;
			var files = evt.target.files;

    		var options = {
    			url:'/service/Resource/Resource_api_ResourceManager',
    			params: ''
    		};
    		
    		var cbok = (res) =>{
				if(res.code == 1005){
                    var img = res.data;
					that.$emit('get_img',img);
				}
    			this.closeLoad();
			};
    		
    		var cbno = (res) =>{
				this.closeLoad();
				alert("上传失败");
			};
            for(let i=0;i<files.length;i++){
				
					var formData = new FormData();
					formData.append("filetag", "");
					formData.append("folderid", "");
					formData.append("file", files[i]);
					options.params = formData
					that.http.upload(options,cbok,cbno,cbok);

				/* let fileUrl = URL.createObjectURL(files[i]),
					img = new Image;
				img.src = fileUrl;
				img.onload = function() {
					let canvas = document.createElement('canvas'),
						ctx = canvas.getContext('2d'),
						w = this.width,
						h = this.height;
					canvas.width = w;
					canvas.height = h;
					ctx.drawImage(this, 0, 0, w, h);

					let newFile = dataURLtoFile(canvas.toDataURL("image/png", 0.9));
					var formData = new FormData();
					formData.append("filetag", "");
					formData.append("folderid", "");
					formData.append("file", newFile);
					options.params = formData
					that.http.upload(options,cbok,cbno,cbok);
				}
				img.onerror = function() {
					alert("上传失败");
				} */
			}
			

			function dataURLtoFile(dataurl) {
				let arr = dataurl.split(','), 
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]), 
					n = bstr.length, 
					u8arr = new Uint8Array(n),
					fileName = (new Date()).getTime() + "_" + Math.floor(Math.random()*1e10) + ".png";
				while(n--){
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], fileName, {type: "image/jpeg"});
			}

    	}
    	
    }
  }
</script>

<style lang="scss">
    @import '../../common/scss/mixin.scss';
    .upload-control{
    	position: absolute;
    	top: 0;
    	left: 0;
    	bottom: 0;
    	right: 0;
    	overflow: hidden;
    }
    .upload-control input{
    	position: absolute;
    	top: 0;
    	left: 0;
    	bottom: 0;
    	right: 0;
    	opacity: 0;
    	filter:alpha(opacity=0)
    }
</style>
