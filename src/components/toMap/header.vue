<template> 
  <div class="finalHeader">
		<div class="headerFahion"  v-show="header.isShow" > 
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
			let params = this.header.return.params
			params.tableRow = this.$route.params.tableRow
			params.index = this.$route.params.index
            this.$router.replace({
				name: this.header.return.name,
				params
			})
		},
		next(){
			
		}
    },
}
</script>

<style lang="scss">
    .finalHeader{
		background: #ffffff;
		width: 100%;
		height: 6.25rem;
		position: absolute;
		z-index: 9999;
		padding-top: 2.5rem;
		top: 0;
		&.guide{
			background-size: 100% 6.25rem;
			box-shadow: none;
			background-color: rgba(255,255,255,.2)
		}
        .headerFahion{
            // background: #ffffff;
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
				// left: 3.75rem;
                display: flex;
                align-items: center;
				height: 3.75rem;
				line-height: 3.75rem;
				font-size: 1.75rem;
				letter-spacing: -0.71px;
				left: 0;
				padding: 0 3.75rem;
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
