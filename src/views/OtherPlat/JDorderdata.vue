<template>
	<!--订单详情-->
	<div>
		<!-- <van-nav-bar style="position: fixed;top: 0px;left: 0px;bottom: 0;right: 0;width: 100%;z-index: 999999;">
			<img slot="title" style="width: 20px;height: 20px;margin-top: 15px;margin-left: 55px;" src="../assets/user.png" />
			<span slot="title" style="position: relative;top: -32px;margin-left: 10px;">浣洗商城</span>
		</van-nav-bar> 
		<van-steps :active="paystatus" style="margin-top: 55px;">
			<van-step>待支付</van-step>
			<van-step>待发货</van-step>
			<van-step>已发货</van-step>
			<van-step>已完成</van-step>
		</van-steps>
		<div class="oraddress1" style="margin-top: 10px;">
			<div class="oraddress1-name">
				<p class="orname1" v-html="orlistData.name"></p>
				<p class="ortel1" v-text="orlistData.tel"></p>
			</div>
			<p class="oraddress1-address" v-text="orlistData.address"></p>
		</div>
		<div class="goods">
			<div class="shop">
				<span>{{orlistData.shopname}}</span>
			</div>
			<div class="goods-one"  v-for="(item,index) in orlistData.shop" :key="index">
				<div class="goods-img">
					<img :src="item.img">
				</div>
				
				<div class="goods-deatail">
					<div class="goods-deatail-header">
						<p>{{item.title}}</p>
					</div>
					<div class="goods-deatail-size">
						<span>{{item.sizename}}</span>
					</div>
					<div class="goods-detail-prcie">
						<span><a>￥{{item.price.toFixed(2)}}</a></span>
						<a>x {{item.num}}</a>
					</div>
				</div>
			</div>
			<div class="goods-total">
				<div class="goods-detail-prcie1">
					<span>应付金额：<a>￥{{orlistData.money.toFixed(2)}}</a></span>
				</div>
				<div class="goods-detail-prcie1">
					<span>实付金额：<a>￥{{orlistData.vocherMoney.toFixed(2)}}</a></span>
				</div>
			</div>
			
		</div>
		
		  <div class="oraddata" style="margin-top: 9px;">
			<span style="float: left;">支付价格</span>
			<span style="float: right;color: red;" v-text="'￥'+numid"></span>
		</div> 
		 <div class="oraddata" style="margin-top: 9px;">
			<span style="float: left;">订单编号</span>
			<span style="float: right;" v-text="orlistData.orderId"></span>
		</div>
		<div class="oraddata" v-if="orlistData.postname">
			<span style="float: left;">快递名称</span>
			<span style="float: right;" v-text="orlistData.postname"></span>
		</div> 
		<div class="oraddata" v-if="orlistData.postid">
			<span style="float: left;">快递单号</span>
			<span style="float: right;" v-text="orlistData.postid"></span>
		</div> 
		<van-steps class="vanwuliu" style="border-top: 1px solid #F7F7F7;" direction="vertical" :active="logistics" active-color="#f44">
			<van-step v-for="(item,index) in wuliudata" :key="index">
				<p v-text="item.routeval"></p>
				<p v-text="item.routetime"></p>
			</van-step>
		</van-steps>
		<div class="bottom">
			<div class="bottom-div">
				<button class="bottom-btn">申请退款</button>
			</div>
		</div> 
		 <tabar style="position: relative;z-index: 9999;" :numid="numid"></tabar> -->
		<div class="addressInfo" @click="orderLog()" v-if="Track">
			<div class="address-letf">
				<van-icon name="logistics" />
			</div>
			<div class="address-center">
				<p v-text="logList.content">您的订单已由客户指定地点代收。如有疑问您可以联系配送员【袁玉峰，15606335819】确认。感谢您在京东购物，欢迎再次光临。</p>
				<span v-text="logList.msgTime"></span>
			</div>
			<div class="address-right">
				<van-icon name="arrow" />
			</div>
		</div>
		<div class="addressInfo userInfo">
			<div class="address-letf">
				<van-icon name="location-o" />
			</div>
			<div class="address-center">
				<p>{{orlistData.name}} {{orlistData.tel}}</p>
				<span v-text="orlistData.address">山东省日照市东港区山海天旅游度假区临时工作委员会观澜公寓</span>
			</div>
		</div>
		<van-steps :active="paystatus" style="margin-top: 0.1rem" active-color="#ffbb03" v-if="!Track">
			<van-step>待支付</van-step>
			<van-step>待发货</van-step>
			<van-step>已发货</van-step>
			<van-step>已揽件</van-step>
			<van-step>已完成</van-step>
		</van-steps>
		<div class="goods">
			<div class="shop">
				 <span>{{orlistData.shopname}}</span> 
				<!-- <span>浣洗</span> -->
			</div>
			 <div class="goods-one"  v-for="(item,index) in orlistData.shop" :key="index"> 
			
				<div class="goods-img" @click="goodsDetail(item)">
					 
					 <img :src="item.img">
					
				</div>
			    
				<div class="goods-deatail">
					<div class="goods-deatail-header">
						 <p>{{item.title}}</p> 
					</div>
					<div class="goods-deatail-size">
						 <span style="color:dimgray ;display:inline-block;padding: .01rem 0.05rem;border-radius: .03rem;margin: .05rem 0; background: rgba(233, 233, 233, 0.86); font-size: .13rem; font-weight: 500;" v-text="item.sizename">白色</span>
					</div>
					<div class="goods-detail-prcie">
						 <span><a>￥{{(item.price).toFixed(2)}}</a></span>
						<a>x {{item.num}}</a> 
					</div>
				</div>
				
			</div>
			
		</div>
		<div class="goodsInfo">
			<div class="goodsInfo-one">
				<label>订单编号：</label>
				<span v-text="orlistData.orderId">1188811118811</span>
			</div>
			<div class="goodsInfo-one" v-if="orlistData.postid">
				<label>快递单号：</label>
				<span v-text="orlistData.postid">378991111889011</span>
			</div>
			<div class="goodsInfo-one" v-if="orlistData.postname">
				<label >配送快递：</label>
				<span v-text="orlistData.postname">天天快递</span>
			</div>
			<div class="goodsInfo-two topline">
				<label>商品金额</label>
				<span>￥<span>{{(orlistData.vocherMoney-orlistData.postprice).toFixed(2)}}</span></span>
			</div>
			<div class="goodsInfo-two">
				<label>商品运费</label>
				<span>￥<span v-text="orlistData.postprice.toFixed(2)"></span></span>
			</div>
			<div class="goodsInfo-three">
				<label v-if="state != 0">实付金额：</label>
				<label v-if="state == 0">应付金额：</label>
				<span>￥<span v-text="orlistData.vocherMoney.toFixed(2)"></span></span>
			</div>
		</div>
		  
		
		<div class="bottom" v-if="state == 0">
			<div class="bottom-div">
				<!-- <button class="bottom-btn">申请退款</button> -->
				<button class="bottom-btn addbtn" v-if="state == 0" @click="pay(orlistData)">去支付</button>
			</div>
		</div> 
	</div>
