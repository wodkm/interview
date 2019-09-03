# 深拷贝

## JSON.parse(JSON.stringify(object))

* 会忽略 undefined
* 会忽略 symbol
* 不能序列化函数

```javascript
    let obj = {
        name: 'muyiy',
        a: undefined,
        b: Symbol('muyiy'),
        c: function() {}
    }

    console.log(obj);
    // {
    // name: "muyiy",
    // a: undefined,
    // b: Symbol(muyiy),
    // c: ƒ ()
    // }

    let b = JSON.parse(JSON.stringify(obj));
    console.log(b);
    //{name: "muyiy"}
```

* 不能解决循环引用的对象

```javascript
    let obj = {
        a: 1,
        b: {
            c: 2,
            d: 3
        }
    }
    obj.a = obj.b;
    obj.b.c = obj.a;

    let b = JSON.parse(JSON.stringify(obj));
    // Uncaught TypeError: Converting circular structure to JSON
```

* 不能处理正则

```javascript
    let obj = {
        name: "muyiy",
        a: /'123'/
    }
    console.log(obj);
    // {name: "muyiy", a: /'123'/}

    let b = JSON.parse(JSON.stringify(obj));
    console.log(b);
    // {name: "muyiy", a: {}}
```
