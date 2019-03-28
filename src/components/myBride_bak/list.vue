<template>
	<div class="myBride">
		<div class="myBride-inner">
            <div class="left">
                <div class="left-wrap">
                    <div class="left-top">
                        <ul :style="{width: topUlWidth + 'px'}">
                            <li 
                            v-for="item in topList"
                            :key="item.Id"
                            :class="{active: currentTopLi == item.Id}"
                            >
                                <a class="img" @click="clickTopLi(item)">
                                    <img :src="item.MainImg.indexOf('http')>-1?item.MainImg:http.imgUrl+item.MainImg" :alt="item.FlowerName" v-if="item.MainImg">
                                    <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
                                    <p>{{item.FlowerName}}</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="left-bottom">
                        <ul :style="{width: downUlWidth + 'px'}">
                            <li 
                            v-for="item in downList"
                            :key="item.Id"
                            :class="{active: currentDownLi == item.Id}"
                            >
                                <a class="img" @click="clickDownLi(item)">
                                    <img :src="item.MainImg.indexOf('http')>-1?item.MainImg:http.imgUrl+item.MainImg" :alt="item.RingArmsName" v-if="item.MainImg">
                                    <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
                                    <p>{{item.RingArmsName}}</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="imgs">
                    <ul :style="{width: rightUlWidth + 'px'}">
                        <li 
                        v-for="item in rightInfo.ImagesList"
                        :key="item.Id"
                        :class="{active: currentRightLi == item.Id}"
                        >
                            <a class="img" @click="clickRightLi(item)">
                                <img :src="item.ImageCode.indexOf('http')>-1?item.ImageCode:http.imgUrl+item.ImageCode" :alt="rightInfo.GroupName" v-if="item.ImageCode">
                                <p>{{rightInfo.GroupName}}</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <a class="btn" @click="gotoDetail" v-if="rightInfo.Id">下一步</a>
            </div>
		</div>
	</div>
</template>