</template>

<script>
	import tabar from '../../components/tabar.vue'
	import {
		dataorede,
		dataorderid,
		getProduct,
		payCreate
	} from '../../api.js'

	export default {
		data() {
			return {
				orlistData: '',
				logList:'',
				Track: true,
				state:'',
				
				paystatus: 3, //订单状态
				logistics: 2, //物流状态
				ordernum:'', 
				kauidinum:'',
				wuliudata:'',
			
				
			};
		},
		components: {
			tabar
		},
		mounted() {
			
			var self = this;
			this.state = this.$route.query.state
			const ordatas = {
				"status": 'orderTrack',
				"jdorderid": this.$route.query.orderId
			}
			if(typeof(this.$route.query.orderId)  == 'undefined' || this.$route.query.jdId  == ''){
				this.Track = false
				let ordatas1={
					"orderid": this.$route.query.id
				}
				dataorderid(ordatas1).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				});
			}else{
				getProduct(ordatas).then(res => { //订单物流
					if(res.data.msg == 'success'){
						let log = res.data.data.reverse()
						this.logList = log[0]
					}else{
						alert(res.data.msgText)
					}
				}).catch(err => {
					console.log(err)
				});
			}
           if(this.$route.query.state == 0){
			   this.Track = false
		   }
		   if(this.$route.query.state == 1){
		   		
		   }



			const ordata = {
				"status": "detail",
				'oid': self.$route.query.id
			};
			dataorede(ordata).then(res => {//订单data
				self.orlistData = res.data;
				self.paystatus = Number(res.data.statue);
			}).catch(err => {
				console.log(err)
			});


		},
		methods: {
			goodsDetail(item){
				if(this.$route.query.jdId  == ''){
					this.$router.push({
					 	path: '/goods?id=' + item.id
					})
				}else{
					this.$router.push({
					 	path: '/JDgoods?id=' + item.id
					})
				}
			   
			},
			orderLog(){
				// this.$router.push({
				// 	path: '/JDorderlog?id=' + this.$route.query.orderId
				// })
				
				this.$router.push({
					path: '/JDorderlog',
					query: {
						id: this.$route.query.id,
						orderId: this.$route.query.orderId,
						//jdId: item.jingdongId
						}
				})
			},
			pay(item){
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
				
			}
		}
	};
</script>

