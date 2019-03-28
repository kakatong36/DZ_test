<template>
	<div class="fashionFooter">
		<div class="footer" v-show="finishParams.isShow">
			<ul>
				<li @click="goCur('styleLight')" :class="{'active': finishParams.isStyleList,'finished': finishParams.isStyleListFinshed}"><p>{{finishParams.footerWord.firstStep}}</p></li>
				<li @click="goCur('detailLight')" :class="{'active': finishParams.isDetail,'finished': finishParams.isDetailFinshed}"><p>{{finishParams.footerWord.secondStep}}</p></li>
				<!-- <li @click="goCur('stone')" :class="{'active': finishParams.isStone,'finished': finishParams.isStoneFinshed}"><p>{{finishParams.footerWord.thirdStep}}</p></li> -->
				<li @click="goCur('settlementLight')" :class="{'active': finishParams.isMessage,'finished': finishParams.isMessageFinshed}"><p>{{finishParams.footerWord.fourStep}}</p></li>
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
        props:['finishParams', 'header'],
        created () {
		},
		methods: {
			goCur(name){
				if(this.header.return && this.header.return.query && this.header.return.query.lastPage == 'series'){
					return
				}
				let routerName = ''
				if(name == 'styleLight'){
					routerName = "lightFashion"
				}else if(name == 'detailLight'){
					routerName = "lightFashionDetail"
				}else if(name == 'stone'){
					routerName = "finalFashionStone"
				}else if(name == 'settlementLight'){
					routerName = "lightFashionSettlement"
				}
				
				if(this.$store.state.relate[name]){
					this.$router.push({
						name: routerName,
						params: {
							id: this.$route.params.id,
							tableRow: this.$route.params.tableRow,
							index: this.$route.params.index,
							letter:{
								isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
								lettering: this.$route.params.letter ? this.$route.params.letter.lettering : '',
							}
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
					z-index: 9999999;
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
				&:first-child{
					border-radius: 0.625rem 0 0 0.625rem; 
				}
				&:last-child{
					border-radius: 0 0.625rem 0.625rem 0; 
				}
				&:active{
					opacity: 0.8;
				}
			}
		}
    }
</style>
