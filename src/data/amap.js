import func from './../func';
/* 依赖数据 */

let amap={
	program:false,
	data:{
		select:'',
		addr:{
			data:'',
			lng:'',
			lat:''
		}
	},
	citysearch:{
		load:false,
		data:{}
	},
	locate:{
		load:false,
		data:{}
	},
	picker:{
		load:false,
		state:0,
		data:{}
	},
	style:{
		visibility:'hidden',
		zIndex:-1
	}
}

/* ---------- 高德地图函数 */
amap.LoadMap=function(mapid,force){
	var that=this;
	var promise = new Promise(function (resolve, reject) {
		if(!that.program || force ){
			that.program = new AMap.Map(mapid, {
				zoom: 16,
				animateEnable:false,
				jogEnable:false
			});
			that.program.on('complete', function(){
				console.log('Amap加载已完成');
				that.program.setZoom(16);
				resolve({
					status:'success'
				});
			});
			that.program.on('click', function(e) {
				this.setCenter(e.lnglat);
			});
		}

	});
	return promise;
}
amap.FuncCitySearch=function(){
	var that=this;
	var promise = new Promise(function (resolve, reject) {
		AMap.service(["AMap.CitySearch"], function() {
			that.program.citysearch = new AMap.CitySearch();
			that.program.citysearch.getLocalCity(function(status, result){
				resolve({
					status:status,
					result:result
				});
			},function(status, result){
				resolve({
					status:status,
					result:result
				});
			});
		});
	});
	return promise;
}
amap.FuncPicker=function(force){
	var that=this;
	var promise = new Promise(function (resolve, reject) {
		if(!that.picker.load | force ){
			AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
				var positionPicker = new PositionPicker({
					mode: 'dragMap',
					map: that.program
				});
				positionPicker.on('success', function(res) {
					// console.log(res);
					that.picker.data=res;
					that.picker.state++;
					that.SetAddrData();
				});
				positionPicker.on('fail', function(res) {
					alert('获取地址信息失败,刷新再试试吧!');
				});
				positionPicker.start();
				that.picker.load='loaded';
				resolve({
					status:'success'
				});
				that.program.addControl(new AMap.ToolBar({
					liteStyle: true
				}));
			});
		}
	});
	return promise;
}
amap.FuncLocate=function(force){
	var that=this;
	var promise = new Promise(function (resolve, reject) {
		if(!that.locate.load || force  ){
			that.program.plugin('AMap.Geolocation',function(){
				var programgeolocation = new AMap.Geolocation({
					timeout: 10000, //超过10秒后停止定位，默认：无穷大
					// buttonDom: locatebtn,
					// showButton: true,
					buttonPosition: 'LB',
					zoomToAccuracy: true//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				});
				that.program.addControl(programgeolocation);
				programgeolocation.getCurrentPosition();
				AMap.event.addListener(programgeolocation, 'complete', succfn)
				AMap.event.addListener(programgeolocation, 'error', errfn);
				that.locate.load='loading';
				function succfn(result) {
					that.locate.load='loaded';
					that.locate.data=result;
					resolve({
						status:'success',
						result:result
					});
				}
				function errfn(result) {
					that.locate.load=false;
					resolve({
						status:'fail',
						result:result
					});
				}
			});
		}
	});
	return promise;
}

amap.SetAddrData=function(){
	this.data.select=this.picker.data.address;
	this.data.addr.data=this.picker.data.address;
	this.data.addr.lat=this.picker.data.position.lat;
	this.data.addr.lng=this.picker.data.position.lng;

}
amap.GetAddrData=function(){
	let res={};
	res.address=this.picker.data.address;
	res.lat=this.picker.data.position.lat;
	res.lng=this.picker.data.position.lng;
	return res;
}

amap.GetLocateCity=function(){
	let city='';
	if(this.locate.load=='loaded'){
		city=this.locate.data.addressComponent.city ? this.locate.data.addressComponent.city : this.locate.data.addressComponent.province;
	}
	return city;
}
amap.GetLocate=function(){
	let address='';
	if(this.locate.load=='loaded'){
		address=this.locate.data.addressComponent;
	}
	return address;
}
amap.GetPickerCity=function(){
	let city='';
	if(this.picker.load=='loaded'){
		city=this.picker.data.regeocode.addressComponent.city ? this.picker.data.regeocode.addressComponent.city : this.picker.data.regeocode.addressComponent.province;
	}
	return city;
}
amap.GetPicker=function(){
	let address='';
	if(this.locate.load=='loaded'){
		address=this.picker.regeocode.addressComponent;
	}
	return address;
}
amap.SetCity=function(city){
	console.log(city);
	this.program.setCity(city);
}
amap.SetCenter=function(location){
	this.program.setCenter(location);
}













export default amap;