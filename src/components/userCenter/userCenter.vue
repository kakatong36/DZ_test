<template>
    <div class="content-top" @scroll="handleScroll">
        <v-nodata v-show='isnodata'></v-nodata>
        <div class="user-center" v-if="orderList.length">
            <div class="table-order" v-for="item in orderList" :key="item.Id" :class="{'fashion-list':item.CustomizeType==0}">
                <div class="thead table-box">
                    <div class="cell thead-l">
                        <span>订单时间：{{item.CreateTime && item.CreateTime.replace('T',' ')}}</span>
                        <span>订单号：<span class="color-back" style="margin-right: 0;">{{item.SalesOrderNo}}</span></span>
                        <span>交货日期：{{item.DeliveryDate && item.DeliveryDate.substr(0,10)}}</span>
                    </div>
                    <span class="cell thead-r">{{item.CustomizeTypeName}}</span>
                </div>
                <table class="t-body">
                    <tr>
                        <td class="table-box">
                            <div class="t-list-wrap"  v-for="(detail, detailIndex) in item.DetailsList" :key="detailIndex">
                                <div class="t-list">
                                    <div class="t-img cell" v-if="item.CustomizeType<2">
                                        <router-link v-if="detail.styleUrl" :to="detail.styleUrl"><img :src="detail.ProductImg.indexOf('http')>-1?detail.ProductImg:http.imgUrl+detail.ProductImg" v-if="detail.ProductImg" /></router-link>
                                        <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
                                    </div>
                                    <div class="t-img cell" v-if="item.CustomizeType==3 || item.CustomizeType==2">
                                        <router-link v-if="detail.styleUrl" :to="detail.styleUrl">
                                            <img :src="detail.ProductImg.indexOf('http')>-1?detail.ProductImg:http.imgUrl+detail.ProductImg" v-if="detail.ProductImg"/>
                                            <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
                                        </router-link>
                                        <div v-else>
                                            <img :src="detail.ProductImg.indexOf('http')>-1?detail.ProductImg:http.imgUrl+detail.ProductImg" v-if="detail.ProductImg"/>
                                            <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
                                        </div>
                                    </div>
                                    <div class="t-img cell" v-if="item.CustomizeType>3">
                                        <img :src="detail.ProductImg.indexOf('http')>-1?detail.ProductImg:http.imgUrl+detail.ProductImg" v-if="detail.ProductImg"/>
                                        <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
                                    </div>
                                    <div class="t-text cell">
                                        <h2 class="t-h2">
                                            <router-link v-if="detail.styleUrl" :to="detail.styleUrl">{{detail.ProductName}}</router-link>
                                            <a v-else href="javascript:;">{{detail.ProductName || '款式'}}</a>
                                        </h2>
                                        <div class="t-arrt">
                                            <ul class="list-box">
                                                <li class="list" v-for="(skuItem, skuIndex) in detail.SkuAttrList || detail.AttrList" :key="skuIndex">{{skuItem.DictionaryName}}：{{skuItem.DictionaryValueName}}&nbsp;&nbsp;</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="t-list" v-for="(stoneItem,stoneIndex) in detail.Stones" :key="stoneIndex">
                                    <div class="t-img cell">
                                        <router-link v-if="stoneItem.stoneUrl" :to="stoneItem.stoneUrl"><img src="../../common/images/stone/zuan.png" /></router-link>
                                        <img src="../../common/images/stone/zuan.png" v-else/>
                                    </div>
                                    <div class="t-text cell">
                                        <h2 class="t-h2">
                                            <router-link v-if="stoneItem.stoneUrl" :to="stoneItem.stoneUrl">配石</router-link>
                                            <a v-else href="javascript:;">配石</a>
                                        </h2>
                                        <div class="t-arrt">
                                            <ul class="list-box" >
                                                <li class="list">形状：{{stoneItem.Shape}}&nbsp;&nbsp;</li>
                                                <li class="list">颜色：{{stoneItem.Color}}&nbsp;&nbsp;</li>
                                                <li class="list">净度：{{stoneItem.Cleanliness}}&nbsp;&nbsp;</li>
                                                <li class="list">重量：{{stoneItem.Weight}}&nbsp;&nbsp;</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="t-name">订货人：<span class="color-back">{{item.Consignee}}</span></td>
                        <td class="t-price">总金额：<span class="color-back">{{item.OrderAmount}}元</span></td>
                        <td class="t-state">
                            <p>状态：<span class="state">{{item.CustomizeStatusName}}</span></p>
                            <router-link v-if="item.detailUrl" :to="item.detailUrl" class="order-details">查看订单详情</router-link>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import nodata from 'components/nodata/nodata'
    export default {
        data () {
            return {
                orderPage: {
                    page: 1,
                    page_count: 0,
                    page_size: 15,
                    total_count: 0
                },
                orderList: [],
                isnodata: false,
                isShow: this.$store.state.header.isShow = true,
                title: this.$store.state.header.title = '订单列表',
            }
        },
        components: {
            'v-nodata':nodata
        },
        created(){
            this.getList()
        },
        methods: {
            handleScroll(event){
                let {scrollHeight, scrollTop, clientHeight} = event.target
                if(scrollTop + clientHeight == scrollHeight && this.orderPage.page<this.orderPage.page_count){
                    this.orderPage.page++
                    this.getList()
                }
            },
            getList(){
                this.loading()
                var options = {
                    url:'/order_Api_CustomizeOrder_GetCustomizeOrderList',
                    params: {
                        pageIndex: this.orderPage.page,
                        pageSize: this.orderPage.page_size
                    }
    		    };
                var cbok = res => {
                    let list = res.data.data.data_list || [];
                    this.orderList = [...this.orderList, ...list]
                    this.orderList.forEach(item => {
                        if(item.DetailsList && item.DetailsList.length>0){
                            let styleUrl = ''
                            item.DetailsList.forEach(detail => {
                                if(item.CustomizeType == 0){//时尚定制
                                    styleUrl = '/fashion/styleDetails/'+detail.StyleId+'/'+detail.SkuId
                                    if(detail.Stones && detail.Stones.length>0){
                                        detail.Stones.forEach(stoneItem => {
                                            let stoneUrl = '/fashion/stone/'+stoneItem.Weight+'/'+stoneItem.Shape+'/'+stoneItem.Color+'/'+stoneItem.Cleanliness
                                            this.$set(stoneItem, 'stoneUrl', stoneUrl)
                                        })
                                    }
                                }else if(item.CustomizeType == 1){//真爱指环
                                    let attrName = '0'
                                    if(detail.SkuAttrList && detail.SkuAttrList.length){
                                        detail.SkuAttrList.forEach(attr => {
                                            if(attr.DictionaryName == '成色'){
                                                attrName = attr.DictionaryValueName
                                            }
                                        })
                                    }
                                    styleUrl = 'love/loveDetails/'+detail.StyleId + '/' + attrName
                                }else if(item.CustomizeType == 2){//守护甜心
                                    if(detail.ImgList && detail.ImgList.length){
                                        detail.ImgList.sort((a,b) => {
                                            return a.Type - b.Type
                                        })
                                        if(detail.ImgList[0].ImgUrl.indexOf('http')>-1){
                                            this.$set(detail, 'brideImg', detail.ImgList[0].ImgUrl)
                                        }else{
                                            this.$set(detail, 'brideImg', this.http.imgUrl+detail.ImgList[0].ImgUrl)
                                        }
                                    }
                                    if(detail.StyleId){
                                        styleUrl = 'hoeny/honeyDetails/' + detail.StyleId
                                    }
                                }else if(item.CustomizeType == 4){//来图定制
                                    if(detail.ImgList && detail.ImgList.length>0){
                                        detail.ImgList.sort((a,b) => {
                                            return a.Type - b.Type
                                        })
                                        if(detail.ImgList[0].ImgUrl.indexOf('http')>-1){
                                            this.$set(detail, 'picMainImg', detail.ImgList[0].ImgUrl)
                                        }else{
                                            this.$set(detail, 'picMainImg', this.http.imgUrl+detail.ImgList[0].ImgUrl)
                                        }
                                    }
                                }else if(item.CustomizeType == 3){//我的新娘
                                    if(detail.ImgList && detail.ImgList.length>0){
                                        if(detail.ImgList[0].ImgUrl.indexOf('http')>-1){
                                            this.$set(detail, 'brideImg', detail.ImgList[0].ImgUrl)
                                        }
                                    }
                                    if(detail.SkuAttrList && detail.SkuAttrList.length>0){
                                        detail.SkuAttrList = null
                                    }
                                    styleUrl = 'myBride/detail/' + detail.StyleId
                                }
                                this.$set(detail, 'styleUrl', styleUrl)
                            })
                        }
                        let detailUrl = ''
                        if(item.CustomizeType == 0){
                            detailUrl = '/userCenter/orderDetails/' + item.SalesOrderNo
                        }else if(item.CustomizeType == 1 || item.CustomizeType == 2){
                            detailUrl = '/userCenter/orderDetails/personal/' + item.SalesOrderNo
                        }else if(item.CustomizeType == 4){
                            detailUrl = '/userCenter/orderDetails/pic/' + item.SalesOrderNo
                        }else if(item.CustomizeType == 3){
                            detailUrl = '/userCenter/brideDetail/' + item.SalesOrderNo
                        }
                        this.$set(item, 'detailUrl', detailUrl)
                    })
                    this.isnodata = false;
                    this.closeLoad();
                    this.orderPage.total_count = res.data.data.total_count
                    this.orderPage.page_count = res.data.data.page_count
                };
    		
                var cbno = res =>{
                    this.closeLoad();
                    this.isnodata = true
                };

                var cbnull = res =>{
                    this.isnodata = true;
                    this.closeLoad();
                };
    		    this.http.get(options,cbok,cbno,cbnull);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../common/scss/mixin.scss';

    .user-center{
        margin: 20px 20px 0;
        border: 1px solid #e5e5e5;
        border-bottom: 0;
    }
    .user-center .t-list{
        padding: 14px 12px;
    }
    .user-center .t-list-wrap{
        border-bottom: 1px solid #e5e5e5;
    }
    .user-center .t-list-wrap:last-child{
        border-bottom:0;
    }
    .user-center .t-list:last-child{
        border-bottom:0;
    }
    .table-order{
        margin-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
    }
    .t-img{
        width: 80px;
        height: 80px;
        line-height: 80px;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        img{
            width: 100%;
            vertical-align: middle;
        }
    }
    .t-text{
        padding-left: 14px;
        vertical-align: top;
        .t-h2{
            font-size: 16px;
        }
        .t-arrt{
            color: #999;
        }
    }
    .thead{
        height: 30px;
        line-height: 30px;
        background: #f5f5f5;
        padding: 0 14px;
        color: #999;
        .thead-l span{
            margin-right: 50px;
        }
        .thead-r{
            color: #333;
            text-align: right;
            font-weight: bold;
        }
    }
    .user-center .color-back{
        color: #333;
    }
    .t-name,.t-price,.t-state{
        width: 200px;
        color: #999;
    }
    .t-state{
        p{
            margin-bottom: 14px;
        }
        .state{
            color: #333;
            font-weight: bold;
        }
        .order-details{
            color: #4990E2;
        }
    }
    .t-body td{
        border-right: 1px solid #e5e5e5;
        &:last-child{
             border-right: 0;
         }
    }
    .content, .content-top{
        overflow: scroll;
    }
</style>
