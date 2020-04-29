<!-- <style scoped>

</style>
<template>
	<div>
		<div class="">
			<van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result delete-button-text="取消" :search-result="searchResult"
			 @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
		</div>
	</div>
</template>

<script>
import tabar from '../components/tabar.vue'
import areaList from './area.js'
export default {
	name: 'addrbuild',
	components: {
		tabar
	},
	data: function() {
		return {
			areaList,
			searchResult: []
		}
	},
	beformount: function() {

	},
	mounted: function() {
		var self = this;

	},
	methods: {
		onSave() {
			this.$toast('save');
		},
		onDelete() {
			
		},
		onChangeDetail(val) {
			if (val) {
				this.searchResult = [{
					name: '黄龙万科中心',
					address: '杭州市西湖区'
				}];
			} else {
				this.searchResult = [];
			}
		}
	}
}
</script>
 -->
<template>
	<div class="addAddress">
		<van-field v-model="name" label="收货人" placeholder="请输入收货人" />
		<van-field v-model="mobile" label="手机号码" placeholder="请输入手机号码" />
		<div class="address">
			<van-cell style="width: 100%;" is-link @click="showPopup" center title="所在地区">
				<template>
					<input placeholder="请选择所在地区" v-model="addressc">
				</template>
			</van-cell>
		</div>

		<van-field v-model="address" rows="2" autosize label="详细地址" type="textarea" placeholder="详细地址:如道路门牌号小区楼栋号单元室等" />
		<div class="btn">
			<van-cell center title="设为默认地址">
				<template #right-icon>
					<van-switch v-model="checked" size="24" />
				</template>
			</van-cell>
		</div>
		<div class="delete" v-if="btnshow" @click="detele1()"> 
			删除地址
		</div>
		<div class="save"> 
			<van-button type="primary" block @click="submit()" v-if="!btnshow">保存</van-button>
			<van-button type="primary" block @click="edit()" v-if="btnshow" style="background: red;">确认修改</van-button>
		</div>
		
		<van-popup v-model="show" position="bottom" :style="{ height: '75%'  }">
			<div class="fixed">
				<div class="header">所在地区</div>
				<div class="action">
					<span>{{province}} {{city}} {{county}} {{dtown }}</span>
					<span style="color:rgb(243, 217, 34) ;">{{text}}</span>
				</div>
			</div>
			<div class="select">
				<div class="citylist" v-for="(item , index ) in provincelist" :key="item.id" v-if="showp">
					<li @click="selectProvince( item.id , item.name)">{{item.name}}</li>
				</div>
				<div class="citylist" v-for="(item , index ) in citylist" :key="item.id" v-if="showc">
					<li @click="selectCity( item.id , item.name)">{{item.name}}</li>
				</div>
				<div class="citylist" v-for="(item , index ) in countylist" :key="item.id" v-if="showcc">
					<li @click="selectCounty( item.id , item.name)">{{item.name}}</li>
				</div>
				<div class="citylist" v-for="(item , index ) in dtownlist" :key="item.id" v-if="showt">
					<li @click="selectTown( item.id , item.name)">{{item.name}}</li>
				</div>
			</div>
		</van-popup>
	</div>
