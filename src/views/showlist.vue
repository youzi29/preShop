<!-- <template>
	<div>
		<van-nav-bar style="position: fixed;top: 0px;left: 0px;bottom: 0;right: 0;width: 100%;">
			<img slot="title" style="width: 20px;height: 20px;margin-top: 15px;margin-left: 50px;" src="../assets/user.png" />
			<span slot="title" style="position: relative;top: -32px;">浣洗商城</span>
		</van-nav-bar>
		<div class="showGoods">
			<ul>
				<van-list
				  v-model="loading"
				  :finished="finished"
				  :immediate-check="false"
				  finished-text="没有更多了"
				  @load="onLoad"
				  :offset="12"
				>
				<li v-for="(item,index) in itemList" :key="index">
					<router-link :to="'/goods'+'?id='+item.id">
						<img :src="item.image" />
						<p v-text="item.title">连衣裙</p>
						<p style="color: red;">￥<span v-text="item.price"></span></p>
					</router-link>
				</li>
				</van-list>
			</ul>
		</div>
		 <tabar :numid="numid"></tabar> 
	</div>
</template>

<script>
	import tabar from '../components/tabar.vue'
	import { showlist , index_class_jdlist } from '../api.js'
	export default {
		components:{
			tabar
		},
		created() {
			this.gotroadList();
		},
		data() {
			return {
				active: 0,
				showlistData:[],
				 list: [],
				aurl:'https://wx.ihuanxi.cn/kd/newwashcache/database/shop/',
				numid:4,
				
				loading: false,
				finished: false,
				page:0,
				pageSize:12,
				total:0,
				itemList:[],
				
				JDlist:[]
			};
		},
		methods:{
			gotroadList(){
				var showlistData = []
				var showgoods ={
					'cid':this.$route.query.id,
					 page: this.page
				};					 
				showlist(showgoods).then(res => {
					let rows = res.data.data;
					
					this.loading = false;
					this.total = res.data.sumnum
					
					if(rows == null || rows.length === 0){
						this.finished = true
						return;
					}
					
					this.itemList = this.itemList.concat(rows);
					if(this.itemList.length >= this.total){
						this.finished = true
					}
				}).catch(err => {
					console.log(err)
				})
			},
			
			
			 onLoad() {
				 this.page++
				 this.gotroadList();
			    }
				
		},
		
		mounted() {
			
			var self = this;
			var showgoods ={
				'cid':this.$route.query.id,
				 page: this.page
			};
			index_class_jdlist(showgoods).then(res => {
			  this.JDlist = res.data.data
			}).catch(err => {
				console.log(err)
			})
		}
	}
</script>
<style>
	.van-list__error-text, .van-list__finished-text, .van-list__loading-text{
		display: flex;
		width: 100%;
		justify-content: center;
	}
.showGoods{
	width: 100%;
	height: 100vh;
	background-color: #fff;
	margin-top: 46px;
}
.showGoods ul{
	width: 97%;
	height: atuo;
	padding-bottom:.5rem;
	margin: 0 auto;
	background-color: #fff;
}
.showGoods li{
	width: 30%;
	height: 1.58rem;
	text-align: center;
	float: left;
	margin-left: 2.5%;
	margin-top: 0.1rem;
}
.showGoods li img{
	width: 1.1rem;
	height: 1.1rem;
	border-radius: 0.08rem;
}
.showGoods p{
	width: 100%;
	height: auto;
	overflow: hidden;
	font-size: 0.14rem;
	margin-top: 0.07rem;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}

</style>
 -->

