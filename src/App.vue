<style scoped>

</style>
<template>
    <div id="app">
		<!-- <tabar></tabar> -->
        <notice v-show="notice.show" :style="notice.style"  />
        <router-view v-if="isRouterAlive" />
		<!-- <div style="position: absolute;top:0;z-index: 9999;height:100vh;width: 100%;display: flex;align-items: center;justify-content: center;background: #F7F7F7;">
			系统正在维护...
		</div> -->
		<!-- <van-popup v-model="show" 
		           style="height: 100%;width: 100%;display: flex;align-items: center;justify-content: center;">
				   系统正在维护...
		</van-popup> -->
    </div>
</template>

<script>
import tabar from './components/tabar.vue'
import func from './func';
import router from './router';
import rstore from './rstore';
import notice from './module/notice';
func.BuildData(rstore,router);


export default {
    name: 'app',
	provide(){
		return {
		    reload:this.reload
		}
	},
    components: {
        notice,
		tabar
    },
    data: function () {
        return {
            notice:rstore.notice,
			isRouterAlive:true,
			show: true
        }
    },
	methods:{
		reload(){
			this.isRouterAlive = false
			this.$nextTick(function(){
				this.isRouterAlive = true
			})
		},
		
		
	},
    beformount:function(){
        
    },
    mounted: function () {
		
    }
}
</script>
<style>
	
</style>
