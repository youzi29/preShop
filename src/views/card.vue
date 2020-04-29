<template>
	<!-- <div>
		<van-nav-bar style="position: fixed;top: 0px;left: 0px;bottom: 0;right: 0;width: 100%;z-index: 99999;">
			<img slot="title" style="width: 20px;height: 20px;margin-top: 15px;margin-left: 55px;" src="../assets/user.png" />
			<span slot="title" style="position: relative;top: -32px;margin-left: 10px;">浣洗商城</span>
		</van-nav-bar>
		<div style="height: 46px;"></div>
		<van-checkbox-group v-model="result0">
			<div class="shopname-card" v-for = "(item , index ) in cardData" style="background: #fff;margin-top: .15rem;">
				<div class="">
					<span style="padding-left:.45rem ; padding-top: .15rem; display: inline-block; font-weight: 600;">{{item.shop}}</span> 
				</div>
				<van-checkbox-group v-model="result">
				<div class="goodscardlist" v-for="(item1,index) in item.info" :key="index">
					<van-checkbox :name="item1" style="margin-top: 0.5rem;display: inline;float: left;"></van-checkbox>
					<router-link :to="'/goods'+'?id='+item1.productId">
						<img :src="item1.thumb" />
					</router-link>
					<p v-text="item1.title"></p> 
					<p style="color: red;">￥<span v-text="item1.price"></span></p>
					<p>
						<span style="color:dimgray ; font-size: .13rem; font-weight: 500;">规格:{{item1.sizename}}</span>
						<span style="color:dimgray ; font-size: .13rem; font-weight: 500;margin-left: .12rem;">运费:{{item1.postprice}}</span>
					</p>
					
					<div class="stepper">
						<van-button @click="deletecart(item1,index)" style="min-width: 30px;margin-right: 0.2rem;" size="small" type="default">
							<van-icon name="delete" />
						</van-button>
						<van-button size="small" style="min-width: 30px;" type="default" @click="subtract(item1)">-</van-button>
						<input type="number" @change="activeCart(item1)" v-model="item1.num" class="van-stepper__input" style="width: 0.3rem;height: 0.26rem;font-size: 0.15rem;">
						<van-button size="small" style="min-width: 30px;" type="default" @click="suminput(item1)">+</van-button>
					</div>
				</div>
				</van-checkbox-group>
			</div>
		</van-checkbox-group>
		

		<div style="height: 1.2rem;"></div>
		<div class="buttom" v-if="cartshow">
			<div style="float: right;">
				<span style="margin-right: 0.2rem;color: red;">￥<span v-text="totalPrice"></span></span>
				<van-button type="danger" @click="surepay">&nbsp;结&nbsp;算&nbsp;</van-button>
			</div>
		</div>

		<tabar :numid="numid"></tabar>
	</div> -->
	<div>
		<van-checkbox-group v-model="result0">
			<div class="shopname-card1" v-for = "(item , index ) in cardData" >
				<div>
					<span class="shopname-my">
						<i><van-icon name="shop-o" /></i>
						<b>{{item.shop}}</b>
					</span> 
				</div>
				<van-checkbox-group v-model="result">
				<div class="goodscardlist1" v-for="(item1,index) in item.info" :key="index">
					<div style="circle">
						<van-checkbox :name="item1" checked-color="#FFBB03" ></van-checkbox>
					</div>
					
					<div class="card-info">
						
							<img :src="item1.thumb" @click="goodsDetail(item1)"/>
						
						<div class='card-info-text'>
							<p class="card-info-text-p1" v-text="item1.title"></p>
							
							<p class="card-info-text-p2">
								<span style="color:dimgray ;display:inline-block;padding: .01rem 0.05rem;border-radius: .03rem;margin: .05rem 0; background: rgba(233, 233, 233, 0.86); font-size: .13rem; font-weight: 500;">{{item1.sizename}}</span>
							</p>
							<p style="color: red;">￥<span v-text="item1.price"></span><span style="color:dimgray ; font-size: .13rem; font-weight: 500;margin-left: .12rem;">运费:{{item1.postprice}}</span> </p>
							
						</div>
						
					</div>
					<div class="stepper1">
						<van-button @click="deletecart(item1,index)" style="min-width: 30px;margin-right: 0.2rem;" size="small" type="default">
							<van-icon name="delete" />
						</van-button>
						<van-button size="small" style="min-width: 30px;" type="default" @click="subtract(item1)">-</van-button>
						<input type="number" @change="activeCart(item1)" v-model="item1.num" class="van-stepper__input" style="width: 0.3rem;height: 0.26rem;font-size: 0.15rem;">
						<van-button size="small" style="min-width: 30px;" type="default" @click="suminput(item1)">+</van-button>
					</div>
				</div>
				</van-checkbox-group>
			</div>
		</van-checkbox-group>
		
	
		<div style="height: 1.2rem;"></div>
		<!-- <div class="buttom" v-if="cartshow">
			<div style="float: right;">
				<span style="margin-right: 0.2rem;color: red;">￥<span v-text="totalPrice"></span></span>
				<van-button type="danger" @click="surepay">&nbsp;结&nbsp;算&nbsp;</van-button>
			</div>
		</div> -->
		<div class="buttom" v-if="cartshow">
			<div class="btn">
				<span><b>总计:</b><b>￥{{totalPrice}}</b></span>
				<button type="danger" @click="surepay">&nbsp;结&nbsp;算&nbsp;</button>
			</div>
		</div>
	
		<tabar :numid="numid"></tabar>
	</div>
