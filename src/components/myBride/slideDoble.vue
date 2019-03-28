<template>
	<div class="slideDoble">
		<div>
			<!-- 金重，基础 -->
			<div class="list initSlide" v-if="dataslide.type == 'init'" id="initSlide">
				<div class="slide" ref="slide">
					<div ref="leftCir" class="leftCir" :style="{'left': leftTouch + 'px','z-inndex': leftIndex}" @touchstart="onSingleButtonDown($event ,'left')" @touchmove="onSingleButtonMove($event, 'left')" @touchend="onSingleButtonEnd($event)"></div>
					<div class="line" :style="{'width':lineWidth,'left':leftTouch+'px'}"></div>
					<div class="rightCir" :style="{'right': rightTouch + 'px','z-inndex': rightIndex}" @touchstart="onSingleButtonDown($event ,'right')" @touchmove="onSingleButtonMove($event, 'right')" @touchend="onSingleButtonEnd($event)"></div>
				</div>
				<div class="showNum">
					<div class="leftNumber" :style="{'left': leftTouch + 'px'}">{{dataslide.attr =='price'?'￥':''}}{{leftNumber | money}}{{dataslide.attr=='weight'?'ct':''}}</div>
					<div class="rightNumber" :style="{'right': rightTouch + 'px'}">{{dataslide.attr =='price'?'￥':''}}{{rightNumber | money}}{{dataslide.attr=='weight'?'ct':''}}</div>
				</div>
			</div>
			<!-- 价格 -->
			<div class="list" v-else-if="dataslide.type == 'initWrod'" id="priceSlide">
				<div class="slide" ref="slide">
					<div ref="leftCir" class="leftCir" :style="{'left': leftTouch + 'px','z-inndex': leftIndex}" @touchstart="onSingleButtonDown($event ,'left')" @touchmove="onSingleButtonMove($event, 'left')" @touchend="onSingleButtonEnd($event)"></div>
					<div class="line" :style="{'width':lineWidth,'left':leftTouch+'px'}"></div>
					<div class="rightCir" :style="{'right': rightTouch + 'px','z-inndex': rightIndex}" @touchstart="onSingleButtonDown($event ,'right')" @touchmove="onSingleButtonMove($event, 'right')" @touchend="onSingleButtonEnd($event)"></div>
				</div>
				<div class="showNum">
					<div class="color">
						<ul>
							<li class="colorValue priceSlide" :data-attr="dataslide.attr" v-for='(item,index) in dataslide.areaData' :key="index">{{dataslide.attr =='price'?'￥':''}}{{item}}{{dataslide.attr=='weight'?'ct':''}}</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- 颜色和净度 -->
			<div class="list" v-else-if="dataslide.type == 'word'" id="colorSlide">
				<div class="slide" ref="slide">
					<div ref="leftCir" class="leftCir" :style="{'left': leftTouch + 'px'}" @touchstart="onSingleButtonDown($event ,'left')" @touchmove="onSingleButtonMove($event, 'left')" @touchend="onSingleButtonEnd($event)"></div>
					<div class="line" :style="{'width':lineWidth,'left':leftTouch+'px'}"></div>
					<div class="rightCir" :style="{'right': rightTouch + 'px'}" @touchstart="onSingleButtonDown($event ,'right')" @touchmove="onSingleButtonMove($event, 'right')" @touchend="onSingleButtonEnd($event)"></div>
				</div>
				<div class="showNum">
					<div class="color">
						<ul>
							<li class="colorValue colorSlide" :data-attr="dataslide.attr"  v-for='(item,index) in dataslide.areaData' :key="index">{{item}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data () {
			return {
				leftInit: '',
				rightInit: '',
				leftTouch: this.dataslide.initLeft,
				rightTouch: this.dataslide.initLeft,
				isFirstLeft: true,
				isFirstRight: true,
				leftNumber: this.dataslide.min,
				rightNumber: this.dataslide.max,
				colorValue: [],
				lineWidth: '34.6rem',//中间区域的长度
				leftIndex: '',
				rightIndex: '',
				maxInit: 0,//最大默认值 默认是ul的总长度
				step: Math.ceil((this.dataslide.max-this.dataslide.min)/this.dataslide.step),
			}
		},
		props:['dataslide'],
		filters: {
			money (val){
				if(!val) return
				return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
			}
		},
		created () {
		},
		watch:{
			leftTouch (){//此处不监听也可以的
				let slide = this.$refs.slide.offsetWidth;//总长度
				let leftCir = this.$refs.leftCir.offsetWidth;
				this.lineWidth = slide - this.leftTouch - this.rightTouch + 'px';//中间长度
				if(Number(this.leftTouch) + Number(this.rightTouch) + Number(leftCir) >= slide) {
					this.leftIndex = 99;
					this.rightIndex = 9;
					if(this.dataslide.type == 'word'){
						let colorNum =this.leftTouch/(slide/this.colorValue.length);//这里获取color的对应的值
						for(let i = 0 ; i < this.colorValue.length; i++) {
							if(i == Math.ceil(colorNum - 1)){
								this.colorValue[i].style.color = '#FF7B7B';
							}else{
								this.colorValue[i].style.color = '#999';
							}
						}
					}else if(this.dataslide.type == 'initWrod'){
						let colorNum =this.leftTouch/(slide/this.colorValue.length);//这里获取color的对应的值
						for(let i = 0 ; i < this.colorValue.length; i++) {
							if(i == Math.ceil(colorNum - 1)){
								this.colorValue[i].style.opacity = 1;
							}else{
								this.colorValue[i].style.opacity = 0;
							}
						}
					}else{
						this.leftNumber = '' 
					}
				}else{
					if(this.dataslide.type == 'init'){
						this.leftNumber = (Math.ceil(this.leftTouch/(slide/this.step))*this.dataslide.step + this.dataslide.min).toFixed(this.dataslide.float);
						this.rightNumber = (this.dataslide.max - Math.ceil(this.rightTouch/(slide/this.step))*this.dataslide.step).toFixed(this.dataslide.float); 
					}
					if(this.dataslide.type == 'word'){
						let colorNum =this.leftTouch/(slide/this.colorValue.length);//这里获取color的对应的值
						let colorNums =this.rightTouch/(slide/this.colorValue.length);//这里获取color的对应的值
						if(colorNum == 0 && colorNums ==0){
							for(let i = 0 ; i < this.colorValue.length; i++) {
								if(i==0||i==this.colorValue.length-1){
									this.colorValue[i].style.color = '#FF7B7B'
								}else{
									this.colorValue[i].style.opacity = 0;
								}
							}
						}else{
							// for(let i = 0 ; i < this.colorValue.length; i++) {
							// 	if(i == Math.ceil(colorNum - 1)){
							// 		this.colorValue[i].style.color = '#FF7B7B';
							// 	}else{
							// 		this.colorValue[i].style.color = '#999';
							// 	}
							// }
						}
						
					}
				}
			},
			rightTouch () {
				let slide = this.$refs.slide.offsetWidth;
				let leftCir = this.$refs.leftCir.offsetWidth;
				this.lineWidth = slide - this.leftTouch - this.rightTouch + 'px';
				if(Number(this.leftTouch) + Number(this.rightTouch) + Number(leftCir) >= slide) {
					this.rightIndex = 99;
					this.leftIndex = 9;
					if(this.dataslide.type == 'word'){
						let colorNums =this.rightTouch/(slide/this.colorValue.length);//这里获取color的对应的值
						for(let i = 0 ; i < this.colorValue.length; i++) {
							if(i == Math.ceil(colorNums - 1)){
								this.colorValue[this.colorValue.length-i-1].style.color = '#FF7B7B';
							}else{
								this.colorValue[i].style.color = '#999';
							}
						}
					}else if(this.dataslide.type == 'initWrod'){
						let colorNums =this.rightTouch/(slide/this.colorValue.length);//这里获取color的对应的值
						for(let i = 0 ; i < this.colorValue.length; i++) {
							if(i == Math.ceil(colorNums - 1)){
								this.colorValue[this.colorValue.length-i-1].style.opaciyt = 1;
							}else{
								this.colorValue[i].style.opaciyt = 0;
							}
						}
					}else{
						this.rightNumber = '' 
					}
				}else{
					if(this.dataslide.type == 'init'){
						this.leftNumber = (Math.ceil(this.leftTouch/(slide/this.step))*this.dataslide.step + this.dataslide.min).toFixed(this.dataslide.float);
						this.rightNumber = (this.dataslide.max - Math.ceil(this.rightTouch/(slide/this.step))*this.dataslide.step).toFixed(this.dataslide.float); 
					}
					if(this.dataslide.type == 'word'){
						let colorNums =this.rightTouch/(slide/this.colorValue.length);//这里获取color的对应的值
						let colorNum =this.leftTouch/(slide/this.colorValue.length);//这里获取color的对应的值
						if(colorNums == 0 && colorNum == 0){
							for(let i = 0 ; i < this.colorValue.length; i++) {
								if(i==0||i==this.colorValue.length-1){
									this.colorValue[i].style.color = '#FF7B7B'
								}else{
									this.colorValue[i].style.opacity = 0;
								}
							}
						}else{
						}
					}
				}
			},
			dataslide: {
				handler: function(val, oldVal){
				},
				deep: true
			}
		},
		mounted () {
			this.$nextTick(()=>{
				let childNode;
				childNode = document.getElementsByClassName('colorValue')
				for (let i = 0; i < childNode.length; i++){
					if(childNode[i].dataset.attr == this.dataslide.attr){
						this.colorValue.push(childNode[i])
					}
				}
				let slide = this.$refs.slide;
				this.rightTouch = this.dataslide.initMax == undefined ? 0 : slide.offsetWidth - (slide.offsetWidth/this.colorValue.length*this.dataslide.initMax); //默认值
				this.maxInit = this.dataslide.initMax == undefined ? 0: slide.offsetWidth - (slide.offsetWidth/this.colorValue.length*this.dataslide.initMax);
			})
		},
		methods: {
			clearPrice(){//清空筛选
				this.leftTouch = 0
				this.rightTouch = 0
			},
			onSingleButtonDown (e,way){
				if(way == 'left'){//这里只需要只执行一次就可以了，目的是为了记录左边开始的位置
					if(this.isFirstLeft){
						this.leftInit = e.touches[0].pageX;
						this.isFirstLeft = false;
					}
					this.leftIndex = 99;
					this.rightIndex = 9;
				}else {
					if(this.isFirstRight){
						this.rightInit = e.touches[0].pageX + this.rightTouch;
						this.isFirstRight = false;
					}
					this.rightIndex = 99;
					this.leftIndex = 9;
				}
			},
			onSingleButtonMove (e,way){
				e.preventDefault();
				let dd = e.touches[0].pageX;//滑动的距离
				let touch;
				let slide = this.$refs.slide;
				let leftCir = this.$refs.leftCir;
				let colorNum = this.leftTouch/(slide.offsetWidth/this.colorValue.length) ;//这里获取每个字段所占据的宽度
				let colorNums = this.rightTouch/(slide.offsetWidth/this.colorValue.length);
				let totalLength = this.dataslide.initMax == undefined ? slide.offsetWidth : (slide.offsetWidth/this.colorValue.length*this.dataslide.initMax);//这里是总的长度
				if(way == 'left'){
					touch = dd - this.leftInit;
					if(touch < 0 || touch > slide.offsetWidth - leftCir.offsetWidth - this.rightTouch) {//是否到达了最左边或者是超出总长度
						return false
					}else {
						this.leftTouch = touch;//把滑动的距离赋给左边的left值
					}
				}else {//右边
					touch = this.rightInit - dd;
					if(touch < this.maxInit || touch > slide.offsetWidth - leftCir.offsetWidth - this.leftTouch){
						return false
					}else{
						this.rightTouch = touch;
					}
				}
				if(this.dataslide.type == 'word'){
					for(let i = 0 ; i < this.colorValue.length; i++) {
						this.colorValue[i].style.opacity = 0;//每次都把之前的透明度设置为0
					}
					if(colorNum <= 0) {
						this.colorValue[0].style.opacity = 1;
					}
					for(let i = 0 ; i < colorNum; i++) {
						this.colorValue[i].style.opacity = 1;
						if(i == Math.ceil(colorNum - 1)){
							this.colorValue[i].style.color = '#FF7B7B';//把滑动到当前位置的对应的字段设置为'#FF7B7B'
						}else{
							this.colorValue[i].style.color = '#999';//其他字段设置为#999
						}
					}
					// 右边
					if(colorNums <= 0 ){
						this.colorValue[this.colorValue.length-1].style.opacity = 1;
					}
					for(let i = 0 ; i < colorNums; i++) {
						this.colorValue[this.colorValue.length-1-i].style.opacity = 1;
						if(i == Math.ceil(colorNums - 1)){
							this.colorValue[this.colorValue.length-1-i].style.color = '#FF7B7B';
						}else{
							this.colorValue[this.colorValue.length-1-i].style.color = '#999';
						}
					}
				}else if(this.dataslide.type == 'initWrod') {
					for(let i = 0 ; i < this.colorValue.length; i++) {
						this.colorValue[i].style.opacity = 0;//每次都把之前的透明度设置为0
					}
					if(colorNum <= 0) {
						this.colorValue[0].style.opacity = 1;
					}
					for(let i = 0 ; i < colorNum; i++) {
						
						if(i == Math.ceil(colorNum - 1)){
							this.colorValue[i].style.opacity = 1;
							this.colorValue[i].style.color = '#FF7B7B';//把滑动到当前位置的对应的字段设置为'#FF7B7B'
						}else{
							this.colorValue[i].style.opacity = 0;//其他字段设置为#999
						}
					}
					if(colorNums <= 0 ){
						this.colorValue[this.colorValue.length-1].style.opacity = 1;
					}
					for(let i = 0 ; i < colorNums; i++) {
						if(i == Math.ceil(colorNums - 1)){
							this.colorValue[this.colorValue.length-1-i].style.color = '#FF7B7B';
							this.colorValue[this.colorValue.length-1-i].style.opacity = 1;
						}else{
							this.colorValue[this.colorValue.length-1-i].style.opacity = 0;
						}
					}
				}
			},
			onSingleButtonEnd (e) {
				e.preventDefault();
				let arr = [];
				let str;
				if(this.dataslide.type == 'initWrod'){
					this.colorValue.forEach((item) => {
						if(item.style.opacity == 1) {
							let dd;
							if(item.innerHTML.indexOf('￥')>=0 ){
								dd = (item.innerHTML).substr(1)
							}else if(item.innerHTML.indexOf('ct')>=0){
								dd = (item.innerHTML).slice(0,-2)
							}else{
								dd = item.innerHTML
							}
							arr.push(dd)
						}
					})
					this.$emit('touchValue',arr,this.dataslide.attr);
				}else if(this.dataslide.type == 'word'){
					this.colorValue.forEach((item) => {
						if(item.style.color != 'rgb(153, 153, 153)') {
							arr.push(item.innerHTML)
						}
					})
					str = arr.join()
					this.$emit('touchWordValue',str,this.dataslide.attr);
				}else if(this.dataslide.type == 'init'){
					arr =[this.leftNumber,this.rightNumber];
					this.$emit('touchValue',arr,this.dataslide.attr);
				}
				
			}
		}
	}
