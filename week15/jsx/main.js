import { createElement } from './framework';//替换 react 方法 createElement
import { Carousel } from './Carousel.js';//轮播组件
import { Timeline, Animation } from './animation.js';//动画和时间线
import { List } from './List.js'

let imagesLists = [
    {
        img: "./images/img1.jpg",
        url: 'https://www.baidu.com',
        title: 'img1'
    },
    {
        img: "./images/img2.jpg",
        url: 'https://www.baidu.com',
        title: 'img2'
    },
    {
        img: "./images/img3.jpg",
        url: 'https://www.baidu.com',
        title: 'img3'
    },
    {
        img: "./images/img4.jpg",
        url: 'https://www.baidu.com',
        title: 'img4'
    }
]
// let label = <Carousel src={imagesLists} 
//             onChange={event => event.detail.position} 
//             onClick={event=>{
//                 window.open(event.detail.data.url, '_blank')
//             }}
//             />
// //反向操作
// label.mountTo(document.body);

// let tl = new Timeline();//实例化

//window.tl = tl;
//window.animation = new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 1000, null);//添加 Animation 动画
//tl.start();//开始执行 Tcik 函数

// let a = <Button>
// content
// </Button>

let a = <List data={imagesLists}>
    {(record)=>
        <div>
            <img src={record.img} />
            <a href={record.url}>{record.title}</a>
        </div>
    }
</List>

a.mountTo(document.body);
