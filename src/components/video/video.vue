<template>
<div class="vPlayer">
      <div class="back-header">
		  <div class="header-container">
            <div class="back-btn" @click="handleClose">返回</div>
            <h1 class="head-text">{{options.title}}</h1>
		  </div>	
      </div>
<div class="video-player-box">
    <videoPlayer
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        customEventName="customstatechangedeventname"

        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"

        @statechanged="playerStateChanged($event)"
        @ready="playerReadied">
    </videoPlayer>
</div>
<div class="video-background"></div>
</div>
</template>

<script>
    import { videoPlayer } from 'vue-video-player'

    export default {
        name: 'vPlayer',
        components: {videoPlayer},
        data() {
            return {
                playerOptions: {
                // videojs options
                //muted: true,
                //language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    //src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                    src: ''
                }],
                //poster: "/static/images/author.jpg",
                width: 640
                }
            }
        },
        props: [
            'options'
        ],
        computed: {

        },
        created(){
			console.log(this.options);
			// let video = document.createElement('video')
			// video.src = '';
			// video.onloadeddata = function(){

			// }
			// video.onerror = function(){
			// 	if(this.options.src){
			// 		this.playerOptions.sources[0].src = this.options.src;
			// 	}
			// }
			
				if(this.options.src){
					this.playerOptions.sources[0].src = this.options.src;
				}
        },
        methods:{
            handleClose () {
                this.$emit('videoClose')
            },

            onPlayerPlay(player) {
            // console.log('player play!', player)
            },
            onPlayerPause(player) {
            // console.log('player pause!', player)
            },
            onPlayerEnded(player) {
            // console.log('player pause!', player)
            },
            onPlayerWaiting(player) {
            // console.log('player pause!', player)
            },
            onPlayerPlaying(player) {
            // console.log('player pause!', player)
            },
            onPlayerLoadeddata(player) {
            // console.log('player pause!', player)
            },
            onPlayerTimeupdate(player) {
            // console.log('player pause!', player)
            },
            onPlayerCanplay(player) {
            // console.log('player pause!', player)
            },
            onPlayerCanplaythrough(player) {
            // console.log('player pause!', player)
            },

            playerStateChanged(playerCurrentState) {
            // console.log('player current update state', playerCurrentState)
            },
            playerReadied(player) {
                //console.log('the player is readied', player)
            }
        }
    }
</script>

<style lang="scss">
.vPlayer{
	.back-header {
		background: #ffffff;
		width: 100%;
		height: 6.25rem;
		position: fixed;
		z-index: 9999;
		padding-top: 2.5rem;
		top: 0;
		left: 0;
		.header-container{	
			width: 100%;
			height: 3.75rem;
			box-shadow: 0 1px 0 0 #e5e5e5;
			.back-btn {
			position: absolute;
			left: 3.75rem;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			height: 3.75rem;
			line-height: 3.75rem;
			font-size: 1.75rem;
			letter-spacing: -0.71px;
			}
			.back-btn:before {
			content: "";
			display: inline-block;
			width: 1.1rem;
			height: 1.1rem;
			border-left: 2px solid #333;
			border-top: 2px solid #333;
			-webkit-transform: rotate(-45deg);
			transform: rotate(-45deg);
			}
			.head-text {
			text-align: center;
			line-height: 3.75rem;
			height: 3.75rem;
			color: #333;
			font-size: 2.25rem;
			}
			.cusIndex {
			width: 100%;
			height: 100%;
			}
		}
		}
    .close{
        position: fixed;
        top: 6.25rem;
		font-size: 1.88rem;
        right: 0;
        width: 3em;
        height: 3em;
        text-align: center;
        line-height: 3em;
        background: #fff;
        z-index: 1003;
    }
}
.video-background{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    z-index: 1001;
}
.video-player-box{
    position: absolute;
    z-index: 1002;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .video-js .vjs-big-play-button{
        left: 50%;
        top: 50%;
        margin-top: -0.75em;
        margin-left: -1.5em;
    }
}
</style>
