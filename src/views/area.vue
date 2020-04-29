<template>
	<div>
		<!-- <van-nav-bar style="position: fixed;top: 0px;left: 0px;bottom: 0;right: 0;width: 100%;">
			<img slot="title" style="width: 20px;height: 20px;margin-top: 15px;margin-left: 50px;" src="../assets/user.png" />
			<span slot="title" style="position: relative;top: -32px;">浣洗商城</span>
		</van-nav-bar>
		<div style="height: 46px;"></div> -->
		<div style="height: 100vh;background: #fff;">
			<van-row style="background: #fff;">
				<van-col span="6" class="box" style="">
					<div class="onearea">
						<ul style="">
							<li :class="index == tabIndex ? 'li' : 'lis'" v-for="(item,index) in areaData" :key="index" v-text="item.cname"
							 @click="areabtn(index)"></li>
						</ul>
					</div>
				</van-col>

				<!-- <van-col span="18" style="float: right;right: 0;padding-bottom: .4rem;">
				<div class="twoarea">
					<ul >
						<li v-for="(items,index) in twoData" :key="index" v-if="!data2">
						   <img :src="items.sccTubImg" @click="next(items.sccIndex , items.sccName)" />
							<span v-text="items.sccName" style="margin-top: 0.05rem;"></span>
						</li>
						
					</ul>
				</div>
			</van-col> -->
				<van-col span="18" style="float: right;right: 0;padding-bottom: .4rem;">
					<div class="twoarea" v-if="!isLoading">
						<div class="right" v-for="(item,index) in newList" :key="index">
							<h4 v-text="item.cname">浣洗自营</h4>
							<div class="classfiy">
								<div class="classfiyOne" v-for="(item1 , index1) in item.sub" :key="index1" @click="next(item1.sccIndex)">
									<img :src="item1.sccTubImg">
									<span v-text="item1.sccName">
										破壁机</span>
								</div>
							</div>
						</div>
					</div>
					<div class="twoarea loading" v-if="isLoading">
						<van-loading color="#FFBB03" /> 
					</div>
					
				</van-col>
			</van-row>

		</div>
		<tabar :numid="numid"></tabar>
	</div>
</template>

<script>
	import tabar from '../components/tabar.vue'
	import {
		arealist
	} from '../api.js'
	export default {
		components: {
			tabar
		},
		data() {
			return {
				isLoading:true,
				areaData: [],
				twoData: [],
				tabIndex: this.$store.state.areaIndex,
				aurl: 'https://wx.ihuanxi.cn/kd/newwashcache/database/shop/',
				numid: 1,
				title: '',
				data2: '',
				data1: true,
				newList: []
			}
		},
		methods: {

			next(id) {
				this.$router.push({
					name: "showlist",
					query: {
						id: id
					},
				})
			},
			areabtn(index) {
				var self = this;
				self.isLoading = true
				self.tabIndex = index;
				this.$store.commit('setValue', index)
				self.twoData = self.areaData[index].sub
				this.newList = []
				if(typeof(self.twoData) == 'undefined'){
					self.isLoading = false
					self.$toast("该分类下还没有商品呢~")
				}else{
					for (let i = 0; i < self.twoData.length; i++) {
					 		var showgoods = {
					 			'cid': self.twoData[i].sccIndex
							};
					 		arealist(showgoods).then(res => {
					 			let data1 = res.data[0]
					 			this.newList.push(data1)
					 			console.log(res)
					
							}).catch(err => {
					 			console.log(err)
							})
					 	}
					self.isLoading = false
				}
				 	
			},
		},
		mounted: function() {
			var self = this;
			arealist().then(res => {
				self.areaData = res.data;
				self.twoData = res.data[this.$store.state.areaIndex].sub;

				for (let i = 0; i < self.twoData.length; i++) {
					var showgoods = {
						'cid': self.twoData[i].sccIndex
					};
					arealist(showgoods).then(res => {
						let data1 = res.data[0]
						this.newList.push(data1)
					}).catch(err => {
						console.log(err)
					})
				}
				self.isLoading = false
				//console.log(this.newList)
				//console.log(self.areaData)
			}).catch(err => {
				console.log(err)
			});
		},
	}
</script>

<style>
	.box {
		left: 0px;
		overflow-y: hidden;
		height: 100vh !important;
		position: fixed;
		padding-bottom: .5rem;
	}

	@media (device-height:480px) and (-webkit-min-device-pixel-ratio:2) {

		.box {
			background: red !important;
		}

		.title {
			color: red;
		}

	}

	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {

		/*iPhoneX*/
		.box {
			left: 0px;
			overflow-y: auto;
			height: 7rem !important;
			position: fixed;
			padding-bottom: .5rem;
		}
	}

	@media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {

		/*ipad pro*/
		.box {
			left: 0px;
			overflow-y: auto;
			height: 6rem !important;
			position: fixed;
			padding-bottom: .5rem;
		}
	}

	@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {

		/*iPad*/
		.box {
			left: 0px;
			overflow-y: auto;
			height: 4.5rem !important;
			position: fixed;
			padding-bottom: .5rem;
		}
	}


	.onearea {
		width: 85%;
		height: 100vh;

		background-color: rgb(248, 248, 248);
		color: rgb(30, 30, 30);
		overflow-y: auto;
		/* border-right: 1px solid #F7F7F7; */
	}

	.twoarea {
		width: 100%;
		height: auto;
		background-color: #fff;
		padding-top: 5px;
		
	}
	.loading{
		display: flex;
		height: 100vh;
		justify-content: center;
		align-items: center;
	}

	.li {
		width: 100%;
		height: 0.5rem;
		background-color: #fff;
		text-align: center;
		line-height: 0.6rem;
		/* border-left: 2px solid #FFBB03; */
		color: #FFBB03;
		font-size: .15rem;
	}

	.lis {
		width: 100%;
		height: 0.5rem;
		background-color: transparent;
		text-align: center;
		line-height: 0.6rem;
		font-size: .15rem;
	}

	.twoarea ul li {
		width: 0.9rem;
		height: 1.2rem;
		background-color: #fff;
		text-align: center;
		float: left;
		margin-left: 0.03rem;
		font-size: .14rem;
	}

	.twoarea ul li img {
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 0.01rem;
	}

	.right {
		margin-top: .05rem;
		margin-bottom: .05rem;
		padding-bottom: .1rem;
	}

	.right h4 {
		font-size: .15rem;
		margin-bottom: .1rem;
	}

	.classfiy {
		display: flex;
		flex-wrap: wrap;

	}

	.classfiyOne {
		margin: .05rem .13rem .1rem 0;
		text-align: center;
		
	}

	.classfiyOne img {
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 0.01rem;
		margin-bottom: .03rem;
	}
	.classfiyOne span {
		text-align: center;
		display: block;
		color: rgb(30, 30, 30);
		font-size: .14rem;
		white-space: nowrap;
		padding-left: .03rem;
		width: .73rem;
		overflow: hidden;
	}
</style>
