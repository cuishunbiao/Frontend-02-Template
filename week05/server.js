
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
            .container{ width:600px; height:400px; display:flex; background-color:rgb(0,255,0); }
            .container .left{ color:red; font-size:18px; width:150px; height:300px; background-color:rgb(255,0,0); }
            .container .center{ flex:1;  background-color:rgb(128,128,128); }
            .container .right{ flex:1; background-color:rgb(0,0,255); }
            .container .other{ flex:2; background-color:rgb(200,200,1); }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="left"></div>
            <div class="center"></div>
            <div class="right"></div>
            <div class="other"></div>
        </div>
        <p>ppp</p>
    </body>
</html>`)
    })
}).listen(8088)
