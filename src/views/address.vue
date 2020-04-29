<!-- <template>
	<div>
		<van-address-list v-model="chosenAddressId" add-button-text="确认" :list="list" @select="onsel" @add="onAdd" @edit="onEdit" />

		 <van-button @click="toaddres" type="warning" class="addsure" style="position: fixed;right: 0;bottom: 0;z-index: 9999;height: 49px;">新增地址</van-button> 
	</div>
</template> 

 <script>
	import { useadd } from '../api.js'
	export default {
		data() {
			return {
				chosenAddressId: '1',
				list: []
			}
		},
		mounted() {
			var self = this;
			useadd().then(res => {
				self.list = res.data;
				console.log(self.list)
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			onAdd() {
				history.go(-1);
			},
			onsel(item, index){
				localStorage.setItem('shop_address',item.address);
				localStorage.setItem('shop_name',item.name);
				localStorage.setItem('shop_tel',item.tel);
				localStorage.setItem('adddata',item.cityid);
				localStorage.setItem('citydata',item.id);
				console.log(item);
			},
			onEdit(item, index) {
				console.log(item)
				
				this.$router.push({path:'/addrbuild',query:{id:item.id}})
				
			},
			toaddres(){
				window.location.href="https://wx.ihuanxi.cn/kd/newwashcache/address/#/build"
			}
		}
	}
</script>
<style>
/* .van-address-list .van-address-list__add{
	width: 50%;
	border-radius: 0.02rem;
} */
.addsure{
	width: 50%;
}
.van-button--large{
	/* width: 50% !important; */
}
</style> -->
<template>
	<div class="address">
		<!-- <van-nav-bar
		  title="我的收货地址"
		  right-text="添加新地址"
		  left-arrow
		  @click-left="onClickLeft"
		  @click-right="onClickRight"
		/> -->
		<van-address-list v-model="chosenAddressId" @select="sure" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
	</div>
</template>
<script>
	import {
		address_select
	} from '../api.js'
	export default {
		mounted() {
			let data = {

			}
			address_select(data).then(res => {
				this.list1 = res.data
				console.log(this.list1)
				let len = this.list1.length
				for (let i = 0; i < len; i++) {
					if(this.list1[i].towm == null){
						this.list1[i].town_name = ''
					}
					this.list.push({
						id: this.list1[i].id,
						name: this.list1[i].name,
						tel: this.list1[i].tel,
						address: this.list1[i].province_name + this.list1[i].city + this.list1[i].county_name + this.list1[i].town_name + this.list1[
							i].address,
						cityid: this.list1[i].city,
						isDefault: this.list1[i].default
					})
				}
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
		},
		data() {
			return {
				chosenAddressId: '1',
				list1: [],
				/*list: [
	        {
	          id: '1',
	          name: '张三',
	          tel: '13000000000',
	          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
			  isDefault:1,
	        },
	        {
	          id: '2',
	          name: '李四',
	          tel: '1310000000',
	          address: '浙江省杭州市拱墅区莫干山路 50 号',
			   
	        },
	      ],*/
				list: [],

			};
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			onClickRight() {
				this.$toast("添加新地址")

			},
			onAdd() {
				this.$router.push({
					path: '/addrbuild'
				})
			},
			onEdit(item, index) {
				this.$router.push({
					path: '/addrbuild',
					query: {
						id: item.id
					}
				})
			},
			sure(item, index){
				console.log(item)
				localStorage.setItem('shop_address',item.address);
				localStorage.setItem('shop_name',item.name);
				localStorage.setItem('shop_tel',item.tel);
				localStorage.setItem('cityid',item.cityid);
				localStorage.setItem('addressid',item.id);
				
				this.$router.push({
					path: '/order?id=' + localStorage.getItem('pid') + '&' + 'id1=' + localStorage.getItem('id1')
				})
			}
		},
	};
</script>
<style scoped>
	.van-nav-bar__text {
		color: #000000 !important;
	}

	.van-icon-arrow-left:before {
		color: #bbb7b7 !important;
	}
	/deep/ .van-address-item .van-radio__icon--checked .van-icon{
		border-color: rgb(243, 190, 34);
		background-color: rgb(243, 190, 34);
	}

	/deep/ .van-button--danger {
		width: 95%;
		border-radius: .5rem;
		height: .4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 2.5%;
		margin-bottom: .1rem;
		border: solid .01rem rgb(243, 190, 34);
		background-color: rgb(243, 190, 34);
	}

	/deep/ .van-button__text {
		height: .3rem;
		display: flex;
		align-items: center;
	}
</style>
