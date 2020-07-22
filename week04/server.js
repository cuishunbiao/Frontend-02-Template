
//加载 HTTP 模块
const HTTP = require('http');
console.log('start');

HTTP.createServer(function(request,response){
    let body = []
    console.log('进入')
    request.on('error',(err)=>{
        console.log(err)
    }).on('data',(chunk)=>{
        body.push(chunk.toString())
    }).on('end',()=>{
        console.log('end');
        body = Buffer.concat(body).toString();
        console.log('body:',body);
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end(' Hello World\n')
    })
}).listen(8088)

console.log('server start');
