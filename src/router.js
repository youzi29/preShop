import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue' //主页
import card from './views/card.vue' //购物车
import goods from './views/goods.vue' //商品详情
import order from './views/order.vue' //订单
import address from './views/address.vue' //地址
import addrbuild from './views/addrbuild.vue'
import service from '@/views/Service/index.vue'//客服
import area from './views/area.vue'
import showlist from './views/showlist.vue'
import orderlist from './views/orderlist.vue'

import orderdata from './views/orderdata.vue'//已废弃

import login from './views/Login1/index.vue' //登录组件
import JDgoods from './views/OtherPlat/JDgoods.vue'
import JDorderlog from './views/OtherPlat/JDorderlog.vue'
import JDorderdata from './views/OtherPlat/JDorderdata.vue'


Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
			       title: '浣洗商城'
			     }
		},
		{
			path: '/JDgoods',
			name: 'JDgoods',
			component:JDgoods,
			 meta: {
			        title: '商品详情'
			      }
		
		},
	
		{
			path: '/JDorderlog',
			name: 'JDorderlog',
			component: JDorderlog,
			meta: {
			       title: '订单跟踪'
			     }
		},
		{
			path: '/JDorderdata',
			name: 'JDorderdata',
			component: JDorderdata,
			meta: {
			       title: '我的订单'
			     }
		},
	
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/card',
			name: 'card',
			component: card,
			meta: {
			       title: '浣洗商城'
			     }
		},
		
		{
			path: '/goods',
			name: 'goods',
			component: goods,
			 meta: {
			        title: '商品详情'
			      }

		},
		
		{
			path: '/order',
			name: 'order',
			component: order,
			meta: {
			       title: '确认订单'
			     }
		},
		{
			path: '/address',
			name: 'address',
			component: address,
			meta: {
			       title: '收货地址'
			     }
		},
		{
			path: '/addrbuild',
			name: 'addrbuild',
			component: addrbuild,
			meta: {
			       title: '收货地址'
			     }
		},
		
		{
			path: '/area',
			name: 'area',
			component: area,
			meta: {
			       title: '商品分类'
			     }
		},
		{
			path: '/showlist',
			name: 'showlist',
			component: showlist,
			meta: {
			       title: '商品分类'
			     }
		},
		{
			path: '/orderlist',
			name: 'orderlist',
			component: orderlist,
			meta: {
			       title: '我的订单'
			     }
		},
		
		{
			path: '/orderdata',
			name: 'orderdata',
			component: orderdata,
			meta: {
			       title: '订单详情'
			     }
		},
		 {
		 	path: '/service',
		 	name: 'service',
		 	component: service,
			meta: {
			       title: '在线客服'
			     }
		 },
	]
})

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})

export default router;