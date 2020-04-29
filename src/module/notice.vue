<style scoped>
.NoticeMain{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; overflow: auto; z-index: 100; }
.NoticeMain button{ border: none; }
/* load */
.loadarea{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; display: flex; flex-direction: column; justify-content: center; align-items: center;  }
.load{ width: 80px; }
.loadicon{ width: 80px; animation: spin 2s linear infinite; }
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* alert */
.alert{ width: 90%; background-color: #fff; border-radius: 0.05rem; position: relative; padding: 0 0.1rem; padding-bottom: 0px; }
.closemenu{ position: absolute; top: -0.12rem; right: -0.12rem; height: 0.3rem; width: 0.3rem; border-radius: 0.15rem; display: flex; 
     flex-direction: column; justify-content: center; align-items: center; font-size: 0.16rem; color: #000; background-color: #fff; 
     box-shadow: 0rem 0rem 0.03rem 0.01rem #ccc; }
.alertarea{ padding: 0.1rem 0; }
.title{ padding: 0.1rem 0.1rem; padding-bottom: 0.05rem; }
.content{ padding: 0.1rem 0.1rem; color: #606266;  }

.menu{ display: flex; justify-content: flex-end; align-items: center; padding: 0.1rem; border-top: 1px #ddd solid; }
.rowmenu{ flex-direction: row; }
.columnmenu{ flex-direction: column; }

.menubutton{ border-radius: 0.05rem; background-color: #409eff; color: #fff; margin-left: 0.2rem; padding: 0.05rem 0.2rem; box-shadow: 0rem 0rem 0.03rem 0.01rem #ccc; }
.title *{ font-size: 0.26rem; }
.content *{ font-size: 0.24rem; }
.menu *{ font-size: 0.24rem; }

/*动画库*/



</style>
<template>
	<div class="NoticeMain">
        <div v-if="notice.status=='load'" class="loadarea">
            <div class="load">
                <img class="loadicon" src="./loading.svg" alt="">
            </div>
        </div>
        <div v-else-if="notice.status=='alert'" class="loadarea">
            <div class="alert">
                <div @click='FuncClose()' class="closemenu" >
                    <img src="./stop.svg" alt="">
                </div>
                <div class="alertarea">
                    <div v-show="notice.alert.title" class="title">
                        <p>{{notice.alert.title}}</p> </div>
                    <div class="content">
                        <p>{{notice.alert.content}}</p>
                    </div>
                </div>
                <div class="menu rowmenu">
                    <div class="menuitem" v-for="(val,k) in notice.alert.menu" :key=k >
                        <button class="menubutton" :style="val.style" @click='FuncMenu(val.action)' >{{val.content}}</button>
                    </div>
                </div>
            </div>
        </div>

	</div>
</template>


<script>
import rstore from './../rstore.js';
import func from './../func.js';


export default {
    name: 'notice',
    data: function () {
        return {
            notice:rstore.notice
        }
    },
    mounted: function () {
        var that = this;
        this.$nextTick(function () { //页面加载函数
            // this.SetNoticeFunc();
        });
    },
    methods: {

        FuncClose(){
            this.notice.HideModule();
        },
        FuncMenu(action){
            if(this.notice.alert.func){
                this.notice.alert.func(action);
            }
            
            this.notice.HideModule();
        }
    }
}
</script>
        
        
        