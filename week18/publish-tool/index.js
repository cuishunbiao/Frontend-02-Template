let http = require('http');
let fs = require('fs');
let archiver = require('archiver');
let querystring = require('querystring');
let child_process = require('child_process');

// file.on('data', chunk => {
//     console.log('start', chunk.toString());
//     request.write(chunk);
// })

// file.on('end', chunk => {
//     console.log('read finished')
//     console.log(request);
//     request.end(chunk);
// })

// 单文件场景
// fs.stat("./index.html",(err,stats)=>{
//     let request = http.request({
//         hostname: '127.0.0.1',
//         port: 8085,
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/octet-stream",
//             "Content-length": stats.size
//         }
//     }, response => {
//         console.log(response)
//     })

//     let file = fs.createReadStream("./index.html");
//     file.pipe(request);
//     file.on('end', () => request.end())
// })

//多文件场景
// let request = http.request({
//     hostname: '127.0.0.1',
//     port: 8085,
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/octet-stream"
//     }
// }, response => {
//     console.log(response)
// })


// const archive = archiver('zip', {
//     zlib: {
//         level: 9
//     }
// })
// archive.directory('./template/', false);//不自动产生文件夹
// archive.finalize();
// // archive.pipe(fs.createWriteStream('tmp.zip'));
// archive.pipe(request);

//先获取用户信息 https://github.com/login/oauth/authorize?client_id=Iv1.a9b17443047b1ec8
//传入 client_id ，会跳转到预留的 localhost:8085 端口
//创建 Server ，接受 token ，点击才发布。

child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.a9b17443047b1ec8`)
//获取到：http://localhost:8085/auth?code=b636817ab15fadbb2f1f

http.createServer(function (request, response) {
    let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
    console.log('tool端');
    publish(query.token);
}).listen(8085)

function publish(token) {
    let request = http.request({
        hostname: '127.0.0.1',
        port: 8086,
        method: 'POST',
        path: '/publish?token=' + token
    }, response => {
        console.log(response)
    })
    const archive = archiver('zip', {
        zlib: {
            level: 9
        }
    })
    archive.directory('./template/', false);//不自动产生文件夹
    archive.finalize();
    // archive.pipe(fs.createWriteStream('tmp.zip'));
    archive.pipe(request);
}

