/**
 * 预处理
 * 把 px 转成纯数字
 */
function getStyle(element){
    if( !element.style ){
        element.style = {}
    }
    for( let prop in element.computedStyle ){
        var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;
        if( element.style[prop].toString().match(/px$/) ){
            element.style[prop] = parseInt(element.style[prop].value)
        }
    }


}

function layout(element){
    debugger
    //没有 style 直接返回
    if( !element.computedStyle ){
        return;
    }
    var elementStyle = getStyle(element);//处理 css
}

module.exports = layout;