<template>
    <div class="content-top picDetail">
        <v-nodata v-show='isnodata'></v-nodata>
        <div class="user-center" v-if="orderNo">
            <div class="table-order">
                <div class="thead table-box">
                    <div class="cell thead-l">
                        <span>订单时间：{{order.CreateTime && order.CreateTime.replace('T','')}}</span>
                        <span>订单号：<span class="color-back">{{order.SalesOrderNo}}</span></span>
                        <span>交货日期：{{order.DeliveryDate && order.DeliveryDate.substr(0,10)}}</span>
                    </div>
                    <span class="cell thead-r">来图定制</span>
                </div>
                <table class="t-body">
                    <tr>
                        <td colspan="4" class="detail-title-td">图片信息</td>
                    </tr>
                    <tr>
                        <td colspan="4" class="detail-img-td">
                            <div class="imgWrap" v-for="(img, imgIndex) in imgList" :key="imgIndex">
                                <p>{{img.typeName}}</p>
                                <div class="imgBox">
                                    <img :src="img.ImgUrl" v-if="img.ImgUrl"/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" class="detail-title-td">款式配石信息</td>
                    </tr>
                    <tr>
                        <td class="table-box" v-for="(detail, detailIndex) in order.DetailsList" :key="detailIndex">
                            <div class="t-list-wrap">
                                <div class="t-list">
                                    <div class="t-img cell"><img :src="http.imgUrl+detail.ProductImg" v-if="detail.ProductImg"/></div>
                                    <div class="t-text cell">
                                        <h2 class="t-h2">款式</h2>
                                        <div class="t-arrt">
                                            <ul class="list-box">
                                                <li class="list" v-for="(skuItem, skuIndex) in detail.AttrList" :key="skuIndex">{{skuItem.DictionaryName}}：{{skuItem.DictionaryValueName}}&nbsp;&nbsp;</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="t-list" v-for="(stoneItem,stoneIndex) in detail.Stones" :key="stoneIndex">
                                    <div class="t-img cell"><router-link :to="'/fashion/stone/'+stoneItem.Weight+'/'+stoneItem.Shape+'/'+stoneItem.Color+'/'+stoneItem.Cleanliness"><img src="../../common/images/stone/zuan.png" /></router-link></div>
                                    <div class="t-text cell">
                                        <h2 class="t-h2">配石</h2>
                                        <div class="t-arrt">
                                            <ul class="list-box">
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
                        <td class="t-name">订货人：<span class="color-back">{{order.Consignee}}</span></td>
                        <td class="t-price">总金额：<span class="color-back">{{order.OrderAmount}}元</span></td>
                        <td class="t-state">
                            <p>状态：<span class="state">{{order.CustomizeStatusName}}</span></p>
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
                orderNo: '',
                order: {},
                isnodata: false,
                isShow: this.$store.state.header.isShow = true,
                title: this.$store.state.header.title = '订单详情',
                imgList: []
            }
        },
        components: {
            'v-nodata':nodata
        },
        created(){
            this.orderNo = this.$route.params.orderNo
            if(this.orderNo){
                this.getDetail()
            }
        },
        methods: {
            getDetail(){
                this.loading()
                var options = {
                    url:'/order_Api_CustomizeOrder_GetCustomizeOrderByOrderNo',
                    params: {orderNo: this.orderNo}
    		    };
                var cbok = res => {
                    this.order = res.data.data;
                    if(this.order.DetailsList && this.order.DetailsList.length>0){
                        this.order.DetailsList.forEach(detail => {
                            if(detail.ImgList && detail.ImgList.length>0){
                                detail.ImgList.sort((a,b) => {
                                    return a.Type - b.Type
                                })
                                detail.ImgList.forEach(img => {
                                    let type = ''
                                    switch(img.Type){
                                        case 1:
                                            type = '主视图'
                                            break
                                        case 2:
                                            type = '侧视图'
                                            break
                                        case 3:
                                            type = '俯视图'
                                            break
                                        case 4:
                                            type = '细节图'
                                            break
                                        default:
                                            type = '细节图'
                                    }
                                    this.$set(img, 'typeName', type)
                                    if(img.ImgUrl.indexOf('http')<0){
                                        img.ImgUrl = this.http.imgUrl + img.ImgUrl
                                    }
                                })
                                this.imgList = detail.ImgList
                            }
                        })
                    }
                    this.isnodata = false;
                    this.closeLoad();
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

<style lang="scss">
    @import '../../common/scss/mixin.scss';
    .picDetail{
        .detail-img-td{
            text-align: left;
        }
        .imgWrap{
            display:inline-block;
            width:100px;
            padding: 10px;
            overflow:hidden;   
            p{
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                text-align: center;
            }   
        }
        .imgBox{
            width: 80px;
            height: 80px;
            line-height: 80px;
            img{
                width: 100%;
                vertical-align: middle;
            }
        }
        .detail-title-td{
            line-height: 36px;
            text-align: left;
            text-indent: 1em;
            border-bottom: 1px solid #e5e5e5;
            border-top: 1px solid #e5e5e5;
            color: #666;
        }
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
    }
    
    .content, .content-top{
        overflow: scroll;
    }
</style>
