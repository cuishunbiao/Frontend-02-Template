var a = [
    {
        text:'你好',
    },
    {
        text:'早上好',
        children:[
            {
                text:'好好好'
            }
        ]
    }
]

var top = a[1];
top.children.push({
    text:'添加一个'
})

console.log(a);
console.log('-----');
console.log(top);
