import Vue from 'vue'
Vue.filter('money',function(num){//千位符
	if(!num){
		return 0
	}
	num=num.toString().split(".");  // 分隔小数点
    var arr=num[0].split("").reverse();  // 转换成字符数组并且倒序排列
    var res=[];
    for(var i=0,len=arr.length;i<len;i++){
		if(i%3===0&&i!==0){
			res.push(",");   // 添加分隔符
		}
		res.push(arr[i]);
    }
    res.reverse(); // 再次倒序成为正确的顺序
    if(num[1]){  // 如果有小数的话添加小数部分
      	res=res.join("").concat("."+num[1]);
    }else{
      	res=res.join("");
    }
    return res;
})
Vue.filter('phone',val=>{
	if(!val){return}
	let reg = /134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/
	if(!reg.test(val)){
		return false
	}else{
		return true
	}
})