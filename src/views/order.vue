<template>
	<div>
		<!-- <router-link to="/address"> -->
		<!-- <div class="currentAddressList" @click="onEdit()">
				<p><span class="name">
						<van-icon name="friends-o" />收货人：<span v-text="aData.name"></span></span><span class="tel">
						<van-icon name="phone-o" />电话：<span v-text="aData.tel">13175088163</span></span></p>
				<p style="width: 80%;text-align: left;margin-left: 0.1rem;">
					<van-icon name="location-o" />收货地址：<span class="addressDetail"><span v-text='aData.address'>师傅师傅说的郭德纲大使馆师傅师傅说的郭</span></span></p>
				<p class="iconedit">
					<van-icon name="edit" />
				</p>
			</div> -->
		<div class="currentAddressList" @click="onEdit()">
			<p style="font-weight: 600;"><span class="name">
					<span v-text="aData.name"></span></span><span class="tel">
					<span v-text="aData.tel">13175088163</span></span></p>
			<p style="width: 85%;text-align: left;margin-left: 0.1rem;">
				<span class="addressDetail"><span v-text='aData.address'>师傅师傅说的郭德纲大使馆师傅师傅说的郭</span></span></p>
			<p class="iconedit">
				<van-icon name="edit" />
			</p>
			<img style="width: 100%;padding-top: .05rem;background: #fff;" src="https://wx.ihuanxi.cn/kd/upload/20180906/20190122/item15481207919295.png" />
		</div>
		<!-- </router-link> -->
		<div class="currentAddressList" style="text-align: center;" v-show="false">
			<p style="margin-top: 0.25rem;">添加地址</p>
			<p class="iconedit">
				<van-icon name="edit" />
			</p>
			<img style="width: 100%;padding-top: .05rem;background: #fff;" src="https://wx.ihuanxi.cn/kd/upload/20180906/20190122/item15481207919295.png" />
		</div>

		<div class="goods">

			 <div class="ordercard1" v-for="(item,index) in shopData" :key="index">
				<img :src="item.img" />
				<div class="goods-info">
					<p class="card-info-text-p1" v-text="item.title">上衣上衣属于</p>
					<p class="card-info-text-p2">
						<span style="color:dimgray ;display:inline-block;padding: .01rem 0.05rem;border-radius: .03rem;margin: .05rem 0; background: rgba(233, 233, 233, 0.86); font-size: .13rem; font-weight: 500;" v-text="item.sizename">白色</span>
					</p>
					   
					<p>
						<span style="color: red;">￥<span v-text="item.price">12.00</span></span>
						<span style="float: right;color:#969799;padding-right: .1rem;">共<span v-text="item.num">5</span>件商品</span>
					</p>
				</div>
			</div> 
		</div>
		

		<div class="addinfo">
			<div class="info-box">
				<div class="box-name">商品价格</div>
				<div class="box-tail">￥{{orData.sumPrice.toFixed(2)}}</div>
			</div>
			<div class="info-box">
				<div class="box-name">运费</div>
				<div class="box-tail">￥{{orData.sumPostPrice.toFixed(2)}}</div>
			</div>
			<div class="info-box" style="font-size: 0.16rem; font-weight: 600; ">
				<div class="box-name">实付金额</div>
				<div class="box-tail" style="color: red;">￥{{(orData.sumPostPrice+orData.sumPrice).toFixed(2)}}</div>
			</div>
		</div>

		<div class="play">
			<button @click="onSubmit">微信支付</button>
		</div>
		<!-- <van-submit-bar style="position: fixed;bottom: 0;z-index: 999;" :price="(orData.sumPostPrice+orData.sumPrice)*100" button-text="提交订单" @submit="onSubmit" /> -->
	</div>
