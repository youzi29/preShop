<template>
	<div>
		<van-tabs v-model="active" @click="onClick" color="#FAE462">

			<van-tab title="全部">
				<div class="orderList">
					<div class="shopname-card1" v-for="(item,index) in odlistData" :key="index">
						<div>
							<span class="shopname-my">
								<div>
									<i>
									 <van-icon name="shop-o" />
									</i>
									<b>{{item.shopname}}</b>
								</div>
								<span v-if="item.statue=='1'">待发货</span>
								<span v-if="item.statue=='0'">待支付</span>
								<span v-if="item.statue=='2'">已发货</span>
								<span v-if="item.statue=='3'">已揽件</span>
								<span v-if="item.statue=='4'">已收件</span>
							</span>
						</div>

						<div class="goodscardlist1">
							 <div class="card-info" @click="alldata(item)">
								<template  v-for="(items,index) in item.shop" >
									
									<div class=" imgone" >
										<img :src="items.img">
										<span class="goodsnum"><span style="font-size: .1rem;padding-right: .02rem;">X</span>{{items.num}}</span>
									</div>
									
									<div class='card-info-text' v-if="item.shop.length <= 1" >
										<p class="card-info-text-p1" v-text="items.title"></p>
										<p class="card-info-text-p2">
											 <span style="color:dimgray ;display:inline-block;padding: .01rem 0.05rem;border-radius: .03rem;margin: .05rem 0; background: rgba(233, 233, 233, 0.86); font-size: .13rem; font-weight: 500;" v-text="items.sizename">白色</span> 
										</p>
									</div>
								</template>
							</div> 
							 <p style="text-align: right;width: 100%;margin-top: .05rem;" >
								<span v-if="item.statue !='0'" style="color:dimgray ;display:inline-block;border-radius: .03rem;margin: .05rem 0; font-size: .13rem; font-weight: 500;">
									共{{item.sumnum}}件商品 实付金额
								</span>
								<span v-if="item.statue=='0'" style="color:dimgray ;display:inline-block;border-radius: .03rem;margin: .05rem 0; font-size: .13rem; font-weight: 500;">
									共{{item.sumnum}}件商品 应付金额
								</span>
								<span style="color: red;">￥<span>{{item.vocherMoney.toFixed(2)}}</span></span>
							</p>
							<div class="stepper1">
								<button @click="cancel(item , 0)" v-if="item.statue =='0'">取消订单</button> 
								<button @click="lookdata1(item)" v-if="item.statue=='0'"> 去支付</button>
								<button @click="alldata(item)" v-if="item.statue!='0'"> 订单详情</button>
								<button @click="sure(item)" v-if="item.statue =='2' || item.statue =='3' "> 确认收货</button>
							</div>
						</div>
					</div>
				</div>
			</van-tab>

			<van-tab title="待付款">
				<div class="orderList">
					<div class="shopname-card1" v-for="(item,index) in odlistData1" :key="index">
						<div>
							<span class="shopname-my">
								<div>
									<i>
									 <van-icon name="shop-o" />
									</i>
									<b>{{item.shopname}}</b>
								</div>
								
								<span>待支付</span>
							</span>
						</div>
					
						<div class="goodscardlist1">
							 <div class="card-info" @click="lookdata(item)">
								<template  v-for="(items,index) in item.shop" >
									
									<div class=" imgone" >
										<img :src="items.img">
										<span class="goodsnum"><span style="font-size: .1rem;padding-right: .02rem;">X</span>{{items.num}}</span>
									</div>
									
									<div class='card-info-text' v-if="item.shop.length <= 1">
										<p class="card-info-text-p1" v-text="items.title"></p>
										<p class="card-info-text-p2">
											 <span style="color:dimgray ;display:inline-block;padding: .01rem 0.05rem;border-radius: .03rem;margin: .05rem 0; background: rgba(233, 233, 233, 0.86); font-size: .13rem; font-weight: 500;" v-text="items.sizename">白色</span> 
										</p>
									</div>
								</template>
							</div> 
							 <p style="text-align: right;width: 100%;margin-top: .05rem;">
								<span style="color:dimgray ;display:inline-block;border-radius: .03rem;margin: .05rem 0; font-size: .13rem; font-weight: 500;">
									共{{item.sumnum}}件商品 应付金额
								</span>
								<span style="color: red;">￥<span>{{item.vocherMoney.toFixed(2)}}</span></span>
							</p>
							<div class="stepper1">
								<button @click="cancel(item , 1)">取消订单</button> 
								<button @click="lookdata1(item)"> 去支付</button>
							</div>
						</div>
					</div>
				</div>
			</van-tab>

			<van-tab title="待发货">
				<div class="orderList">
					<div class="shopname-card1" v-for="(item,index) in odlistData2" :key="index">
						<div>
							<span class="shopname-my">
								<div>
									<i>
									 <van-icon name="shop-o" />
									</i>
									<b>{{item.shopname}}</b>
								</div>
								<span>待发货</span>
							</span>
						</div>
					
						<div class="goodscardlist1">
							 <div class="card-info"  @click="lookdata2(item)">
								<template  v-for="(items,index) in item.shop" >
								
									<div class=" imgone" >
										<img :src="items.img">
										<span class="goodsnum"><span style="font-size: .1rem;padding-right: .02rem;">X</span>{{items.num}}</span>
									</div>
									
									<div class='card-info-text' v-if="item.shop.length <= 1" >
										<p class="card-info-text-p1" v-text="items.title"></p>
										<p class="card-info-text-p2">
											 <span style="color:dimgray ;display:inline-block;padding: .01rem 0.05rem;border-radius: .03rem;margin: .05rem 0; background: rgba(233, 233, 233, 0.86); font-size: .13rem; font-weight: 500;" v-text="items.sizename">白色</span> 
										</p>
									</div>
								</template>
							</div> 
							 <p style="text-align: right;width: 100%;margin-top: .05rem;">
								<span style="color:dimgray ;display:inline-block;border-radius: .03rem;margin: .05rem 0; font-size: .13rem; font-weight: 500;">
									共{{item.sumnum}}件商品 实付金额
								</span>
								<span style="color: red;">￥<span>{{item.vocherMoney.toFixed(2)}}</span></span>
							</p>
							<div class="stepper1">
								 <button @click="lookdata2(item)"> 查看订单</button> 
							</div>
						</div>
					</div>
				</div>
			</van-tab>

			<van-tab title="待收货">
				<div class="orderList">
					<div class="shopname-card1" v-for="(item,index) in odlistData3" :key="index">
						<div>
							<span class="shopname-my">
								<div>
									<i>
									 <van-icon name="shop-o" />
									</i>
									<b>{{item.shopname}}</b>
								</div>
								<span>已发货</span>
								<!-- <span v-if="item.statue=='3'">已揽件</span>
								<span v-if="item.statue=='4'">已收件</span> -->
							</span>
						</div>
					
						<div class="goodscardlist1">
							 <div class="card-info" @click="lookdata3(item)">
								<template  v-for="(items,index) in item.shop" >
									
									<div class=" imgone" >
										<img :src="items.img">
										<span class="goodsnum"><span style="font-size: .1rem;padding-right: .02rem;">X</span>{{items.num}}</span>
									</div>
									
									<div class='card-info-text' v-if="item.shop.length <= 1">
										<p class="card-info-text-p1" v-text="items.title"></p>
										<p class="card-info-text-p2">
											 <span style="color:dimgray ;display:inline-block;padding: .01rem 0.05rem;border-radius: .03rem;margin: .05rem 0; background: rgba(233, 233, 233, 0.86); font-size: .13rem; font-weight: 500;" v-text="items.sizename">白色</span> 
										</p>
									</div>
								</template>
							</div> 
							 <p style="text-align: right;width: 100%;margin-top: .05rem;">
								<span style="color:dimgray ;display:inline-block;border-radius: .03rem;margin: .05rem 0; font-size: .13rem; font-weight: 500;">
									共{{item.sumnum}}件商品 实付金额
								</span>
								<span style="color: red;">￥<span>{{item.vocherMoney.toFixed(2)}}</span></span>
							</p>
							<div class="stepper1">
								 <button @click="lookdata3(item)"> 查看订单</button> 
							</div>
						</div>
					</div>
				</div>
			</van-tab>
			<!--未开发-->
			<!-- <van-tab title="已完成">
				<div class="orderList">
					<div class="shopname-card1" v-for="(item,index) in odlistData4" :key="index">
						<div>
							<span class="shopname-my">
								<div>
									<i>
									 <van-icon name="shop-o" />
									</i>
									<b>{{item.shopname}}</b>
								</div>
								<span>已完成</span>
							</span>
						</div>
					
						<div class="goodscardlist1">
							 <div class="card-info" @click="lookdata3(item)">
								<template  v-for="(items,index) in item.shop" >
									
									<div class=" imgone" >
										<img :src="items.img">
										<span class="goodsnum"><span style="font-size: .1rem;padding-right: .02rem;">X</span>{{items.num}}</span>
									</div>
									
									<div class='card-info-text' v-if="item.shop.length <= 1">
										<p class="card-info-text-p1" v-text="items.title"></p>
										<p class="card-info-text-p2">
											 <span style="color:dimgray ;display:inline-block;padding: .01rem 0.05rem;border-radius: .03rem;margin: .05rem 0; background: rgba(233, 233, 233, 0.86); font-size: .13rem; font-weight: 500;" v-text="items.sizename">白色</span> 
										</p>
									</div>
								</template>
							</div> 
							 <p style="text-align: right;width: 100%;margin-top: .05rem;">
								<span style="color:dimgray ;display:inline-block;border-radius: .03rem;margin: .05rem 0; font-size: .13rem; font-weight: 500;">
									共{{item.sumnum}}件商品 实付金额
								</span>
								<span style="color: red;">￥<span>{{item.vocherMoney.toFixed(2)}}</span></span>
							</p>
							<div class="stepper1">
								 <button @click="lookdata3(item)"> 查看订单</button> 
							</div>
						</div>
					</div>
				</div>
			</van-tab> -->
		</van-tabs>
		<tabar :numid="numid"></tabar>
	</div>
