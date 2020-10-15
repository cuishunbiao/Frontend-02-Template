//webpack.config.js 里面 React.createElement 替换面本页面的 createElement 自己的方法
export function createElement(type, attributes, ...children) {
    //创建一个标签 区分 Class 如果不是 string 类型，走 class 去添加
    let element;
    if (typeof type === 'string') {
        element = new ElementWrapper(type);
    } else {
        element = new type;
    }
    //把所有属性添加到标签上
    for (let attr in attributes) {
        element.setAttribute(attr, attributes[attr])
    }
    //把所有子元素添加到 Dom 里
    for (let child of children) {
        if (typeof child === 'string') {
            child = new TextWrapper(child);
        }
        element.appendChild(child);
    }
    return element;
}

//公共的
export class Component{
    constructor(type){
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
    appendChild(children) {
        children.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class TextWrapper extends Component {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        this.root = document.createElement(type);
    }
}
