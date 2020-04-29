import func from './../func';
/* 依赖数据 */

let address={
    load:false,
    list:[],
    city:{
        load:false,
        current:{
            data:{
                province:{
                    id:'',
                    name:'',
                    list:[]
                },
                city:{
                    id:'',
                    name:''
                }
            }
        },
        list:[]
	},
	build:{
		id:'',
		name:'',
		mobile:'',
		address:'',
		number:'',
		lng:'',
		lat:''
	}
}


address.city.funcdata=function(force){
	var that = this;
	var promise = new Promise(function (resolve, reject) {
		if(!that.load || force ){
			that.load='loading';
			var postdata = {};
			var url='php/useAddress.php';
			postdata.status = 'showcitynew';
			func.post(url, postdata, false, succfn, errfn);
		}else{
			resolve([that.load,false]);
		}
		function succfn(res) {
			that.load='loaded';
			that.list=[];
			for(let i=0;i<res.list.length;i++){
				let province=res.list[i];
				for(let k=0;k<province.list.length;k++){
					let city=province.list[k];
				}
			}
			func.copyarrayto(res.list,that.list);
			resolve(['success',res]);
		}
		function errfn(res){
			that.load=false;
			func.showtips("城市数据加载失败,请刷新重试!"+res,100000);
		}
	});
	return promise;
}

address.city.choicecity=function(city,province){
	this.current.data.city=func.copyjson(city);
	this.current.data.province=func.copyjson(province);
}
address.city.checkcity=function(currentcityname,nosave){
	if(!currentcityname){
		return false;
	}
	for(let i=0;i<this.list.length;i++){
		for(let k=0;k<this.list[i].list.length;k++){
			if(currentcityname.indexOf(this.list[i].list[k].name)>-1){
                if(!nosave){
                    this.choicecity(this.list[i].list[k],this.list[i]);
                }
				return true;
			}
		}
	}
	return false;
}


address.BuildData=function(){
	var that = this;
	var promise = new Promise(function (resolve, reject) {
		var postdata = {};
		postdata.status='add';
		postdata.city=that.city.current.data.city.name;
		postdata.cityid=that.city.current.data.city.id;
		postdata.name=that.build.name;
		postdata.address=that.build.address;
		postdata.number=that.build.number;
		postdata.mobile=that.build.mobile;
		postdata.lng=that.build.lng;
		postdata.lat=that.build.lat;
		console.log(postdata.lng,postdata.lat);
		func.post('php/useAddress.php', postdata, false, buildsucc);
		function buildsucc(res){
			console.log(res);
			// var grurl=func.checkstorage('grouptoaddress',1);
            // if(grurl){
            //     window.location.href=grurl;//团单跳转
            // }
			// postdata.id=res.id;
			// delete postdata.status;
			// that.builddata(postdata);
			// func.showtips('添加地址成功');
			resolve({status:'success'});
		}
	});
	return promise;
}








export default address;