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
        let position = 0;//第几张
        let children = this.root.children;
        this.root.addEventListener('mousedown', event => {
            //获取鼠标点击的坐标
            let startX = event.clientX;

            let move = moveEvent => {
                let x = moveEvent.clientX - startX;
                /**
                 * 是否移动了一页
                 * x%400  120%400=120； 300%400=300; 400%400=0;
                 * 0/400=0; 120/400=0.3  201/400=0.5001
                 * Math.round(0.3)=0  Math.round(0.51) = 1;
                 * position 默认为0；
                 * 翻动一页为 -1 ；
                 * 
                 */
                let current = position - ((x - x % 400) / 400);
                for (let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;
                    children[pos].style.transition = 'none';
                    children[pos].style.transform = `translateX(${- pos * 400 + offset * 400 + x % 400}px)`;
                }
            }

            let up = upEvent => {
                let x = upEvent.clientX - startX;
                position = position - Math.round(x / 400);//当前第几页  -1 + 1
                console.log(position, '鼠标抬起时页码');

                for (let offset of [0, - Math.sign(Math.round(x / 400) - x + 200 * Math.sign(x))]) {
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length;
                    children[pos].style.transition = '';
                    children[pos].style.transform = `translateX(${- pos * 400 + offset * 400}px)`;
                }

                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            }

            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
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
    "./images/img3.jpg",
    "./images/img4.jpg"
]

let label = <Carousel src={imagesLists} />
//反向操作
label.mountTo(document.body);