</template>
<script>
	import {
		orderdata,
		payadd,
		payCreate,
		jdorder_add,
		shop_jd_buy
	} from '../api.js'
	export default {
		data() {
			return {
				imageURL: 'https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
				list: [{
					id: '1',
					name: '张三',
					tel: '13000000000',
					address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
				}],
				switchable: false,
				orData: {},
				shopData: "",
				shopData0:[],
				cityid: '',
				addressid: '',
				aurl: 'https://wx.ihuanxi.cn/kd/newwashcache/database/shop/',
				aData: {},
				platform: '', //支付环境
			};
		},
		mounted() {
			var self = this;
			var ordermsg = {
				'status': 'beforeAdd',
				'pid': this.$route.query.id,
				'caddressid': localStorage.getItem('addressid'),
				'id': this.$route.query.id1,
			};
			localStorage.setItem('pid', this.$route.query.id);
			localStorage.setItem('id1', this.$route.query.id1);
			orderdata(ordermsg).then(res => {
				self.orData = res.data;
				self.shopData0.push(res.data);
				self.shopData = res.data.shop;
				self.cityid = res.data.cityid;
				self.addressid = res.data.id;
				console.log(self.shopData0)
				let pdaddress = localStorage.getItem('shop_address');
				if (pdaddress == null) {
					localStorage.setItem('shop_address', self.orData.address);
					localStorage.setItem('shop_name', self.orData.name);
					localStorage.setItem('shop_tel', self.orData.tel);
					localStorage.setItem('cityid', res.data.cityid);
					localStorage.setItem('addressid', res.data.id);
				} else {
					self.aData = {
						address: localStorage.getItem('shop_address'),
						name: localStorage.getItem('shop_name'),
						tel: localStorage.getItem('shop_tel'),
					}
				}

			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			onSubmit() {
				var self = this;
				var ordermsg = {
					'status': 'add',
					'pid': this.$route.query.id,
					//'cityid': localStorage.getItem('cityid'),
					'id': this.$route.query.id1,
					'caddressid': localStorage.getItem('addressid')
				};
				var ua = navigator.userAgent.toLowerCase(); //判断支付环境
				if (ua.match(/MicroMessenger/i) == "micromessenger") { //微信环境
					this.platform = 5
				} else { //非微信环境
					this.platform = 4
				}
				//console.log(this.platform)
				orderdata(ordermsg).then(res => { //确定添加订单
					let idorider = res.data.orderId;
					let len = res.data.orderId.length
					console.log(res)
					if (res.data.msg == 'success') {
						let orderlist = []
						let orderidlist = []
						for (let i = 0; i < len; i++) {
							orderlist.push(idorider[i].order);
							//orderidlist.push(idorider[i].orderId);//订单编号
						}
						var string = orderlist.join(',')
						//var string1 = orderidlist.join(',')
						var ordermsg1 = {
							'status': 'add',
							'id': string, //订单索
							'projectid': this.platform, //支付平台
							'price': this.orData.sumPostPrice + this.orData.sumPrice
						};
						payCreate(ordermsg1).then(res => { //发起支付申请
							if (res.data.msg == 'success') {
								let out_trade_no = res.data.data.out_trade_no;
								let plat = this.platform

								if (this.platform == 5) { //公众号支付
									var paydata = JSON.stringify(res.data.data);
									localStorage.setItem("payData", paydata);
									localStorage.setItem("state", "10");
									//window.location.href = "https://wx.ihuanxi.cn/pay/#/";
								} else { //h5支付
									//window.location = res.data.data.mweb_url;
								}

								setTimeout(function() {
									self.$dialog.confirm({
											title: "是否已完成购买？",
											confirmButtonText: "购买完成",
											cancelButtonText: "取消"
										})
										.then(() => {
											var data = {
												status: 'inspect',
												out_trade_no: out_trade_no,
												projectId: plat
											}
											payCreate(data).then(res => { //检查支付是否成功
												if (res.data.msg == 'success') {
													this.$toast(res.data.msgText)
												} else {
													alert(res.data.msgText)
												}
											}).catch(err => {
												console.log(err)
											})
										})
										.catch(() => {
											var data = {
												status: 'inspect',
												out_trade_no: out_trade_no,
												projectId: plat
											}
											payCreate(data).then(res => { //检查支付是否成功
												if (res.data.msg == 'success') {
													this.$toast(res.data.msgText)
												} else {
													alert(res.data.msgText)
												}
											}).catch(err => {
												console.log(err)
											})
										});
								}, 200);
							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						alert(res.data.msgText)
					}
				}).catch(err => {
					console.log(err)
				})

			},


			onEdit() {
				this.$router.push({
					path: '/address'
				})

			}
		},



	}
</script>
<style scoped>
	.more{
		width: 100%;
		margin-top: .1rem;
		display: flex;
		flex-wrap: wrap;
	}
	.imgone {
		position: relative;
		width: 1rem;
		height: 1rem;
		margin-right: .1rem;
	}
	.imgone img{
		padding: 0;
		
	}
	.goodsnum{
		position: absolute;
		bottom: 0;
		z-index: 1;
		right: -.05rem;
		width: .34rem;
		text-align: center;
		display: inline-block;
		background: #2b292975;
		color: #fff;
		font-size: .12rem;
		border-top-left-radius: .03rem;
		border-bottom-right-radius: .03rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.shopname-my {
		padding-left: .05rem !important;
		padding-top: .15rem;
		display: inline-block;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: .05rem;
	}
	 .shopname-my div{
		 display: flex;
		 align-items: center;
		 color: rgb(255, 187, 3);
	 }
	.shopname-my i {
		margin-right: .03rem;
		
	}
	.shopname-my b {
		margin-right: .03rem;
		font-weight: 500;
		
	}
	
	.shopname-my span{
		font-size: .14rem;
		color: #7d7e80;
		display: inline-block;
		
		border-radius: .1rem;
		font-size: .12rem;
		
		
		padding: 0.02rem .03rem;
	}
	
	.shopname-card1 {
		background-color: #fff;
		padding: 0;
		margin-top: .1rem;
		width: 96%;
		margin: .1rem auto;
		border-radius: .1rem;
		padding-left: .05rem;
		padding-right: .05rem;
	}
	
	.goodscardlist1 {
		width: 100%;
		height: auto;
		overflow: hidden;
		display: flex;
		align-items: center;
	
		flex-wrap: wrap;
		margin-bottom: .1rem;
		padding-right: .05rem;
	
	}
	
	.circle {
		width: 5%;
	
	}
	
	.card-info {
		display: flex;
		width: 100%;
		margin-top: .1rem;
	}
	
	.goodscardlist1 img {
		width: 1rem;
		height: 1rem;
	
		margin-left: 0.05rem;
		margin-right: .1rem;
		border-radius: .03rem;
	
	}
	
	.card-info-text {
	
		width: 100%;
		padding-left: .1rem;
	}
	
	.card-info-text-p1 {
	
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: .16rem;
		line-height: .25rem;
	}
	
	.card-info-text-p2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #696969;
		line-height: .25rem;
		height: .3rem;
		margin-bottom: .05rem;
	}
	
	
	.play {
		width: 100%;
	}

	.play button {
		margin: .2rem auto;
		width: 95%;
		height: .38rem;
		background: rgb(7, 178, 4);
		color: #fff;
		font-size: .18rem;
		border-radius: 1.5rem;
		font-weight: 500;
	}

	.total .van-cell__value {
		color: red;
		font-weight: 600;
	}

	.currentAddressList {
		width: 100%;
		height: auto !important;
		background-color: #fff;
		font-size: 0.14rem;
		overflow: hidden;
		padding-top: 0.05rem;
	}

	.currentAddressList p {
		margin-top: 0.05rem;
		margin-left: 0.1rem;
		overflow: hidden;
	}

	.currentAddressList .tel {
		margin-left: 0.1rem;
	}

	.ordercard1 {
		width: 100%;
		height: auto !important;

		font-size: 0.15rem;
		padding-left: 0.15rem;
		padding-bottom: .05rem;
	}

	.ordercard1 img {
		width: 0.8rem;
		height: 0.8rem;
		float: left;
		margin-top: 0.05rem;
	}

	.ordercard1 div {
		width: 74%;


		height: auto !important;
		float: left;
		margin-left: 0.1rem;
	}

	.ordercard1 div p {
		/* margin-top: 0.15rem;
		font-size: 0.16rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap; */
		width: 100%;
	}

	.iconedit {
		position: fixed;
		top: 20px;
		right: 0px;
		font-size: 0.24rem;
		margin-top: -0.35rem;
		padding-right: 0.1rem;
	}

	.goods {
		display: flex;
		flex-wrap: wrap;
		padding-top: .1rem;
		height: auto;
		background: #fff !important;
		margin-top: .1rem;
		border-radius: .1rem;
	}

	.goods-info {}

	.info1 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-weight: 600;
		line-height: .23rem;
		font-size: .16rem;
	}

	.info2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #969799;
		font-size: .14rem;
		line-height: .23rem;
	}

	.addinfo {
		background: #fff;
		border-radius: .1rem;
		margin-top: .1rem;
		font-size: .16rem;
	}

	.info-box {
		display: flex;
		padding: .15rem .1rem;
		justify-content: space-between;
		border-bottom: #eee solid .01rem;
	}

	.box-name {
		color: #323233;
	}

	.box-tail {
		color: #969799;
	}
</style>
