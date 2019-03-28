<template>
	<div class="fashionFooter">
		<div class="footer" v-show="finishParams.isShow">
			<ul>
				<li @click="goCur('style')" :class="{'active': finishParams.isStyleList,'finished': finishParams.isStyleListFinshed }"><p>{{finishParams.footerWord.firstStep}}</p></li>
				<li @click="goCur('detail')" :class="{'active': finishParams.isDetail,'finished': finishParams.isDetailFinshed, disabled: !finishParams.isDetailFinshed && finishParams.disabled}"><p>{{finishParams.footerWord.secondStep}}</p></li>
				<li @click="goCur('stone')" :class="{'active': finishParams.isStone,'finished': finishParams.isStoneFinshed, disabled: !finishParams.isStoneFinshed && finishParams.disabled}"><p>{{finishParams.footerWord.thirdStep}}</p></li>
				<li @click="goCur('settlement')" :class="{'active': finishParams.isMessage,'finished': finishParams.isMessageFinshed}"><p>{{finishParams.footerWord.fourStep}}</p></li>
			</ul>
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        props:['finishParams', 'flag', 'header'],
        created () {
		},
		methods: {
			goCur(name){
				if(this.header.return && this.header.return.query && this.header.return.query.lastPage == 'series'){
					return
				}
				let routerName = ''
				this.$store.commit('SET_STONESIZE',this.$route.params.tableRow?this.$route.params.tableRow.Id:'')
				if(name == 'style'){
					if(this.$store.state.relate.isSroneOrStyle){
						routerName = "finalFashion"
					}else{
						routerName = "finalFashionStoneFirst"
					}
				}else if(name == 'detail'){
					if(this.$store.state.relate.isSroneOrStyle){
						routerName = "finalFashionDetail"
					}else{
						routerName = "finalFashion"
					}
				}else if(name == 'stone'){
					if(this.$store.state.relate.isSroneOrStyle){
						routerName = "finalFashionStone"
					}else{
						routerName = "finalFashionDetail"
					}
				}else if(name == 'settlement'){
					routerName = "finalFashionSettlement"
				}
				if(this.$store.state.relate[name]){
					if(this.flag){
						if(this.flag.isNextStep){
							if(this.flag.name == 'detail'){
								if(name == 'stone' || name == 'settlement'){
									this.$parent.tips('请选择成色！')//子组件调用父组件的方法
									return false
								}
							}else if(this.flag.name == 'settlement'){
								if(name == 'settlement'){
									this.$parent.tips('请选择配石！')//子组件调用父组件的方法
									return false
								}
							}
						}else if(this.flag.isNextSettlement){
							if(name == 'settlement'){
								this.$parent.tips('重新选托与所选配石不符,请重新配石!')//子组件调用父组件的方法
								return false
							}
						}else{
							// if(name == 'settlement' && this.$route.params.ProType != 11){
							// 	this.$parent.tips('请选择配石！')//子组件调用父组件的方法
							// 	return false
							// }
						}
					}else{
						if(routerName == 'finalFashionStone'){
							if(!this.finishParams.isStoneFinshed && this.finishParams.disabled){
								return false
							}
						}
					}
					this.$router.push({
						name: routerName,
						params: {
							id: this.$route.params.id,
							tableRow: this.$route.params.tableRow,
							index: this.$route.params.index,
							letter:{
								isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
								lettering: this.$route.params.letter ? this.$route.params.letter.lettering : '',
							},
							size:this.$route.params.size,
							inlay: this.$route.params.inlay,
							ProType: this.$route.params.ProType
						}
					})
				}
			}
		}
    }
</script>

<style lang="scss">
    .fashionFooter{
        height: 5.5rem;
        width: 100%;
        position: absolute;
        bottom: 1.25rem ;
        left: 0;
		padding: 0 1.88rem;
		z-index: 9;
		// animation: footerFadeUpDown 1s ease forwards;
		ul{
			display: flex;
        	height: 5.5rem;
			box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
			li{
				background: #ffffff;
				color: #FF9C9C;
				font-size: 1.5rem;
				flex: 1;
				display: flex;
				align-items: center;
				p{
					width: 100%;
					height: 2rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border-right: 1px solid #f2f2f2;
				}
				&.active{
					background: #FF9C9C;
					color: #fff;
					z-index: 999;
					p{
						border-right: none;
					}
				}
				&.finished{
					p{
						
						&:after{
							content: '';
							display: inline-block;
							width: 2rem;
							height: 2rem;
							background: url('../../assets/assetsFinal/tick.png') no-repeat center;
							background-size: 100%;
							margin-left: 0.63rem;
						}
					}
				}
				&.disabled{
					color: #ccc;
				}
				&:first-child{
					border-radius: 0.625rem 0 0 0.625rem; 
				}
				&:last-child{
					border-radius: 0 0.625rem 0.625rem 0; 
				}
			}
		}
		@keyframes footerFadeUpDown {
			0%{
				opacity: 0;
				bottom: -10rem;
			}
			100%{
				opacity: 1;
				bottom: 1.25rem;
			}
		}
    }
</style>
