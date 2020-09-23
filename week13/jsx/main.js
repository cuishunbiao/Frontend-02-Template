import {createElement} from './framework'   
import {Carousel} from './carousel.js'
import {Timeline, Animation} from './animation.js'

let imagesLists = [
    "./images/img1.jpg",
    "./images/img2.jpg",
    "./images/img3.jpg",
    "./images/img4.jpg"
]

let label = <Carousel src={imagesLists} />
//反向操作
label.mountTo(document.body);

let tl = new Timeline();//实例化
tl.add(new Animation({ set a(v){console.log(v)}},'a',0,100,1000,null));//添加 Animation 动画
tl.start();//开始执行 Tcik 函数

