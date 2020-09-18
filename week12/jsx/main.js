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

        let currentIndex = 0;//当前张下标
        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (currentIndex+1) % children.length;//下一张的下标
            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = 'none';
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;//下一张图 需向左移动 100% 

            console.log('当前下标',currentIndex);
            console.log('下一个下标',nextIndex);
            console.log('下一个图片偏移',`-${100 - nextIndex * 100}%`)
            setTimeout(() => {
                next.style.transition = '';
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
                next.style.transform = `translateX(-${nextIndex * 100}%)`;
                currentIndex = nextIndex

                console.log('setTimeout 当前下标',currentIndex);
                console.log('setTimeout 当前图片偏移',`${-100 - currentIndex * 100}%`)
                console.log('setTimeout 下一个图片偏移',`-${nextIndex * 100}%`)
            }, 20);
        }, 3000);

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
