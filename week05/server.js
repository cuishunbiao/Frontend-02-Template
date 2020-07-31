
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
            .container{ width:600px; display:flex; }
            .container .left{ color:red; font-size:18px; width:200px; }
            .container .right{ flex:1; background-color:#f00; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="left" />
            <div class="right" />
        </div>
        <p>ppp</p>
    </body>
</html>`)
    })
}).listen(8088)
