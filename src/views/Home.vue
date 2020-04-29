<template>
	<div>
		<!-- <van-nav-bar style="position: fixed;top: 0px;left: 0px;bottom: 0;right: 0;width: 100%;">
			<img slot="title" style="width: 20px;height: 20px;margin-top: 15px;margin-left: 50px;" src="../assets/user.png" />
			<span slot="title" style="position: relative;top: -32px;">浣洗商城</span>
		</van-nav-bar> -->
		<div class="indexGoods" >
			<div class="home">
				<van-swipe :autoplay="3000" indicator-color="white">
					<van-swipe-item>
						<img src="../assets/zhaoshang.png" @click="clickon" />
					</van-swipe-item>
				</van-swipe>
			</div>
			<ul>
				<van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad"
				 :offset="12" style="padding-bottom: .38rem;" >
					<!-- <li v-for="(item,index) in itemList" :key="index" >
					 <router-link :to="'/goods'+'?id='+item.id">
					  <img :src="item.image" />
					  <p v-text="item.title" class="list_totle"></p>
					  <p style="color: red;">￥<span v-text="item.price"></span></p>
					</router-link>
				</li> -->
					<div class="col" ref="col1">
						<transition-group name="list">
							<li v-for="(item,index) in itemList2" :key="index">
								 <router-link :to="'/goods'+'?id='+item.id">
								<div class="liOne">
									<img :src="item.image">
									<p class="list_title" v-text="item.title">答疑</p>
									<div class="namebtn"><span class="shopname">浣洗</span></div>
									<p style="color: red; font-size: .13rem;">￥<span style=" font-size: .18rem;" v-text="item.price">88.3</span></p>
								</div>
								</router-link>
							</li>
						</transition-group>
					</div>
					<div class="col" ref="col2">
						<transition-group name="list">
							<li v-for="(item,index) in itemList3" :key="index">
								 <router-link :to="'/goods'+'?id='+item.id">
								<div class="liOne">
									<img :src="item.image">
									 <p class="list_title" v-text="item.title">答疑</p> 
									<div class="namebtn"><span class="shopname">{{item.shopname}}</span></div>
									<p style="color: red; font-size: .13rem;">￥<span style=" font-size: .18rem;" v-text="item.price">88.3</span></p>
								</div>
								</router-link>
							</li>
						</transition-group>
					</div>
				</van-list>
			</ul>
		</div>
		 <tabar :numid="numid"></tabar> 
	</div>
</template>

<script>
	import tabar from '../components/tabar.vue'
	import {
		shoplist,
		check,
		orderpv
	} from '../api.js'
	export default {
		components: {
			tabar
		},
		created() {
			this.gotroadList();
		},
		data() {
			return {
				active: 0,
				tableData: [],
				//aurl:'https://wx.ihuanxi.cn/kd/newwashcache/database/shop/',
				aurl: 'http://223.247.202.40:8088/shop/',
				numid: 0,

				loading: false,
				finished: false,
				page: 0,
				pageSize: 12,
				total: 0,
				itemList: [],
				itemList2: [],
				itemList3:[],
				data1:[],
				data2:[],
			};
		},
		mounted() {
			/*var self = this;
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
					} else {
						localStorage.setItem('userid', res.data.sendid)
						console.log(localStorage.getItem('userid'))
					}
				})
				.catch(err => {
					console.log(err);
				});*/
		},
		methods: {
			gotroadList() {
				var showlistData = []
				var params = {
					page: this.page
				};
				shoplist(params).then(res => {
					let rows = res.data.data
					this.loading = false;
					this.total = res.data.sumnum

					if (rows == null || rows.length === 0) {
						this.finished = true
						return;
					}

					this.itemList = this.itemList.concat(rows);
					this.data1 = []
					this.data2 = []
					for(let i= 0; i< this.itemList.length ; i++){
						if(i % 2 !== 0 ){
							this.data1.push(this.itemList[i])
						}else{
							this.data2.push(this.itemList[i])
						}
					}
					if(this.data1.length >= this.data2.length){
						this.itemList2 = this.data1
						this.itemList3 = this.data2
					}else{
						this.itemList3 = this.data1
						this.itemList2 = this.data2
					}
					
					console.log(this.itemList)
					if (this.itemList.length >= this.total) {
						this.finished = true
					}
				}).catch(err => {
					console.log(err)
				})
			},
			onLoad() {
				this.page++
				this.gotroadList();
			},

			clickon() {//招商银行
				orderpv()
					.then(res => {
						window.location.href = 'https://mp.weixin.qq.com/s/OHYYS5E4So6cVVsXRMfe4g';
					})
					.catch(err => {
						console.log(err);
					});
			},

		}
	}
</script>
<style scoped>
	/* transition样式 */
	.list-enter-active,
	.list-leave-active {
		transition: all 1s;
		overflow: hidden;
	}

	.list-enter,
	.list-leave-to {
		opacity: 0;
		transform: translateY(60px);
	}

	.home {
		width:98%;
		height: 1.2rem;
		margin: 0 auto;
		margin-top: 2px;
		overflow: hidden;
		
	}

	.home img {
		width: 100%;
		height: 1.2rem;
		border-radius: 5px;
		margin: 0 auto;
		overflow: hidden;
		
	}

	.indexGoods {
		width: 100%;
		height: auto;
		
	}

	.indexGoods ul {
		width: 100%;
		height: 5rem;
		margin: 0 auto;
		
	}

	.col {
		margin-left: 1.5%;
		float: left;
		width: 48%;
		
	}

	.indexGoods li {

		/* text-align: center; 
	  float: left;
	   margin-left: 2.5%;
	    float:left;
		width: 47%;*/
		width: 100%;
		height: auto;
		margin-top: 0.14rem;
		border-radius: .05rem;
		padding-bottom: .1rem;

	}

	.liOne {
		display: flex;
		flex-wrap: wrap;
		height: auto;
		flex: auto;
		background: #fff;
		padding-bottom: .1rem;

	}

	.indexGoods li img {
		width: 100%;
		height: 1.5rem;
		border-top-left-radius: 0.05rem;
		border-top-right-radius: 0.05rem;

	}

	.indexGoods .namebtn {
		text-align: left;
		padding-left: .05rem;
		margin-top: .05rem;
	}

	.indexGoods .namebtn .shopname {
		border: #FFBB03 solid 1px;
		padding: .01rem .05rem;
		color: #FFBB03;
		font-size: 0.14rem;
		border-radius: .03rem;
	}

	.indexGoods p {
		width: 100%;
		margin-top: 0.07rem;
		padding: 0 .05rem;
		text-align: left;
		
	}
	.list_title{
		overflow: hidden;
		text-overflow: clip;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
