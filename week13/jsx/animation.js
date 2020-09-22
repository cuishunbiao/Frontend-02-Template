//Timeline 的类，不能被外界随意调用
const TICK = Symbol('tick');//永远不重复
const TICK_HANDLER = Symbol('tick_handler');

export class Timeline {
    constructor() {
        this[TICK] = () => {
            console.log('tick')
            requestAnimationFrame(this[TICK]);
        }
    }
    start() {
        //this[TICK]();
    }


    //暂停
    pause() {

    }
    resume() {

    }

    //重启
    reset() {

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
     * @param {*} duration 时长
     */
    constructor(object, property, startValue, endValue, duration, timeFunction) {
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.timeFunction = timeFunction;
    }
    //执行
    receiveTime(time) {
        //变化区间  this.startValue + (this.endValue - this.startValue)
        let range = this.endValue - this.startValue;
        this.object[this.property] = this.startValue + range * time / this.duration
    }
}

