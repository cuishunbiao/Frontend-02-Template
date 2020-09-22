import {createElement} from './framework'   
import {Carousel} from './carousel.js'
import {Timeline} from './animation.js'

let imagesLists = [
    "./images/img1.jpg",
    "./images/img2.jpg",
    "./images/img3.jpg",
    "./images/img4.jpg"
]

let label = <Carousel src={imagesLists} />
//反向操作
label.mountTo(document.body);

let tl = new Timeline();
tl.start();


class myClass{
    constructor(){
    }
    get className(){
        return 'className';
    }
    set classNameFn(x){
        console.log(x,'2s');
    }
}

let _cls = new myClass();
_cls.classNameFn = '111'