<template>
	<!--订单详情-->
	<div>
		<van-nav-bar style="position: fixed;top: 0px;left: 0px;bottom: 0;right: 0;width: 100%;z-index: 999999;">
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
		
		 <!-- <div class="oraddata" style="margin-top: 9px;">
			<span style="float: left;">支付价格</span>
			<span style="float: right;color: red;" v-text="'￥'+numid"></span>
		</div> -->
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
	</div>
</template>

<script>
	import tabar from '../components/tabar.vue'
	import {
		dataorede,
		dataorderid
	} from '../api.js'

	export default {
		data() {
			return {
				orlistData: '',
				//aurl: 'https://wx.ihuanxi.cn/kd/newwashcache/database/shop/',
				aurl :'http://223.247.202.40:8088/shop/',
				numid: 4,
				paystatus: 2, //订单状态
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
			const ordata = {
				"status": "detail",
				'oid': self.$route.query.id
			};
			const ordatas = {
				"orderid": this.$route.query.id
			};
			//订单data
			dataorede(ordata).then(res => {
				self.orlistData = res.data;
				self.paystatus = Number(res.data.statue);
				console.log(res.data.statue)
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
			//订单物流
			dataorderid(ordatas).then(res => {
				var ordatasData = res.data;
				self.ordernum = ordatasData.orderid;
				self.kauidinum = ordatasData.postid;
				self.wuliudata = ordatasData.data;
				
				self.logistics = Number(ordatasData.data.length-1)
			}).catch(err => {
				console.log(err)
			});
		},
		methods: {

		}
	};
</script>

<style scoped>
	.goods{
		width: 100%;
		background: #fff;
		height:auto;
		margin-top: .1rem;
		padding-bottom: .1rem;
	}
	.goods .shop{
		padding: .1rem .15rem 0rem .1rem ;
		font-weight: 600;
		width: 100%;
		font-size: .16rem;
	}
	
	.goods .goods-one{
		padding: .1rem;
		display: flex;
		justify-content: space-between;
	}
	.goods .goods-one .goods-img{
		width: 25%;
		
	}
	.goods .goods-one .goods-img img{
		width: 100%;
		height: .8rem;
	}
	.goods .goods-one  .goods-deatail{
		width: 73%;
		
		
		display: flex;
		flex-wrap: wrap;
	}
	.goods-deatail-header {
		width: 100%;
		
	}
	.goods-deatail-header p{
		white-space: 95%;
		line-clamp: 2;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #323233 ;
	}
	.goods-deatail-size{
		width: 100%;
		color: #575758;
	}
	.goods-detail-prcie{
		width: 100%;
		color: #666;
		font-size:.14rem ;
		display: flex;
		justify-content: space-between;
	}
	.goods-detail-prcie span a{
		color: #f44;
	}
	.goods-total{
		text-align: right;
		padding-right: .1rem;
		padding-left: .1rem;
		flex-wrap: wrap;
		justify-content: flex-end;
	}
	.goods-detail-prcie1{
		width: 100%;
		color: #666;
		font-size:.16rem ;
		word-spacing: .01rem;
		letter-spacing: .01rem;
		display: flex;
		justify-content: flex-end;
	}
	.goods-detail-prcie1 span a{
		color: #f44;
	}
	
	.bottom{
		position: fixed;
		width: 100%;
		padding: 0 .1rem;
		bottom: 0;
		height: .5rem;
		background: #fff;
		box-shadow: 0 -2px 4px #eee; /*顶部阴影*/
		
	}
	.bottom-div{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.bottom-btn{
		border: #eee solid .02rem;
		color: #666666;
		border-radius: .15rem;
		word-spacing: .01rem;
		letter-spacing: .01rem;
		padding: .02rem .1rem;
		font-size: .15rem;
		height: .32rem;
	}
	.oraddress1{
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
	}
	.oraddress1 .oraddress1-name{
		display: flex;
		padding: .1rem .1rem;
		justify-content: space-between;
	}
	.oraddress1 .oraddress1-address{
		padding: 0 .1rem 0.1rem .1rem;
	}
	
	
	.van-card .van-card__bottom{
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
</style>