</template>

<script>
	import tabar from '../components/tabar.vue'
	import {
		orderlist,
		orderidlist,
		payCreate,
		order_receive,
		order_backout,
		check
	} from '../api.js'
	export default {
		data() {
			return {
				active: '',
				odlistData: "",
				numid: 3,
				odlistData1: '', //待支付
				odlistData2: '',
				odlistData3: '',
				odlistData4:'',
				platform: ''
			};
		},
		components: {
			tabar
		},
		mounted() {
			this.checklogin()//验证是否登录
			var self = this;
			orderlist().then(res => {
				self.odlistData = res.data;
				console.log(self.odlistData);
			}).catch(err => {
				console.log(err)
			});
		},
		methods: {
			alldata(item){//全部订单
				if(item.statue == 0){//待支付
					this.lookdata(item)
				}
				if(item.statue == 1){//待发货
					this.lookdata2(item)
				}
				if(item.statue == 2){//已发货
					this.lookdata3(item)
				}
				if(item.statue == 3){//已揽件
					this.lookdata3(item)
				}
				if(item.statue == 4){//已收件
					this.lookdata3(item)
				}
			},
			lookdata(item) {//待支付
				this.$router.push({
					path: '/JDorderdata',
					query: {
						id: item.id,
						state: 0,
						//orderId: item.orderId,
						jdId: item.jingdongId
						}
				})
			},
			lookdata2(item) {//待发货
				this.$router.push({
					path: '/JDorderdata',
					query: {
						id: item.id,
						state: 1,
						orderId: item.orderId,
						jdId: item.jingdongId
						}
				})
			},
			lookdata3(item) {//已发货
				this.$router.push({
					path: '/JDorderdata',
					query: {
						id: item.id,
						state: 2,
						orderId: item.orderId,
						jdId: item.jingdongId
						}
				})
			},
			cancel(item ){
				
					this.$dialog.confirm({
					  message: '确定取消订单吗？',
					})
					  .then(() => {
					   const orderidlistdata = {
					   		"orderid": item.orderId,
					   	};
					  order_backout(orderidlistdata).then(res => {
					   		if(res.data.msg == 'success'){
								var self = this;
								orderlist().then(res => {
									self.odlistData = res.data;
									console.log(self.odlistData);
								}).catch(err => {
									console.log(err)
								});
								
								const orderidlistdata = {
									"status": 'nopay',
								};
								orderidlist(orderidlistdata).then(res => {
									self.odlistData1 = res.data.data;
									console.log(res.data.data)
								}).catch(err => {
									console.log(err)
								})
							}else{
								this.$toast(res.data.msgText)
							}
					   	}).catch(err => {
					   		console.log(err)
					   	})
					  })
					  .catch(() => {
					    // on cancel
					  });
				
			},
			sure(item){
				this.$dialog.confirm({
				  message: '是否确定已收件？',
				})
				  .then(() => {
				   const orderidlistdata = {
				   		"orderid": item.orderId,
				   	};
				   order_receive(orderidlistdata).then(res => {
				   		if(res.data.msg == 'success'){
							var self = this;
							orderlist().then(res => {
								self.odlistData = res.data;
								console.log(self.odlistData);
							}).catch(err => {
								console.log(err)
							});
						}else{
							this.$toast(res.data.msgText)
						}
				   	}).catch(err => {
				   		console.log(err)
				   	})
				  })
				  .catch(() => {
				    // on cancel
				  });
			   
			},
			lookdata1(item) { //立即支付
				var self = this;
				console.log(item)
				//window.location.href = "https://wx.ihuanxi.cn/wxpay/scpay.php?oIndex="+item.orderId+'&price='+Number(item.money)
				//this.$router.push({path:'/orderdata?id='+item.id})
				var ua = navigator.userAgent.toLowerCase(); //判断支付环境
				if (ua.match(/MicroMessenger/i) == "micromessenger") { //微信环境
					this.platform = 5
				} else { //非微信环境
					this.platform = 4
				}
				var ordermsg1 = {
					'status': 'add',
					'id': item.id, //订单索引
					'orderid': item.orderId, //订单编号
					'projectid': this.platform, //支付平台
					'price': item.vocherMoney
				};
				payCreate(ordermsg1).then(res => { //发起支付申请
					if (res.data.msg == 'success') {
						let out_trade_no = res.data.data.out_trade_no;
						let plat = this.platform
						if (this.platform == 5) { //微信支付
							var paydata = JSON.stringify(res.data.data);
							localStorage.setItem("payData", paydata);
							localStorage.setItem("state", "10");
							window.location.href = "https://wx.ihuanxi.cn/pay/#/";
						} else { //h5支付
							window.location = res.data.data.mweb_url;
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

					} else {
						alert(res.data.msgText)
					}
				}).catch(err => {
					console.log(err)
				})


			},
			
			onClick(index, title) {
				var self = this;
				if (index == 1) {
					const orderidlistdata = {
						"status": 'nopay',
					};
					orderidlist(orderidlistdata).then(res => {
						self.odlistData1 = res.data.data;
						console.log(res.data.data)
					}).catch(err => {
						console.log(err)
					})
				}
				if (index == 2) {
					const orderidlistdata = {
						"status": 'alpay',
					};
					orderidlist(orderidlistdata).then(res => {
						self.odlistData2 = res.data.data;
						console.log(res.data)
					}).catch(err => {
						console.log(err)
					})
				}
				if (index == 3) {
					const orderidlistdata = {
						"status": 'unshipped',
					};
					orderidlist(orderidlistdata).then(res => {
						self.odlistData3 = res.data.data;
						console.log(res.data)
					}).catch(err => {
						console.log(err)
					})
				}
				if(index == 4){
					const orderidlistdata = {
						"status": 'receiving',
					};
					orderidlist(orderidlistdata).then(res => {
						self.odlistData4 = res.data.data;
						console.log(res.data)
					}).catch(err => {
						console.log(err)
					})
				}
			},
			checklogin() {
				var checkdata = {
					status: 'check'
				};
				check(checkdata).then(res => {
						if (res.data.msg == 'login') {
							localStorage.setItem('logininit', JSON.stringify({
								url: window.location.href
							}));
							window.location.href = 'https://wx.ihuanxi.cn/kd/newwashcache/login/';
						} else {
							localStorage.setItem('userid', res.data.sendid)
							console.log(localStorage.getItem('userid'))
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
		}
	};
</script>

<style scoped>
	/deep/ .van-tabs__wrap{
		padding: 0rem 0.1rem 0rem .1rem;
		background: #fff;
	}
	/deep/ .van-tabs__wrap--scrollable .van-tab{
		     flex: 0; 
	}
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

	.stepper1 {
		display: flex;
		height: auto;
		padding: .05rem 0;
		border-top: #eee solid .01rem;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		margin-top: .03rem;
	}

	.stepper1 button {
		
		border: darkgray solid 1px;
		color: darkgray;
		
		width: .8rem;
		margin-left: .1rem;
		padding: .05rem 0;
		border-radius: .2rem;
		font-size: .14rem;
		
	}
	.stepper1 button:last-child{
		border: rgb(255, 187, 3) solid 1px;
		color: rgb(255, 187, 3);
	}


	.van-tabs--line {
		margin-bottom: 55px;
	}

	.van-card__title {
		font-size: .15rem !important;

		color: #323233 !important;
		font-weight: 500 !important;
		font-family: STHeiTi, Helvetica, "Hiragino Sans GB", "Helvetica Neue", "Microsoft YaHei", Arial, sans-serif !important;
	}

	.van-card__price {
		font-size: 15.4px;

		font-weight: 500 !important;
	}

	.oddlist {
		width: 96%;
		margin: 0 auto;
		margin-top: 0.1rem;
		border-radius: 0.06rem;
	}

	.oddlist .van-card:not(:first-child) {
		margin-top: -10px;
	}

	.oddlist .van-card__content .van-card__bottom {
		margin-top: 10px;
	}

	.oddfoot {
		float: right;
		margin-top: -30px;
		margin-right: 10px;
	}

	.oddlist .van-card__thumb img {
		width: 100%;
		height: 100%;
	}

	.oddfootmsg {
		width: 0.5rem;
		height: 0.25rem;
		border: 1px solid #FFBB03;
		float: left;
		margin-top: -35px;
		margin-left: 110px;
	}
</style>

