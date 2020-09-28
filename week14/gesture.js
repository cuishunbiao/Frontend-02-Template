
let element = document.documentElement;

element.addEventListener('mousedown', event => {
    start(event);

    let mousemove = event => {
        move(event);
    }

    let mouseup = event => {
        end(event);
        element.removeEventListener('mousemove', mousemove);
        element.removeEventListener('mouseup', mouseup);
    }

    element.addEventListener('mousemove', mousemove);
    element.addEventListener('mouseup', mouseup);

})

element.addEventListener('touchstart', event => {
    start(event.changedTouches[0]);
})

element.addEventListener('touchmove', event => {
    move(event.changedTouches[0]);
})

element.addEventListener('touchend', event => {
    end(event.changedTouches[0]);
})

element.addEventListener('touchcancel', event => {
    cancel(event.changedTouches[0]);
})

let handler;
let startX, startY;
let isPan = false;//是否移动
let isTap = true;//

let start = point => {
    //console.log('start', point.clientX, point.clientY);
    startX = point.clientX, startY = point.clientY;

    //恢复默认值
    isTap = true;
    isPan = false;
    isPress = false;

    handler = setTimeout(() => {
        isTap = false;
        isPan = false;
        isPress = true;
    }, 500)
}

let move = point => {
    //是否移动了 10 px 
    let dx = point.clientX - startX; dy = point.clientY - startY;
    //平方大于 100，移动 10px 后，再移动回来，也属于 移动事件
    if (!isPan && dx ** 2 + dy ** 2 > 100) {
        isPan = true;//已经移动了 10px 
        isTap = false;
        isPress = false;
        handler = null;
        clearTimeout(handler);
    }

}

let end = point => {
    //在 move 的时候去判断所有情况， end 来处理结果值
    if (isTap) {
        console.log('tap');
        clearTimeout(handler);
    }
    if (isPan) {
        console.log('pan');
    }
    if (isPress) {
        console.log('press');
    }
}

let cancel = point => {
    isPan = false;
    isTap = false;
    isPress = false;
    clearTimeout(handler);
    console.log('cancel', point.clientX, point.clientY);
}

