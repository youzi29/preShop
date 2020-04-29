import axios from 'axios';

class func {
    constructor() {
        this.format={//环境初始化数据
            environment:'production',//production为生产环境,development为开发环境,development模式默认不判断本地token
            ajax:{
                token:{
                    check:true,
                    router:"/login",//默认鉴权失败跳转路由
                    url:"../login.php"
                },
                url:{
                    replace:false,//存在值会直接更改所有ajax请求地址
                    offset:true,//为TRUE会进行URL全局检查更改
                },
                headers:{"Content-Type": "application/x-www-form-urlencoded"},
                restype:"json"//表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            },
            console:false//false为不输出，console为打印到控制，console为console

        };
        this.doc={
            width:360,
            height:640
        };
        this.filters={};
        if(process.env.NODE_ENV=='development'){
            this.format.environment='development';
            this.format.ajax.token.check=false;
        }
    }
    BuildData(store,router){
        this.store=store;
        this.router=router;
    }
    //加载函数
    SetDoc(){
        this.doc.width=document.documentElement.clientWidth;
        this.doc.height=document.documentElement.clientHeight;
    }
    /* 函数工具集 */
    //警告控制函数
    AutoShowConsole(log){
        if(this.format.console=="log"){
            console.log(log);
        }else if(this.format.console=="alert"){
            this.ShowAlert(log);
        }
    }
    ShowAlert(log){
        if(this.store && this.keyinjson('notice',this.store)){
            this.store.notice.SetNotice('alert',{
                content:log,
                menu:1
            });
        }else{
            alert(log);
        }
    }

    //本地缓存函数
    DeleteStorage(storage) {
        localStorage.removeItem(storage);
        let time = storage + "_time";
        localStorage.removeItem(time);
    }
    SaveStorage(storage, val, time) {
        localStorage.setItem(storage, val);
        if(time){
            let timestorage=storage+"_time";
            localStorage.setItem(timestorage, new Date().getTime());
        }
    }
    CheckStorage(val,time) {
        let storage = localStorage.getItem(val);
        if (storage) {
            if(time){
                let timestorage=val+"_time";
                let offset=time*60*60*1000;
                timestorage=localStorage.getItem(timestorage);
                if(!timestorage){
                    return false;
                }
                if(new Date().getTime()-timestorage>offset){
                    return false;
                }else{
                    return storage;
                }
            }else{
                return storage;
            }
        } else {
            return false;
        }
    }

    //对象/数组函数
    isArray(data){
        if (Array.isArray){
            return Array.isArray(data);
        }else{
            return Object.prototype.toString.call(data) === '[object Array]';
        }
    }
    CheckType(data){
        let type=typeof(data);
        if(type=='object'){
            if(this.isArray(data)){
                type='array';
            }else if(data==null){
                type='null';
            }
        }
        return type;
    }
    copyjson(json){
        return JSON.parse(JSON.stringify(json));
    }
    clearjson(json){
        for(let val in json){
            let type=this.CheckType(json[val]);
            if(type!='function'){
                if(type=='string'){
                    json[val]='';
                }else if(type=='object'){
                    this.clearjson(json[val]);
                }else if(type=='array'){
                    json[val]=[];
                }else if(type=='number'){
                    json[val]=0;
                }else if(type=='boolean'){
                    json[val]=false;
                }else if(type=='null'){
                    json[val]=null;
                }else{
                    json[val]='';
                }
            }
        }
    }
    keyinjson(key, json) {
        for (let k in json) {
            if(k==key){
                return true;
            }
        }
        return false;
    }
    copyto(data,json){
        for(let val in data){
            json[val]=data[val];
        }
    }
    copyarrayto(data,arr){
        for(let n in data){
            arr.push(data[n]);
        }
    }
    isinarray(val, arr) {
        // for (let n = 0; n < arr.length; n++) {
        //     if (arr[n] == val) {
        //         return true;
        //     }
        // }
        if(arr.indexOf(val)>-1){
            return true;
        }else{
            return false;
        }
    }
    change(main,fg,val){
        for(let n in main){
            main[n][fg]=false;
        }
        if(val){
            val[fg]=true;
        }
    }
    addprop(arr,prop){//数组对象添加属性
        for(let n in arr){
            arr[n].prop=false;
        }
    }



    //页面跳转函数
    SkipPageAndSave(type,url,storage){
        if(type=='url'){
            this.SaveStorage(storage,window.location.href);
        }else if(type=='router'){
            this.funcrouter('skip',url);
        }
    }
    funcrouter(act,target){

        if(!this.router){
            return false;
        }
        console.log(act,target);
        if(act=='skip'){
            this.router.push(target);
        }else if(act=='back'){
            if(window.history.length > 1){
                this.router.go(-1);
            }else{
                if(!target){
                    this.router.push('/');
                }else{
                    this.router.push(target);
                }
            }
        }
    }


    //功能函数
    getnum(original,type='round',radix=2){//格式化数字
        let num=parseFloat(original);
        if(isNaN(num)){
            num=0;
            console.log('NAN is find');
        }else if(Math.round(num)!==num){
            let rate=Math.pow(10,radix);
            num=Math[type](num*rate)/rate;
        }
        return num;
    }
    setdate(date){
        date.year=date.year.toString();
        date.month=date.month.toString();
        date.date=date.date.toString();
        if(date.month.length<2){
            date.month="0"+date.month;
        }
        if(date.date.length<2){
            date.date="0"+date.date;
        }
    }
    TableToExcel(table, button, name, filename){
        let uri='data:application/vnd.ms-excel;base64,';
        let template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
        let base64=function(s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        };
        let format=function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
            });
        };
        let ctx={//此时的innerHTML数据可以自己自定义 比如json转化 只要值要数据符合即可
            worksheet: name || 'Worksheet',
            table: table.innerHTML
        }
        button.href=uri+base64(format(template, ctx));
        button.download=filename;
        button.click();
    }
    //AJAX函数
    FormatUrl(url){
        if(this.format.environment=='production'){//生产环境
            url='../'+url;
        }else{//开发环境
            if(url.indexOf('localphp/')==0){
                url='https://wx.ihuanxi.cn/kd/newwashcache/local'+url;
            }else{
                // url='https://wx.ihuanxi.cn/kd/newwashcache/newplant/np/plant.php'+url;
                url='https://wx.ihuanxi.cn/kd/newwashcache/local'+url;
            }
            // url='http://localhost/VUE/'+url;
        }
        return url;
    }
    //get/post/file(file为通过传统post传输FormData格式数据,后台使用$_POST获取,正常为input流中获取); 目标网址 传输数据 判断是否需要判断token msg返回success时的回调函数 返回fail时的回调函数 存在将接管非错误时的整体回调,skip状态进行跳转动作,在该动作期间将会保存当前页面地址到本地缓存,鉴权完成后将会跳转回来
    ajax(type,url,data,tokenname,succfn,errfn,allfn,restype){
        let that = this,headers;
        if(this.format.ajax.url.replace){
            url=this.format.ajax.url.replace;
        }else if(this.format.ajax.url.offset){
            url=this.FormatUrl(url);
        }
        if(!this.format.ajax.token.check){
            tokenname=false;
        }
        if(type=="formdata"){
            type="post";
            let formdata = new FormData();
            for(let val in data){
                formdata.append(val,data[val]);
            }
            headers={"Content-Type": "multipart/form-data"};
            data=formdata;
        }else{
            headers=this.format.ajax.headers;
            data = JSON.stringify(data);
        }
        if(!restype){//返回值的格式
            restype=this.format.ajax.restype;
        }
        this.AutoShowConsole(data);
        axios({
            method: type,
            url: url,
            data:data,
            responseType: restype,
            headers:headers
        }).then(function(res) {
            that.AutoShowConsole(data);
            if (allfn) {
                allfn(res.data);
            } else {
                if (res.data.msg == "success") {
                    succfn(res.data);
                } else if (res.data.msg == "fail") {
                    if (errfn) {
                        errfn(res.data);
                    } else {
                        if(res.data['msgtext']){
                            that.ShowAlert(res.data['msgtext']);
                        }else{
                            that.ShowAlert('请求失败!');
                        }
                    }
                } else if (res.data.msg == "login") {
                    that.SkipPageAndSave('router',that.format.ajax.token.router,'skiproute');
                } else if (res.data.msg == "skip") {
                    that.SkipPageAndSave('url',that.format.ajax.token.url,'skip_url');
                } else {
                    that.ShowAlert(data);//如果返回数据不为JSON格式或者没有msg字段。说明程序错误，将会回调此处并弹出返回的字符串信息
                }
            }
        }).catch(function(error) {
            if(that.store && that.keyinjson('notice',that.store)){
                that.store.notice.ClearAll();
            }
            that.AutoShowConsole(error);
        });
    }
    post(url, data, tokenname, succfn, errfn, allfn, restype){
        this.ajax("post",url, data, tokenname, succfn, errfn, allfn, restype)
    }
    postformdata(url, data, tokenname, succfn, errfn, allfn, restype){
        this.ajax("formdata",url, data, tokenname, succfn, errfn, allfn, restype)
    }
    get(url, data, tokenname, succfn, errfn, allfn, restype){
        this.ajax("get",url, data, tokenname, succfn, errfn, allfn, restype)
    }



    //其他
    toString() {
        return '函数转换字符串未定义';
    }
}


export default func;