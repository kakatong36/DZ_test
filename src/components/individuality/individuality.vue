<template>
	<div class="personal-list">
		<v-nodata v-show = 'isnodata' :msg='nodataMsg'></v-nodata>
		<div class="scroller-outer" :class='{transprant:isReady}' >
			<div class="scroll-wrapper"  >
				<ul class="scroll-list clearfix">
					<li class="" v-for='(suit,index) in suitList' @click='go_next(suit)' :key="suit.Id">
						<div class="scroll-item">
							<a href="javascript:;">
								<div class="poster">
									<img :src="http.imgUrl+suit.MainImg" v-if="suit.MainImg"/>
									 <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
								</div>
								<h4>{{suit.StyleName}}</h4>
								<h5>￥{{suit.Price}}</h5>
								<div class="description">
									<h3>“</h3> 
									<div v-html='suit.Description'></div>
								</div>
                                <div class="params">
                                    <span>
                                        <b>成色</b><br>{{suit.Condition}}
                                    </span>
                                </div>
								<div class="params" v-if="false">
									<span v-for="item in suit.AttrList" :key="item.StyleAttrId">
                                        <b>{{item.StyleAttrName}}</b><br>{{item.StyleAttrValueName}} 
                                    </span>
									<!-- <span>
                                        <b>{{suit.SuitSize}}</b><br>尺寸
                                    </span>
									<span>
                                        <b>{{suit.Incubate}}</b><br>镶口
                                    </span>
									<span>
                                        <b>{{suit.Color}}</b><br>颜色
                                    </span> -->
								</div>
							</a>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="comesoon">
			<p>正在装修中...</p>
		</div>
		<div class="otherBtn" @click='nextBatch' v-if='total_page>1'></div>
		<!--<v-loading></v-loading>-->
	</div>
</template>

