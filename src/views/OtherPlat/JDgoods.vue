<template> <!--京东商品 -->
	<div id="app-shopXq">
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
					<button class="button1" @click="shoppinglist()"  :disabled='disabled' :class="[disabled ? 'backgroung' : '']">加入购物车</button>
					<button class="button2"  @click="guigexianshi()" :disabled='disabled' :class="[disabled ? 'backgroung' : '']">立即购买</button>
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
		</div>
		<div class="send" >
			<div class="send-name">送至</div>
			<!-- <div class="send-address" v-html="userAddress">四川省成都市新都区大丰街道</div> -->
			<div class="send-address">
				<span v-html="userAddress">四川省成都市新都区大丰街道</span>
				<!-- <div class="stock">无货(暂时写死)</div> -->
				<div class="stock">{{stockState}}</div>
			</div>
			<div class="send-select" @click="selectSend()"><van-icon name="weapp-nav" /></div>
			<van-popup v-model="selectaddress" position="bottom" :style="{ height: '55%' }" >
				<div class="pop-send">
					<h3 class="pop-name">配送至</h3>
					 <van-radio-group v-model="radio" v-for="(item , index) in addresslist" :key= "index">
					  <van-radio style="margin-top: .05rem;" :name="index"  icon-size="10px" checked-color="#FFBB03" @click="sureAddress(item)">{{item.address}}</van-radio>
					</van-radio-group> 
					<router-link to="/addrbuild">
					<button class="addOther" >添加其它地址</button>
					</router-link>
				</div>
			</van-popup>
		</div>

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
						<!-- <p>库存量 <span v-text="num"></span> 件</p> -->
						<p>{{stockState}}</p>
					</div>
					<div class="xuanziguoge-xzk">
						<div class="guigeyangshi">
							<h4>请选择规格</h4>
							<span v-for="(item,index) in goodssize" :key="index" :class="{active:currentIndex == index}" @click="activeFun( index,item, item.JDid,item.id , item.num , item.price ,  item.img)">{{item.name}}</span>
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
						<!-- <p>库存量 <span v-text="num"></span> 件</p> -->
						<p>{{stockState}}</p>
					</div>
					<div class="xuanziguoge-xzk">
						<!-- 规格组件 -->
						<div class="guigeyangshi">
							<h4>请选择规格</h4>
							<span v-for="(item,index) in goodssize" :key="index" :class="{active:currentIndex == index}" @click="activeFun( index , item,item.JDid, item.id , item.num , item.price , item.img)">{{item.name}}</span>
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
		shopbuy,
		check,
		detail_jdinfo,
		address_select,
		detail_jdnum,
		jdcart_add,
		shop_jd_buy
		
	} from '../../api.js'
	import goodscss from '@/css/goods.css'

	export default {

		name: "goods",
		data() {
			return {
				userAddress:'',
				stockState: '有货-下单立即发货',
				JDid:'',//商品索引
				disabled:false,
				
				addresslist:[],
				selectaddress: false,
				 result: [],
				 radio:0,
				
				 provinceid:0,
				 cityid:0,
				 countyid:0,
				 townid:0,
				 
				  
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
			detail_jdinfo(goodsid).then(res => {
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
				if(this.goodsdata.town == 0){
					this.userAddress = this.goodsdata.province_name + this.goodsdata.city_name + this.goodsdata.county_name
				}else{
					this.userAddress = this.goodsdata.province_name + this.goodsdata.city_name + this.goodsdata.county_name+this.goodsdata.town_name
				}
				
				this.provinceid = this.goodsdata.province
				this.cityid = this.goodsdata.city
				this.countyid = this.goodsdata.county
				this.townid = this.goodsdata.town
				this.JDid = this.goodssize[0].JDid
				
				this.stock();
				

				console.log(this.goodsdata)
			}).catch(err => {
				console.log(err)
			})
			this.addressList()


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
				this.stock()
			},
			shopingjian() {
				var self = this;
				var goodssum = self.goodsnum;
				goodssum = parseInt(goodssum) - 1;
				if (goodssum == 0) {
					alert("最少选择一件")
				} else {
					self.goodsnum = goodssum;
					this.stock()
				}

			},
			activeFun: function(index, data,Jid, id, num, price , img) { //规格选择
				this.goodssize.forEach(function(obj) {
					obj.isActive = false;
				});
				this.currentIndex = index
				data.isActive = !data.isActive;
				this.sizeid = id; //商品规格id
				this.num = num; //商品库存
				this.price = price; //该规格的商品价格
				this.smallimg = img;
				this.JDid = Jid;
				
				this.stock()
				console.log(this.JDid)
				//console.log(data.text)
			},
			addcard() { //确定添加购物车
			  this.checklogin()//验证是否登录
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
				jdcart_add(carddata).then(res => {
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
			    this.checklogin()//验证是否登录
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
				shop_jd_buy(shopbuydata).then(res => {
					this.$router.push({
						path: '/order',
						query: {
							id: res.data.orderId,
							id1: self.$route.query.id,
							}
					})
					console.log(res.data)
				}).catch(err => {
					console.log(err)
				})
			},
			addressList(){
				var self = this;
				var data = {
					
				};
				address_select(data).then(res => {
					var list1 = []
					this.list1 = res.data
					let len = this.list1.length
					for (let i = 0; i < len; i++) {
						if(this.list1[i].towm == null){
							this.list1[i].town_name = ''
						}
						this.addresslist.push({
							id: this.list1[i].id,
							name: this.list1[i].name,
							tel: this.list1[i].tel,
							address: this.list1[i].province_name + this.list1[i].city + this.list1[i].county_name + this.list1[i].town_name ,
							
							provinceid: this.list1[i].province,
							cityid: this.list1[i].cityid,
							countyid: this.list1[i].county,
							towmid: this.list1[i].towm,
							tel: this.list1[i].tel,
							isDefault: this.list1[i].default
						})
					}
					
				}).catch(err => {
					console.log(err)
				})
			},
			selectSend(){
				this.selectaddress = true
			},
			sureAddress(val){
				console.log(val)
				this.userAddress = val.address
				this.selectaddress = false
				this.result = []
				localStorage.setItem('shop_address',val.address);
				localStorage.setItem('shop_name',val.name);
				localStorage.setItem('shop_tel',val.tel);
				this.provinceid = val.provinceid
				this.cityid = val.cityid
				this.countyid = val.countyid
				this.townid = val.townid
				this.stock()
				//this.result.push(val[0])
				
				
				/*self.aData = {
					address: localStorage.setItem('shop_address'),
					name: localStorage.setItem('shop_name'),
					tel: localStorage.setItem('shop_tel'),
				}*/
			},
			stock(){
				
				let stock={
					id: this.JDid,
					province: this.provinceid,
					city: this.cityid,
					county: this.countyid,
					town: this.townid,
					num: this.goodsnum
					
				}
				detail_jdnum(stock).then(res => {
					console.log(res.data)
					if(res.data.msg == 'success'){
						this.disabled = false
						let state = res.data.data[0].stockStateId
						if( state == 33){
							this.stockState = '现货-下单立即发货'
						}
						if(state == 34){
							this.stockState = '无货'
							this.disabled = true
						}
						if(state == 39){
							this.stockState = '在途-正在内部配货，预计2~6天到达本地仓库'
						}
						if(state == 40){
							this.stockState = '可配货-下单后从有货仓库配货'
						}
						if(state == 36){
							this.stockState = '缺货-可预订'
						}
					}else{
						this.stockState =  res.data.data[0].stockStateDesc
						this.disabled = true
					}
					
				}).catch(err => {
					console.log(err)
				})
			},
		
		},

	}
</script>

<style >
	
	.ssd-module-wrap div{
		/* width: 3.75rem !important;
		 height: 3.75rem !important; */
		 width:3.75rem !important ;
		 height: 5.75rem !important; 
		
	}
	/*送至模块*/
	.send{
		width: 100%;
		padding: .1rem .15rem;
		background: #fff;
		display: flex;
		align-items: center;
	    height: .7rem;
		margin: .05rem 0;
	}
	.send-name{
		width: 10%;
		height: .4rem;
		font-weight: 600;
	}
	.send-address{
		width: 80%;
		height: .4rem;
		padding-left: .1rem;
		;
	}
	.send-select{
		width: 10%;
		height: .4rem;
		text-align: right;
	}
	.stock{
		font-size: .13rem;
		color: rgb(241, 62, 59);
		line-height: .24rem;
	}
	.pop-send{
		padding: .1rem .15rem;
	}
	.pop-name{
		font-size: .16rem;
		text-align: center;
	}  
	/deep/ .van-checkbox__icon .van-icon{
		height: 14px !important;
		width: 14px !important;
	}
	
	/deep/ .van-radio__icon .van-icon{
		height: 14px !important;
		width: 14px !important;
	}
	/deep/ .addressone{
		margin-top: .2rem;
		border: #000000 solid 1px;
	}
	.addOther{
		width: 95%;
		margin: 0 atuo;
		height: .35rem;
		position: absolute;
		position: fixed;
		bottom: .1rem;
		color: #fff;
		background: rgb(251, 160, 19);
		border-radius: .3rem;
	}
	/*底部导航栏*/
	.backgroung{
		background: #E5E5E5 !important;
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

	.bot-btn .button1 {

		height: .38rem;
		width: 46%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: .1rem;
		padding-right: .1rem;
		border-radius: .3rem;
	    background: rgb(251, 160, 19)
	}
	.bot-btn .button2 {
	
		height: .38rem;
		width: 46%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: .1rem;
		padding-right: .1rem;
		border-radius: .3rem;
		background: rgb(241, 62, 59)
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
		padding: .05rem 0.1rem .12rem .1rem;


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
