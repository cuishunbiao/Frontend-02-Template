


function randomWord(length){
    let s = '';
    for(let i=0;i<length;i++){
        console.log(Math.random() * 26);
        console.log('a'.charCodeAt(0))
        /**
         * 随机产生一个数字 * 26
         * 加上 a字母的 UTF-16 的 Unicode代码点
         * 会随机产生 97+0 / 97+1 / 97+2
         * String.fromCharCode 返回 UTF16 代码点的 字符串
         */
        s += String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0));
    }
    return s;
}
console.log(randomWord(100));