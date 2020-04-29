import axios from 'axios'
import qs from 'qs'

var aurl = 'http://223.247.202.40:8088/shop/'
var burl = 'http://223.247.202.40:8088/shop/shopAdmin/php/'
//var aurl = '../'


export const check = checkdata => {
	return axios.request({
		url: aurl+"check.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: checkdata
	})
}
//首页信息
export const shoplist = params => {
	return axios.request({
		url: aurl + "index_list.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(params)
	})
}
//商品详情
export const goods = goodsid => {
	return axios.request({
		url: aurl + 'detail_info.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(goodsid)
	})
}

//分类页
export const arealist = data => {
	return axios.request({
		url: aurl + 'class_info.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
	})
}

export const showlist = showgoods => {
	return axios.request({
		url: aurl + 'index_class_list.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(showgoods)
	})
}

// 添加购物车
export const cardlin = carddata => {
	return axios.request({
		url: aurl + 'cart_add.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(carddata)
	})
}
// 购物车列表
export const cardlist = () => {
	return axios.request({
		url: aurl + 'cart_list.php',
		method: 'get',
	})
}
// 购物车数量
export const cardedit = editdata => {
	return axios.request({
		url: aurl + 'cart_edit.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(editdata)
	})
}
// 购物车商品删除
export const deledit = deldata => {
	return axios.request({
		url: aurl + 'cart_del.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(deldata)
	})
}
// 地址
export const useadd = () => {
	return axios.request({
		url: aurl + 'address_select.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	})
}

/**
 * 订单
 */ 
//下单
export const orderdata = ordermsg => {
	return axios.request({
		url: aurl + 'order_add.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(ordermsg)
	})
}
// 订单详情
export const onorderdata = onordermsg => {
	return axios.request({
		url: aurl + 'order_add.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(onordermsg)
	})
}

export const orderlist = () => {
	const orderlistdata = {
		"status": "list"
	};
	return axios.request({
		url: aurl + 'order_select.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(orderlistdata)
	})
}

export const dataorede = ordata => {
	return axios.request({
		url: aurl + 'order_select.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(ordata)
	})
}


// 订单物流信息
export const dataorderid = orderid => {
	return axios.request({
		url: aurl + 'route_list.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(orderid)
	})
}
// 直接购买操作
export const shopbuy = shopbuydata => {
	return axios.request({
		url: aurl + 'shop_buy.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(shopbuydata)
	})
}
// 订单状态
export const orderidlist = orderidlistdata => {
	return axios.request({
		url: aurl + 'order_list.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(orderidlistdata)
	})
}
export const order_receive = orderidlistdata => {//确认收货
	return axios.request({
		url: aurl + 'order_receive.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(orderidlistdata)
	})
}

export const order_backout = orderidlistdata => {//取消订单
	return axios.request({
		url: aurl + 'order_backout.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(orderidlistdata)
	})
}
//支付
export const payadd = payadddata => {
	return axios.request({
		url: aurl + 'payment.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(payadddata)
	})
}

//支付
export const orderpv = data => {
	return axios.request({
		url: aurl + 'order_pv.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
	})
}


export const message = data => {//客服
	return axios.request({
		url: aurl + 'message.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data:data
	})
}

export const payCreate = data => {
	return axios.request({
		url: aurl + 'payCreate.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data: data
	})
}

export const address = data => {//省市列表
	return axios.request({
		url: burl + 'address.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data: data
	})
}

export const address_add = data => {
	return axios.request({
		url: aurl + 'address_add.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}
export const address_select = data => {
	return axios.request({
		url: aurl + 'address_select.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}
export const address_update = data => {
	return axios.request({
		url: aurl + 'address_update.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}

export const address_delete = data => {
	return axios.request({
		url: aurl + 'address_delete.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}

export const index_class_jdlist = data => {
	return axios.request({
		url: aurl + 'kaipule/index_class_jdlist.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}

export const detail_jdinfo = data => {
	return axios.request({
		url: aurl + 'kaipule/detail_jdinfo.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}

export const detail_jdnum= data => {//商品库存查询
	return axios.request({
		url: aurl + 'kaipule/detail_jdnum.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}


export const jdcart_add= data => {//添加购物车
	return axios.request({
		url: aurl + 'kaipule/jdcart_add.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}

export const jdcart_list= data => {//添加购物车
	return axios.request({
		url: aurl + 'kaipule/jdcart_list.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}
export const jdcart_edit= data => {//购物车数量修改
	return axios.request({
		url: aurl + 'kaipule/jdcart_edit.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}
export const jdcart_del= data => {//购物车数量修改
	return axios.request({
		url: aurl + 'kaipule/jdcart_del.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}

export const jdorder_add= data => {//购物车数量修改
	return axios.request({
		url: aurl + 'kaipule/jdorder_add.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}

export const shop_jd_buy= data => {//购物车数量修改
	return axios.request({
		url: aurl + 'kaipule/shop_jd_buy.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}
export const order_jd_select= data => {//购物车数量修改
	return axios.request({
		url: aurl + 'kaipule/order_jd_select.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}
export const order_jd_list= data => {//订单列表
	return axios.request({
		url: aurl + 'kaipule/order_jd_list.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
		//data: data
	})
}
export const getProduct= data => {//物流信息
	return axios.request({
		url: aurl + 'kaipule/getProduct.php',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data: data
	})
}