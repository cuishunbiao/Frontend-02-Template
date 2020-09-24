//Timeline 的类，不能被外界随意调用
const TICK = Symbol('tick');//永远不重复
const TICK_HANDLER = Symbol('tick_handler');//tick事件
const ANIMATIONS = Symbol('animations')
const START_TIME = Symbol('start-time');
const PAUSE_START = Symbol('pause-start');
const PAUSE_TIME = Symbol('pause-time');

export class Timeline {
    constructor() {
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
    }
    start() {
        let startTime = Date.now();
        this[PAUSE_TIME] = 0;//开始时为0
        console.log('startTime ',startTime)
        this[TICK] = () => {
            let now = Date.now();//Date.now() 实时变化
            for(let animation of this[ANIMATIONS]){
                //如果 animation 的时间比较小，我们就认为是 0；
                let t;
                if( this[START_TIME].get(animation) < startTime ){
                    t = now - startTime - this[PAUSE_TIME];
                }else{
                    t = now - this[START_TIME].get(animation) - this[PAUSE_TIME];
                }
                //计算出的时间大于持续时间，停止
                if( t > animation.duration ){
                    this[ANIMATIONS].delete(animation);//删除方法
                    t = animation.duration;
                }
                animation.receive(t)
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }


    //暂停
    pause() {
        this[PAUSE_START] = Date.now();//开始暂停时间
        cancelAnimationFrame(this[TICK_HANDLER])
    }
    resume() {
        if( !this[PAUSE_START] ){
            return;
        }
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
        console.log(Date.now(),this[PAUSE_START])
        this[TICK]();
    }

    //重启
    reset() {

    }
    //把 animation 添加到 Timeline
    //animation 有时候想手工设置 ... 
    add(animation,startTime){
        if( arguments.length < 2 ){
            startTime = Date.now();
        }
        this[ANIMATIONS].add(animation);
        this[START_TIME].set(animation, startTime);
        console.log(this[START_TIME]);
    }
}

/**
 * 动画
 * 一个值转成另一个值
 * 每秒一张图片属于 帧动画
 * 我们大部分写的都是「属性动画」
 */
export class Animation {
    /**
     * @param {*} object 对象
     * @param {*} property 属性
     * @param {*} startValue 开始值
     * @param {*} endValue 结束值
     * @param {*} duration 持续时长
     */
    constructor(object, property, startValue, endValue, duration, delay, timeFunction, template) {
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.timeFunction = timeFunction;
        this.delay = delay;
        this.template = template;
    }
    //执行
    receive(time) {
        console.log(time)
        //变化区间  this.startValue + (this.endValue - this.startValue)
        let range = this.endValue - this.startValue;
        this.object[this.property] = this.template(this.startValue + range * time / this.duration)
    }
}

