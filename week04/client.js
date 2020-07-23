const net = require('net');

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
    
    send(connection){
        return new Promise((resolve,reject)=>{
            let parser = new ResponseParser;
            if ( connection ){
                //toString 是自己的方法
                connection.write(this.toString());//发送数据
            }else{
                connection = net.createConnection({
                    port: this.port,
                    host: this.host
                },()=>{
                    connection.write(this.toString());//发送数据
                })
            }

            connection.on('data',(data)=>{
                //接收数据
                console.log(data.toString());
                parser.receive(data.toString());
                if( parser.isFinished ){
                    resolve(parser.response)
                    connection.end();
                }
            })

            connection.on('error',(err)=>{
                reject(err);
                connection.end();
            })

        })
    }

    toString(){
        console.log(`${this.methods} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}:${this.headers[key]}`).join('\r\n')}\r\r
${this.bodyText}`)
        return `${this.methods} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}:${this.headers[key]}`).join('\r\n')}\r\r
${this.bodyText}`;
    }
}

class ResponseParser{
    constructor(){}
    receive(string){
        for( let i=0; i<string.length; i++ ){
            this.reveiveChar = string.charAt(i);
        }
    }
    reveiveChar(char){

    }
}

void async function(){
    let request = new Request({
        methods:'POST',
        host:"127.0.0.1",
        port:'8088',
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
    console.log(reslove);
    // reslove.then(res=>{
    //     console.log(res)
    // }).catch(error=>{
    //     console.log(error);
    // })
}();
