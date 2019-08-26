# 类的创建和继承

## 类的创建

* ES5：new一个function，在这个function的prototype里面增加属性和方法

```javascript
    // 定义一个动物类
    function Animal (name) {
        // 属性
        this.name = name || 'Animal';
        // 实例方法
        this.sleep = function(){
            console.log(this.name + '正在睡觉！');
        }
    }
    // 原型方法
    Animal.prototype.eat = function(food) {
        console.log(this.name + '正在吃：' + food);
    };
```

## 类的继承

### 原型链继承

* 特点：基于原型链，既是父类的实例，也是子类的实例
* 缺点：无法实现多继承

```javascript
    function Cat(){ }
    Cat.prototype = new Animal();
    Cat.prototype.name = 'cat';
    // Test Code
    var cat = new Cat();
    console.log(cat.name);
    console.log(cat.eat('fish'));
    console.log(cat.sleep());
    console.log(cat instanceof Animal); //true
    console.log(cat instanceof Cat); //true
```

### 构造继承

* 特点：可以实现多继承
* 缺点：只能继承父类实例的属性和方法，不能继承原型上的属性和方法。

```javascript
    function Cat(name){
        Animal.call(this);
        this.name = name || 'Tom';
    }
    // Test Code
    var cat = new Cat();
    console.log(cat.name);
    console.log(cat.sleep());
    console.log(cat instanceof Animal); // false
    console.log(cat instanceof Cat); // true
```

### 实例继承和拷贝继承

* 实例继承：为父类实例添加新特性，作为子类实例返回
* 拷贝继承：拷贝父类元素上的属性和方法
* 实用性不强

### 组合继承

* 特点：可以继承实例属性/方法，也可以继承原型属性/方法
* 缺点：调用了两次父类构造函数，生成了两份实例

```javascript
    function Cat(name){
        Animal.call(this);
        this.name = name || 'Tom';
    }
    Cat.prototype = new Animal();
    Cat.prototype.constructor = Cat;
    // Test Code
    var cat = new Cat();
    console.log(cat.name);
    console.log(cat.sleep());
    console.log(cat instanceof Animal); // true
    console.log(cat instanceof Cat); // true
```
