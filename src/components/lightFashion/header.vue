<template>
  <div class="finalHeader" :class="{'guide':  header.title == '时尚定制',}" >
		<div class="headerFahion" v-show="header.isShow"> 
			<div class="return" @click="back">返回</div>
			<h1 class="title" >{{header.title}}</h1>
			<div class="rightTitle" v-show="header.showRight" @click="next">{{header.showRight}}</div>
		</div>
  </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
	props:['header','isShow'],
	created () {
	},
    methods: {
        back () {
            if(this.header.showReturn){
				this.$emit('getBack',true)
			}else{
				if(this.header.return){
					if(this.header.return.name){
						this.$router.replace({
							name: this.header.return.name,
							params:this.header.return.params,
							query: this.header.return.query
						})
					}else{
						this.$router.go(-1);
					}
				}else {
					this.$router.go(-1);
				}
			}
		},
		next(){
			this.$router.push({
				name: "lightFashionSettlement",
				params: {
					id: this.$route.params.id,
					letter: {
						isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
						lettering: this.$route.params.letter ? this.$route.params.letter.lettering : '',
					}
				},
				query: this.$route.query
			})
		}
    },
}
</script>

<style lang="scss">
	.guide{
		background: url('../../assets/assetsFinal/top03.png') no-repeat center;
		background-size: 100% 6.25rem;
		box-shadow: none;
	}
    .finalHeader{
		background: #ffffff;
		width: 100%;
		height: 6.25rem;
		position: absolute;
		z-index: 9999;
		padding-top: 2.5rem;
		top: 0;
        .headerFahion{
           	width: 100%;
            height: 3.75rem;
			box-shadow: 0 1px 0 0 #E5E5E5;
            .title{
                text-align: center;
                line-height: 3.75rem;
				height: 3.75rem;
				color: #333;
				font-size: 2.25rem;
            }
            .return{
                position: absolute;
				left: 0;
				padding: 0 3.75rem;
                display: flex;
                align-items: center;
				height: 3.75rem;
				line-height: 3.75rem;
				font-size: 1.75rem;
				letter-spacing: -0.71px;
                &:before{
                    content:"";
                    display: inline-block;
                    width: 1.1rem;
                    height: 1.1rem;
                    border-right: 2px solid #333;
                    border-top: 2px solid #333;
                    transform: rotate(-135deg);
                }
                &:active{
                    opacity: 0.8;
                }
			}
			.rightTitle{
				position: absolute;
				right: 3.75rem;
				height: 3.75rem;
				font-size: 1.75rem;
				line-height: 3.75rem;
				bottom: 0;
			}
			&.shoppingCar{
				background: url('../../assets/assetsFinal/top1.png') no-repeat center;
				background-size: 100% 6.25rem;
				box-shadow: none;
			}
			
        }
    }
</style>
