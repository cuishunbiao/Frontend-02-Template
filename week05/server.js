
//加载 HTTP 模块
const HTTP = require('http');
console.log('start');

HTTP.createServer(function(request,response){
    let body = []
    console.log('进入')
    request.on('error',(err)=>{
        console.log(err)
    }).on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk.toString())
    }).on('end',()=>{
        console.log('end');
        //body = Buffer.concat(body).toString();
        console.log('body:',body);
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end(`<html lang="en">
    <head>
        <style>
            p{ font-size: 16px; }
            .header .content{ color:red; font-size:18px; }
        </style>
    </head>
    <body>
        <div class="header">
            <span class="content"></span>
        </div>
        <p>ppp</p>
    </body>
</html>`)
    })
}).listen(8088)
