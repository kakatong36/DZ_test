<template>
<div class="cusIndex">
	<div class="back-header">
		<div class="header-container">
			<div class="back-btn" @click="goback">返回</div>
			<h1 class="head-text">自由女神</h1>
		</div>
	</div>
	<div class="animate" :style="{height: fullHeight + 'px'}">
		<div class="box-shade"></div>

		<!-- 左侧选项 -->
		<div class="left" id="left" ref="leftImg">
			<div class="animate-wrap">

				<div :key="index" v-for="(img ,index) in topList" ref="leftListGroup" class="imgArr" :style="{transform: topList.length > 17 ? 'rotate(' + -(90 / topList.length * index) + 'deg)' : 'rotate(' + -(16* index) + 'deg)'}" @touchstart="firstScroll" @touchmove="imgScroll(index,img,'left','', $event)"
				    @touchend="endScroll(index,img,'','left')">
					<div class="imgContainer" :style="{transform: topList.length > 17 ? 'rotate(' + (90 / topList.length * index + 90) + 'deg)' : 'rotate(' + (16 * index + 90) + 'deg)'}" ref="leftImgGroup">

						<!-- 统一当list.length小于12时间隔为15度,大于12时为根据Length来相除角度 -->

						<img :src="img.MainImage.indexOf('http')>-1?img.MainImage+config.defaultImgSize:http.imgUrl+img.MainImage+config.defaultImgSize" :alt="img.StyleName" v-if="img.MainImage" :class="{chooseImg : index === selectLeftIndex}">
						<img src="../../assets/ps_17101611163885870100.jpg" :alt="img.StyleName" :class="{chooseImg : index === selectLeftIndex}" v-else>

						<div class="imgName">
							{{img.StyleName}}
						</div>

					</div>
				</div>

			</div>
		</div>

		<!-- 中间生成块 -->
		<div class="middle" v-show="showName">
			<div @click="jumpDetail" class="middle-imgContainer">
				<img :src="rightInfo.MainImage.indexOf('http')>-1?rightInfo.MainImage+config.defaultImgSize:http.imgUrl+rightInfo.MainImage+config.defaultImgSize" alt="" v-if="rightInfo.MainImage">
			</div>
			<div class="middle-name">
				{{rightInfo.SuitName}}
			</div>
			<div class="middle-price">
				￥{{(Number(rightInfo.MinSuitPrice)).toFixed(2)|money}}<span>起</span>
			</div>
			<div style="width:100%;overflow:hidden;">


				<div class="middle-stone" style="padding-left:7rem;">
					<div class="middle-rabbet">
						<span>适配镶口：</span>
						<span v-if="currentTopObj.Rabbet.length <= 3 && currentTopObj.Rabbet.length > 0" v-for="(item,index) in currentTopObj.Rabbet" :key="index">{{item.AttrValueName}}ct</span>
						<span v-if="currentTopObj.Rabbet.length > 3">
							{{currentTopObj.Rabbet[0].AttrValueName}}ct
							~
							{{currentTopObj.Rabbet[currentTopObj.Rabbet.length - 1].AttrValueName}}ct
						</span>
						<span v-if="currentTopObj.Rabbet.length == 0">无</span>
					</div>
					<div>辅石类别：{{diamondArr.diamondStr}}</div>
					<div v-if="diamondArr.diamondStr != '无'">辅石数量：{{diamondArr.diamondNum}}</div>
					<div v-if="diamondArr.diamondStr != '无'">辅石重量：{{diamondArr.diamondWeight}}</div>
				</div>
			</div>
			<div class="watch-detail" style="" v-show="rightInfo.MainImage" @click="jumpSelect">选择参数</div>
		</div>

		<div class="middleBackground-stripe"></div>
		<div class="middleBackground"></div>
		<div class="middleBackground-twotriangle"></div>
		<div class="middleBackground-triangle"></div>
		<div class="middleBackground-one"></div>
		<div class="middleBackground-two"></div>
		<div class="middleBackground-three"></div>
		<!-- <div class="middleBackground-four"></div> -->

		<!-- 右侧选项 -->
		<div class="right" id="right" ref="rightImg" @mousedown="firstScroll" @mousemove="imgScroll" @mouseup="endScroll" v-show="reShow">
			<div class="animate-wrap">

				<div :key="img.id" v-for="(img ,index) in downList" ref="rightListGroup" class="imgArr" :style="{transform: downList.length > 12 ? 'rotate(' + -(90 / downList.length * index) + 'deg)' : 'rotate(' + -(16 * index) + 'deg)'}" @click="transfromImgRight(index,img)"
				    @touchstart="firstScroll" @touchmove="imgScroll(index,img,'right','0', $event)" @touchend="endScroll(index,img,'0','right')">

					<div class="imgContainer" :style="{transform: downList.length > 12 ? 'rotate(' + (90 / downList.length * index + 90) + 'deg)' : 'rotate(' + (16 * index + 90) + 'deg)'}" ref="rightImgGroup">
						<img :src="img.MainImage.indexOf('http')>-1?img.MainImage+config.defaultImgSize:http.imgUrl+img.MainImage+config.defaultImgSize" alt="" v-if="img.MainImage" :class="{chooseImg : index === selectRightIndex}">
						<img src="../../assets/ps_17101611163885870100.jpg" alt="img.RingArmsName" :class="{chooseImg : index === selectRightIndex}" v-else>

						<div class="imgName rightImgName" ref="rightNameGroup">
							{{img.StyleName}}
						</div>
					</div>

				</div>

			</div>
		</div>

	</div>

	<v-loading v-show="isloading"></v-loading>
	<promptBox :msg="msg" v-show="ispromptBox"></promptBox>
