<template>
	<div class="hello">
		<img src="" id="img" width="200" />
		<div>{{src}}</div>
		<video src="../../static/ring.mp4" controls id="videos" autoplay="autoplay"></video>
		<canvas id="canvas" width="600px" height="600px"></canvas>
		<progress max="57" value="0"></progress>
		<input type="range" value="1" @input="getNumber" max="57" min="1" style="width: 500px;" />
		<ul>
			<li v-for=' src in srcList'><img :src="src" alt="" width="20" /></li>
		</ul>

	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				src: '',
				srcList: []
			}
		},
		mounted() {
			localStorage.setItem("list",'');
			var that = this;
			var _video = document.querySelector("#videos");
			var list = [];
			setTimeout(function(){
				drawCanvas();
			},1000)
			

			function drawCanvas() {
				var canvas = document.querySelector("#canvas");
				var context = canvas.getContext("2d");

				context.drawImage(_video, 0, 0, 640, 360);

				var src = canvas.toDataURL("image/jpeg");
				list.push(src);
				that.srcList.push(src);

       var time = setTimeout(drawCanvas, 200);
       if(_video.paused){
       	  window.clearTimeout(time);
       }
				

			}

			setTimeout(function() {
				list.map(function(item, indx, array) {
					var img = new Image();
					img.src = item;

				});
				localStorage.setItem("list", JSON.stringify(list));

			}, 12000)

			function getNumber(that) {
				var value = that.value;
				document.querySelector("progress").value = value;

				document.querySelector("#img").src = list[value];
			}
		},
		methods: {
			getNumber(evt) {
				var value = evt.target.value;
				var list = JSON.parse(localStorage.getItem("list"));
				this.srcList.push(list[value]);
				document.querySelector("progress").value = value;
				var img = new Image();

			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	
	video {
		width: 200px;

	}
	
	canvas {

	}
</style>