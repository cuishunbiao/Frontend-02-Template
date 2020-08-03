const net = require('net');
const images = require('images');
const parser = require('./parser.js');
const render = require('./render.js')

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
                parser.receive(data.toString());
                console.log(JSON.stringify(data.toString()))
                if( parser.isFinished ){
                    console.log('isFinished true')
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
        return `${this.methods} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}:${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`;
    }
}

class ResponseParser {
    constructor() {
        /**
         * \n 是换行，英文是 New line，表示使光标到行首
         * \r 是回车，英文是 Carriage return，表示使光标下移一格
         * \r\n 表示回车换行
         * \n 只是移动到下一行行首，而 \r 是产生回车的
         * \r\n 是两个状态，
         * 所以需要 status_line 和 status_line_end 两个状态
         * 而 header 的状态为：key:value\r
         */

        this.WAITING_STATUS_LINE = 0;//默认起始行
        this.WAITING_STATUS_LINE_END = 1;//起始行结束
        this.WAITING_HEADER_NAME = 2;//头字段名称 key
        this.WAITING_HEADER_SPACE = 3;//头字段分号 ：
        this.WAITING_HEADER_VALUE = 4;//头字段值 Value
        this.WAITING_HEADER_LINE_END = 5;//头字段 结束
        this.WAITING_HEADER_BLOCK_END = 6;//头部块结束
        this.WAITING_BODY = 7;//body 体

        this.current = this.WAITING_STATUS_LINE;//状态机默认是 起始行
        this.statusLine = "";//状态行内容
        this.headers = {};//headers 内容
        this.headerName = "";//头部字段 key
        this.headerValue = "";//头部字段 value
        this.bodyParser = null;//body 体

    }

    get isFinished(){
        return this.bodyParser && this.bodyParser.isFinished;
    }

    get response(){
        this.statusLine.match(/HTTP\/1.1 ([0-9]*) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }

    receive(string) {
        console.log(string)
        for (let i = 0; i < string.length; i++) {
            this.reveiveChar(string.charAt(i));
        }
    }
    reveiveChar(char) {
        //"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nDate: Thu, 23 Jul 2020 13:06:25 GMT\r\nConnection: keep-alive\r\nTransfer-Encoding: chunked\r\n\r\nd\r\n Hello World\n\r\n0\r\n\r\n"
        //判断起始行
        if (this.current === this.WAITING_STATUS_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_STATUS_LINE_END;//等待结束行
            } else {
                this.statusLine += char;
            }
        } else if (this.current === this.WAITING_STATUS_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME
            }
        } else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === ':') {
                this.current = this.WAITING_HEADER_SPACE
            } else if (char === '\r') {
                //说明是空行，需要结束
                this.current = this.WAITING_HEADER_BLOCK_END
                if( this.headers['Transfer-Encoding'] === 'chunked' ){
                    this.bodyParser = new TrunkedBodyParser()
                }
            } else {
                this.headerName += char;
            }
        } else if (this.current === this.WAITING_HEADER_SPACE) {
            if (char === ' ') {
                //冒号后面 必须是空格
                this.current = this.WAITING_HEADER_VALUE;
            }
        } else if (this.current === this.WAITING_HEADER_VALUE) {
            if (char === '\r') {
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerName = '';
                this.headerValue = '';
            } else {
                this.headerValue += char
            }
        } else if (this.current === this.WAITING_HEADER_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME
            }
        } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
            if (char === '\n') {
                this.current = this.WAITING_BODY;
            }
        } else if (this.current === this.WAITING_BODY) {
            this.bodyParser.receiveChar(char)
        }
    }
}

class TrunkedBodyParser{
    constructor(){
        this.WAITING_LENGTH = 0;//chunk 长度为0，则结束
        this.WAITING_LENGTH_LINE_END = 1;// chunk 结束标签
        this.READING_TRUNK = 2;//获取 trunk
        this.WAITING_NEW_LINE = 3;//新的一行
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;//返回数据的总长度
        this.content = [];
        this.isFinished = false;//是否全部匹配完
        this.current = this.WAITING_LENGTH;//当前状态为 0
    }
    receiveChar(char){
        if( this.current === this.WAITING_LENGTH ){
            if( char === '\r' ){
                if( this.length === 0 ){
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            }else{
                this.length *= 16;
                this.length += parseInt(char,16)
            }
        }else if( this.current === this.WAITING_LENGTH_LINE_END ){
            /**
             * 受同学指点，在 isFinished = true 后，不需要再继续拼装信息了；
             * 因为已经找到 16 进制的 0 了，这是最后一个字符，body 体就结束了；
             * 可以使用 !this.isFinished 来判断
             * 也可以增加一个 状态机码 来判断
             * this.WAITING_FINISHED = 5;
             * if( this.length === 0 ){
             *      this.isFinished = true;
             *      this.current = this.WAITING_FINISHED
             * }else{
             *      this.current = this.WAITING_LENGTH_LINE_END;
             * }
             * if( this.current === this.WAITING_FINISHED ){
             *      return;
             * }
             * 
             * 疑问？
             * 因为 0 后面还有 \r\n，所以收集的 body 体是不对的，所以
             * 导致在 response 使用 RegExp.$1 和 RegExp.$2 是出错的。
             * 
             */
            if (char === '\n' ){
                if ( this.isFinished ){
                    this.current === this.WAITING_NEW_LINE
                }else{
                    this.current = this.READING_TRUNK
                }
            }
        }else if( this.current === this.READING_TRUNK ){
            this.content.push(char);
            this.length --;
            /**
             * 关于最后这个 length 的问题，为什么加了 !isFinished 就不生效了呢
             * 为什么最后还会再跟两个 \r\n \r\n 呢？
             * 第一个 \r\n 是 body 体结束
             * 第二个 \r\n 是 chunk 体结束
             * 后面跟的这两个 \r\n 是一个完整的 chunk 体
             * */
            if( this.length === 0 ){
                this.current = this.WAITING_NEW_LINE
            }
        }else if( this.current === this.WAITING_NEW_LINE ){
            if( char === '\r' ){
                this.current = this.WAITING_NEW_LINE_END
            }
        }else if( this.current === this.WAITING_NEW_LINE_END ){
            if( char === '\n' ){
                this.current = this.WAITING_LENGTH
            }
        }
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
    let response = await request.send();
    let dom = parser.parseHTML(response.body);

    //汇制 html
    let viewport = images(1000, 600);
    render(viewport,dom);
    viewport.save("viewport.jpg");
}();
