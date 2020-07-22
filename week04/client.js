class Request{
    constructor(options){
        this.methods = options.methods || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};

        if( !this.headers['Content-Type'] ){
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if( this.headers['Content-Type'] === 'application/json' ){
            this.bodyText = JSON.stringify(this.body);
        }else if( this.headers['Content-Type'] === 'application/x-www-form-urlencoded'){
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }

        this.headers["Content-length"] = this.bodyText.length;

    }
    
    send(){
        return new Promise((resole,reject)=>{
            resole(this.bodyText)
        })
    }
}

void async function(){
    let request = new Request({
        methods:'POST',
        host:"127.0.0.1",
        port:'8808',
        path:'/',
        headers:{
            ["X-Foo2"]:"customed"
        },
        body:{
            name:'cuishunbiao',
            shun:'23232',
        }
    })
    let reslove = await request.send();
    console.log(reslove)
}();
