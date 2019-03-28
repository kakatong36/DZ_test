<template>
  <div class="hello">
    <video src="../../static/ring.mp4" controls id="videos" autoplay="autoplay"></video>
		<canvas id="canvas" width="600px" height="480px"></canvas>
		<progress max="57" value="0"></progress>
    <input type="range" value="1" oninput="getNumber(this)" max="57" min="1" style="width: 500px;"/>
		<img src="" id="img"/>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
  	/*var _video = document.querySelector("#videos");
		    var list = [];
	     	//drawCanvas();
	     	console.log(document.querySelector("#canvas"));
			 function drawCanvas() {
                var canvas = document.querySelector("#canvas");
                var context = canvas.getContext("2d");

                context.drawImage(_video, 0, 0, 640, 360);
            
                var img = new Image();
			   
			    var src = canvas.toDataURL("image/jpeg");
			    list.push(src);
			       
                setTimeout(drawCanvas,200);
                
            }
			 
			 setTimeout(function(){
			 	list.map(function(item,indx,array){
			 		var img = new Image();
			 		img.src= item;
			 		
			 	});
			 	localStorage.setItem("list",JSON.stringify(list));

		
			 },12000)
			 
			 function getNumber(that){
				var value = that.value;
				document.querySelector("progress").value = value;
				document.querySelector("#img").src=list[value];
			}*/
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
</style>
