import { Component, createElement } from './framework'

class Carousel extends Component {
    constructor() {
        super()
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');//给父级添加元素
        for (let record of this.attributes.src) {
            let child = document.createElement('div');
            child.classList.add('carousel-item');
            child.style.backgroundImage = `url(${record})`;
            this.root.appendChild(child);
        }
        
        //添加鼠标事件
        //如果使用 this.root 添加 mousemove 和 mouseup 事件，会导致鼠标移出 Demo 区事件停止，并且不能响应 up 事件
        this.root.addEventListener('mousedown',res=>{
            console.log('mousedown');

            let up = ()=>{
                console.log('up')
                document.removeEventListener('mousemove',move);
                document.removeEventListener('mouseup',up);
            }
            let move = ()=>{
                console.log('move')
            }
            document.addEventListener('mouseup', up)
            document.addEventListener('mousemove', move)
        })


        // let currentIndex = 0;//当前张下标
        // setInterval(() => {
        //     let children = this.root.children;
        //     let nextIndex = (currentIndex+1) % children.length;//下一张的下标
        //     let current = children[currentIndex];
        //     let next = children[nextIndex];

        //     next.style.transition = 'none';
        //     next.style.transform = `translateX(${100 - nextIndex * 100}%)`;//下一张图 需向左移动 100% 
        //     setTimeout(() => {
        //         next.style.transition = '';
        //         current.style.transform = `translateX(-${currentIndex * 100 + 100}%)`
        //         next.style.transform = `translateX(-${nextIndex * 100}%)`;
        //         currentIndex = nextIndex
        //     }, 16);
        // }, 3000);

        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render())
    }
}

let imagesLists = [
    "./images/img1.jpg",
    "./images/img2.jpg",
    "./images/img3.jpg"
]

let label = <Carousel src={imagesLists} />
//反向操作
label.mountTo(document.body);
