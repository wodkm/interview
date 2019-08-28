# 作用域

## 闭包

* 闭包就是能够读取其他函数内部变量的函数，或者子函数在外调用，子函数所在的父函数的作用域不会被释放
* 闭包实现的关键：创建他的上下文已经销毁，而它仍然存在
* 闭包实现的原因：内部存在对外部作用域的引用

## This

* 传统中情况下this的指向其实就是活动对象指向的问题，原型链也会在这里产生作用。箭头函数中的this指向则是作用域的问题

### 五种绑定

#### 默认绑定

* 独立函数调用，可以把默认绑定看作是无法应用其他规则时的默认规则，this指向全局对象。
* 严格模式下，不能将全局对象用于默认绑定，this会绑定到undefined。只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。在严格模式下调用函数则不影响默认绑定。

#### 隐式绑定

* 当函数引用有上下文对象时，隐式绑定规则会把函数中的this绑定到这个上下文对象。对象属性引用链中只有上一层或者说最后一层在调用中起作用
* 被隐式绑定的函数特定情况下会丢失绑定对象，应用默认绑定，把this绑定到全局对象或者undefined上

```javascript
    function foo() {
        console.log( this.a );
    }
    var obj = {
        a: 2,
        foo: foo
    };
    var bar = obj.foo; // 函数别名
    var a = "oops, global"; // a是全局对象的属性
    bar(); // "oops, global"
```

#### 显式绑定

* 通过call(..) 或者 apply(..)方法。第一个参数是一个对象，在调用函数时将这个对象绑定到this。因为直接指定this的绑定对象，称之为显示绑定
* 显示绑定无法解决丢失绑定问题

##### 丢失绑定解决方案

* 硬绑定-返回包裹执行apply/call的函数或者用bind
* API调用的"上下文"。JS许多内置函数提供了一个可选参数，被称之为“上下文”（context），其作用和bind(..)一样，确保回调函数使用指定的this。这些函数实际上通过call(..)和apply(..)实现了显式绑定。

```javascript
    function foo(el) {
        console.log( el, this.id );
    }
    var obj = {
        id: "awesome"
    }
    var myArray = [1, 2, 3]
    // 调用foo(..)时把this绑定到obj
    myArray.forEach( foo, obj );
    // 1 awesome 2 awesome 3 awesome
```

#### new绑定

* 在JS中，构造函数只是使用new操作符时被调用的普通函数，他们不属于某个类，也不会实例化一个类。
* 包括内置对象函数（比如Number(..)）在内的所有函数都可以用new来调用，这种函数调用被称为构造函数调用。
* 实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。
* 使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
* 1、创建（或者说构造）一个新对象。
* 2、这个新对象会被执行[[Prototype]]连接。
* 3、这个新对象会绑定到函数调用的this。
* 4、如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

```javascript
    //一个手写new的实现
    function create() {
        // 创建一个空的对象
        var obj = new Object(),
        // 获得构造函数，arguments中去除第一个参数
        Con = [].shift.call(arguments);
        // 链接到原型，obj 可以访问到构造函数原型中的属性
        obj.__proto__ = Con.prototype;
        // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
        var ret = Con.apply(obj, arguments);
        // 优先返回构造函数返回的对象
        return ret instanceof Object ? ret : obj;
    };
```

#### 箭头函数绑定

* ES6新增一种特殊函数类型：箭头函数，箭头函数无法使用上述四条规则，而是根据外层（函数或者全局）作用域（词法作用域）来决定this。

```javascript
    function foo() {
        // 返回一个箭头函数
        return (a) => {
            // this继承自foo()
            console.log( this.a );
        };
    }

    var obj1 = {
        a: 2
    };

    var obj2 = {
        a: 3
    }

    var bar = foo.call( obj1 );
    bar.call( obj2 ); // 2，不是3！

    //另一个关于箭头函数和function中this区别的例子
    var myObject = {
        num: 2,
        sub: function() {
            (()=>{console.log(this.num)})();
            (function(){console.log(this.num)})()
            console.log(this.num)
        }
    }
    myObject.sub();
```

### 箭头函数中的this

* 箭头函数不绑定this，箭头函数中的this相当于普通变量
* 箭头函数的this寻值行为与普通变量相同，在作用域中逐级寻找
* 箭头函数的this无法通过bind，call，apply来直接修改（可以间接修改）
* 改变作用域中this的指向可以改变箭头函数的this
* eg. function closure(){()=>{//code }}，在此例中，我们通过改变封包环境closure.bind(another)()，来改变箭头函数this的指向
