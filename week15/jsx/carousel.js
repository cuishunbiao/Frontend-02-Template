import { Component, STATE, ATTRIBUTE } from './framework'
import { enableGesture } from './gesture';
import { Animation, Timeline } from './animation'
import { ease } from './ease';
export { STATE, ATTRIBUTE } from './framework'

export class Carousel extends Component {
    constructor() {
        super()
    }
    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');//给父级添加元素
        for (let record of this[ATTRIBUTE].src) {
            let child = document.createElement('div');
            child.classList.add('carousel-item');
            child.style.backgroundImage = `url(${record.img})`;
            this.root.appendChild(child);
        }
        enableGesture(this.root);
        let timeline = new Timeline;
        timeline.start();

        let handler = null;

        let children = this.root.children;
        //let position = 0;//第几张
        this[STATE].position = 0;
        let t = 0, ax = 0;
        this.root.addEventListener('start', event => {
            timeline.pause();
            clearInterval(handler);
            if (Date.now() - t < 2000 ){
                let progress = (Date.now() - t) / 2000;
                ax = ease(progress) * 400 - 400;
            }else{
                ax = 0;
            }
        })

        this.root.addEventListener('tap', event => {
            this.triggerEvent('click', {
                data: this[ATTRIBUTE].src[this[STATE].position],
                position: this[STATE].position
            })
        })

        this.root.addEventListener('pan', event => {
            //获取鼠标点击的坐标
            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x - x % 400) / 400);
            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;
                children[pos].style.transition = 'none';
                children[pos].style.transform = `translateX(${- pos * 400 + offset * 400 + x % 400}px)`;
            }
        })

        this.root.addEventListener('end', event => {

            //重新打开时间线
            timeline.reset();
            timeline.start();
            handler = setInterval(nextPicture, 3000);

            //获取鼠标点击的坐标
            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x - x % 400) / 400);

            let direction = Math.round((x % 400) / 400);

            if (event.isFlick) {
                if (event.velocity < 0) {
                    direction = Math.ceil((x % 400) / 400)
                } else {
                    direction = Math.floor((x % 400) / 400)
                }
            }

            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;
                children[pos].style.transition = 'none';
                timeline.add(new Animation(children[pos].style, 'transform',
                    - pos * 400 + offset * 400 + x % 400,
                    - pos * 400 + offset * 400 + direction * 400,
                    500,
                    0,
                    ease,
                    v => `translateX(${v}px)`
                ))
            }

            this[STATE].position = this[STATE].position - ((x - x % 400) / 400) - direction;
            this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;
            this.triggerEvent('change', { position: this[STATE].position});

        })

        let nextPicture = () => {
            let children = this.root.children;
            let nextIndex = (this[STATE].position + 1) % children.length;//下一张的下标
            let current = children[this[STATE].position];
            let next = children[nextIndex];

            t = Date.now();

            timeline.add(new Animation(current.style, 'transform',
                - this[STATE].position * 400,
                -400 - this[STATE].position * 400,
                500,
                0,
                ease,
                v => `translateX(${v}px)`
            ))
            timeline.add(new Animation(next.style, 'transform',
                400 - nextIndex * 400,
                - nextIndex * 400,
                500,
                0,
                ease,
                v => `translateX(${v}px)`
            ))

            this.triggerEvent('change', { position: this[STATE].position});
            this[STATE].position = nextIndex;
        }

        handler = setInterval(nextPicture, 3000);

        //添加鼠标事件
        //如果使用 this.root 添加 mousemove 和 mouseup 事件，会导致鼠标移出 Demo 区事件停止，并且不能响应 up 事件
        // this.root.addEventListener('mousedown', event => {
        //     let children = this.root.children;
        //     //获取鼠标点击的坐标
        //     let startX = event.clientX;

        //     let move = moveEvent => {
        //         let x = moveEvent.clientX - startX;
        //         /**
        //          * 是否移动了一页
        //          * x%400  120%400=120； 300%400=300; 400%400=0;
        //          * 0/400=0; 120/400=0.3  201/400=0.5001
        //          * Math.round(0.3)=0  Math.round(0.51) = 1;
        //          * position 默认为0；
        //          * 翻动一页为 -1 ；
        //          * 
        //          */
        //         let current = position - ((x - x % 400) / 400);
        //         for (let offset of [-1, 0, 1]) {
        //             let pos = current + offset;
        //             pos = Math.abs((pos + children.length) % children.length);
        //             children[pos].style.transition = 'none';
        //             children[pos].style.transform = `translateX(${- pos * 400 + offset * 400 + x % 400}px)`;
        //         }

        //     }

        //     let up = upEvent => {
        //         let x = upEvent.clientX - startX;
        //         position = position - Math.round(x / 400);//当前第几页  -1 + 1

        //         //Math.round 只要超过 0.5 就取值为1；
        //         //Math.sign 判断数据是否是正数还是负数，还是0；正数1，负数-1，0为0；
        //         console.log(- Math.sign(Math.round(x / 400) - x + 200 * Math.sign(x)));
        //         for (let offset of [0, - Math.sign(Math.round(x / 400) - x + 200 * Math.sign(x))]) {
        //             let pos = position + offset;
        //             pos = Math.abs((pos + children.length) % children.length);
        //             children[pos].style.transition = '';
        //             children[pos].style.transform = `translateX(${- pos * 400 + offset * 400}px)`;
        //         }
        //         document.removeEventListener('mousemove', move);
        //         document.removeEventListener('mouseup', up);
        //     }

        //     document.addEventListener('mousemove', move)
        //     document.addEventListener('mouseup', up)
        // })


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
}