
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
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
            p{ font-size: 16px; }
            .header .content{ color:red; }
        </style>
    </head>
    <body>
        <p>ppp</p>
    </body>
</html>`)
    })
}).listen(8088)
