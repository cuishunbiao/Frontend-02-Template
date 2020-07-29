const css = require('css');

let currentToken = null;// tag 是按 token 处理的
let currentAttribute = null;//全局的属性
let currentTextNode = null;
//默认的栈
let stack = [{
  type: "document",
  children: []
}]

let rules = [];
function addCSSRules(text){
  var ast = css.parse(text);
  //console.log(JSON.stringify(ast,null,"    "))
  rules.push(...ast.stylesheet.rules);
  //console.log(rules)
}

/**
 * 匹配 element 和 selector
 * 只有三种 div / #div / .div
 * ----------------element - start -------------
 *  attributes:(1) [{
 *    name: 'class',
 *    value: 'header'
 *  }]
 * length:1
 * children:(0) []
 * tagName:'div'
 * type:'element'
 *  ----------------element - end -------------
 * selector 就是 .content 或者 .header 这种选择器，单个的选择器
 * 为什么不用 element == String 这种方式？
 */
function match(element, selector){
  debugger
  //没有传入选择器，或者 element 没有属性，即 element 数组没有长度，返false
  if( !selector || !element.attributes ){
    return false;
  }
  //获取 selector 第一个字符，去做匹配
  if( selector.charAt(0) == "#" ){
    var attr = element.attributes.filter(attr => attr.name === 'id')[0];
    if (attr && attr.value === selector.replace('#','') ){
      return true;
    }
  }else if( selector.charAt(0) == '.' ){
    var attr = element.attributes.filter(attr => attr.name === 'class')[0];
    if( attr && attr.value === selector.replace('.','') ){
      return true
    }
  }else{
    if( element.tagName === selector ){
      return true;
    }
  }
  return false;
}

/**
 * 立即计算 css
 * 当我们分析一个元素的时候，所有的 css 规则已经收集完毕。
 * stack 里面有所有元素的父元素
 * 必须要知道父元素
 * slice();复制一遍数组，栈里面的元素会变化，防止污染
 * div div #myid
 * 
 */
function computeCSS(element){
  /**
   *  attributes:(1) [{
   *    name: 'lang',
   *    value: 'en'
   *  }]
   * children:(0) []
   * tagName:'html'
   * type:'element'
   *
   * -------------------- div -------------
   *  attributes:(1) [{
   *    name: 'class',
   *    value: 'header'
   *  }]
   * length:1
   * children:(0) []
   * tagName:'div'
   * type:'element'
   *
   */
  var elements = stack.slice().reverse();//复制数组，标签匹配从当前元素向外匹配，需要一级一级向外找；
  if( !element.computedStyle ){
    element.computedStyle = {}
  }

  for(let rule of rules){
    //如果是 [.header,.content] 这个复合数组就会转成 [.content,.header]
    var selectorParts = rule.selectors[0].split(" ").reverse();

    //先去匹配第一个数组 也就是 .content，如果没有匹配成功，退出这次循环
    if( !match(element,selectorParts[0]) ){
      continue;
    }

    let matched = false;//先定义一个变量

    /**
     * 如果第一个 .content 匹配成功了，就会去继续向下匹配；
     * 所以 j = 1，因为 j=0的那步，上面执行了。
     * 接下来匹配 .header 如果上面还有 class 就会去继续匹配
     * 一直循环下去 类似于： .bodyContent .container .header .content
     * 
     * */
    
    var j = 1;
    for(var i = 0; i<elements.length; i++){
      if( match(elements[i],selectorParts[j]) ){
        j++
      }
    }
    /**
     * selectorParts.length 是 css 生成的 css 数组的长度
     * j++ 说明匹配成功了，如果所有数组都匹配成功，那么 j 的长度最少是 selectorParts 的长度
     * 为什么要用 >= 应该用 > 就可以了啊？因为 j 是从 1 开始的。
     * 
     */
    if( j >= selectorParts.length ){
      matched = true;
    }
    if( matched ){
      console.log("Element",element,"matched rule",rule);
    }

  }

  // console.log(rules);
  // console.log('compute for css element',element);
}


