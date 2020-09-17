//webpack.config.js 里面 React.createElement 替换面本页面的 createElement 自己的方法
function createElement(type, attributes, ...children) {
    //创建一个标签 区分 Class 如果不是 string 类型，走 class 去添加
    let element;
    if( typeof type === 'string' ){
        element = document.createElement(type);
    }else{
        element = new type;
    }
    //把所有属性添加到标签上
    for(let attr in attributes){
        element.setAttribute(attr,attributes[attr])
    }
    //把所有子元素添加到 Dom 里
    for(let child of children){
        if( typeof child === 'string' ){
            child = document.createTextNode(child);
        }
        element.appendChild(child);
    }
    return element;
}

class Div{
    constructor(){
        this.root = document.createElement('div');
    }
    setAttribute(name,value){
        this.root.setAttribute(name,value)
    }
    appendChild(children){
        this.root.append(children)
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

let label = <Div id="a" class="abc" props="prop">
                <span>a</span>
                <span>b</span>
                <span>c</span>
                添加一行文字
            </Div>
//document.body.appendChild(label)

//反向操作
label.mountTo(document.body);
