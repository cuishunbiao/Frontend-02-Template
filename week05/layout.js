/**
 * 预处理
 * 把 px 转成纯数字
 */
function getStyle(element){
    if( !element.style ){
        element.style = {}
    }
    for( let prop in element.computedStyle ){
        var p = element.computedStyle.value;//不知道这一步的目的，不知道后续有没有使用的地方
        element.style[prop] = element.computedStyle[prop].value;

        //如果 value 里面含有 px 等值，就处理成数字
        if( element.style[prop].toString().match(/px$/) ){
            element.style[prop] = parseInt(element.style[prop])
        }
        //如果 value 里面是数字，也转换一下
        if( element.style[prop].toString().match(/^[0-9\.]+$/) ){
            element.style[prop] = parseInt(element.style[prop])
        }
    }
    // 无法 JSON.stringify(element)，因为是个循环结构了。
    // element.forEach(item=>{
    //     console.log(item,element[item])
    // })
    return element.style
}
/**
 * 
 * 传进来的数据格式
    {
        attributes:(0) []
        children:(1) [{…}]
        computedStyle:{}
        tagName:'style'
        type:'element'
    }
    带 computedStyle 的是:
    {
        attributes:[]
        children:[
            {type: 'text', content: 'ppp'}
        ]
        computedStyle:{
            font-size:{
                value: '16px', 
                specificity: [0, 0, 0, 1]
            }
        }
        tagName:'style'
        type:'element'
    }
 * 
 */
function layout(element){
    //没有 style 直接返回
    if( !element.computedStyle ){
        return;
    }
    var elementStyle = getStyle(element);//处理 css
    debugger

    //如果不是 flex 直接退出
    if( elementStyle.display != 'flex' ) return;

    //过滤文本节点，文本节点就是 \r\n 
    var items = element.children.filter(e => e.type === 'element');
    // order 的目的是什么？
    items.sort(function(a,b){
        return (a.order || 0) - (b.order || 0)
    })

    var style = elementStyle;
    //如果没有 width 属性，设置成空
    ['width','height'].forEach(size=>{
        if( style[size] === 'auto' || style[size] === '' ){
            style[size] = null;
        }
    })
    /**
     * 当前是这样的状态
     * display: 'flex'
     * width: 600
     * 下面是需要添加的默认属性
     *  添加完后的效果
        alignContent: 'stretch'
        alignItems: 'stretch'
        display: 'flex'
        flexDirection: 'row'
        flexWrap: 'nowrap'
        justifyContent: 'flex-start'
        width: 600
     */
    debugger
    if( !style.flexDirection || style.flexDirection === 'auto' ){
        style.flexDirection = 'row';
    }
    if( !style.alignItems || style.alignItems === 'auto' ){
        style.alignItems = 'stretch'
    }
    if( !style.justifyContent || style.justifyContent === 'auto' ){
        style.justifyContent = 'flex-start'
    }
    if( !style.flexWrap || style.flexWrap === 'auto'){
        style.flexWrap = 'nowrap'
    }
    if( !style.alignContent || style.alignContent === 'auto' ){
        style.alignContent = 'stretch'
    }
    
    debugger
    /**
     * mainSize 主轴尺寸，宽 高
     * mainStart 开始方向 left/right 可能为 top/bottom
     * mainSign 属性相减
     * mainBase 从左或者从右开始的值
     * 
     */
    var mainSize,mainStart,mainEnd,mainSign,mainBase,crossSize,
        crossStart,crossEnd,crossSign,crossBase;

    //主轴
    if( style.flexDirection === 'row' ){
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }

    if( style.flexDirection === 'row-reverse' ){
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }

    if( style.flexDirection === 'column' ){
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if( style.flexDirection === 'column-reverse' ){
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if( style.flexWrap === 'wrap-reverse' ){
        var tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    }else{
        crossBase = 0;
        crossSign = 1;
    }
    
    //如果父元素没有设置主轴尺寸
    var isAutoMainSize = false;
    
    if( !style[mainSize] ){
        elementStyle[mainSize] = 0;
        for( var i=0;i<item.length;i++){
            var item = items[i];
            if( itemStyle[mainSize] !== null || itemStyle[mainSize] !== void(0) ){
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize]
            }
        }
        isAutoMainSize = true;
    }

    //定义行
    var flexLine = [];
    var flexLines = [flexLine];
    //主轴的空间大小
    var mainSpace = elementStyle[mainSize];
    var crossSpace = 0;

    for(var i=0;i<items.length;i++){
        var item = items[i];
        var itemStyle = getStyle(item);

        if( itemStyle[mainSize] === null ){
            itemStyle[mainSize] = 0;
        }

        if( itemStyle.flex ){
            flexLine.push(item);
        }else if( style.flexWrap === 'nowrap' && isAutoMainSize ){
            mainSpace -= itemStyle[mainSize];
            if( itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            flexLine.push(item);
        }else{
            //如果当前元素的空间大于父元素的空间，就换算成一样的大小
            if( itemStyle[mainSize] > style[mainSize] ){
                itemStyle[mainSize] = style[mainSize]
            }
            //mainSpace 主轴长度
            if( mainSpace < itemStyle[mainSize] ){
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;
                flexLine = [item];
                flexLines.push(flexLine);
                mainSpace = style[mainSize];
                crossSpace = 0
            }else{
                flexLines.push(item);
            }
            if( itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0) ){
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            mainSpace -= itemStyle[mainSize]
        }
    }
    flexLines.mainSpace = mainSpace;
    //根据 flex 属性来分配每一行的 mainSpace

    if( style.flexWrap === 'nowrap' || isAutoMainSize ){
        flexLine.crossSpace = (style[crosssSize] !== undefined ? style[crossSize] : crossSpace)
    }else{
        flexLine.crossSpace = crossSpace;
    }

    if( mainSpace < 0 ){
        var scale = style[mainSize] / (style[mainSize] - mainSpace);
        var currentMain = mainBase;
        for(var i=0;i<items.length;i++){
            var item = items[i];
            var itemStyle = getStyle(item);
            if( itemStyle.flex ){
                itemStyle[mainSize] = 0;
            }
            itemStyle[mainSize] = itemStyle[mainSize] * scale;

            itemStyle[mainStart] = currentMain;
            itemStyle[mainStart] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
    }else{
        flexLines.forEach((items)=>{
            
        })
    }


    console.log(flexLines)
}

module.exports = layout;