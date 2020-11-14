let http = require('http');
let https = require('https')
// let fs = require('fs');
let unzipper = require('unzipper');
let querystring = require('querystring');

//1. auth路由：接受 code ，用 code + client_id + client_secret 换取 token 
//2. publish路由：用 token 获取用户信息，检查权限，接受发布

function auth(request, response) {
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    getToken(query.code,function(info){
        console.log(info)
        response.write(`<a href='http://localhost:8085/?token=${info.access_token}'>publish</a>`);
        response.end();
    });
}

function getToken(code, callback) {
    let request = https.request({
        hostname: 'github.com',
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.a9b17443047b1ec8&client_secret=7bee514ab6fc58a610065cdeffd0384c3c50552d`,
        port: 443,
        method: "POST"
    }, function (response) {
        console.log('success')
        let body = '';
        response.on('data', chunk => {
            body += chunk.toString();
        })
        response.on('end', chunk => {
            callback(querystring.parse(body));
        })
    })
    request.end();
}

function publish(request, response) {
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
    getUser(query.token,info=>{
        if( info.login === 'cuishunbiao' ){
            request.pipe(unzipper.Extract({
                path:'../server/public/'
            }))
            request.on('end',function(){
                response.end('success!!!')
            })
        }
    });
}

function getUser(token,callback){
    let request = https.request({
        hostname: 'api.github.com',
        path: `/user`,
        port: 443,
        method: "GET",
        headers:{
            Authorization: `token ${token}`,
            "User-Agent": 'toy-publish-cuishunbiao'
        }
    }, function (response) {
        console.log('success')
        let body = '';
        response.on('data', chunk => {
            body += chunk.toString();
        })
        response.on('end', chunk => {
            callback(JSON.parse(body));
        })
    })
    request.end();
}

http.createServer(function (request, response) {
    if (request.url.match(/^\/auth\?/)) {
        return auth(request, response)
    }
    if (request.url.match(/^\/publish\?/)) {
        return publish(request, response)
    }
}).listen(8086)

// http.createServer(function(request,response){
//     console.log(request.headers)

//     // let outFile = fs.createWriteStream('../server/public/index.html');

//     // request.on('data',chunk=>{
//     //     outFile.write(chunk)
//     // })
//     // request.on('end', ()=>{
//     //     outFile.end();
//     //     response.end('Success')
//     // })

//     // let outFile = fs.createWriteStream("../server/public/tmp.zip");
//     // request.pipe(outFile);

//     request.pipe(unzipper.Extract({
//         path:'../server/public/'
//     }))

// }).listen(8085)


