<template>
    <div class="dialogs" :class="{ 'dialog-active': $store.state.dialog.show }">
        <div class="dialog" >
            <div class="dialog-content">
                <div class="close rotate">
                   <span class="iconfont icon-close" @click="close" style="display: inline-block;width: 40px;height: 40px;">×</span>
                </div>
                <slot name="header">
                    <h1 class="dialog-title"></h1>
                </slot>
                <slot name="body"></slot>
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="dialog-overlay" @click="close"></div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      close: function() {
       	this.$store.dispatch('close_dialog');
      }
    }
  }
</script>

<style lang="scss">
 @import '../../common/scss/mixin.scss';
    .dialogs{
        display: none;
    }
    .dialog-overlay{
        position: fixed;
        z-index: 1000;
        top:0;
        left: 0;
        width: 100%;
        min-height: 100%;
        background: rgba(0,0,0,.5);
    }
    .dialog{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1001;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100% !important;
    }
    .dialog .dialog-content{
        display: inline-block;
        width: 400px;
        background: #fff;
        border-radius: 10px;
    }
    .dialog-active{
        display: block;
    }

    .dialog-title{
        font-size:1.5em;
        text-align:center;
        line-height: 2.5em;
        @include border-1px(#e5e5e5);
    }
    .dialog-footer .cell{
        width:1%;
        text-align: center;
        vertical-align: middle;
        height: 70px;
        font-size: 1.2em;
        color: #666;
        border-right: 1px solid #e5e5e5;
    }
    .dialog-footer .cell:last-child{
    	border-right: none;
    }
    .dialog-footer .table-box:last-child{
         border-right: 0;
    }
    .icon-close{
    	font-size: 30px;
    	line-height: 40px;
    	text-align: center;
    	color: #666;
    }

</style>
