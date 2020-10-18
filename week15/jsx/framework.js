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
    let processChildren = (children) => {
        for (let child of children) {
            if ((typeof child === 'object') && (child instanceof Array)) {
                processChildren(child);
                continue;
            }
            if (typeof child === 'string') {
                child = new TextWrapper(child);
            }
            element.appendChild(child);
        }
    }
    processChildren(children);
    return element;
}

export const STATE = Symbol('state');
export const ATTRIBUTE = Symbol('attribute');

//公共的
export class Component {
    constructor(type) {
        this[ATTRIBUTE] = Object.create(null);
        this[STATE] = Object.create(null);
    }
    render() {
        return this.root;
    }
    setAttribute(name, value) {
        this[ATTRIBUTE][name] = value;
    }
    appendChild(children) {
        console.log(children);
        console.log(this.root);
        children.mountTo(this.root);
    }
    mountTo(parent) {
        if (!this.root)
            this.render();
        parent.appendChild(this.root);
    }
    triggerEvent(type, args) {
        this[ATTRIBUTE]['on' + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, { detail: { ...args, key: '自己的key' } }))
    }
}

class TextWrapper extends Component {
    constructor(content) {
        super();
        this.root = document.createTextNode(content);
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        super();
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
}
