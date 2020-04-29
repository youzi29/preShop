import BuildFunc from './BuildFunc';
let func=new BuildFunc();

let notice={
    status:false,
    show:false,
    auto:false,
    style:{
        zIndex:100
    },
    load:{

    },
    alert:{
        title:'',
        content:'',
        menu:[],
        func:null
    }
}


notice.SetNotice=function(type,data,auto){
    this.ClearAll();
    if(type=='load'){
        //
    }else if(type=='alert'){
        this.alert.content=data.content ? data.content : '请求失败请刷新重试' ;
        if(func.keyinjson('title',data)){
            this.alert.title=data.title;
        }else{
            this.alert.title='';
        }
        
        if(data.menu==1){
            data.menu=[{
                action:'ok',
                content:'确定'
            }];
        }else if(data.menu==2){
            data.menu=[{
                action:'cancel',
                content:'取消'
            },{
                action:'ok',
                content:'确定'
            }];
        }
        for(var i=0;i<data.menu.length;i++){
            if(!func.keyinjson('style',data.menu[i])){
                data.menu[i].style={};
            }
        }

        this.alert.menu=data.menu;

        
        if(data.func){
            this.alert.func=data.func;
        }else{
            this.alert.func=null;
        }
    }
    this.status=type;
    this.auto=auto;
    this.show=true;
}

notice.alert=function(content,cb){
    this.SetNotice('alert',{
        content:content,
        menu:1,
        func:cb
    });
}
notice.confirm=function(content,cb){
    this.SetNotice('alert',{
        content:content,
        menu:[{
            action:'cancel',
            content:'取消',
            style:{
                backgroundColor:'#eee',
                color:'#666',
                border:'1px solid #ddd',
                boxShadow:''
            }
        },{
            action:'ok',
            content:'确定',
            style:{
                backgroundColor:'#4cb0f9',
                color:'#fff',
                border:'1px solid #4cb0f9',
                boxShadow:''
            }
        }],
        func:cb
    });
}

notice.HideModule=function(){
    this.status='';
    this.show=false;
    this.auto=false;
}
notice.ResetAlart=function(){
    this.alert.title='';
    this.alert.content='';
    this.alert.menu=[];
    this.alert.func=null;
}
notice.ClearAll=function(){
    this.HideModule();
    /*  */
    this.ResetAlart();
}
notice.ClearLoad=function(){
    this.HideModule();
}
notice.ClearAlert=function(){
    this.HideModule();
    /*  */
    this.ResetAlart();
}



export default notice;