</template>
<script>
	import tabar from '../components/tabar.vue'
	import {
		cardlist,
		cardedit,
		deledit
	} from '../api.js'
	export default {
		inject: ['reload'],
		data() {
			return {
				number: "1",
				imageUrl: "https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
				cardData: [],
				result0: [0],//店铺
				result: [],//店铺下的商品
				
				aurl: 'https://wx.ihuanxi.cn/kd/newwashcache/database/shop/',
				numid: 2,
				cartshow: true,
				num:''
			};
		},
		components: {
			tabar
		},
		computed: {
			totalPrice() {
				var self = this;
				let cartdatas = {
					price: 0,
					num: 0
				}
			
				//console.log(self.result)
				//let price1 = 0 ;
				let tprice = 0;
				for (let i = 0; i < self.result.length; i++) {
					tprice = self.result[i].price*self.result[i].num + self.result[i].postprice +tprice
					console.log(tprice.toFixed(1) )
					 //alert( self.cardData[self.result[i]].price)
					 //alert(self.cardData[self.result[i]].postprice )
					// cartdatas.price = self.cardData[i].num * self.cardData[i].price + cartdatas.price + self.cardData[i].postprice;
					 // cartdatas.price = self.cardData[self.result[i]].num * self.cardData[self.result[i]].price + cartdatas.price + self.cardData[self.result[i]].postprice;
					// cartdatas.num = self.cardData[i].num + cartdatas.num
				}
				
				//return cartdatas.price.toFixed(1);
				return tprice.toFixed(1);
				
			},
		},
		created() {
			var self = this;
			cardlist().then(res => {
				
				if (res.data == '') {
					self.cartshow = false;
				}else{
					self.cardData = res.data;
					console.log(res.data)
				}


			}).catch(err => {
				console.log(err)
			})
			this.$store.state.count = 2;
		},
		methods: {
			goodsDetail(item){
				if(item.jingdongId  == 0){
					this.$router.push({
					 	path: '/goods?id=' + item.productId
					})
				}else{
					this.$router.push({
					 	path: '/JDgoods?id=' + item.productId
					})
				}
			   
			},
			activeCart(item) {
				var self = this;
				var editdata = {
					'id': item.id,
					'num': item.num
				}
				cardedit(editdata).then(res => {
					if (res.data.msg == 'false') {
						alert(res.data.msgText);
						this.reload();
					};
					console.log(res.data.msg)
				}).catch(err => {
					console.log(err)
				})
			},
			surepay() {
				let cartid = [];
				let sizeid = [];
				console.log(this.result)
				 for (let i = 0; i < this.result.length; i++) {
				 	cartid.push(this.result[i].id);
				 	sizeid.push(this.result[i].productId);
				 }
				 var string = cartid.join(',')
				 var string1 = sizeid.join(',')
				 console.log(string);
				 this.$router.push({
				 	path: '/order',
				 	query: {
				 		id: string,
				 		id1: string1
					}
				 })
				

			},
			govuex: function() {},
			shopcartbuy() {
				console.log(this.cardData)
			},
			onClickLeft() {
				this.$router.back(-1)
			},
			onClose(clickPosition, instance) {
				switch (clickPosition) {
					case 'left':
					case 'cell':
					case 'outside':
						instance.close();
						break;
					case 'right':
						instance.close();

						break;
				}
			},
			deletecart(item, index) {
				var deldata = {
					'id': item.id,
					"act": 'del'
				}
				deledit(deldata).then(res => {
					this.reload();
				}).catch(err => {
					console.log(err)
				})
			},
			suminput(item) {
				var self = this;
				var sum = item.num;
				sum = parseInt(sum) + 1;
				item.num = sum;
				var editdata = {
					'id': item.id,
					'num': item.num
				}
				cardedit(editdata).then(res => {
					if (res.data.msg == 'false') {
						alert(res.data.msgText);
						this.reload();
					};
					console.log(res.data.msg)
				}).catch(err => {
					console.log(err)
				})

			},
			subtract(item) {
				var self = this;
				var sum = item.num;
				sum = parseInt(sum) - 1;
				if (sum == 0) {
					alert("最少选择一件")
				} else {
					item.num = sum;
					var editdata = {
						'id': item.id,
						'num': item.num
					}
					cardedit(editdata).then(res => {

					}).catch(err => {
						console.log(err)
					})
				}

			}
		}
	};