</script>

<style lang='scss'>
	@media only screen and (min-device-width: 768px) and (max-device-width: 1025px) and (orientation: landscape) {
		html {
			font-size: 8px !important;
		}
	}
	@media only screen and (min-device-width: 1025px) and (max-device-width: 1366px) and (orientation: landscape) {
		html,
		body {
			font-size: 11px !important;
		}
	}
	#app{
		height: 100%;
	}
	.slideDoble{
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
		.list{
			// margin-bottom: 5rem;
		}
		.slide{
			width: 34.6rem;
			height: 0.18rem;
			background: #999999;
			position: relative;
			top: -5px;
			.leftCir,.rightCir{
				width: 1.75rem;
				height: 1.75rem;
				border-radius: 50%;
				background: #FF7B7B;
				transform: translateY(-50%);
				position: absolute;
				top: 0;
				z-index: 5;
			}
			.leftCir{
				left: 0;
			}
			.rightCir{
				right: 0;
			}
			.line{
				width: 0rem;
				height: 0.18rem;
				background: #FF9C9C;
				position: absolute;
				top: 0;
				left: 0;
			}
		}
		.showNum{
			width: 34.6rem;
			position: relative;
			top: 0.26rem;
			color: #FF9C9C;
			.leftNumber{
				position: absolute;
				left: 0;
			}
			.rightNumber{
				position: absolute;
				right: 0;
			}
			.color{
				width: 34.6rem;
				position: absolute;
				top: -0.1rem;
				ul{
					display: flex;
					justify-content: space-between;
					// padding: 0 1.315rem;
					box-sizing: border-box;
					li{
						// flex: 1;
						color: #999;
						font-size: 1rem;
						opacity: 0;
						&:first-child,&:last-child{
							color: rgb(255, 123, 123);
							opacity: 1;
						}
					}
				}
			}
		}
	}
</style>