<script>

    import mybride1 from '../../assets/mybride-a.png'
    import mybride2 from '../../assets/mybride-b.png'

	export default {
		data() {
				return {
					isShow: this.$store.state.header.isShow = true, //显示头部
					title: this.$store.state.header.title = '我的新娘',
                    currentTopLi: '',
                    topList: [],
                    currentDownLi: '',
                    downList: [],
                    currentRightLi: '',
                    rightInfo: {
                        ImagesList: []
                    },
                    currentAttr: '',
                    currentAttrVal: {},
                    attrInfo: {},
                    attrList: [], //为方便操作，单独分出attrInfo里的属性列表
                    mybride1: mybride1
				}
			},
			created() {
                //this.getAllList();
                this.getFlower()
                this.getArm()
			},

			mounted() {

			},
			watch: {
                currentTopLi: function(val){
                    if(val && this.currentDownLi){
                        this.getGroupInfo();
                    }
                },
                currentDownLi: function(val){
                    if(val && this.currentTopLi){
                        this.getGroupInfo();
                    }
                },
            },
            computed: {
                topUlWidth: function() {
                    return this.topList.length * 215 + 50
                },
                downUlWidth: function() {
                    return this.downList.length * 215 + 50
                },
                rightUlWidth: function() {
                    if(this.rightInfo.ImagesList){
                        return this.rightInfo.ImagesList.length * 300 + 75 * 2
                    }else{
                        return 0;
                    }
                }
            },
			methods: {
                //获取花头列表
                getFlower(){
                    this.loading()
                    const options = {
						url:'/Purchase_Api_MyBride_GetFlowerList'
					};
					const cbok = res => {
                        this.topList = res.data.data.data_list || []
                        if(this.topList[0]){
                            this.currentTopLi = this.topList[0].Id
                            this.GetGroupInfo()
                        }
						this.closeLoad()
                    }
                    const cbno = res => {
                        this.closeLoad()
                    }
                    const cbnull = res => {
                        this.closeLoad()
                    }
                    
					this.http.get(options, cbok, cbno, cbnull)
                },
                //获取戒臂列表
                getArm(){
                    this.loading()
                    const options = {
						url:'/Purchase_Api_MyBride_GetRingArmsList'
					};
					const cbok = res => {
                        this.downList = res.data.data.data_list || []
                        if(this.downList[0]){
                            this.currentDownLi = this.downList[0].Id
                            this.GetGroupInfo()
                        }
						this.closeLoad()
                    }
                    const cbno = res => {
                        this.closeLoad()
                    }
                    const cbnull = res => {
                        this.closeLoad()
                    }
                    
					this.http.get(options, cbok, cbno, cbnull)
                },
                //组合图列表
                GetGroupInfo(){
                    if(!this.currentTopLi || !this.currentDownLi){
                        return
                    }
                    this.loading()
                    const options = {
						url:'/Purchase_Api_MyBride_GetGroupInfo',
						params:{
							flowerId: this.currentTopLi,
							ringArmsId: this.currentDownLi
						}
                    }
                    const cbok = res => {
                        this.rightInfo = res.data.data
                        if(this.rightInfo.ImagesList && this.rightInfo.ImagesList[0]){
                            this.currentRightLi = this.rightInfo.ImagesList[0].Id
                        }
                        //console.log(this.rightInfo)
						this.closeLoad()
                    }
                    const cbno = res => {
                        this.closeLoad()
                    }
                    const cbnull = res => {
                        this.closeLoad()
                    }
                    
					this.http.get(options, cbok, cbno, cbnull)
                },
                getAllList () {

                    //花头列表
                    /* for(let i = 0; i < 5; i++){
                        if(i == 0){
                            this.currentTopLi = 'a' + i;
                        }
                        this.topList.push({
                            Id: 'a' + i,
                            FlowerName: '花头效果图',
                            MainImg: mybride1,
                            AttrList: []
                        });
                    } */
                    //戒臂列表
                    /* for(let i = 0; i < 5; i++){
                        if(i == 0){
                            this.currentDownLi = 'a' + i;
                        }
                        this.downList.push({
                            Id: 'a' + i,
                            RingArmsName: '戒臂效果图',
                            MainImg: mybride1,
                            AttrList: []
                        });
                    } */

                    //组合图信息
                    this.rightInfo = {
                        Id: 'a',
                        GroupName: '组合效果图',
                        ImagesList: []
                    }
                    for(let i = 0; i < 5; i++){
                        if(i == 0){
                            this.currentRightLi = 'a' + i;
                        }
                        this.downList = list;
                    };
                    var cbno = res =>{
                        this.closeLoad();
                    };
                    var cbnull = res =>{
                        this.closeLoad();
                    };
                    this.http.get(options,cbok,cbno,cbnull);
                },
                getGroupInfo () {
                    this.loading()
                    var options = {
                        url:'/purchase_Api_MyBride_GetGroupInfo',
						params:{
							flowerId: this.currentTopLi,
                            ringArmsId: this.currentDownLi
						}
                    };
                    var cbok = res => {
                        this.closeLoad();
                        let result = res.data,
                            info = {};
                        if(result.data){
                            info = result.data;
                            if(info.ImagesList){
                                this.currentRightLi = info.ImagesList[0].Id;
                            }
                        }
                        this.rightInfo = info;
                    };
                    var cbno = res =>{
                        this.closeLoad();
                        this.rightInfo = {};
                    };
                    var cbnull = res =>{
                        this.closeLoad();
                        this.rightInfo = {};
                    };
                    this.http.get(options,cbok,cbno,cbnull);
                },



                clickTopLi (item) {
                    this.currentTopLi = item.Id;
                    this.GetGroupInfo()
                },
                clickDownLi (item) {
                    this.currentDownLi = item.Id;
                    this.GetGroupInfo()
                },
                clickRightLi (item) {
                    this.currentRightLi = item.Id;
                },
                clickAttr (item) {
                    this.currentAttr = item;
                },
                clickAttrVal (item, item2) {
                    this.currentAttr = '';
                    this.currentAttrVal[item.Id] = item2;
                },

                gotoDetail () {
                    this.$router.push({
                        name: 'myBrideDetail',
                        params: {id: this.rightInfo.Id}
                    });
                },


			}

	}
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';
	#app {
		width: 100%;
		height: 100%;
	}
    .myBride{
        position: absolute;
        top: 57px;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
    }
    .myBride-inner{
        display: flex;
        position: absolute;
        top: 0;
        width: 100%;
        bottom: 0;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        padding-bottom: 0;
        &.attribute{
            flex-direction: column;
        }
        .btn{
            position: absolute;
            bottom: 4em;
            left: 50%;
            padding: .7em 5em;
            border-radius: 1em;
            transform: translate(-50%,0);
            background: #C1996A;
            color: #fff;
        }
        .left{
            flex: 1;
            width: 50%;
            .left-wrap{
                display: flex;
                height: 100%;
                flex-direction: column;
            }
        }
        .left-top{
            border-bottom: 1px solid #E5E5E5;
        }
        .left-top,
        .left-bottom,
        .right{
            flex: 1;
            overflow-y: hidden;
            overflow-x: scroll;
            ul{
                position: relative;
                margin: auto;
                padding: 0 25px;
                height: 100%;
                text-align: center;
                &:before{
                    content: '';
                    display: inline-block;
                    height: 100%;
                    vertical-align: middle;
                }
                li{
                    display: inline-block;
                    vertical-align: middle;
                    opacity: .5;
                    transform: scale(.7);
                    transition: opacity,transform .5s;
                    margin: 0 -10px;
                    &.active{
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            }
            .img{
                display: block;
                img{
                    width: 215px;
                }
                p{
                    display: none;
                    text-align: center;
                }
            }

        }
        .right{
            position: relative;
            border-left: 1px solid #E5E5E5;
            div.imgs{
                height: calc(100% - 7em);
                overflow-y: hidden;
                overflow-x: scroll;
                ul{
                    margin: auto;
                    padding: 0 75px;
                }
                .img{
                    img{
                        width: 300px;
                    }
                    p{
                        display: none;
                        text-align: center;
                    }
                }
            }
        }
        .attrMain{
            div.imgs{
                height: 355px;
            }
            .price{
                text-align: center;
                .num{
                    color: #C1996A;
                    font-size: 1.5em;
                }
                .tip{
                    font-size: .8em;
                    color: #999;
                }
            }
        }
        .attrList{
            height: 35%;
            .wrap{
                position: relative;
                margin: auto;
                width: calc(100% - 5em);
                height: calc(100% - 3em);
                border: 1px solid #E5E5E5;
                border-radius: 10px;
                box-shadow: 0 10px 26px #eee;
                .attrs{
                    padding: .7em;
                }
                ul{
                    text-align: center;
                    &>li{
                        position: relative;
                        display: inline-block;
                        padding: 0 2em;
                    }
                }
                .value{
                    display: block;
                    color: #C1996A;
                    font-size: 1.5em;
                    line-height: 2em;
                    text-align: center;
                }
                .name{
                    display: block;
                    font-size: .8em;
                }
                .valueList{
                    position: absolute;
                    left: 50%;
                    bottom: 5em;
                    border: 1px solid #E5E5E5;
                    border-radius: 8px;
                    box-shadow: 0 10px 26px #ddd;
                    display: none;
                    transform: translateX(-50%);
                    &.active{
                        display: block;
                    }
                    .arrow{
                        position: absolute;
                        left: 50%;
                        bottom: -1em;
                        margin-left: -1em;
                        width: 2em;
                        height: 2em;
                        border: 1px solid #E5E5E5;
                        background: #fff;
                        z-index: 1;
                        transform: rotate(45deg);
                    }
                    .valueInner{
                        display: table;
                        position: relative;
                        padding: 1em .5em;
                        border-radius: 8px;
                        background: #fff;
                        z-index: 2;
                        li{
                            display: table-cell;
                            &.active{
                                span{
                                    color: #C1996A;
                                    border-bottom: 1px solid #C1996A;
                                }
                            }
                        }
                        span{
                            display: inline-block;
                            margin: 0 .5em;
                            padding: 0.2em 0.2em;
                            font-size: 1.2em;
                            border-bottom: 1px solid #999;
                        }
                    }
                }
                .btn{
                    bottom: 1em;
                }
            }
        }
    }


</style>