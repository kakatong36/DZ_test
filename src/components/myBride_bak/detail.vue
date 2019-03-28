<template>
	<div class="myBride">
		<div class="myBride-inner attribute">
            <div class="right attrMain">
                <div class="imgs">
                    <ul :style="{width: rightUlWidth + 'px',margin: '0 auto'}">
                        <li 
                        v-for="(item, index) in rightInfo.ImagesList"
                        :key="item.Id"
                        :class="{active: currentRightLi == index}"
                        >
                            <a class="img" @click="clickRightLi(item, index)">
                                <img :src="item.ImageCode.indexOf('http')>-1?item.ImageCode:http.imgUrl+item.ImageCode" :alt="rightInfo.GroupName" v-if="item.ImageCode">
                                <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
                                <p>{{rightInfo.GroupName}}</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="price">
                    <p class="num">￥{{stonePrice+goldPrice}}</p>
                    <p class="tip" style="display: none">*此价格为预估售价</p>
                </div>
            </div>
            <div class="attrList">
                <div class="wrap">
                    <div class="attrs">
                        <ul>
                            <li
                            v-for="item in attrList"
                            :key="item.Id"
                            >
                                <span class="value" @click="clickAttr(item)">{{currentAttrVal[item.AttrId].AttrValueName}}</span>
                                <span class="name" @click="clickAttr(item)">{{item.AttrName}}</span>
                                <div class="valueList" :class="{active:currentAttr == item}">
                                    <div class="arrow"></div>
                                    <ol class="valueInner">
                                        <li
                                        v-for="item2 in item.AttrValueList"
                                        :key="item2.Id"
                                        :class="{active:currentAttrVal[item.AttrId] == item2}"
                                         @click.stop="clickAttrVal(item,item2)"
                                        ><span>{{item2.AttrValueName}}</span></li>
                                    </ol>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <a class="btn" @click="gotoOrder">定制</a>
                </div>
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
                    stonePrice: 0,
                    goldPrice: 0,
                    currentRightLi: '',
                    rightInfo: {
                        ImagesList: []
                    },
                    Fineness: '',
                    currentAttr: '',
                    currentAttrVal: {},
                    attrInfo: {
                        attrList: []
                    },
                    MainImg: '',

                    attrList: [],

                    groupId: '',
                    groupName: ''
				}
			},
			created() {
                let id = this.$route.params.id
                if(id){
                    this.getImg(id)
                    this.getAttr(id)
                }
			},

			mounted() {

			},
			watch: {
                currentAttrVal: function() {

                }
            },
            computed: {
                rightUlWidth: function() {
                    return this.rightInfo.ImagesList.length * 300 + 75 * 2
                }
            },
			methods: {
                getAttr(id){
                    this.loading();
					const options = {
						url:'/Purchase_Api_MyBride_AttrList',
                        params: {groupId: id}
					};
					const cbok = res => {
                        this.attrInfo = res.data.data || this.attrInfo
                        if(this.attrInfo.AttrList.length){
                            this.attrList = this.attrInfo.AttrList;
                        }
                        if(this.attrList.length){
                            this.attrList.forEach(item => {
                                if(item.AttrValueList && item.AttrValueList.length){
                                    this.$set(this.currentAttrVal, item.AttrId, item.AttrValueList[0]);
                                }else{
                                    this.$set(this.currentAttrVal, item.AttrId, {})
                                }
                            })
                            this.getGoldPrice()
                            this.getStonePrice()
                        }
						this.closeLoad()
                    }
                    const cbno = res => {
                        this.closeLoad()
                    }
                    const cbnull = res => {
                        this.closeLoad()
                    }
					this.http.get(options,cbok, cbno, cbnull)
                },
                getImg(id){
                    this.loading();
                    const options = {
                        url:'/Purchase_Api_MyBride_GetById',
                        params: {
                            groupId: this.$route.params.id,
                        }
                    };
                    const cbok = res => {
                        this.rightInfo = res.data.data
                        this.groupId = this.rightInfo.Id
                        this.groupName = this.rightInfo.GroupName
                        this.currentRightLi = 0
                        if(this.rightInfo.ImagesList && this.rightInfo.ImagesList[0]){
                            this.rightInfo.ImagesList.some((item,index) => {
                                if(item.IsMain){
                                    this.currentRightLi = index
                                    this.MainImg = item.ImageCode
                                }
                                return item.IsMain;
                            })
                        }
						this.closeLoad()
                    }
                    const cbno = res => {
                        this.closeLoad()
                    }
                    const cbnull = res => {
                        this.closeLoad()
                    }
                    this.http.get(options,cbok, cbno, cbnull)
                },
                getGoldPrice(){
                    let list = {}
                    this.attrList.forEach(item => {
                        let key = ''
                        switch(item.AttrName){
                            case '金重范围':
                                key = 'goldWeight'
                                break
                            case '成色':
                                key = 'fineness'
                                break
                        }
                        if(key){
                            list[key] = this.currentAttrVal[item.AttrId].AttrValueName
                        }
                    })

                    list.groupId = this.$route.params.id
                    this.loading()
                    let arrGoldWeight = [];
                    if(list.goldWeight){
                        arrGoldWeight = list.goldWeight.split('-');
                    }
					const options = {
						url:'/Purchase_Api_MyBride_GetPrice',
						params:{
							 groupId: list.groupId,
							 fineness: list.fineness,
							 goldWeight: arrGoldWeight[arrGoldWeight.length-1]
						}
					};
					const cbok = res => {
						this.goldPrice = res.data.data;
						this.closeLoad()
                    }
                    const cbno = res =>{
						this.closeLoad();
					}
					this.http.get(options, cbok, cbno)
                },
                getStonePrice(){
                    let list = [{}]
                    this.attrList.forEach(item => {
                        let key = ''
                        switch(item.AttrName){
                            case '形状':
                                key = 'Shape'
                                break
                            case '颜色':
                                key = 'Color'
                                break
                            case '净度':
                                key = 'Cleanliness'
                                break
                            case '镶口':
                                key = 'Weight'
                                break
                        }
                        if(key){
                            list[0][key] = this.currentAttrVal[item.AttrId].AttrValueName
                        }
                    })
                    list[0].Count = 1
                    this.loading()
					const options = {
                        url:'/Purchase_Api_PriceHelper_GetStonePrice',
                        params: {
                            list: list
                        }
					}
					const cbok = res => {
                        this.stonePrice = res.data.data
						this.closeLoad();
					}
					const cbno = res =>{
						this.closeLoad();
					}
					this.http.post(options,cbok,cbno)
                },
                clickTopLi (item) {
                    this.currentTopLi = item.Id;
                },
                clickDownLi (item) {
                    this.currentDownLi = item.Id;
                },

                clickRightLi (item, index) {
                    this.currentRightLi = index;
                },
                clickAttr (item) {
                    this.currentAttr = item;
                },
                clickAttrVal (item, item2) {
                    this.currentAttr = '';
                    this.currentAttrVal[item.AttrId] = item2;
                    this.getStonePrice()
                    this.getGoldPrice()
                },

                gotoOrder () {
                    let list = []
                    this.attrList.forEach(item => {
                        for(let key in this.currentAttrVal){
                            if(item.AttrId == key){
                                this.$set(this.currentAttrVal[key], 'AttrGroupId', item.AttrGroupId)
                                this.$set(this.currentAttrVal[key], 'AttrId', item.AttrId)
                                this.$set(this.currentAttrVal[key], 'AttrValueId', this.currentAttrVal[key].AttrValueId)
                                this.$set(this.currentAttrVal[key], 'AttrGroupName', item.AttrGroupName)
                                this.$set(this.currentAttrVal[key], 'DictionaryId', item.DictionaryId)
                                list.push(this.currentAttrVal[key])
                                if(item.AttrName == '成色'){
                                    this.Fineness = this.currentAttrVal[key].AttrValueName
                                }
                            }
                        }
                    })

                    let detailsList = [
                        {
                            GroupId: this.groupId,
                            GroupName: this.groupName,
                            Lettering: '',
                            Typeface: '',
                            GoldPrice: this.goldPrice,
                            StonePrice: this.stonePrice,
                            TotalPrice: this.goldPrice + this.stonePrice,
                            Fineness: this.Fineness,
                            ImgUrl: '',
                            Name: '',
                            AttrList: list
                        }
                    ]

                    this.$router.push({
                        name: 'myBrideOrder',
                        params: {
                            detailsList:detailsList,
                            MainImg:this.MainImg
                        }
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
        .left-top,
        .left-bottom,
        .right{
            flex: 1;
            overflow-y: hidden;
            overflow-x: scroll;
            ul{
                position: relative;
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
                            white-space: nowrap;
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