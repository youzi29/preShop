<template>
	<div>
		<div class="goods">
			<div class="shop">
				<label>订单编号：</label>
				<span v-text="orderId">12222222222</span>
			</div>
			<!-- <div class="goods-one"  v-for="(item,index) in orlistData.shop" :key="index"> -->
			<div class="goods-one"  v-for="(item,index) in orlistData.shop" :key="index" >
				<div class="goods-img">
					<!-- <img :src="item.img"> -->
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
		<div class="goodsLog">
			<van-steps direction="vertical" :active="0" active-color="#ffbb03" >
			  <van-step v-for="(item , index) in logList">
			    <div>{{item.content}}</div>
			    <p>{{item.msgTime}}</p>
			  </van-step>
			</van-steps>
		</div>
	</div>
</template>

<script>
	import {
		dataorede,
		dataorderid,
		getProduct
	} from '../../api.js'
	export default{
		 data() {
		    return {
		      active: 1,
			  logList:[],
			  orderId:'',
			  orlistData:[]
		    };
		  },
		mounted() {
			var self = this;
			this.orderId = this.$route.query.orderId
			const ordatas = {
				"status": 'orderTrack',
				"jdorderid": this.$route.query.orderId
			};
			getProduct(ordatas).then(res => { //订单物流
			if(res.data.msg == 'success'){
				this.logList = res.data.data.reverse()
			}else{
				alert(res.data.msgText)
			}

			}).catch(err => {
				console.log(err)
			});
			const ordata = {
				"status": "detail",
				'oid': self.$route.query.id
			};
			dataorede(ordata).then(res => {//订单data
				self.orlistData = res.data;
				self.paystatus = Number(res.data.statue);
			//	console.log(res.data.statue)
				//console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
			
			
	
		},
	}
</script>

<style scoped>
	.goodsLog{
		margin-top: .1rem;
		margin-bottom: .1rem;
	}
	.goodsLog h3{
		font-size: .15rem
	}
	.goodsLog p{
		font-size: .14rem
	}
	/deep/ .van-hairline .van-step .van-step--vertical .van-step--process{
		color: red;
	}
	/deep/ [class*=van-hairline]::after{
		    border:none;
	}
	.goods {
		width: 100%;
		background: #fff;
		height: auto;
		padding-bottom: .1rem;
		border-radius: .05rem;
	}
	
	.goods .shop {
		padding: .1rem .15rem 0rem .1rem;
		width: 100%;
	}
	.shop label{
		color:gray
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
	
</style>