</template>
<script>
	import {
		address ,address_add,address_select ,address_update,address_delete
	} from '../api.js'
	export default {
		mounted() {
			if(this.$route.query.id ){
				this.btnshow = true
				let data={
					id: this.$route.query.id
				}
				address_select(data).then(res => {
					this.name = res.data[0].name
					this.mobile = res.data[0].tel
					this.address = res.data[0].address
					if(res.data[0].towm == null){
						this.towm1 = ''
					}else{
						this.towm1 = res.data[0].town_name
					}
					this.addressc = res.data[0].province_name + res.data[0].city + res.data[0].county_name + this.towm1
					this.default = res.data[0].default
					if(this.default == 1){
						this.checked = true
					}else{
						this.checked = false
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		data() {
			return {
				towm1:'',
				btnshow:false,
				show: false,
				name: '',
				mobile: '',
				addressc:'',
				address: '',
				checked: true,
				detail:1,
				selectadd: '',
				text:'请选择',
				provincelist: '',
				province:'',
				provinceid:'',
				
				
				citylist:'',
				city: '',
				cityid:'',
				
				countylist:'',
				county:'',
				countyid:'',
				
				
				dtownlist:'',
				dtown:'',
				dtowmid:'',
				
				
				showp: true,
				showc: false,
				showcc: false,
				showt: false
			};
		},

		methods: {
			detele1(){
				this.$dialog.confirm({
				  title: '提示',
				  message: '确定要删除该地址吗？',
				})
				  .then(() => {
				    let data = {
				    	id: this.$route.query.id
				    }
				    
				    address_delete(data).then(res => {
				    	if(res.data.msg == 'success'){
				    		this.$router.push({name:'address'})
				    	}
				    }).catch(err => {
				    	console.log(err)
				    })
				  })
				  .catch(() => {
				    // on cancel
				  });
				
			},
			submit(){
				if(this.checked){
					this.detail = 1
				}else{
					this.detail = 0
				}
				if(this.dtowmid == ''){
					this.dtowmid = 0
				}
				let data = {
					province: this.provinceid,
					city: this.cityid,
					county: this.countyid,
					town: this.dtowmid,
					address: this.address,
					name: this.name,
					mobile: this.mobile,
					detail: this.detail
				}
				console.log(data)
				address_add(data).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						//this.$router.push({name:'address'})
						this.$router.go(-1)
					}else{
						alert(msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			edit(){
				alert("修改")
				if(this.checked){
					this.detail = 1
				}else{
					this.detail = 0
				}
				
				if(this.provinceid == ''){
					let data = {
						id: this.$route.query.id,
						address: this.address,
						name: this.name,
						mobile: this.mobile,
						detail: this.detail
					}
					console.log(data)
					address_update(data).then(res => {
						let msg = res.data.msgText
						if (res.data.msg == 'success') {
							this.$router.push({name:'address'})
						}else{
							alert(msg)
						}
					}).catch(err => {
						console.log(err)
					})
				}else{
					
					if(this.dtowmid == ''){
						this.dtowmid = 0
					}
					let data = {
						province: this.provinceid,
						city: this.cityid,
						county: this.countyid,
						town: this.dtowmid,
						address: this.address,
						name: this.name,
						mobile: this.mobile,
						detail: this.detail
					}
					console.log(data)
					address_update(data).then(res => {
						let msg = res.data.msgText
						if (res.data.msg == 'success') {
							this.$router.push({name:'address'})
						}else{
							alert(msg)
						}
					}).catch(err => {
						console.log(err)
					})	
				}
			},

			showPopup() {
				this.show = true
				this.showp = true
				this.showc = false
				this.showcc = false
				this.showt = false
				var data = {
					'status': 'JDprovince',
				};
				address(data).then(res => {
					if (res.data.msg == 'success') {
						this.provincelist = res.data.data
						//console.log(this.provincelist)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			selectProvince(id, name) { //选择省份
				this.showp = false
				this.showc = true
				this.showcc = false
				this.showt = false
				this.province = name
				this.city = ''
				this.county = ''
				this.dtown = ''
				this.provinceid = id
				this.addressc = this.province
				var data = {
					'status': 'JDcity',
					'province': id
				};
				address(data).then(res => {
					if (res.data.msg == 'success') {
						this.citylist = res.data.data
						//console.log(this.citylist)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			selectCity(id, name) { //选择城市
				this.showp = false
				this.showc = false
				this.showcc = true
				this.showt = false
				this.city= name
				this.cityid = id
				this.addressc = this.province + this.city
				var data = {
					'status': 'JDcounty',
					'city': id
				};
				address(data).then(res => {
					if (res.data.msg == 'success') {
						this.countylist = res.data.data
					}
				}).catch(err => {
					console.log(err)
				})
			},
			selectCounty(id, name) { //选择区县
				this.showp = false
				this.showc = false
				this.showcc = false
				this.showt = true
				this.county = name
				this.countyid = id
				this.addressc = this.province + this.city + this.county
				var data = {
					'status': 'JDtown',
					'county': id
				};
				address(data).then(res => {
					if (res.data.msg == 'success') {
						this.dtownlist = res.data.data
						if(this.dtownlist == ''){
							this.text = ''
							if(this.text == ''){
								this.show = false
							}
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			selectTown(id, name) { //选择区县
				this.showp = false
				this.showc = false
				this.showcc = false
				this.showt = true
				this.text = ''
				this.show = false
				this.dtown = name
				this.dtowmid = id
				this.addressc = this.province + this.city + this.county + this.dtown
				
			},
			
		},

	};
</script>
<style scoped>
	.btn {
		margin-top: .2rem;
	}

	/deep/ .address .van-cell__title {
		width: .8rem !important;
		flex: none
	}
	/deep/ .van-cell__value{
		color: #333
	}

	.address {
		display: flex;
		align-items: center;
	}

	.address input {
		width: 2.3rem;
		height: auto;
		border: none;
	}

	/deep/ .van-popup {
		border-top-left-radius: 0.1rem;
		border-top-right-radius: 0.1rem;
		overflow-y: hidden;
	}

	.fixed {
		position: fixed;
		width: 100%;
		height: .95rem;
		z-index: 9;
		top: 0;
	}

	.header {
		padding: .2rem .05rem;
		text-align: center;
		font-size: .16rem;
	}

	.action {
		border-bottom: #eee solid .02rem;
		padding: .1rem .1rem;
		padding-top: 0;

	}

	.action span {
		margin-right: .06rem;
	}

	.select {
		margin-top: .95rem;
		overflow-y: auto;
		height: 60.4vh;
		padding-bottom: .1rem;
	}

	.citylist {

		padding-top: .05rem;
		font-size: .16rem;
	}

	.citylist li {
		list-style: none;
		padding: .04rem .1rem 0.01rem .16rem;
	}
	.save{
		position: absolute;
		width: 95%;
		margin-left: 2.5%;
		bottom: .07rem;
		margin-top: .5rem;
		
	}
	/deep/ .van-button--primary{
		border-radius: 1rem !important;
		height: .4rem;
		display: flex;
		background: rgb(243, 190, 34);
		border: rgb(243, 190, 34) solid .01rem;
		justify-content: center;
	}
	.van-button__text{
		height: .3rem;
		display: flex;
		align-items: center;
	}
	.van-switch--on{
		background: rgb(243, 190, 34);
	}
	.delete{
		height: .4rem;
		color: red;
		text-align: left;
		background: #fff;
		padding: .1rem 0;
		font-size: .14rem;
		padding-left: .18rem;
		margin-top: .2rem;
	}
</style>
