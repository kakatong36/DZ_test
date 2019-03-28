<template>
  <div class="slides">
        <div class="main" ref="progress">
            <div class="left"  @touchstart="onSingleButtonDown($event ,'left')" @touchmove="onSingleButtonMove($event, 'left')" @touchend="onSingleButtonEnd($event)" :style="{'left':scrollX1+'px','z-index':leftZindex}"></div>
            <div class="right" @touchstart="onSingleButtonDown($event,'right')" @touchmove="onSingleButtonMove($event,'right')" @touchend="onSingleButtonEnd($event)" :style="{'right':scrollX2+'px','z-index':rightZindex}"></div>
            <div class="slect" :style="{'left': leftDis +'px','width': widthSize+'px'}"></div>
            <div class="showNum">
                <span class="leftNum" :style="{'left':leftNumDis+'px'}" v-if="leftNum">{{leftNum}}ct</span>
                <span class="rightNum" :style="{'right':rightNumDis+'px'}" v-if="rightNum">{{rightNum}}ct</span>
            </div>
        </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                scrollX1: 0,
                scrollX2: 0,
                firstScrollValLeft: 0,
                firstScrollValRight: 0,
                isFirst: true,
                isFirsts: true,
                leftDis:0,
                widthSize: 400,
                leftNum:'0.00',
                rightNum:'2.00',
                leftNumDis: 0,
                rightNumDis: 0,
                rightZindex:4,
                leftZindex:4
            }
        },
        watch: {
            scrollX1:function() {
                let progress = this.$refs.progress;
                this.leftDis =  this.scrollX1;
                this.leftNumDis = this.scrollX1;
                this.widthSize = progress.offsetWidth - this.leftDis - this.scrollX2;
                if(this.scrollX1 + this.scrollX2 >= progress.offsetWidth-36) {
                    this.leftNum = ''
                }else{
                    this.leftNum = (this.scrollX1/200).toFixed(2);
                    this.rightNum = ((progress.offsetWidth - this.scrollX2)/200).toFixed(2);
                }
                // this.leftNum = (this.scrollX1/progress.offsetWidth*100).toFixed(2) + '%';
            },
            scrollX2 () {
                let progress = this.$refs.progress;
                this.widthSize = progress.offsetWidth - this.leftDis - this.scrollX2;
                this.rightNumDis = this.scrollX2;
                if(this.scrollX1 + this.scrollX2 >= progress.offsetWidth-36) {
                    this.rightNum = ''
                }else{
                    this.rightNum = ((progress.offsetWidth - this.scrollX2)/200).toFixed(2);
                    this.leftNum = (this.scrollX1/200).toFixed(2);
                }
            }
        },
        created () {
            window.vm = this;
        },
        methods: {
            onSingleButtonDown (e,way) {
                e.preventDefault();
                if(way == 'left') {
                    if(this.isFirst){
                        this.firstScrollValLeft = e.touches[0].screenX ; //初始位置
                        this.isFirst = false;
                    }
                    this.leftZindex = 5;
                    this.rightZindex = 4;
                }else{
                    if(this.isFirsts){
                        this.firstScrollValRight = e.touches[0].screenX ; //初始位置
                        this.isFirsts = false;
                    }
                    this.leftZindex = 4;
                    this.rightZindex = 5;
                }
            },
            onSingleButtonMove (e,way) {
                e.preventDefault();
                let val = e.touches[0].screenX;
                let progress = this.$refs.progress;
                if(way == 'left') {
                    if(val - this.firstScrollValLeft < 0 || val - this.firstScrollValLeft > progress.offsetWidth - 36 - this.scrollX2) {
                        return false
                    }else{
                        this.scrollX1 = val - this.firstScrollValLeft; //拖动距离
                        this.$emit('dbslide',this.leftNum,this.rightNum)
                    }
                }else if(way == 'right'){
                    if(val - this.firstScrollValRight > 0){
                        return false
                    }else if(val - this.firstScrollValRight < -progress.offsetWidth + 36 + this.scrollX1) {
                        return false
                    }else{
                        this.scrollX2 = -(val - this.firstScrollValRight); //拖动距离
                        this.$emit('dbslide',this.leftNum,this.rightNum)
                    }
                }else{
                    return false
                }
            },
            onSingleButtonEnd (e) {
                e.preventDefault();
            }
        }
    }
</script>

<style lang="scss">
    .slides{
        margin-bottom: 30px;
        margin-top: 10px;
        .main{
            width: 400px;
            background: #f7f7f7;
            height: 20px;
            border-radius: 10px;
            margin: 0 auto; 
            position: relative;
            .left{
                width: 36px;
                height: 36px;
                border-radius: 100%;
                background: #c1996a;
                position: absolute;
                left: 0;
                top:-8px;
                z-index: 4;
            }
            .right{
                width: 36px;
                height: 36px;
                border-radius: 100%;
                background: #c1996a;
                position: absolute;
                right: 0;
                top: -8px;
                z-index: 5;
            }
            .slect{
                width: 100%;
                height: 20px;
                background: #d6bea1;
                border-radius: 10px;
                position: absolute;
                left: 0;
                top: 0;
            }
            .showNum{
                width: 400px;
                position: absolute;
                bottom: -10px;
                span{
                    position: absolute;
                    &.leftNum{
                        left: 0;
                    }
                    &.righttNum{
                        right: 0;
                    }
                }
                
            }
        }
    }
</style>