//什么是 对偶 操作？
//创建完需要做输出
function emit(token) {
  console.log(stack);
  let top = stack[stack.length - 1];//先计算好当前数组最下面是什么标签，以在 endTag 做闭合使用
  if (token.type == 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }
    element.tagName = token.tagName;

    for (let p in token) {
      if (p != "type" && p != "tagName") {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }
    computeCSS(element);//原则上讲，在开始标签就已经知道会匹配哪些 Css 了

    top.children.push(element);

    element.parent = top;

    //如果不是自闭合标签，在当前数组下面添加一行
    if (!token.isSelfClosing) {
      stack.push(element);
    }
    currentTextNode = null;

  } else if(token.type == 'endTag'){
    if( top.tagName != token.tagName ){
      throw new Error('Tag start end doesn\'t match!')
    }else{
      if( top.tagName === 'style' ){
        addCSSRules(top.children[0].content);//读取到 style 里 css 内容
      }
      stack.pop()
    }
    currentTextNode = null;
  }else if( token.type == 'text' ){
    if( currentTextNode == null ){
      currentTextNode = {
        type:'text',
        content:''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content;
  }

}

const EOF = Symbol("EOF");//定义一个唯一属性，做为结束使用

/**
 * html Tag 分三种
 * 1、开始标签
 * 2、结束标签
 * 3、自封闭标签
 */

function data(c) {
  //判断开始标签
  if (c == '<') {
    return tagOpen;//返回开始标签状态
  } else if (c == EOF) {// data 最后传入的状态是 == EOF 呢？
    emit({
      type: "EOF"
    })
    return;
  } else {
    emit({
      type: "text",
      content: c
    })
    return data;
  }
}

//处理开始状态的标签
function tagOpen(c) {
  //自结束标签
  if (c == '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: ""
    }
    return tagName(c);//收集 tagName
  } else {
    return;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    }
    return tagName(c);
  } else if (c == '>') {

  } else if (c == EOF) {

  } else {

  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == '/') {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c;
    return tagName
  } else if (c == '>') {
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == '/' || c == '>' || c == EOF) {
    return afterAttributeName(c)
  } else if (c == '=') {
  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
    return afterAttributeName(c)
  } else if (c == '=') {
    return beforeAttributeValue;
  } else if (c == '\u0000') {

  } else if (c == '"' || c == '\'' || c == '<') {

  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (c == '/') {
    return selfClosingStartTag
  } else if (c == '=') {
    return beforeAttributeValue
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}



//属性 - 取值之前判断是 单引号还是双引号
function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
    return beforeAttributeValue;
  } else if (c == '"') {
    return doubleQuotedAttributeValue;
  } else if (c == '\'') {
    return singleQuotedAttributeValue;
  } else if (c == '>') {

  } else {
    return UnquotedAttributeValue(c)
  }
}

function doubleQuotedAttributeValue(c) {
  if (c == '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue;
  } else if (c == '\u0000') {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue
  }
}

//属性 - 单引号的匹配
function singleQuotedAttributeValue(c) {
  if (c == '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue
  } else if (c == '\u0000') {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;//doubleQuotedAttributeValue
  }
}

//属性 - 双引号的 值
function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken)
    return data;
  } else if (c = EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue
  }
}

function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName
  } else if (c == '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return UnquotedAttributeValue
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == '\u0000') {

  } else if (c == '\'' || c == '"' || c == '<' || c == '=' || c == '`') {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue
  }
}

function selfClosingStartTag(c) {
  if (c == '>') {
    currentToken.isSelfClosing = true;
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken)
    return data;
  } else if (c == 'EOF') {

  } else {

  }
}


module.exports.parseHTML = function parseHTML(html) {
  let state = data;//默认开始方式为 data
  for (let c of html) {
    debugger
    state = state(c)
  }
  state = state(EOF);
  return stack[0]
}


