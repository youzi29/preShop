<template>
	<div id="app-shopXq">
		<!-- 头部标题 -->
	<!-- 	<van-nav-bar style="position: fixed;top: 0px;left: 0px;bottom: 0;right: 0;width: 100%;">
			<img slot="title" style="width: 20px;height: 20px;margin-top: 15px;margin-left: 50px;" src="../assets/user.png" />
			<span slot="title" style="position: relative;top: -32px;">浣洗商城</span>
		</van-nav-bar> 
		<div style="margin-top: 46px;"></div>-->
		<!--头部按钮-->
		<van-swipe :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(bannerlist,index) in imgtop" :key="index" class="swipeimg">
				<img :src="bannerlist.url" @click="showPopup(bannerlist.url)" />
			</van-swipe-item>

		</van-swipe>
		<van-popup v-model="show">
			<!--显示大图-->
			<img :src="topimg" @click="hidden()" style="max-width: 4rem;">
		</van-popup>
		<!--底部导航栏-->
		<div class="shopxq-bottom-btn">
			<!-- <ul>
				<li>
					<router-link to="/"><img src="http://liangzhong.oss-cn-hangzhou.aliyuncs.com/newwap/shangpin/icon_shouye@2x.png"
						 alt="" />
						<p>首页</p>
					</router-link>
				</li>
				<li>
					<router-link to="/card"><img src="http://liangzhong.oss-cn-hangzhou.aliyuncs.com/newwap/shangpin/gwccc.png" alt="" />
						<p>购物车</p>
					</router-link>
				</li>
			</ul>

			<span class="ljgm shuangbtn" @click="guigexianshi()">立即购买</span>
			<span class="jrshopcart shuangbtn" @click="shoppinglist()">加入购物车</span>
			<div class="ljfdingjins" style="display: none;">
				<p>商品已下架</p>
			</div> -->
			<div class="bottom">

				<div class="small-icon">
					<router-link to="/">
						<div class="small-icon-one">
							<span>
								<van-icon name="wap-home" /></span>
							<div>首页</div>
						</div>
					</router-link>

					<div class="small-icon-one" @click="service()">
						<span>
							<van-icon name="chat-o" /></span>
						<div>客服</div>
					</div>
					<router-link to="/card">
						<div class="small-icon-one">
							<span>
								<van-icon name="cart-o" /></span>
							<div>购物车</div>
						</div>
					</router-link>
				</div>
				<div class="bot-btn">
					<span style="background: rgb(251, 160, 19)" @click="shoppinglist()">加入购物车</span>
					<span style="background: rgb(241, 62, 59)" @click="guigexianshi()">立即购买</span>
				</div>
			</div>
		</div>

		<!--shop信息-->
		<div class="goodsxinxi">
			<h3 v-text="goodsdata.title"></h3>
			<p class="jiage">
				<span style="font-size: 0.16rem;">￥</span>
				<span style="font-size: 0.20rem;">{{goodsprice}}</span>
			</p>
			<div class="priceInfo">
				<div>
					运费
					<span v-text="">{{goodspost}}</span>
					<span></span>
				</div>
				<div v-show="true">已售出：<span v-text="goodsdata.sellNum">666</span></div>
			</div>
		</div>

		<!-- <div class="shopname1">
			<div>
				 店铺名称：<a>{{goodsdata.shopname}} </a>
			</div>
		</div> -->

		<!-- <div class="shopxq" style="text-align: center; display: flex;align-items: center;justify-content: center; font-weight: 500;">
			 <span>宝贝详情</span>
				
			 <span>评价</span> 
		</div> -->
		<!--商品规格 -->
		<!-- <div class="goodssize">
			<div class="goodssize-data">
				<div class="goodssize-header">
					<div>规格</div>
					<div>价格</div>
					<div>库存</div>
					<div>净重</div>
					<div>运费</div>
				</div>
				<div class="goodssize-header topline" v-for="(item , index) in goodssize">
					<div class="one">{{item.name}}</div>
					<div>{{item.price}}</div>
					<div>{{item.num}}</div>
					<div>{{item.weight}}</div>
					<div>{{item.postprice}}</div>
				</div>
			</div>
		</div> -->
		<div class="details-img">
			<img v-for="(imglist,index) in imgbottom" :key="index" :src="imglist.url" @click="showPopup1(imglist.url)" v-if="imgbottom[0].url.length < 300" />
			<div v-else >
				<span v-html="imgbottom[0].url"></span>
			</div>
		</div>
		<van-popup v-model="show1">
			<img :src="botimg" style="width: 3.4rem;" @click="hidden1()" />
		</van-popup>

		<div style="width: 100%;height: 0.6rem;"></div>

		<!--弹出框模块-->
		<template>
			<!--加入购物车-->
			<div class="fixmodul" v-show="popup">
				<div style="width: 100%;height:5rem;background-color:rgba(0,0,0,0.4);"></div>
				<div class="shopguige">
					<div class="shopguige-topxinxi">
						<span class="guanbi"><img src="https://wx.ihuanxi.cn/kd/upload/20180906/20190122/item15481171625473.png" @click="close" /></span>
						<img :src="smallimg" />
						<h3 class="xsyh-xxx" v-text="'￥'+price">￥12.00</h3>
						<p>库存量 <span v-text="num"></span> 件</p>
					</div>
					<div class="xuanziguoge-xzk">
						<div class="guigeyangshi">
							<h4>请选择规格</h4>
							<span v-for="(item,index) in goodssize" :key="index" :class="{active:currentIndex == index}" @click="activeFun( index,item, item.id , item.num , item.price)">{{item.name}}</span>
						</div>
						<div class="guigenum">
							<span class="xsyh-btt">选择购买数量</span>
							<div>
								<span class="jian" @click="shopingjian"><i></i></span>
								<span class="num" contenteditable="true" v-text="goodsnum">1</span>
								<span class="jia" @click="shopingjia"><i><van-icon name="plus" /></i></span>
							</div>
						</div>
					</div>
					<button class="quedinganniu" @click="addcard">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</button>
				</div>
			</div>
		</template>
		<!--立即购买-->
		<template>
			<div class="fixmodul" v-show="goodse">
				<div style="width: 100%;height:5rem;background-color:rgba(0,0,0,0.4);"></div>
				<div class="shopguige">
					<div class="shopguige-topxinxi">
						<span class="guanbi"><img src="https://wx.ihuanxi.cn/kd/upload/20180906/20190122/item15481171625473.png" @click="close" /></span>
						<img :src="smallimg" />
						<h3 class="xsyh-xxx" v-text="'￥'+price">￥12.00</h3>
						<p>库存量 <span v-text="num"></span> 件</p>
					</div>
					<div class="xuanziguoge-xzk">
						<!-- 规格组件 -->
						<div class="guigeyangshi">
							<h4>请选择规格</h4>
							<span v-for="(item,index) in goodssize" :key="index" :class="{active:currentIndex == index}" @click="activeFun( index , item, item.id , item.num , item.price)">{{item.name}}</span>
						</div>
						<div class="guigenum">
							<span class="xsyh-btt">选择购买数量</span>
							<div>
								<span class="jian" @click="shopingjian"><i></i></span>
								<span class="num" contenteditable="true" v-text="goodsnum">1</span>
								<span class="jia" @click="shopingjia"><i><van-icon name="plus" /></i></span>
							</div>
						</div>
					</div>
					<button class="quedinganniu" @click="goodscard">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</button>
				</div>
			</div>
		</template>
		<Login @childevent="closeLogin" v-if="showLogin"></Login>
	</div>