</div>
</template>

<script>
const rotates = 16;
import loading from "@/components/isLoading/isloading";
import promptBox from "@/components/promptBox/promptBox";

export default {
	data() {
		return {
			return: {

			},
			isShow: (this.$store.state.header.isShow = false),
			isloading: false,
			firstScrollVal: 0,
			showName: false,
			scrollY: 0, //滚动大小
			touchLeftIndex: null,
			touchRightIndex: null,
			selectLeftIndex: 0, //左选中下标
			selectRightIndex: 0, //右选中下标
			currentTopLi: "",
			currentDownLi: "",
			currentRightLi: "",

			currentTopObj: {
				Rabbet: []
			},
			currentDownObj: {},

			degArr: [],
			imgDegArr: [],
			reShow: true, //花臂再次渲染
			topList: [{
				Rabbet: null //初始化
			}], //左侧列表数据
			downList: [{
				//初始化
				StoneType: null,
				StoneQuantity: null,
				StoneWeight: null
			}], //右侧列表数据
			rightInfo: {
				ImagesList: []
			},
			fullHeight: document.documentElement.clientHeight,
			diamondArr: {
				diamondStr: "",
				diamondNum: "",
				diamondWeight: ""
			},
			oldIndex: 0,

			//y
			ispromptBox: false,
			msg: {
				text: "",
				time: "",
				show: false
			}

		};
	},
	created() {
		this.getFlower()
		if(this.$route.query.from == 'finalFashion'){
			this.return = {
				name: 'finalFashion',
				params: this.$route.params,
				query: {from: 'combination'}
			}
		}
	},
	mounted() {
		window.addEventListener("resize", this.handleResize);
		this.rotateHalf();
	},
	beforeDestroy: function() {
		window.removeEventListener("resize", this.handleResize);
	},
	methods: {
		handleResize(event) {
			this.fullHeight = document.documentElement.clientHeight;
		},
		rotateHalf() {
			setTimeout(() => {
				//y
				// this.rotateLeftHalf();
				this.getArm(true); //花头改变戒臂实时改变
			}, 200);
			//修改镜像文字改变
		},
		rotateRightHalf() {
			// 右侧旋转一半
			const rightLen = Math.floor(this.downList.length / 2);
			this.transfromImgRight(rightLen, this.downList[rightLen]);
		},
		rotateLeftHalf() {
			// 左侧旋转一半
			const leftLen = Math.floor(this.topList.length / 2);
			this.transfromImgLeft(leftLen, this.topList[leftLen]);
		},
		firstScroll(e) {
			this.scrollY = 0;
			this.firstScrollVal = 0;
			e.preventDefault();
			this.firstScrollVal = e.touches[0].screenY; //初始位置
		},
		imgScroll(index, img, way, status, event) {
			event.preventDefault();
			let val = event.touches[0].screenY;
			this.scrollY = val - this.firstScrollVal; //拖动距离

			let moveIndex = Math.abs(parseInt(this.scrollY / 100));
			if (this.oldIndex != moveIndex) {
				if (this.scrollY < 0) {
					// 上滚事件
					this.prev(index, img, way, status);
				} else {
					// 下滚事件
					this.next(index, img, way, status);
				}
				this.oldIndex = moveIndex;
			}
		},
		endScroll(index, img, status, way) {
			let moveY = Math.abs(this.scrollY),
				moveIndex = Math.abs(parseInt(this.scrollY / 100));
			if (this.scrollY < 0) {
				// 上滚事件
				this.prev(index, img, way);
			} else {
				// 下滚事件
				this.next(index, img, way);
			}
			//传参来判断是否是初始化时的获取变化,并且加入判断是否是点击事件或者是大于INDEX=1的滑动事件
			if (status != "0" && (moveY > 100 || moveY < 5)) {
				this.getArm(); //花头改变戒臂实时改变
				setTimeout(() => {
					this.rotateRightHalf();
				}, 200);
			}
		},
		next(index, img, way) {
			let moveIndex = Math.abs(parseInt(this.scrollY / 100));
			let newIndex = index - moveIndex;
			if (way == "left") {
				if (newIndex < 0) {
					this.transfromImgLeft(0, img);
				} else {
					this.transfromImgLeft(newIndex, img);
				}
			} else {

				if (newIndex < 0) {
					return
				} else {
					this.transfromImgRight(newIndex, img);
				}
			}
		},
		prev(index, img, way) {
			let moveIndex = Math.abs(parseInt(this.scrollY / 100));
			let newIndex = index + moveIndex;
			if (way == "left") {
				if (newIndex > this.topList.length) {
					return
				}
				if (newIndex > this.topList.length - 1) {
					newIndex = this.topList.length - 1;
					this.transfromImgLeft(newIndex, img);
				} else {
					this.transfromImgLeft(newIndex, img);
				}
			} else {
				if (newIndex > this.downList.length - 1) {
					return
					//   newIndex = this.downList.length - 1;
					//   this.transfromImgRight(newIndex, img);
				} else {
					this.transfromImgRight(newIndex, img);
				}
			}
		},
		transfromImgLeft(index, item) {
			//获取合成图
			this.currentTopLi = this.topList[index].Id; //必须在这里转换成index的id，否则会用前一个index的id，导致延时

			this.currentTopObj = this.topList[index];
			//左侧滑动列表
			if (this.touchLeftIndex == index) {
				return;
			}
			this.selectLeftIndex = this.selectLeftIndex == index ? "" : index;
			let lessNum = index - this.touchLeftIndex;
			let deg = this.getRotate(this.topList, lessNum); //每个div的间隔角度

			const divEl = this.$refs.leftListGroup;
			const imgEl = this.$refs.leftImgGroup;

			this.mathRotate(divEl, deg);
			this.mathRotate(imgEl, -deg);

			imgEl[index].style.transform += " scale(1.25)";
			this.touchLeftIndex = index;
			this.rotateRightHalf();
		},

		transfromImgRight(index, item) {
			//获取合成图
			this.currentDownLi = this.downList[index].Id;
			this.currentDownObj = this.downList[index];
			//右侧滑动列表
			//   if (this.touchRightIndex == index) {
			//     return;
			//   }
			this.selectRightIndex = index;
			let lessNum = index - this.touchRightIndex;

			let deg = this.getRotate(this.downList, lessNum);

			const divEl = this.$refs.rightListGroup;
			const imgEl = this.$refs.rightImgGroup;

			this.mathRotate(divEl, deg);
			this.mathRotate(imgEl, -deg);
			//已有rotate情况下scale必须以添加字符串形式写入
			imgEl[index].style.transform += " scale(1.25)";
			this.touchRightIndex = index;
			this.GetGroupInfo();
		},

		getRotate(el, num) {
			// 获取需要旋转的角度
			let deg = 0;

			if (el.length <= 17) {
				if (-(el.length * num) < 0) {
					// 判断向上还是向下旋转,然后相乘角度
					deg = -rotates * Math.abs(num);
				} else if (-(el.length * num) > 0) {
					deg = rotates * Math.abs(num);
				}
			} else if (-el.length.length > 17) {
				deg = -(el * num);
			}
			return deg;
		},

		mathRotate(el, deg) {
			//循环元素取已转数值做旋转动画
			for (let i = 0; i < el.length; i++) {
				let imgDeg = el[i].style.transform;
				let firstDeg = this.subStr(imgDeg);
				let rotateDeg = firstDeg - deg;

				el[i].style.transform = `rotate(${rotateDeg}deg)`;
			}
		},
		//获取花头列表
		getFlower() {
			this.isloading = true;
			const options = {
				url: "/Purchase_Api_SuitCustomize_SearchFlowerList"
			};
			const cbok = res => {
				this.isloading = false;
				this.topList = res.data.data.data_list || [];
				if (this.topList[0]) {
					this.currentTopLi = this.topList[0].Id;
				}
			};
			const cbno = res => {
				this.topList = []; //y
				this.isloading = false;
			};

			const cbnull = res => {
				this.topList = []; //y
				this.isloading = false;
			};
			this.http.get(options, cbok, cbno, cbnull);
		},
		//获取戒臂列表
		getArm(status) {
			this.reShow = false; //利用布尔重新渲染右侧列表,否则会保留刷新前的样式
			this.isloading = true;
			//y
			if (!this.currentTopLi) {
				this.currentTopLi = "";
				this.isloading = false;
				this.tips("数据加载有误！");
				return false
			} else {
				this.rotateLeftHalf();
			}

			const options = {
				url: "/Purchase_Api_SuitCustomize_SearchArmList",
				params: {
					styleId: this.currentTopLi
				}
			};

			const cbok = res => {
				this.isloading = false;
				this.downList = res.data.data.data_list || [];
				if (this.downList[0]) {
					this.currentDownLi = this.downList[0].Id;
					if (status == true) {
						setTimeout(() => {
							this.rotateRightHalf();
						}, 200);
					}
				}
				this.reShow = true;
				this.clickFirst();
			};

			const cbno = res => {
				this.isloading = false;
			};

			const cbnull = res => {
				this.isloading = false;
			};
			this.http.get(options, cbok, cbno, cbnull);
		},

		tips(text) {
			let that = this;
			that.ispromptBox = true;
			that.$nextTick(() => {
				that.msg.text = text;
			});
			setTimeout(() => {
				that.msg.time = 1500;
			}, 1000);
			setTimeout(() => {
				that.ispromptBox = false;
				that.msg.time = null;
				that.msg.text = null;
			}, 1500);
		},

		clickFirst() {
			this.transfromImgRight(0, this.downList[0]);
		},
		mathArr(arr) {
			for (let i = 0; i < arr.length - 1; i++) {
				for (let j = 0; j < arr.length - 1 - i; j++) {
					if (arr[j] > arr[j + 1]) {
						let temp = arr[j];
						arr[j] = arr[j + 1];
						arr[j + 1] = temp;
					}
				}
			}
			return arr;
		},
		mergeArray(arr1, arr2) {
			//去重
			for (let i = 0; i < arr1.length; i++) {
				for (let j = 0; j < arr2.length; j++) {
					if (arr1[i] === arr2[j]) {
						arr1.splice(i, 1); //利用splice函数删除元素，从第i个位置，截取长度为1的元素
					}
				}
			}
			//alert(arr1.length)
			for (let i = 0; i < arr2.length; i++) {
				arr1.push(arr2[i]);
			}
			return arr1;
		},
		mergeNumArr(arr1, arr2) {
			//数组相加
			if (arr2.length > arr1.length) {
				let t = arr1;
				arr1 = arr2;
				arr2 = t;
			}

			let mergeArr = arr1.map(function(v, i) {
				return (v + (arr2[i] || 0)).toFixed(6);
			})
			let mergeNewArr = [];
			mergeArr.forEach((item, index) => {
				let str = item.toString();
				let num = str.replace(/0*$/, "");
				mergeNewArr.push(num)
			})
			return mergeNewArr;
		},
		getDiamondStr() {
			//辅石合并
			let diamondStr = "";
			if (!this.currentTopObj.StoneType) {
				if (!this.currentDownObj.StoneType) {
					diamondStr = "无";
				} else {
					diamondStr = this.currentDownObj.StoneType;
				}
			} else if (!this.currentDownObj.StoneType) {
				if (!this.currentTopObj.StoneType) {
					diamondStr = "无";
				} else {
					diamondStr = this.currentTopObj.StoneType;
				}
			} else {
				let flower = this.currentTopObj.StoneType.split("/"); //花头

				let arm = this.currentDownObj.StoneType.split("/"); //戒臂

				let arr = this.mergeArray(flower, arm);

				diamondStr = arr.join("/");
			}
			this.diamondArr.diamondStr = diamondStr; //输出辅石字段
		},
		getDiamondNum() {
			let diamondNum = "",
				armQuantity = this.currentDownObj.StoneQuantity,
				flowerQuantity = this.currentTopObj.StoneQuantity;

			if (!armQuantity) {
				if (!flowerQuantity) {
					diamondNum = "无";
				} else {
					diamondNum = flowerQuantity;
				}
			} else if (!flowerQuantity) {
				if (!armQuantity) {
					diamondNum = "无";
				} else {
					diamondNum = armQuantity;
				}
			} else {
				let flowerWeightArr = flowerQuantity.split("/");
				let armWeightArr = armQuantity.split("/");
				let newFlowerArr = [],
					newArmArr = [];
				armWeightArr.forEach((item, index) => {
					let val = Number(item);
					newArmArr.push(val);
				});
				flowerWeightArr.forEach((item, index) => {
					let val = Number(item);
					newFlowerArr.push(val);
				});
				let newWeightArr = this.mergeNumArr(newArmArr, newFlowerArr);

				diamondNum = newWeightArr.join("/");
			}

			this.diamondArr.diamondNum = diamondNum; //输出重量字段
		},
		getDiamondWeight() {
			let diamondWeight = "",
				armWeight = this.currentDownObj.StoneWeight,
				flowerWeight = this.currentTopObj.StoneWeight;

			if (!armWeight) {
				if (!flowerWeight) {
					diamondWeight = "无";
				} else {
					diamondWeight = flowerWeight;
				}
			} else if (!flowerWeight) {
				if (!armWeight) {
					diamondWeight = "无";
				} else {
					diamondWeight = armWeight;
				}
			} else {
				let flowerWeightArr = flowerWeight.replace(/ct/g, "").split("/");
				let armWeightArr = armWeight.replace(/ct/g, "").split("/");

				let newFlowerArr = [],
					newArmArr = [];
				armWeightArr.forEach((item, index) => {
					let val = Number(item);
					newArmArr.push(val);
				});
				flowerWeightArr.forEach((item, index) => {
					let val = Number(item);
					newFlowerArr.push(val);
				});
				let newWeightArr = this.mergeNumArr(newArmArr, newFlowerArr);
				let temp = [];
				newWeightArr.forEach((item, index) => {
					let text = item + "ct";
					temp.push(text);
				});

				diamondWeight = temp.join("/");
			}

			this.diamondArr.diamondWeight = diamondWeight; //输出重量字段
		},
		GetGroupInfo() {
			this.isloading = true;

			if (!this.currentTopLi || !this.currentDownLi) {
				this.isloading = false;
				this.rightInfo = {};
				this.showName = false;
				return;
			}
			const options = {
				url: "/Purchase_Api_SuitCustomize_GetFreeShow",
				params: {
					flowerId: this.currentTopLi,
					armId: this.currentDownLi
				}
			};
			const cbok = res => {
				this.isloading = false;
				this.rightInfo = res.data.data;
				this.getDiamondStr(); //获取相加后的辅石
				this.getDiamondNum(); //获取相加后的数量
				this.getDiamondWeight(); //获取相加后的重量

				if (this.rightInfo.ImagesList && this.rightInfo.ImagesList[0]) {
					this.currentRightLi = this.rightInfo.ImagesList[0].Id;
				}
				this.showName = true;
			};

			const cbno = res => {
				this.isloading = false;
			};

			const cbnull = res => {
				this.isloading = false;
				this.rightInfo = {};
				this.showName = false;
			};

			this.http.get(options, cbok, cbno, cbnull);
		},

		subStr(str) {
			//截取deg数值
			let imgDeg = str;
			let first = imgDeg.indexOf("(");
			let second = imgDeg.indexOf("d");
			let final = parseInt(imgDeg.substring(first + 1, second));
			return final;
		},

		goback() {
			if(this.return.name){
				let route = {
					name: this.return.name,
					params: this.return.params,
					query: this.return.query
				}
				this.$router.replace(route)
			}else{
				this.$router.replace({
					name: 'personal'
				})
			}
		},
		jumpDetail() {
			if(!this.rightInfo.SuitCopy){
				return
			}
			this.$router.push({
				name: "myBride",
				params: {
					id: this.rightInfo.Id,
					flowerId: this.currentTopLi,
					armId: this.currentDownLi,
					suitCopy: this.rightInfo.SuitCopy,
					proto: {
						// suitSize: currentTopObj.Rabbet,
						suitType: this.diamondArr.diamondStr,
						suitNum: this.diamondArr.diamondNum,
						suitWeight: this.diamondArr.diamondWeight
					}
				},
				query: this.$route.query
			});
		},
		jumpSelect() {
			this.$router.push({
				name: "myBrideDetail",
				params: {
					id: this.rightInfo.Id,
					flowerId: this.currentTopLi,
					armId: this.currentDownLi,
					proto: {
						// suitSize: this.currentTopObj.Rabbet,
						suitType: this.diamondArr.diamondStr,
						suitNum: this.diamondArr.diamondNum,
						suitWeight: this.diamondArr.diamondWeight
					}
				},
				query: this.$route.query
			});
		}
	},
	components: {
		"v-loading": loading,
		promptBox
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// 中间白条渐现
@keyframes fadeIn {
	0% {
		opacity: 0;
		/*初始状态 透明度为0*/
	}
	100% {
		opacity: 1;
		/*结尾状态 透明度为1*/
	}
}

@-webkit-keyframes fadeIn {
	0% {
		opacity: 0;
		/*初始状态 透明度为0*/
	}
	100% {
		opacity: 1;
		/*结尾状态 透明度为1*/
	}
}

// 中间台阶向外打开
@keyframes firstmove {
	from {
		transform: scale(0, 1);
	}
	to {
		transform: scale(1, 1);
	}
}

@-webkit-keyframes firstmove {
	from {
		transform: scale(0, 1);
	}
	to {
		transform: scale(1, 1);
	}
}

// 三角形向上运动
@keyframes triangleMove {
	from {
		bottom: -17rem;
	}
	to {
		bottom: -9rem;
	}
}

@-webkit-keyframes triangleMove {
	from {
		bottom: -17rem;
	}
	to {
		bottom: -9rem;
	}
}

@keyframes twotriangleMove {
	from {
		bottom: -19rem;
	}
	to {
		bottom: -11rem;
	}
}

@-webkit-keyframes twotriangleMove {
	from {
		bottom: -19rem;
	}
	to {
		bottom: -11rem;
	}
}

// 中间的灯光条往外运动
@keyframes stripemove {
	from {
		transform: (scale(0, 1));
	}
	to {
		transform: (scale(1, 1));
	}
}

@-webkit-keyframes stripemove {
	from {
		transform: (scale(0, 1));
	}
	to {
		transform: (scale(1, 1));
	}
}

@keyframes shade {
	0% {
		height: 100%;
	}
	100% {
		height: 0;
	}
}

@-webkit-keyframes shade {
	0% {
		height: 100%;
	}
	100% {
		height: 0;
	}
}

.back-header {
	background: #ffffff;
	width: 100%;
	height: 6.25rem;
	position: absolute;
	z-index: 9999;
	padding-top: 2.5rem;
	.header-container {
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

.round {
	transform: rotate(33deg);
}

.animate {
	background-image: url("bg.jpg");
	background-size: cover;
	width: 100%;
	.left {
		width: 29rem;
		height: 100%;
		margin-top: 56px;
		float: left;
		overflow: hidden;
	}
	.right {
		width: 29rem;
		height: 100%;
		margin-top: 56px;
		float: right;
		overflow: hidden;
		-webkit-transform: scaleX(-1);
		-moz-transform: scaleX(-1);
		-o-transform: scaleX(-1);
		transform: scaleX(-1);
	}
}

.imgArr {
	position: absolute;
	z-index: 2;
	left: 50%;
	top: 0;
	box-sizing: border-box;
	transform-origin: 6rem 75rem;
	opacity: 1;
	transition: all 0.5s; // animation: imgMove 0.2s ease;
	// animation-delay: 0.3s;
	// animation-fill-mode: backwards;
	.imgContainer {
		width: 100%;
		height: 100%;
		transition: all 0.5s;
		img {
			width: 12.5rem;
			height: 12.5rem;
			border-radius: 100%;
			opacity: 0.5;
			transform: scale(0.75);
			transition: all 0.5s;
			position: relative;
			display: block;
		}
		.imgName {
			color: #333;
			white-space: nowrap;
			position: absolute;
			bottom: -1.4rem;
			left: 0;
			right: 0;
			text-align: center;
			transition: all 0.5s;
			font-size: 1.5rem;
		}
		.rightImgName {
			transform: scaleX(-1);
		}
	}
}

.imgBox {
	position: relative;
	width: 100%;
	height: 100%;
}

.animate-wrap {
	border-radius: 100%;
	transition: all 0.5s;
	position: relative;
	margin-left: 15rem;
	box-sizing: border-box;
	transform: rotate(-90deg);
	z-index: 3;
}

.chooseImg {
	opacity: 1 !important;
}

.middle {
	width: 31.25rem;
	height: 31.25rem;
	margin: auto;
	position: fixed;
	top: -15rem;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 10;
	.middle-imgContainer {
		width: 31.25rem;
		height: 31.25rem;
		img {
			width: 100%;
			height: 100%;
			border-radius: 100%;
			border: 1px solid #e5e5e5;
			box-shadow: 0 2px 20px 0 rgba(255, 123, 123, 0.2);
			-webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(80%, transparent), to(rgba(250, 250, 250, 0.1)));
			animation: fadeIn 0.2s ease;
			animation-delay: 0.8s;
			animation-fill-mode: backwards;
		}
	}
	.middle-name {
		font-size: 2.25rem;
		color: #333;
		text-align: center;
		margin-top: 2.5rem;
	}
	.middle-price {
		font-size: 3rem;
		color: #ff7b7b;
		text-align: center;
		margin-top: 1.25rem;
		span {
			font-size: 2rem;
		}
	}
	.middle-rabbet,
	.middle-stone {
		color: #999;
		font-size: 1.5rem;
		text-align: left;
		overflow: hidden;
		span {
			margin-right: 0.8rem;
			float: left;
		}
		.middle-stone {
			margin-top: 1.25rem;
		}
	}
	.middle-rabbet {
		//   display: flex;
		// justify-content: center;
	}
	.watch-detail {
		width: 25rem;
		height: 5.5rem;
		background-image: linear-gradient(134deg, #ffbaba 0%, #f27474 100%);
		border-radius: 10px;
		text-align: center;
		line-height: 5.5rem;
		margin: 0 auto;
		margin-top: 2.5rem;
		color: #fff;
		animation: fadeIn 0.2s ease;
		animation-delay: 0.8s;
		animation-fill-mode: backwards;
		font-size: 1.5rem;
	}
}

.box-shade {
	width: 100%;
	height: 0;
	z-index: 4;
	position: absolute;
	top: 0;
	left: 0;
	background-image: url("bg.jpg");
	background-size: cover;
	animation: shade 0.4s ease;
	animation-delay: 0.3s;
	animation-fill-mode: backwards;
}

.middleBackground-stripe {
	width: 100%;
	height: 21rem;
	position: fixed;
	top: 41%;
	left: 0;
	background-color: #ff7b7b;
	opacity: 0.1;
	z-index: 0;
	animation: stripemove 0.2s ease;
	animation-delay: 0.6s;
	animation-fill-mode: backwards;
}

.middleBackground,
.middleBackground-one,
.middleBackground-two,
.middleBackground-three {
	position: fixed;
	height: 100%;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	background: #fff;
	box-shadow: 0 8px 20px 0 rgba(255, 123, 123, 0.2);
}

.middleBackground {
	width: 38.75rem;
	z-index: 4;
	animation: firstmove 0.4s ease;
	animation-delay: 0.1s;
	animation-fill-mode: backwards; // 0.5S展开中间
}

.middleBackground-one {
	width: 60.75rem;
	height: 100%;
	z-index: 4;
	animation: firstmove 0.3s ease;
	animation-delay: 0.3s;
	animation-fill-mode: backwards;
}

.middleBackground-two {
	width: 50.88rem;
	height: 100%;
	z-index: 5;
	animation: firstmove 0.2s ease;
	animation-delay: 0.3s;
	animation-fill-mode: backwards;
}

.middleBackground-three {
	width: 40rem;
	height: 100%;
	z-index: 6;
	animation: firstmove 0.1s ease;
	animation-delay: 0.2s;
	animation-fill-mode: backwards;
}

.middleBackground-triangle {
	position: fixed;
	margin: auto;
	bottom: -9rem;
	left: 0;
	right: 0;
	opacity: 0.1;
	z-index: 9;
	width: 13.53rem;
	height: 13.53rem;
	transform: rotate(-45deg);
	background: #ffffff;
	box-shadow: 4px 2px 10px 10px FFF;
	animation: triangleMove 0.2s ease;
	animation-delay: 0.5s;
	animation-fill-mode: backwards;
}

.middleBackground-twotriangle {
	position: fixed;
	margin: auto;
	bottom: -11rem;
	left: 0;
	right: 0;
	opacity: 0.1;
	z-index: 9;
	width: 13.53rem;
	height: 13.53rem;
	transform: rotate(-45deg);
	background: #ffffff;
	box-shadow: 4px 2px 10px 10px FFF;
	animation: twotriangleMove 0.2s ease;
	animation-delay: 0.5s;
	animation-fill-mode: backwards;
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
	html,
	body {
		font-size: 8px !important;
	}
	.animate-wrap {
		width: 72rem !important;
		height: 94rem !important;
	}
}

@media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (orientation: landscape) {
	html,
	body {
		font-size: 11px;
	}
	.animate-wrap {
		width: 68rem;
		height: 90rem;
	}
}
</style>
