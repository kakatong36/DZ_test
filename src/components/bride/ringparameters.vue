<template>
	<div class="personal-list">
		<v-nodata v-show = 'isnodata' :msg='nodataMsg'></v-nodata>
		<div class="scroller-outer" :class='{transprant:isReady}' >
			<div class="scroll-wrapper"  >
				<ul class="scroll-list clearfix">
					<li class="" v-for='(item, index1) in Ringpicture.ImagesList' @click='go_next(suit)' :key="index1">
						<div class="scroll-item">
							<a href="javascript:;">
								<div class="poster">
									<img :src="item.ImageCode" v-if="item.ImageCode"/>
								</div>
								
							</a>
						</div>
					</li>
				</ul>
			</div>
            <div >
				<div class="Priceprice">¥{{Ringprice}}</div>
                <div class="Pricetext" style="display: none">*此价格为预估售价</div>
            </div>
		</div>
		<div class="bottom">
            <div class="top">
                <ul class="parameter">
                    <li v-for="(item,index2) in Ringparameters" @click="ShortCat (item,index)" :key="index2">
						{{item.first}}
                        <ul :class='{loop:open == item.Id}'>
                            <li v-for="(list, index3) in item.AttrValueList" @click="number(item,list.DictionaryValueName)" :key="index3">
								{{list.DictionaryValueName}}
							</li>
                        </ul>
                    </li>
                </ul>
                <ul class="chinese">
                    <li v-for="(item, index4) in Ringparameters" :key="index4">{{item.DictionaryName}}</li>
                </ul>
            </div>
            <div  class="xiayibu">
                <div class="xiabottom">
                    	<!-- <router-link tag="div" to="/bride/message" class="" @click="toBrigeMessage()">定制</router-link> -->
						<div @click="toBrigeMessage()">定制</div>
                </div>
            </div>
        </div>
        <div class="otherBtn" @click='nextBatch' v-if='total_page>1'></div>
        	</div>
</template>

