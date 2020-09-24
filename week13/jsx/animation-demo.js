import {Timeline, Animation} from './animation.js'

let tl = new Timeline();

tl.start();
tl.add(new Animation(document.getElementById('box').style,'transform',0,600,3000,50,null, v=>`translate(${v}px)`))

//暂停
document.getElementById('pause').addEventListener('click',()=>tl.pause())
document.getElementById('resume').addEventListener('click',()=>tl.resume())
