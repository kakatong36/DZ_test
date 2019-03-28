<template>
    <div class="content-top">
        <v-nodata v-show='isnodata'></v-nodata>
        <div class="user-center" v-if="orderNo">
            <div class="table-order">
                <div class="thead table-box">
                    <div class="cell thead-l">
                        <span>订单时间：{{order.CreateTime && order.CreateTime.replace('T','')}}</span>
                        <span>订单号：<span class="color-back">{{order.SalesOrderNo}}</span></span>
                        <span>交货日期：{{order.DeliveryDate && order.DeliveryDate.substr(0,10)}}</span>
                    </div>
                    <span class="cell thead-r">时尚定制</span>
                </div>
                <table class="t-body">
                    <tr>
                        <td class="table-box" v-for="(detail, detailIndex) in order.DetailsList" :key="detailIndex">
                            <div class="t-list-wrap">
                                <div class="t-list">
                                    <div class="t-img cell"><router-link :to="'/fashion/styleDetails/'+detail.StyleId+'/'+detail.SkuId"><img :src="http.imgUrl+detail.ProductImg" v-if="detail.ProductImg"/><img src="../../assets/ps_17101611163885870100.jpg" v-else/></router-link></div>
                                    <div class="t-text cell">
                                        <h2 class="t-h2"><router-link :to="'/fashion/styleDetails/'+detail.StyleId+'/'+detail.SkuId">{{detail.ProductName}}</router-link></h2>
                                        <div class="t-arrt">
                                            <ul class="list-box">
                                                <li class="list" v-for="(skuItem, skuIndex) in detail.SkuAttrList" :key="skuIndex">{{skuItem.DictionaryName}}：{{skuItem.DictionaryValueName}}&nbsp;&nbsp;</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="t-list" v-for="(stoneItem,stoneIndex) in detail.Stones" :key="stoneIndex">
                                    <div class="t-img cell"><router-link :to="'/fashion/stone/'+stoneItem.Weight+'/'+stoneItem.Shape+'/'+stoneItem.Color+'/'+stoneItem.Cleanliness"><img src="../../common/images/stone/zuan.png" /></router-link></div>
                                    <div class="t-text cell">
                                        <h2 class="t-h2"><router-link :to="'/fashion/stone/'+stoneItem.Weight+'/'+stoneItem.Shape+'/'+stoneItem.Color+'/'+stoneItem.Cleanliness">配石</router-link></h2>
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