<script>
    import nodata from 'components/nodata/nodata'
    import loading from 'components/loading/loading'
	export default {
		data() {
			return {
				isShow: this.$store.state.header.isShow = true,
				title:this.$store.state.header.title = '戒指参数',
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
				nodataMsg:'暂无数据',
				Sku:{},
				groupId: this.$route.params.id,
				fineness:'',
				goldWeight:'',
				Ringpicture:{},
				Ringparameters:[],
				isShow:false,
				open:false,
				gold:'',
				val:'',
				Ringprice:'',
				RingObj: {},
				ImageCode:'',
				Shape:'',
				Color:'',
				Cleanliness :''
			}
		},
			
			
			created(){
				this.getRingpictureList();
				this.getRingparametersList();
				this.postGetStonePrice();
			},
			methods: {
				toBrigeMessage (){
					let obj = {};
					localStorage.setItem('RingObj','');
					obj.getRingpictureList = this.Ringpicture;
					obj.getRingparametersList = this.Ringparameters;
					obj.TotalPrice = this.Ringprice;
					obj.GroudId = this.$route.params.id;
					localStorage.setItem('RingObj',JSON.stringify(obj));
					this.$router.push({name:'ring'});
				},
				number (val,value){
					val.first = value;
				},
				ShortCat(item, index){
					this.open = item.Id;
					// console.log(index);
					// if(this.open){
					// 	this.open = false;
					// }else{
					// 	this.open = true;
					// }
					// this.curIndex = index;
					// if(index == 1){
					// 	this.gold = value;
					// 	this.getRingpriceList();
					// }	
					// if(index == 0){   
					// 	this.val = value;
					// }
					// if(index == item.Id){

					// }

				},
				//戒指图片
				getRingpictureList(){
				this.loading();
				const options = {
					url:'/Purchase_Api_MyBride_GetById',
					params: {
						groupId: this.$route.params.id,
					}
				};
				const cbok = res => {
					this.Ringpicture = res.data.data;
					this.closeLoad()
				};
				this.http.get(options,cbok);
			},
				//戒指前两个参数
				getRingparametersList(){
					this.loading();
					const options = {
						url:'/Purchase_Api_MyBride_AttrList',
					};
					const cbok = res => {
						let goldval;
						this.Ringparameters = res.data.data.GroupList[0].AttrList || [];
						this.Ringparameters.map((item,index,arr) => {
							if(item.AttrValueList&&item.AttrValueList[0]){
								this.$set(item,"first",item.AttrValueList[0].DictionaryValueName)
							}
						})
						this.gold = this.Ringparameters[0].first;
						this.val= this.Ringparameters[1].first;
						this.getRingpriceList();
						this.closeLoad()
					};
					this.http.get(options,cbok);
				},
				//戒指后五个参数
				postGetStonePrice(){
					this.loading();
					const options = {
						url:'/Purchase_Api_PriceHelper_GetStonePrice',
					};
					const cbok = res => {
						this.closeLoad();
					};
					const cbno = res =>{
						this.closeLoad();
					};
					this.http.post(options,cbok,cbno);
				},
				//戒指价格
				getRingpriceList(){
					this.loading();
					let gold = this.gold.split('-')[1];
					const options = {
						url:'/Purchase_Api_MyBride_GetPrice',
						params:{
							 groupId:this.$route.params.id, 
							 fineness: this.val,
							 goldWeight:gold
						}
					};
					const cbok = res => {
						this.Ringprice = res.data.data;
						this.closeLoad()
					};
					this.http.get(options,cbok);
				},
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
     #app{
        width: 100%;
        height: 100%;
    }
    header{
        position: relative;
    }
	html,
	body {
		height: 100%;
	}
	.transition {
		transition: linear 0.3s;
	}
	.personal-list {
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-position: bottom center;
		background-size: 100% auto;
         .scroller-outer{
        height: 70.7%;
    }
        .bottom{
            width: 87.8%;
            height: 29.3%;
            margin: 0 auto;
            border: 1px solid #E5E5E5;
            border-radius: 10px;
        }
    .bottom div .chinese{
        display: flex;
    }
    .bottom div .chinese li{
        display: inline;
        font-family: MicrosoftYaHei;
        font-size: 20px;
        color: #333333;
        letter-spacing: 0;
        flex: 2;
        text-align: center;
        
        }
        .bottom div .parameter{
            display: flex;
			margin-top: 3%;
        }
    .bottom div .parameter li {
        display: inline;
        font-family: DINCondensed-Bold;
        font-size: 30px;
        color: #C1996A;
        letter-spacing: 0;
        flex: 2;
       text-align: center;
    }
    .xiayibu{
        height: 36px;
        margin-top:4%; 
    }
    .xiayibu .xiabottom{
        height: 100%;
        width: 22%;
        background: #C1996A;
        border-radius: 30px;
        margin: 0 auto;
        display: flex
    }
    .xiayibu .xiabottom div{
        width: 100%;
        font-family: MicrosoftJhengHeiRegular;
        font-size: 24px;
        color: #FFFFFF;
        flex: 1;
        text-align: center;
    }
    .Pricetext{
        font-family: PingFangHK-Regular;
        font-size: 18px;
        color: #999999;
        letter-spacing: 0;
        text-align: center;
    }
    .Priceprice{
        font-family: DINCondensed-Bold;
        font-size: 36px;
        color: #C1996A;
        letter-spacing: 0;  
        text-align: center;
    }
    .bottom .can{
        margin-bottom: 4.5%;
    }
    li.active {
        .scroll-item {
            transform: scale(1);
            opacity: 1;
        }
    }
	.transprant{
		opacity: 0;
	}
		.scroll-wrapper {
			width: 16.25rem;
			height: 25rem;
			margin: 0 auto;
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
					border-radius: 5px;
					opacity: 0.5;
					transform: scale(0.9);
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
			}
		}
	}
    .bottom .top .parameter li .loop{
            display: inline-block;
			position: absolute;
			display: flex;
			bottom: 20%;
        }
	.bottom .top .parameter li:nth-of-type(1) .loop{
		position: absolute;
		left: 0;
	}
	.bottom .top .parameter li:nth-of-type(2) .loop{
		position: absolute;
		left: 11%;
	}
	.bottom .top .parameter li:nth-of-type(3) .loop{
		position: absolute;
		left: 8%;
	}
	.bottom .top .parameter li:nth-of-type(4) .loop{
		position: absolute;
		left: 45%;
	}
	.bottom .top .parameter li:nth-of-type(5) .loop{
		position: absolute;
		right: 25%;
	}
	.bottom .top .parameter li:nth-of-type(6) .loop{
		position: absolute;
		right: 5%;
	}
	.bottom .top .parameter li:nth-of-type(7) .loop{
		position: absolute;
		right: 0;
	}
	.bottom .top .parameter li .loop li{
		font-family: PingFangHK-Regular;
		font-size: 20px;
		color: #999999;
		letter-spacing: 0;
		display: inline-block;
		white-space:nowrap;
		padding-right: 20px;
		text-align: center;
	}
	.bottom .top .parameter li ul{
		position: relative;
        bottom: 50%; 
		background: #FFFFFF;
		box-shadow: 0 2px 6px 0 rgba(0,0,0,0.13);
		border-radius: 4px;
		display: none;
    }
	.personal-list .transprant {
     opacity: 1;
	}
.personal-list .scroll-wrapper a .poster img{
	max-width: none;
    max-height: none;
	}
.personal-list .scroll-wrapper li{
	width: 20rem;
}
.personal-list .scroll-wrapper li .scroll-item a{
	width: 100%;
	height: 100%;
	div{
		width: 100%;
		height: 100%;
	}
}
.bottom .top .parameter .active{
	display: block;
}
</style>