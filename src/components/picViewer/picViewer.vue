<template>
<div class="picViewer">
    <div class="wrap">
        <div class="current">
            <img :src="http.imgUrl+currentImg" v-if="currentImg">
        </div>
        <div class="list">
            <ul class="imglist clearfix">
                <li class="item" v-for="(img, index) in list" :key="index">
                    <div class="img-box">
                        <img :src="http.imgUrl+img" @click="setCurrentPic(index)">
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="close" @click="handleClose">关闭</div>
    <div class="background"></div>
</div>
</template>

<script>

    export default {
        name: 'picViewer',
        data() {
            return {
                currentImg: ''
            }
        },
        props: [
            'options'
        ],
        computed: {
            list () {
                let list = this.options.list || [],
                    index = this.options.activeIndex || 0;
                this.currentImg = list[index];
                return list;
            }
        },
        created(){

        },
        methods:{
            handleClose () {
                this.$emit('picViewerClose')
            },
            setCurrentPic (index) {
                this.currentImg = this.list[index];
            }
        }
    }
</script>

<style lang="scss">
.picViewer{
    .wrap{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1002;
        .current{
            padding: 1em;
            height: calc(100% - 150px);
            position: relative;
            img{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                max-width: 100%;
                max-height: 100%;
            }
        }
        .list{
            width: 100%;
            height: 150px;
            overflow: scroll;
            .imglist{
                padding: 15px 5px;
                width: 1760px;
                box-sizing: content-box;
                .item{
                    float: left;
                    margin: 10px 5px;
                    width: 100px;
                    height: 100px;
                    &.active{
                        .img-box{
                            border-color: #C1996A;
                        }
                    }
                    .img-box{
                        width: 100px;
                        height: 100px;
                        border: 1px solid #dfdfdf;
                        line-height: 96px;
                        text-align: center;
                        overflow: hidden;

                        img{
                            max-width: 100%;
                            max-height: 100%;
                            border: none;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }
    .close{
        position: fixed;
        top: 0;
        right: 0;
        width: 3em;
        height: 3em;
        text-align: center;
        line-height: 3em;
        background: #fff;
        z-index: 1003;
    }
    .background{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        z-index: 1001;
    }
}

</style>
