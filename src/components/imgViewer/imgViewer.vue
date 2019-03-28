<template>
	<div class="viewer">
	    <div class="loadingbox" v-show='loading'>
			<img src="../../common/images/imgViewer/vogue.gif" width="100" />
		</div>
		<div class="viewer-inner">
			<img :src="imgUrlList[progressValue]" />
		</div>
		<ul class="imgList" style="display: none;">
			<li class="" v-for='num in length' >
				<img :src="baseurl+num+'.jpg'" @load='imgLoad'/>
			</li>
		</ul>
		<div class="progress">
			<input type="range" :max="length-1" v-model="progressValue" class="range">
			<progress :max="length-1" v-bind:value="progressValue"></progress>
		</div>
	
	</div>
</template>

<script>
	export default {
		data(){
				return {
					progressValue:0,
					curImg:'0',
					loading:true,
					loadNum:0,
					imgUrlList:[]
				}
			},
			props: {
				length: {
					type: Number,
					default() {
						return 0;
					}
				},
				baseurl: {
					type: String,
					default() {
						return ''
					}
				},

			},
			created:function(){
				console.log(this.baseurl);
			},
			methods:{
				imgLoad(){
					this.loadNum++;
					var that = this;
					if(this.loadNum == this.length){
						
						setTimeout(function(){
							that.loading = false;
						},1000)
					    var imgs = document.querySelector('.imgList').querySelectorAll("img");
					  
					    for(var i = 0; i<imgs.length;i++){
					    	
					    	that.imgUrlList.push(imgs[i].src);
					    };

					    console.log(that.imgUrlList);
					    
					   
					}
					
				}
			}

	}
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';
	.viewer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.loadingbox {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background-color: #fff;
			z-index:10;
			img {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translat03de(-50%, -50%, 0);
				-webkit-transform:translate3d(-50%,-50%,0);
			}
		}
		.viewer-inner{
			position: absolute;
			top:0;
			left: 0;
			bottom: 40px;
			right: 0;
			img{
				max-width: 100%;
				max-height: 100%;
				position: absolute;
				top:50%;
				left: 50%;
				transform: translate3d(-50%,-50%,0);
			}
		}
		.progress {
			position: absolute;
			left: 50%;
			margin-left: -120px;
			bottom: 10px;
			width: 240px;
			height: 40px;
			border-radius: 10px;
			overflow: hidden;
			
			progress {
				width: 100%;
				height: 20px;
				background-color: #F7F7F7;
				position: absolute;
				top: 0;
				left: 0;
				border-radius: 10px;
				margin-top:10px; 
				&::-webkit-progress-bar {
					background: none;
				}
				&::-webkit-progress-value {
					background: #DFB077;
					border-radius: 10px;
				}
			}
			.range {
				position: absolute;
				left: 0;
				bottom: -10px;
				width: 100%;
				height: 40px;
				z-index: 20;
				opacity: 0;
				&::-webkit-slider-thumb {
					opacity: 0;
					height: 40px;
				}
			}
			input[type=range]::-webkit-slider-thumb {
			    -webkit-appearance: none;
			    height:40px;
			    width:40px;
			    margin-top: -10px; /*使滑块超出轨道部分的偏移量相等*/
			    background: #ffffff; 
			    border-radius: 50%; /*外观设置为圆形*/
			    border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
			    box-shadow: 0 .125em .125em rgba(0,0,0,0.2); /*添加底部阴影*/
			    background-size:100%;
			    border:none;
			}

		}
	}
</style>