<template>
	<div>
		<!-- 	<van-nav-bar style="position: fixed;top: 0px;left: 0px;bottom: 0;right: 0;width: 100%;">
 			<img slot="title" style="width: 20px;height: 20px;margin-top: 15px;margin-left: 50px;" src="../assets/user.png" />
 			<span slot="title" style="position: relative;top: -32px;">浣洗商城</span>
 		</van-nav-bar> -->
		<van-tabs v-model="active" style="top:0" @click="select" color="rgb(255, 187, 3)">
			<van-tab title="浣洗自营">
				<div class="indexGoods">
					<ul>
						<van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad"
						 :offset="12" style="padding-bottom: .38rem;">
							<!-- <li v-for="(item,index) in itemList" :key="index">
								<router-link :to="'/goods'+'?id='+item.id">
									<img :src="item.image" />
									<p v-text="item.title">连衣裙</p>
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
			</van-tab>
			<van-tab title="京东特选">
				<div class="indexGoods">
					<ul>
						<van-list v-model="loading1" :finished="finished1" :immediate-check="false" finished-text="没有更多了" @load="onLoad"
						 :offset="12" style="padding-bottom: .38rem;">
							<!-- <li v-for="(item,index) in itemList1" :key="index">
								<router-link :to="'/JDgoods'+'?id='+item.id">
									<img :src="item.image" />
									<p v-text="item.title">连衣裙</p>
									<p style="color: red;">￥<span v-text="item.price"></span></p>
								</router-link>
							</li> -->
							<div class="col" ref="col1">
								<transition-group name="list">
									<li v-for="(item,index) in itemList4" :key="index">
										 <router-link :to="'/JDgoods'+'?id='+item.id">
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
									<li v-for="(item,index) in itemList5" :key="index">
										 <router-link :to="'/JDgoods'+'?id='+item.id">
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
			</van-tab>
			<van-tab title="" :disabled="true">内容 1</van-tab>
			 <van-tab title="" :disabled="true">内容 2</van-tab>
		</van-tabs>
		<tabar :numid="numid"></tabar>
	</div>
</template>

<script>
	import tabar from '../components/tabar.vue'
	import {
		showlist,
		index_class_jdlist
	} from '../api.js'
	export default {
		components: {
			tabar
		},
		created() {
			this.gotroadList();
			this.gotroadList1();
		},
		data() {
			return {
				active: 0,
				numid: 1,

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

				loading1: false,
				finished1: false,
				page1: 0,
				pageSize1: 12,
				total1: 0,
				itemList1: [],
				itemList4: [],
				itemList5:[],
				data3:[],
				data4:[],
			};
		},
		methods: {
			select(val){
				if(val == 0){
					//this.page = 0
					//this.gotroadList();
				}
				if(val == 1){
					//this.page1 = 0
					//this.gotroadList1();
				}
			},
			gotroadList() {
				var showlistData = []
				var showgoods = {
					'cid': this.$route.query.id,
					page: this.page
				};
				showlist(showgoods).then(res => {
					let rows = res.data.data;

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
					if (this.itemList.length >= this.total) {
						this.finished = true
					}
				}).catch(err => {
					console.log(err)
				})
			},
			gotroadList1() {
				var showlistData1 = []
				var showgoods = {
					'cid': this.$route.query.id,
					 page: this.page1
				};
				index_class_jdlist(showgoods).then(res => {
					let rows = res.data.data;
			
					this.loading1 = false;
					this.total1 = res.data.sumnum
			
					if (rows == null || rows.length === 0) {
						this.finished1 = true
						return;
					}
			
					this.itemList1 = this.itemList1.concat(rows);
					this.data3 = []
					this.data4 = []
					for(let i= 0; i< this.itemList1.length ; i++){
						if(i % 2 !== 0 ){
							this.data3.push(this.itemList1[i])
						}else{
							this.data4.push(this.itemList1[i])
						}
					}
					if(this.data3.length >= this.data4.length){
						this.itemList4 = this.data3
						this.itemList5 = this.data4
					}else{
						this.itemList5 = this.data3
						this.itemList4 = this.data4
					}
					if (this.itemList1.length >= this.total1) {
						this.finished1 = true
					}
				}).catch(err => {
					console.log(err)
				})
			},


			onLoad() {
				this.page++
				this.gotroadList();
				this.page1++
				this.gotroadList1();
			}

		},

		mounted() {

			// var self = this;
			// var showgoods = {
			// 	'cid': this.$route.query.id,
			// 	page: this.page
			// };
			// index_class_jdlist(showgoods).then(res => {
			// 	this.JDlist = res.data.data
			// }).catch(err => {
			// 	console.log(err)
			// })
		}
	}
</script>
<style scoped>
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
	.col {
		margin-left: 1.5%;
		float: left;
		width: 48%;
		
	}
	.liOne {
		display: flex;
		flex-wrap: wrap;
		height: auto;
		flex: auto;
		background: #fff;
		padding-bottom: .1rem;
	
	}
	/deep/ .van-tabs--line .van-tabs__wrap{
		/* border: #000000 solid 1px !important; */
	}
	/deep/ .van-tabs__wrap{
		position: fixed;
	}
	.van-tabs--line {
		padding-top: 45.5px !important;
	}

	.van-list__error-text,
	.van-list__finished-text,
	.van-list__loading-text {
		display: flex;
		width: 100%;
		justify-content: center;
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
		margin-top: 0.1rem;
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
