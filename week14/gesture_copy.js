let element = document.documentElement;

let isListeningMouse = false;

/**
 *  mouseEvent.button 代表的是：
 *  0：主按键，通常指鼠标左键或默认值
    1：辅助按键，通常指鼠标滚轮中键
    2：次按键，通常指鼠标右键
    3：第四个按钮，通常指浏览器后退按钮
    4：第五个按钮，通常指浏览器的前进按钮

    mouseEvent.buttons 代表的是：哪些按键被按了
    0b11111 五个键全被按下来了
    0b00001 左键
    0b00010 中键
    0b00100 右键
    0b00011 左中键全按下
    0b00111 左中右全按下
    0b01000 后退键
    0b10000 前进键

 */

element.addEventListener('mousedown', event => {

    let context = Object.create(null);
    contexts.set('mouse' + (1 << event.button), context);
    start(event, context);

    let mousemove = event => {
        // console.log(event.buttons);
        let button = 1;
        while (button <= event.buttons) {
            if (button & event.buttons) {
                //order of buttons & button property is not same
                let key;
                if (button === 2) {
                    key = 4;
                } else if (button === 4) {
                    key = 2;
                } else {
                    key = button;
                }
                let context = contexts.get('mouse' + button);
                move(event, context);
            }
            button = button << 1;
        }
    }

    let mouseup = event => {
        let context = contexts.get('mouse' + (1 << event.button));
        end(event, context);
        contexts.delete(context);
        //判断是否还有 key 在
        if (event.buttons === 0) {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
            isListeningMouse = false;
        }
    }

    if (!isListeningMouse) {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        isListeningMouse = true;
    }
})


/**
 * 
 * identifier 是唯一识别码
 * 
 */
let contexts = new Map();
element.addEventListener('touchstart', event => {
    for (let touch of event.changedTouches) {
        let context = Object.create(null);//创建一个对象，不继承原型链属性
        contexts.set(touch.identifier, context);
        start(touch, context);
    }
})

element.addEventListener('touchmove', event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        move(touch, context);
    }
})

element.addEventListener('touchend', event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        end(touch, context);
        contexts.delete(touch.identifier);
    }
})

element.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        cancel(touch, context);
        contexts.delete(touch.identifier);
    }
})

let start = (point, context) => {
    //console.log('start', point.clientX, point.clientY);
    context.startX = point.clientX, context.startY = point.clientY;
    //初始化一个数组
    context.points = [{
        t: Date.now(),
        x: point.clientX,
        y: point.clientY
    }]

    //恢复默认值
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;

    context.handler = setTimeout(() => {
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        context.handler = null;
    }, 500)
}

let move = (point, context) => {
    //是否移动了 10 px 
    let dx = point.clientX - context.startX; dy = point.clientY - context.startY;
    //平方大于 100，移动 10px 后，再移动回来，也属于 移动事件
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
        context.isPan = true;//已经移动了 10px 
        context.isTap = false;
        context.isPress = false;
        clearTimeout(context.handler);
    }

    context.points = context.points.filter(point => Date.now() - point.t < 500);

    context.points.push({
        t: Date.now(),
        x: point.clientX,
        y: point.clientY
    })

}

let end = (point, context) => {
    //在 move 的时候去判断所有情况， end 来处理结果值
    if (context.isTap) {
        dispath('tap',{})
        clearTimeout(context.handler);
    }
    if (context.isPan) {
        console.log('pan');
    }
    if (context.isPress) {
        console.log('press');
    }
    context.points = context.points.filter(point => Date.now() - point.t < 500);
    let d,v=0;
    if (context.points.length){
        //开平方，默认是正数
        d = Math.sqrt((point.clientX - context.points[0].x) ** 2 +
            (point.clientY - context.points[0].y) ** 2);
        v = d / (Date.now() - context.points[0].t);
    }

    if( v > 1.5 ){
        console.log('flick');
        context.isFlick = true;
    }else{
        context.isFlick = false;
    }

}
    

let cancel = (point, context) => {
    clearTimeout(context.handler);
    console.log('cancel', point.clientX, point.clientY);
}

//派发事件
export function dispath(type, properites) {
    //创建 Event
    let event = new Event(type);
    console.log(event);
    for (let name in properites){
        event[name] = properites[name]
    }
    element.dispatchEvent(event);
}
