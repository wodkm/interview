# Object

## Object.assign

## [key]与.key的差异

* data.key访问的是data对象下的key
* data[key]访问的是data数组的下标为key的值（对象是可以以数组形式来访问的）
* [key]可以使用带空格的变量（字面量）

## 属性存在性

```javascript
    var anotherObject = {
        a: 1
    };

    // 创建一个关联到 anotherObject 的对象
    var myObject = Object.create( anotherObject );
    myObject.b = 2;

    ("a" in myObject); // true
    ("b" in myObject); // true

    myObject.hasOwnProperty( "a" ); // false
    myObject.hasOwnProperty( "b" ); // true
```

* in 操作符会检查属性是否在对象及其 [[Prototype]] 原型链中
* hasOwnProperty(..) 只会检查属性是否在 myObject 对象中，不会检查 [[Prototype]] 原型链

## 简易浅拷贝实现

```javascript
    function cloneShallow(source) {
        var target = {};
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
        return target;
    }

    // 测试用例
    var a = {
        name: "muyiy",
        book: {
            title: "You Don't Know JS",
            price: "45"
        },
        a1: undefined,
        a2: null,
        a3: 123
    }
    var b = cloneShallow(a);

    a.name = "高级前端进阶";
    a.book.price = "55";

    console.log(b);
    // { 
    //   name: 'muyiy', 
    //   book: { title: 'You Don\'t Know JS', price: '55' },
    //   a1: undefined,
    //   a2: null,
    //   a3: 123
    // }

    //一个es6的写法
    function clone(obj){
        let result = {};
        Object.keys(obj).forEach(key=>{
            result[key] = obj[key];
        });
        return result;
    }
```

## 深拷贝的实现

### 简易实现

```javascript
    function clone(obj){
        let result = {};
        Object.keys(obj).forEach(key=>{
            if(typeof obj[key] == 'object' && obj[key]!==null && obj[key]!==undefined){
                result[key] = clone(obj[key]);
            }else{
                result[key] = obj[key];
            }
        });
        return result;
    }
```

* 数组的深拷贝-加判断

```javascript
    function isObj(obj){
        return typeof obj == 'object' && obj!==null && obj!==undefined;
    }

    function clone(obj){
        if(!isObj(obj)) return boj;
        var result = Array.isArray(obj) ? [] : {};
        Object.keys(obj).forEach(key=>{
            if(isObj(obj[key])){
                result[key] = clone(obj[key]);
            }else{
                result[key] = obj[key];
            }
        });
        return result;
    }
```

* 循环引用的深拷贝-使用hash表或数组记录

```javascript
    function isObj(obj){
        return typeof obj == 'object' && obj!==null && obj!==undefined;
    }

    function clone(obj, hash = new WeakMap()){
        if(!isObj(obj)) return boj;
        if (hash.has(obj)) return hash.get(obj);

        var result = Array.isArray(obj) ? [] : {};
        hash.set(obj, result);

        Object.keys(obj).forEach(key=>{
            if(isObj(obj[key])){
                result[key] = clone(obj[key],hash);
            }else{
                result[key] = obj[key];
            }
        });
        return result;
    }
```

* Symbol-
* 递归爆栈
