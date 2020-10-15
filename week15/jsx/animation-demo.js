import { Timeline, Animation } from './animation.js'
import { ease, linear, easeIn, easeOut } from './ease.js';

let tl = new Timeline();

tl.start();
tl.add(new Animation(document.getElementById('box').style, 'transform', 0, 600, 3000, 50, ease, v => `translate(${v}px)`))
tl.add(new Animation(document.getElementById('box2').style, 'transform', 0, 600, 3000, 50, easeOut, v => `translate(${v}px)`))

//暂停
document.getElementById('pause').addEventListener('click', () => tl.pause())
document.getElementById('resume').addEventListener('click', () => tl.resume())
