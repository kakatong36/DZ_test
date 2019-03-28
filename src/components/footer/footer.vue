<template>
    <footer v-show="$store.state.footer.isShow">
        <div class="plans table-box" >
            <div class="cell info">
                <div v-show="isPrice" class="price">价格：<span>¥{{$store.state.footer.totalPrice}} </span> （价格仅供参考，精确价格请咨询店员）</div>
                <div class="step-wrapper" v-show="$store.state.footer.isStep">
                    <ul class="table-box">
                    	 <li class="cell" v-for='(item,index) in progress' :class='{active:actives.indexOf(index)>=0,"last-child":index == progress.length-1}' :key="index">{{item}}</li>      
                    </ul>
                </div>
            </div>
            <div class="cell nextBtn" v-show='isbtn' @click='action'>{{textBtn}}</div>
        </div>
    </footer>
</template>
<script>
  export default {
    data () {
      return {
       	progress:this.$store.state.footer.progress
      }
    },
    props:{
    	isbtn:{
    		type:Boolean,
    		default(){
    			return false
    		}
    	},
    	textBtn:{
    		type:String,
    		default(){
    			return ''
    		}
    	},
    	actives:{
    		type:Array,
    		default(){
    			return [0]
    		}
    	}
    
    },
    methods:{
		action(){
			this.$emit('nextaction');
		},
        custom(){
          this.$emit('custom');
        }
    },
    computed:{

      isPrice() {
        return this.$store.state.footer.isPrice
      }
    }
  }
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';
    footer{
        width: 100%;
        height: 60px;
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 1em;
        color: #fff;
        background: #333;
        z-index: 100;
        word-break: break-all;
        overflow:hidden;
        -ms-touch-action: none;
        -webkit-overflow-scrolling: touch;
    }
    footer .info{
        padding-left: 40px;
    }
    footer .nextBtn{
        width: 200px;
        height: 60px;
        line-height: 60px;
        @include bg-image('../../common/images/footer/next')
        background-position:top center;
        background-size: 200px 60px;
        font-size: 1em;
        letter-spacing: 1px;
        text-align: center;
        color: #fff;
        vertical-align: top;
    }
    footer .plans .price {
        font-size: 1em;
        line-height: 60px;
        font-weight:400;
        span{
            font-size: 1rem;
            color: #C1996A;
            font-weight: 400;
        }
    }
    .step-wrapper{
        width: 200px;
        text-align: center;
    }
    .step-wrapper .cell{
        position: relative;
        font-size: 12px;
        text-align: center;
        font-weight: 100;
        &:before {
            content: '';
            display: block;
            width: 12px;
            height: 12px;
            margin: 14px auto 5px;
            background: #fff;
            border-radius: 50%;
        }
        &:after{
             content: '';
             position: absolute;
             top: 19px;
             left: 25px;
             height: 2px;
             background: #fff;
             width: 50px;
             z-index: -1;
         }
    }
    .step-wrapper .cell.active{
        color: #c1996a;
    }
    .step-wrapper .cell.active:before,.step-wrapper .cell.active:after{
        background: #c1996a;
    }
    .step-wrapper .last-child:after{
        position: static;
    }
    .foot .cell{
        width: 1%;
        line-height: 60px;
        font-size: 1.2rem;
        text-align: center;
        letter-spacing: 1px;
        position: relative;
        z-index: 1;
        box-sizing:border-box;
        &:nth-child(2){
            background: #C1996A;
            &:before{
                 content: '';
                 position: absolute;
                 z-index: -1;
                 left: -6px;
                 top: 0;
                 border: 40px solid #C1996A;
                 transform: rotate(9deg) translateY(6px);
             }
         }
    }
</style>
