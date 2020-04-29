<template>
	<div class="tahome button1">
		<van-tabbar v-model="active" active-color="#FFBB03" style="" class="tabbar">
			<van-tabbar-item icon="wap-home"><span style="font-size: 13px;">主页</span></van-tabbar-item>
			<van-tabbar-item icon="apps-o"><span style="font-size: 13px;">分类</span></van-tabbar-item>
			<van-tabbar-item icon="shopping-cart-o"><span style="font-size: 13px;">购物车</span></van-tabbar-item>
			<van-tabbar-item icon="bag-o"><span style="font-size: 13px;">订单</span></van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: this.numid
			};
		},
		props: [
			'numid'
		],
		mounted(){
			var self = this;
			self.active = Number(self.numid);
		},
		watch:{
			active(){
				if (this.active == 0) {
					this.$router.push({path: '/'})
				}
				if (this.active == 1) {
					this.$router.push({path: '/area'})
				}
				if (this.active == 2) {
					this.$router.push({path: '/card'})
				}
				if (this.active == 3) {
					this.$router.push({path: '/orderlist'})
				}
			}
		}
	}
</script>
<style scoped>
.tahome .van-tabbar-item{
	height: 50px;
}
.van-hairline--top-bottom{
	height: none !important;
}
.tabbar{
	border-top: .01rem solid #fff;
	height:50px;
}
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait){
		/*iPad*/
		.tabbar{
		border-top: 1px solid #fff;
		height:60px !important;
		}
	}
@media screen and (width: 375px) and (height: 812px){
    .button1 {
        padding-bottom: 34px;
    }
}

</style>
