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
                    <span class="cell thead-r">我的新娘</span>
                </div>
                <table class="t-body">
                    <tr>
                        <td class="table-box" v-for="(detail, detailIndex) in order.DetailsList" :key="detailIndex">
                            <div class="t-list-wrap">
                                <div class="t-list">
                                    <div class="t-img cell">
                                        <router-link :to="'/myBride/detail/'+detail.StyleId">
                                            <img :src="detail.ProductImg.indexOf('http')>-1?detail.ProductImg:http.imgUrl+detail.ProductImg" v-if="detail.ProductImg"/>
                                            <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
                                        </router-link>
                                    </div>
                                    <div class="t-text cell">
                                        <h2 class="t-h2"><router-link :to="'/myBride/detail/'+detail.StyleId">{{detail.ProductName}}</router-link></h2>
                                        <div class="t-arrt">
                                            <ul class="list-box">
                                                <li class="list" v-for="(skuItem, skuIndex) in detail.AttrList" :key="skuIndex">{{skuItem.DictionaryName}}：{{skuItem.DictionaryValueName}}&nbsp;&nbsp;</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="t-name" v-for="(detail, detailIndex) in order.DetailsList" :key="detailIndex">
                            <p>
                                姓名：{{detail.info.Name}}&nbsp;&nbsp;手寸：{{detail.info.Specification}}
                            </p>
                            <p>
                                刻字：{{detail.info.Lettering}}&nbsp;&nbsp;字体：{{detail.info.Typeface}}
                            </p>
                        </td>
                        <td class="t-price">
                            <p>
                                订货人：<span class="color-back">{{order.Consignee}}</span>
                            </p>
                            <p>
                                总金额：<span class="color-back">{{order.OrderAmount}}元</span>
                            </p>
                        </td>
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
            // window.vm = this;
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
                                if(detail.ImgList[0].ImgUrl.indexOf('http')>-1){
                                    this.$set(detail, 'brideImg', detail.ImgList[0].ImgUrl)
                                }
                            }
                            let info = {
                                Name: detail.Name,
                                Lettering: detail.Lettering,
                                Typeface: detail.Typeface,
                                Specification: detail.Specification
                            }
                            this.$set(detail, 'info', info)
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
