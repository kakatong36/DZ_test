import axios from 'axios'
import router from '../router/index'
/*
https://api.dyzbk.com/ -- http://192.168.0.191:9085
https://resource.dyzbk.com/ -- http://192.168.0.191:9093
10.0.1.10
10.0.1.20
*/
var interfaceUrl = "https://api.dyzby.net/directservice/path/"; //微信不经过网关
var authUrl = 'http://192.168.0.191:9085';
// var authUrl = 'https://api.dyzbk.com/'
var serverUrl = authUrl + '/service/path';
var imgUrl = authUrl + '/Resource/Resource/Resource_GetResource_PSize_';
var threeDImgUrl = authUrl + '/Resource/Resource/Resource_GetResource_GetNum_';
var videoUrl = 'https://resource.dyzbk.com/GetResource/Play/'
//axios.defaults.headers.common['tokenStr'] = localStorage.getItem("TokenStr");
export default {
	install: function(Vue,Router) {
		Vue.prototype.http = {
            preUrl: authUrl,
			imgUrl: imgUrl,
			threeDImgUrl: threeDImgUrl,
			videoUrl: videoUrl,
			getPayQRCode(options, cbok, cbno, cbnull) {
				var that = this;
				const instance = axios.create({});
				instance.get(interfaceUrl + options.url, {
					params: options.params
				}).then(res => {
					that.success(res, cbok, cbno, cbnull);

				}, e => {
					console.log(e);
				});
			},
			get(options, cbok, cbno, cbnull) {
				var that = this;
				const instance = axios.create({
					headers: {
						'tokenStr': localStorage.getItem("TokenStr")
					}
				});
				instance.get(serverUrl + options.url, {
					params: options.params
				}).then(res => {
					that.success(res, cbok, cbno, cbnull);

				}, e => {
					console.log(e);
				});
			},
			post(options, cbok, cbno, cbnull) {
				var that = this;
				const instance = axios.create({
					headers: {
						'tokenStr': localStorage.getItem("TokenStr")
					}
				});
				instance.post(serverUrl + options.url, options.params).then(res => {
					that.success(res, cbok, cbno, cbnull);

				}, e => {
					console.log(e)
				})
			},
			upload(options, cbok, cbno, cbnull) {
				var that = this;
				const instance = axios.create({
					headers: {
						'Content-Type': 'multipart/form-data',
						'tokenStr': localStorage.getItem("TokenStr")
					}
				});
				instance.post(authUrl + options.url, options.params).then(res => {
					let res2 = {};
					if(res.data.Result){
						res2 = res.data.Result;
						if(res2.code == 1005){
							res2.data.url = authUrl + '/Resource/Resource/Resource_GetResource_' + res2.data.Id;
						}
					}
					that.success(res2, cbok, cbno, cbnull);

				}, e => {
					console.log(e)
				})
			},
			logAuth(options, cbok, cbno) {
				var that = this;
				const instance = axios.create({});
				instance.post(authUrl + options.url, options.params).then(res => {
					that.success(res, cbok, cbno);
				}, e => {
					console.log(e)
				})
			},

			success(res, cbok, cbno, cbnull) {
                var that = this;
                let code = res.code || res.Code || res.data.code || res.data.Code
				switch(code) {
					case 1001:
						cbok && cbok(res);
						break;
					case 1005:
						cbnull && cbnull(res);
						break;
					case 1301:
						that.goLogin();
						break;
					default:
						if(cbno) {
							cbno(res)
						} else {
							console.log(res.data.message);
						}
				}

			},
			goLogin(){
				router.push({
					path:'/login'
				})
			}
		}
	}
}