import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
	hashbang: false,
	transitionOnLoad: true,
	routes: [
		{
			path: '/',
			name: 'home',
			component: function (resolve) {
				require(['components/guide'], resolve);
			}
		},

		{
			path: '/login',
			name: 'login',
			component: function (resolve) {
				require(['components/login/login'], resolve);
			}
		},
		{
			path: '/plans',
			name: 'plans',
			component: function (resolve) {
				require(['components/plans/plans'], resolve);
			}
		},
		{
			path: '/fashion',
			name: 'fashion',
			component: function (resolve) {
				require(['components/fashion/fashion'], resolve);
			}
		},
		{
			path: '/fashion/stone/:id/:shape/:color/:cleanliness',
			name: 'stone',
			component: function (resolve) {
				require(['components/stone/stone'], resolve);
			}
		},
		{
			path: '/fashion/style',
			name: 'style',
			component: function (resolve) {
				require(['components/style/style'], resolve);
			}
		},
		{
			path: '/fashion/styleDetails/:id/:skuId',
			name: 'styleDetails',
			component: function (resolve) {
				require(['components/styleDetails/styleDetails'], resolve);
			}
		},
		{
			path: '/fashion/fashionStatements',
			name: 'fashionStatements',
			component: function (resolve) {
				require(['components/fashionStatements/fashionStatements'], resolve);
			}
		},
		{
			path: '/individuality',
			name: 'individuality',
			component: function (resolve) {
				require(['components/individuality/individuality'], resolve);
			}
		},
		{
			path: '/love/loveDetails/:id/:condition',
			name: 'loveDetails',
			component: function (resolve) {
				require(['components/loveDetails/loveDetails'], resolve);
			}
		},
		{
			path: '/individuality/message/:styleId/:bSkuId/:gSkuId/:styleName/:MainImg',
			name: 'individualityMessage',
			component: resolve => require(['components/individuality/message'], resolve)
		},
		{
			path: '/success/:sign',
			name: 'success',
			component: function (resolve) {
				require(['components/success/success'], resolve);
			}
		},
		{
			path: '/userCenter',
			name: 'userCenter',
			component: function (resolve) {
				require(['components/userCenter/userCenter'], resolve);
			}
		},
		{
			path: '/userCenter/orderDetails/personal/:orderNo',
			name: 'personalOrderDetails',
			component: function (resolve) {
				require(['components/orderDetails/personalDetail'], resolve);
			}
		},
		{
			path: '/userCenter/orderDetails/pic/:orderNo',
			name: 'picOrderDetails',
			component: function (resolve) {
				require(['components/orderDetails/picDetail'], resolve);
			}
		},
		{
			path: '/userCenter/orderDetails/:orderNo',
			name: 'orderDetails',
			component: function (resolve) {
				require(['components/orderDetails/orderDetails'], resolve);
			}
		},
		{
			path: '/userCenter/brideDetail/:orderNo',
			name: 'brideDetail',
			component: function (resolve) {
				require(['components/orderDetails/brideDetail'], resolve);
			}
		},
		{
			path: '/personal',
			name: 'personal',
			component: function (resolve) {
				require(['components/personal/personal'], resolve);
			}
		},
		{
			path: '/personalcate/honey',
			name: 'personalcateHoney',
			component: function (resolve) {
				require(['components/personalcate/honey'], resolve);
			}
		},
		{
			path: '/personalcate/:sign',
			name: 'personalcate',
			component: function (resolve) {
				require(['components/personalcate/personalCate'], resolve);
			}
		},
		{
			path: '/hoeny/honeyDetails/:id',
			name: 'honeyDetails',
			component: function (resolve) {
				require(['components/honeyDetails/honeyDetails'], resolve);
			}
		},
		{
			path: '/personal/custom',
			name: 'custom',
			component: function (resolve) {
				require(['components/honeyDetails/custom'], resolve);
			}
		},
		{
			path: '/honey/details/:id/',
			name: 'details',
			component: function (resolve) {
				require(['components/honeyDetails/details'], resolve);
			}
		},
		{
			path: '/personal/message',
			name: 'message',
			component: function (resolve) {
				require(['components/honeyDetails/message'], resolve);//守护甜心
			}
		},
		{
			path: '/bride',
			name: 'bride',
			component: function (resolve) {
				require(['components/bride/bride'], resolve);
			}
		},
		{
			path: '/bride/ringparameters/:id',
			name: 'RingParameters',
			component: function (resolve) {
				require(['@/components/bride/ringparameters'], resolve);
			}
		},
		{
			path: '/bride/message',
			name: 'ring',
			component: function (resolve) {
				require(['@/components/bride/message'], resolve)
			}
		},
		{
			path: '/myBride_bak',
			name: 'myBride_bak',
			component: function (resolve) {
				require(['@/components/myBride_bak/list'], resolve)
			}
		},
		{
			path: '/myBrideWidget',
			name: 'myBrideWidget',
			component: function (resolve) {
				require(['@/components/myBride/widget'], resolve)
			}
		},
		{
			path: '/myBride/:id',
			name: 'myBride',
			component: function (resolve) {
				require(['@/components/myBride/order'], resolve)
			}
		},
		{
			path: '/myBrideDetail/:id',
			name: 'myBrideDetail',
			component: function (resolve) {
				require(['@/components/myBride/detail'], resolve)
			}
		},
		{
			path: '/myBride_bak/detail/:id',
			name: 'myBride_bak_Detail',
			component: function (resolve) {
				require(['@/components/myBride_bak/detail'], resolve)
			}
		},
		{
			path: '/myBride_bak/order',
			name: 'myBride_bak_Order',
			component: function (resolve) {
				require(['@/components/myBride_bak/order'], resolve)
			}
		},

		{
			path: '/series/set/:id',
			name: 'set',
			component: function (resolve) {
				require(['@/components/series/set'], resolve)
			}
		},
		{
			path: '/classRoom',
			name: 'classRoom',
			component: function (resolve) {
				require(['@/components/classRoom/index'], resolve)
			}
		},
		{
			path: '/couples',
			name: 'couples',
			component: function (resolve) {
				require(['@/components/couples/list'], resolve)
			}
		},
		{
			path: '/couples/detail/:id',
			name: 'couplesDetail',
			component: function (resolve) {
				require(['@/components/couples/detail'], resolve)
			}
		},
		{
			path: '/couples/edit/:id',
			name: 'couplesEdit',
			component: function (resolve) {
				require(['@/components/couples/edit'], resolve)
			}
		},
		{
			path: '/couples/stone/:id',
			name: 'couplesStone',
			component: function (resolve) {
				require(['@/components/couples/stone'], resolve)
			}
		},
		{
			path: '/series',
			name: 'series',
			component: function (resolve) {
				require(['@/components/series/list'], resolve)
			}
		},
		{
			path: '/series/detail/:id',
			name: 'seriesDetail',
			component: function (resolve) {
				require(['@/components/series/detail'], resolve)
			}
		},
		{
			path: '/series/edit/:id',
			name: 'seriesEdit',
			component: function (resolve) {
				require(['@/components/series/edit'], resolve)
			}
		},
		{
			path: '/series/stone/:id',
			name: 'seriesStone',
			component: function (resolve) {
				require(['@/components/series/stone'], resolve)
			}
		},
		{
			path: '/finalFashion/fashion',
			name: 'finalFashion',
			component: function (resolve) {
				require(['@/components/finalFashion/fashion'], resolve)
			}
		},
		{
			path: '/finalFashion/detail/:id',
			name: 'finalFashionDetail',
			component: function (resolve) {
				require(['@/components/finalFashion/detail'], resolve)
			}
		},
		{
			path: '/finalFashion/stone/:id',
			name: 'finalFashionStone',
			component: function (resolve) {
				require(['@/components/finalFashion/stone'], resolve)
			}
		},
		{
			path: '/finalFashion/settlement/:id',
			name: 'finalFashionSettlement',
			component: function (resolve) {
				require(['@/components/finalFashion/settlement'], resolve)
			}
		},
		{
			path: '/finalFashion/message',
			name: 'finalFashionMeaasge',
			component: function (resolve) {
				require(['@/components/finalFashion/message'], resolve)
			}
		},
		{
			path: '/finalFashion/finished',
			name: 'finalFashionFinished',
			component: function (resolve) {
				require(['@/components/finalFashion/finished'], resolve)
			}
		},
		{
			path: '/finalFashion/shoppingCar',
			name: 'finalFashionShoppingCar',
			component: function (resolve) {
				require(['@/components/finalFashion/shoppingCar2'], resolve)
			}
		},
		{
			path: '/finalFashion/detailCopy/:id',
			name: 'finalFashionDetailCopy',
			component: function (resolve) {
				require(['@/components/finalFashion/detailCopy'], resolve)
			}
		},
		{
			path: '/finalFashion/fashionIndex',
			name: 'finalFashionFashionIndex',
			component: function (resolve) {
				require(['@/components/finalFashion/fashionIndex'], resolve)
			}
		}, {
			path: '/finalFashion/stoneFirst',
			name: 'finalFashionStoneFirst',
			component: function (resolve) {
				require(['@/components/finalFashion/stoneFirst'], resolve)
			}
		},
		{
			path: '/finalFashion/detailSlide',
			name: 'finalFashionDetailSlide',
			component: function (resolve) {
				require(['@/components/finalFashion/detailSlide'], resolve)
			}
		},
		{
			path: '/myHome/index',
			name: 'myHome',
			component: function (resolve) {
				require(['@/components/myHome/index'], resolve)
			}
		},
		{
			path: '/lightFashion/fashion',
			name: 'lightFashion',
			component: function (resolve) {
				require(['@/components/lightFashion/fashion'], resolve)
			}
		},
		{
			path: '/lightFashion/detail/:id',
			name: 'lightFashionDetail',
			component: function (resolve) {
				require(['@/components/lightFashion/detail'], resolve)
			}
		},
		{
			path: '/lightFashion/settlement/:id',
			name: 'lightFashionSettlement',
			component: function (resolve) {
				require(['@/components/lightFashion/settlement'], resolve)
			}
		},
		{
			path: '/toMap/index',
			name: 'toMap',
			component: function (resolve) {
				require(['@/components/toMap/index'], resolve)
			}
		},
		{
			path: '/toMap/stone',
			name: 'toMapStone',
			component: function (resolve) {
				require(['@/components/toMap/stone'], resolve)
			}
		},{
			path: '/finalFashion/pay/:id',
			name: 'finalFashionPay',
			component: function (resolve) {
				require(['@/components/finalFashion/pay'], resolve)
			}
		},
		{
			path: '/finalFashion/orderList',
			name: 'finalFashionList',
			component: function (resolve) {
				require(['@/components/finalFashion/orderList'], resolve)
			}
		},
		{
			path: '/finalFashion/orderDetail/:id',
			name: 'finalFashionOrderDetail',
			component: function (resolve) {
				require(['@/components/finalFashion/orderDetail'], resolve)
			}
		},
		{
			path: '/finalFashion/shoppingCar2',
			name: 'finalFashionShoppingCar2',
			component: function (resolve) {
				require(['@/components/finalFashion/shoppingCar'], resolve)
			}
		},
		{
			path: '/finalFashion/messageNew',
			name: 'finalFashionMessageNew',
			component: function (resolve) {
				require(['@/components/finalFashion/messageNew'], resolve)
			}
		},
		{
			path: '/finalFashion/stoneForCar/:id',
			name: 'finalFashionStoneForCar',
			component: function (resolve) {
				require(['@/components/finalFashion/stoneForCar'], resolve)
			}
		}
	]
})