</template>

<script>
	import {
		goods,
		cardlin,
		shopbuy,
		check
	} from '../api.js'
	import goodscss from './../css/goods.css';

	export default {

		name: "goods",
		data() {
			return {
				showLogin: false, //登录组件
				show: false,
				topimg: '',

				show1: false,
				botimg: '',

				goodsprice: '',
				goodspost: '',
				currentIndex: null,
				popup: false,
				goodsnum: "1", //购物数量
				sizeid: '', //规格id
				num: '', //库存
				price: '', //商品价格
				navList: [ //规格
					{
						text: 's',
						isActive: false
					},
					{
						text: 'm',
						isActive: false
					},
					{
						text: 'xl',
						isActive: false
					},
					{
						text: 'xxl',
						isActive: false
					}
				],
				goodsdata: [], //规格详情
				imgtop: '',
				imgbottom: '',
				goodse: false,
				aurl: 'https://wx.ihuanxi.cn/kd/newwashcache/database/shop/',
				titleb: '浣洗商城',
				smallimg: '',
				goodsdata: '',
				goodssize: '', //商品规格
			}
		},
		mounted: function() {
			var self = this;
			var goodsid = {
				'id': self.$route.query.id,
			};
			goods(goodsid).then(res => {
				self.goodsdata = res.data;
				self.imgtop = res.data.image.top; //滚动图
				self.imgbottom = res.data.image.bottom; //详情图
				self.smallimg = res.data.image.top[0].url; //弹框小图
				this.goodssize = this.goodsdata.size;
				this.goodssize.sort(function(val1, val2) {
					return val1.price - val2.price
				})
				this.goodsprice = this.goodssize[0].price //商品价格
				this.goodspost = this.goodssize[0].postprice

				this.price = this.goodssize[0].price //商品价格
				this.num = this.goodssize[0].num

				console.log(this.goodsdata)
			}).catch(err => {
				console.log(err)
			})


		},
		methods: {
			closeLogin() {
				this.showLogin = false
			},
			checklogin() {
				var checkdata = {
					status: 'check'
				};
				check(checkdata)
					.then(res => {
						if (res.data.msg == 'login') {
							localStorage.setItem('logininit', JSON.stringify({
								url: window.location.href
							}));
							window.location.href = 'https://wx.ihuanxi.cn/kd/newwashcache/login/';
							//this.showLogin = true
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			hidden() {
				this.show = false
				this.topimg = ''
			},
			hidden1() {
				this.show1 = false
				this.botimg = ''
			},
			showPopup(img) {

				this.show = true;
				this.topimg = img;
				//alert(111)
			},
			showPopup1(img) {
				this.show1 = true;
				this.botimg = img
			},
			service() {
				this.$router.push({
					path: '/service',
					query: {
						id: this.$route.query.id,
					}
				})
			},

			shoppinglist() {
				this.popup = true //购物车
			},
			guigexianshi() {
				this.goodse = true //立即购买
			},
			close() {
				this.popup = false
				this.goodse = false
			},
			shopingjia() {
				var self = this;
				var goodssum = self.goodsnum;
				goodssum = parseInt(goodssum) + 1;
				self.goodsnum = goodssum;
			},
			shopingjian() {
				var self = this;
				var goodssum = self.goodsnum;
				goodssum = parseInt(goodssum) - 1;
				if (goodssum == 0) {
					alert("最少选择一件")
				} else {
					self.goodsnum = goodssum;
				}

			},
			activeFun: function(index, data, id, num, price) { //规格选择
				this.goodssize.forEach(function(obj) {
					obj.isActive = false;
				});
				this.currentIndex = index
				data.isActive = !data.isActive;
				this.sizeid = id; //商品规格id
				this.num = num; //商品库存
				this.price = price; //该规格的商品价格
				console.log(id)
				//console.log(data.text)
			},
			addcard() { //确定添加购物车
				var self = this;
				const carddata = {
					"id": self.$route.query.id,
					"num": self.goodsnum,
					"sizeid": this.sizeid
				};
				if (this.sizeid == '') {
					this.$toast('请选择规格')
					return
				}
				cardlin(carddata).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.$toast({
							duration: '1000',
							message: '添加购物车成功'
						});
					} else {
						this.$toast({
							duration: '1000',
							message: msg
						});
					}

					this.popup = false

					console.log(res.data);
				}).catch(err => {
					console.log(err)
				})
			},
			goodscard() { //确定立即购买
				var self = this;
				if (self.sizeid == '') {
					self.$toast("请选择规格")
					return;
				}
				const shopbuydata = {
					"id": self.$route.query.id,
					"num": self.goodsnum,
					"sizeid": this.sizeid
				};
				console.log(shopbuydata)
				shopbuy(shopbuydata).then(res => {
					this.$router.push({
						path: '/order?id=' + res.data.orderId + '&' + 'id1=' + self.$route.query.id
					})
					console.log(res.data)
				}).catch(err => {
					console.log(err)
				})
			}
		},

	}
</script>

<style scoped>
	
	.ssd-module-wrap div{
		/* width: 3.75rem !important;
		 height: 3.75rem !important; */
		width:3.75rem !important ;
		height: 6rem !important;
	}
	.bottom {
		height: 100%;
		width: 100%;
		font-family: "微软雅黑", "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
		display: flex;
		font-weight: normal;
	}

	.small-icon {
		width: 40%;
		display: flex;
		justify-content: space-around;
		align-items: center;

	}

	.small-icon-one {
		text-align: center;
		color: #050202d6;
		font-size: .12rem;
	}

	.small-icon-one span {
		font-weight: 600;
		font-size: .21rem;
		color: rgb(253, 194, 124);
	}

	.small-icon-one div {
		font-size: .1rem;
	}

	.bot-btn {
		width: 60%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.bot-btn span {

		height: .38rem;
		width: 46%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: .1rem;
		padding-right: .1rem;
		border-radius: .3rem;
	}

	.one {
		/* display: flex;
		border:  #000000 solid 1px;
		flex: 1;
		flex-wrap: nowrap; */
	}

	.shopname1 {
		padding-left: .14rem;
		padding-top: .1rem;
		background: #fff;
		font-weight: 600;
	}

	.goodsxinxi {
		height: auto !important;
		background: #fff;
		padding: .05rem 0.1rem 0rem .1rem;


	}

	.priceInfo {
		display: flex;
		color: #989898;
		padding-bottom: .1rem;
		font-size: .13rem;
		justify-content: space-between;
	}

	.jiage {
		color: red
	}

	.shopxinxi h3 {
		/*overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;*/
	}

	.goodssize {
		width: 100%;
		padding: .05rem;
		background: #fff;
	}

	.goodssize-data {
		border: #EEEEEE solid .015rem;

	}

	.goodssize-header {
		display: flex;
		color: #333;
		justify-content: space-around;
	}

	.goodssize-header div {
		width: 20%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: .14rem;
	}

	.topline {
		border-top: #EEEEEE solid .015rem;
	}
</style>