<script>
    import nodata from 'components/nodata/nodata'
    import loading from 'components/loading/loading'
	export default {
		data() {
				return {
					isShow: this.$store.state.header.isShow = true,
					scroller:'',
					outer:'',
					list:'',
					list_w:'',
					cindex:0,
					len:0,
					moveAble:true,
					requestUrl:'',
					searchs:{
						PageIndex:1,
						PageSize:15
					},
					total_page:0,
					suitList:[],
					isReady:true,
					sign:'',
        			isnodata:false,
        			nodataMsg:'暂无数据'
				}
			},
			created() {
				var sign = this.$route.params.sign;
				this.sign = sign;
				this.$store.state.header.title = '真爱指环';
				this.requestUrl  = '/purchase_Api_PersonalityStyle_GetTrueLoveList';
			},
			mounted() {
				this.$nextTick(function(){
                    //this.getList()
				})
			},
			methods: {
			/*换一批*/
				nextBatch(){
					var page = this.searchs.PageIndex +1;
					if(page > this.total_page){
						page = 1;
					};
					if(page == this.searchs.PageIndex){
						return;
					}
					this.searchs.PageIndex = page;
					this.getList();
					
				},
				go_next(suit){
					var path = '/love/loveDetails/'+suit.Id+'/'+suit.Condition;
					this.$router.push({
						path:path
					})
				},
				getList() {
					
					var that = this;
					
					this.loading();
					
					var options = {
						url:that.requestUrl,
						params:that.searchs
					};
					

					var cbok = (res) =>{
				        if(res.data.data && res.data.data.data_list.length>0){
							that.suitList = res.data.data.data_list;
							that.total_page = res.data.data.page_count;
							that.searchs.PageIndex = res.data.data.page;
							that.isnodata = false;
							if(that.suitList.length>0){
								setTimeout(function(){
									that.scrollerDom();
									that.isReady = false;
									if(document.querySelectorAll(".otherBtn").length>0){
										document.querySelector(".otherBtn").style.cssText = 'transform: translate3d(0,0,0);opacity: 1;';
									}									
								},300)
							}
				       }else{				        	
				        	that.isnodata = true;
				        }
				        
				       this.closeLoad();
					};
					
					var cbno = (res) =>{
						this.closeLoad();
					}
					
					this.http.get(options,cbok,cbno);
				},
				scrollerDom(){
					this.scroller_init();
				    this.scroller_EventBind();
				},
				
				
				
				scroller_init(){
					
					this.scroller = document.querySelector(".scroll-list");
					this.outer = document.querySelector(".scroller-outer");
					this.list = this.scroller.querySelectorAll("li");
					this.list_w = parseFloat(this.list[0].offsetWidth);
					this.len = this.list.length;
					this.cindex = 0;
					
					this.scroller.style.width = this.list_w * this.len + "px";
					if(this.len % 2 == 0) {
						this.cindex = (this.len / 2 - 1);
					} else {
						this.cindex = Math.floor((this.len / 2));					
					}
					this.scroller.style.marginLeft = -this.list_w * this.cindex + "px";
					this.scroller_animate();
				},
				scroller_animate(){					
					
					for(var i = 0; i < this.len; i++) {
						if(i == this.cindex) {
							this.list[i].classList.add("active");
						} else {
							this.list[i].classList.remove("active");
						}
					}
				},
				scroller_EventBind(){
					var that = this;
					
					var startHandler = function(evt){
						//evt.preventDefault();
						var _touch = evt.touches[0];
						that.startTime = new Date() * 1;
						that.mLeft =parseFloat(that.scroller.style.marginLeft);
						that.offx = 0;
						that.startX = _touch.clientX;
					};
					var movehandler = function(evt){
						evt.preventDefault();
						that.offx = evt.targetTouches[0].pageX - that.startX;
						
						var offLeft =parseFloat(that.scroller.style.marginLeft);
						var movetime = new Date()*1;
						if(movetime - that.startTime >= 1000){
							return;
						}
						
						if(Math.abs(that.offx)<that.list_w/3){
							if(that.moveAble){
								that.scroller.style.marginLeft = that.mLeft + that.offx + "px";
								
							}
						}
						
					    
					}
					
					var endHandler = function(evt){
						var endTime = new Date()*1;
						var boundary = that.list_w/3;
						if(endTime - that.startTime > 300){
							if(that.offx >= boundary){
								that.goIndex('-1');
							}else if(that.offx < 0 && that.offx < -boundary){
								that.goIndex('+1');
							}else{
								that.goIndex('0');
							}
						}else{
							//优化
							//快速移动也能使得翻页
							if(that.offx > 50){
								that.goIndex('-1');
							}else if(that.offx < -50){
								that.goIndex('+1');
							}else{
								that.goIndex('0');
							}
						}
					}
					this.outer.addEventListener("touchstart",startHandler,false);
					this.outer.addEventListener("touchmove",movehandler,false);
					this.outer.addEventListener("touchend",endHandler,false);
				},
				goIndex(n){
					var that = this;
					var cidx;
					that.scroller.classList.add("transition");
					if(typeof n == 'number'){
						cidx = n;
					//如果是传字符则为索引的变化
					}else if(typeof n == 'string'){
						cidx = that.cindex + n*1;
					}
					//当索引右超出
					if(cidx > that.len-1){
						cidx = that.len - 1;
					//当索引左超出	
					}else if(cidx < 0){
						cidx = 0;
					}
					this.scroller.style.marginLeft = -(this.list_w * cidx) + "px";
					this.cindex = cidx;
					this.scroller_animate();
					
				},
				
				
				
			},
			
			components:{
				'v-nodata':nodata,
				'v-loading':loading
			}
	}
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';
	.transprant{
		opacity: 0;
	}
	html,
	body {
		height: 100%;
	}
	
	.comesoon{
		position: absolute;
		top: 50%;
		left: 50%;
		font-size: 2rem;
		color: rgb(232, 198, 143);
		transform: translate(-50%,-50%);
	}

	#app {
		height: 100%;
	}
	.transition {
		transition: linear 0.3s;
	}
	.personal-list {
		width: 100%;
		height: 100%;
		@include bg-image('../../common/images/personalcate/personalbg');
		background-repeat: no-repeat;
		background-position: bottom center;
		background-size: 100% auto;
		.scroll-wrapper {
			width: 16.25rem;
			height: 25rem;
			margin: 8.875rem auto 0;
			.scroll-list {
				width: 500%;
				margin: 0 auto;
				white-space: nowrap;
				font-size: 0;
				
			}
		
			li {
				width: 16.25rem;
				font-size: 0;
				height: 25rem;
				box-sizing: border-box;
				float: left;
				.scroll-item {
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					padding: 0 1.25rem;
					border: 1px solid #E5E5E5;
					border-radius: 5px;
					opacity: 0.5;
					transform: scale(0.9);
					box-shadow: 0 6px 8px -3px rgba(0, 0, 0, 0.1);
					transition: linear 0.3s;
					-webkit-transition: linear 0.3s;
				}
			}
			li.active {
				.scroll-item {
					transform: scale(1);
					opacity: 1;
				}
			}
			a {
				display: block;
				text-align: center;
				.poster {
					display: flex;
					width: 100%;
					justify-content: center;
					align-content: center;
					margin: 0 auto;
					height: 13.125rem;
					padding:0.5rem;
					box-sizing:border-box;
					img {
						max-width: 100%;
						max-height: 100%;
					}
				}
				h4 {
					font-size: 15px;
					color: #333;
					font-family: arial;
					font-weight: 300;
					margin: 6px 0;
					box-sizing: border-box;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					
				}
				h5 {
					color: #C1996A;
					font-size: 14px;
					font-weight: 300;
					margin: 0;
				}
				.description {
					width: 100%;
					color: #999;
					font-size: 0.8125rem;
					text-align: left;
					line-height: 1rem;
					height: 3rem;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					overflow: hidden;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					padding: 1.875rem 3px 0 3px;
					box-sizing: content-box;
					margin-bottom: 1rem;
					position: relative;
					white-space: normal !important;
					h3 {
						font-size: 50px;
						color: #E5E5E5;
						line-height: 1;
						text-align: left;
						position: absolute;
						top: 0;
						left: 0;
					}
				}
				.params {
					height: 2rem;
					width: 100%;
					display: flex;
					align-content: center;
					justify-content: space-between;
					span {
						font-size: 12px;
						i {
							width: 12px;
							height: 12px;
							border-radius: 12px;
							display: inline-block;
							background-color: #999999;
						}
						b {
							font-size: 12px;
							color: #C1996A;
							font-weight: 300;
						}
					}
				}
			}
		}
	}
	
	.otherBtn {
		width: 180px;
		height: 100px;
		@include bg-image('../../common/images/personalcate/morebtn');
		background-size: 100% auto;
		background-position: top center;
		margin: 4.625rem auto 0;
		transform: translate3d(0,100px,0);
		transition: all .5s ease-in; 
		opacity: 0;
	}
</style>