</script>
<style scoped>
	.shopname-my{
		padding-left: .25rem !important;
		padding-top: .15rem;
		display: inline-block; 
		font-weight: 600;
		padding-bottom: .04rem;
		display: flex;
		align-items: center;
	}
	.shopname-my i{
		margin-right: .03rem;
		font-size: .18rem;
	}
	.shopname-card1{
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
		height: 1.5rem;
		overflow: hidden;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: .1rem;
		
	}
	.circle{
		width: 5%;

	}
	.card-info{
		display: flex;
		width: 93%;
	}

	.goodscardlist1 img {
		width: 1rem;
		height: 1rem;
		
		margin-left: 0.05rem;
		margin-right: .1rem;
		border-radius: .03rem;
		
	}
    .card-info-text-p1{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: .16rem;
		line-height: .25rem;
	}
	.card-info-text-p2{
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
	
	.stepper1{
		text-align: right;
		width: 100%;
	}
	
	.van-hairline--top-bottom {
		width: 100%;
		height: 1rem;
	}

	.van-card__title {
		font-size: 0.14rem;
	}

	.buttom {
			width: 100%;
			
			background-color:#fff;
			font-size: 0.15rem;
			position: fixed;
			bottom: 7.3%;
			border-top: 1px solid #F7F7F7;
		}
	.btn{
		 display: flex;
		 align-items: center;
		 height: .5rem;
		 
		 background-color:#fff;
		justify-content: flex-end;
	}
	.btn span{
		 display: inline-block;
		 color: rgb(241, 62, 59);
	}
	.btn button{
		 height: .37rem;
		color: #fff;
		font-weight: 600;
		padding-left: .3rem ;
		 display: flex;
		 align-items: center;
		 justify-content: center;
		 padding-left: .25rem;
		 padding-right: .25rem;
		 border-radius: .3rem;
		 background:  rgb(241, 62, 59);
		 margin-left: .1rem;
		 margin-right: .06rem;
	}

	.stepper {
		margin-top: 0.3rem;
		float: right;
		margin-right: 0.15rem;
	}

	.van-stepper {
		border: 1px solid #999;
	}
</style>