<style scoped>
	.goodsInfo{
		margin-top: .1rem;
		background: #fff;
		border-radius: .05rem;
		padding: .1rem .1rem;
		height: auto;
	}
	.goodsInfo-one{
		line-height: .25rem;
	}
	.goodsInfo-one label{
		color: gray;
	}
	.goodsInfo-two{
		display: flex;
		justify-content: space-between;
		line-height: .25rem;
	}
	.goodsInfo-three{
		display: flex;
		line-height: .25rem;
		justify-content: flex-end;
	}
	.goodsInfo-three label{
		font-size: .18rem;
		font-weight: 600;
	}
	.goodsInfo-three span{
		font-size: .18rem;
		color: red;
	}
	.topline{
		border-top: #eee solid .01rem;
		margin-top: .1rem;
		padding-top: .1rem;
	}
	.addressInfo {
		display: flex;
		background: #fff;
		padding: .1rem .05rem;
		align-items: center;
	}

	.address-letf {
		font-size: .2rem;
		color: #ffbb03;
	}

	.address-right {
		font-size: .2rem;
		color: #ffbb03;
	}

	.address-center {
		padding: 0 .05rem;
	}

	.address-center p {
		color: rgb(30, 30, 30);
		overflow: hidden;
		text-overflow: clip;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.address-center span {
		font-size: .13rem;
		color: gray;
	}
	.userInfo {
		border-top: #eee solid .01rem;
		
	}
	


	.goods {
		width: 100%;
		background: #fff;
		height: auto;
		margin-top: .1rem;
		padding-bottom: .1rem;
		border-radius: .05rem;
	}

	.goods .shop {
		padding: .1rem .15rem 0rem .1rem;
		font-weight: 600;
		width: 100%;
		font-size: .16rem;
	}

	.goods .goods-one {
		padding: .1rem;
		display: flex;
		justify-content: space-between;
	}

	.goods .goods-one .goods-img {
		width: 25%;

	}

	.goods .goods-one .goods-img img {
		width: 100%;
		height: .8rem;
	}

	.goods .goods-one .goods-deatail {
		width: 73%;


		display: flex;
		flex-wrap: wrap;
	}

	.goods-deatail-header {
		width: 100%;

	}

	.goods-deatail-header p {
		white-space: 95%;
		line-clamp: 2;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #323233;
	}

	.goods-deatail-size {
		width: 100%;
		color: #575758;
	}

	.goods-detail-prcie {
		width: 100%;
		color: #666;
		font-size: .14rem;
		display: flex;
		justify-content: space-between;
	}

	.goods-detail-prcie span a {
		color: #f44;
	}

	.goods-total {
		text-align: right;
		padding-right: .1rem;
		padding-left: .1rem;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.goods-detail-prcie1 {
		width: 100%;
		color: #666;
		font-size: .16rem;
		word-spacing: .01rem;
		letter-spacing: .01rem;
		display: flex;
		justify-content: flex-end;
	}

	.goods-detail-prcie1 span a {
		color: #f44;
	}

	.bottom {
		position: fixed;
		width: 100%;
		padding: 0 .1rem;
		bottom: 0;
		height: .5rem;
		background: #fff;
		box-shadow: 0 -2px 4px #eee;
		/*顶部阴影*/

	}

	.bottom-div {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.bottom-btn {
		border: #eee solid .02rem;
		color: #666666;
		border-radius: .15rem;
		word-spacing: .01rem;
		letter-spacing: .01rem;
		padding: .02rem .1rem;
		font-size: .15rem;
		height: .32rem;
	}

	.oraddress1 {
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
	}

	.oraddress1 .oraddress1-name {
		display: flex;
		padding: .1rem .1rem;
		justify-content: space-between;
	}

	.oraddress1 .oraddress1-address {
		padding: 0 .1rem 0.1rem .1rem;
	}


	.van-card .van-card__bottom {
		padding: .1rem 0;
		margin-top: 0 !important;
	}

	.oraddress {
		width: 100%;
		height: 1.2rem;
		background-color: #FFFFFF;
	}

	.oraddata {
		width: 100%;
		height: 0.5rem;
		background-color: #FFFFFF;
		line-height: 0.5rem;
		padding-left: 0.2rem;
		padding-right: 0.18rem;
		border-top: 1px solid #F7F7F7;
	}

	.oraddress p {
		margin-top: 0.2rem;
		font-size: 0.16rem;
	}

	.orname {
		float: left;
		margin-left: 0.2rem;
	}

	.ortel {
		float: right;
		margin-right: 0.2rem;
	}

	.oradd {
		float: left;
		margin-left: 0.15rem;
		padding: 0 .1rem .1rem 0;

	}

	.van-card__thumb img {
		width: 100%;
		height: 100%;
	}

	.cartlists {
		margin-top: 0.1rem;
	}

	.cartlists .van-card:not(:first-child) {
		margin-top: -10px;
	}

	.van-card .van-card__bottom {
		margin-top: 30px;
	}

	.vanwuliu {
		width: 100%;
		height: auto;
		margin-bottom: 1.5rem;
	}
	.addbtn{
		border: rgb(255, 187, 3) solid .02rem;
		margin-left: .1rem;
		color: rgb(255, 187, 3)
	}
	/deep/ .van-step--horizontal.van-step--finish .van-step__circle, .van-step--horizontal.van-step--finish .van-step__line{
		background-color:#969799;
	}
	/deep/ .van-step--horizontal.van-step--finish .van-step__line{
		background-color:#ebedf0;
	}
</style>
