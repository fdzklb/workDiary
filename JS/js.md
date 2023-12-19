### Promise async await

##### 定义

##### 引用场景
##### 解决的问题
##### 缺点
 1. 无法取消Promise。一旦创建，Promise就会立即执行，无法中途取消。
 2. 如果未设置回调函数，Promise内部抛出的错误和成功之后的参数无法反应到外部。
 3. 当Promise处于pending状态时，无法得知目前进展到哪个阶段。
有一些场景可能需要取消Promise，包括但不限于：

 - 当用户触发某个操作，需要发送异步请求，但是这个请求可能不是用户最终想要的，用户可能在请求还没回来的时候取消了操作，这时应该取消Promise。
- 当在页面跳转或者Tab切换的时候，当前页面或者Tab还有很多异步操作在执行，这些异步操作可能影响用户体验或者造成资源浪费，所以这时应该取消Promise。
 - 当应用程序需要释放资源或执行清理操作时，可能需要取消正在进行的Promise。例如，如果一个长时间运行的Promise在应用程序关闭时仍未完成，那么可能需要取消它以确保应用程序可以正常关闭并释放资源。

 ```js
 class MyPromise {
  constructor(callback) {
    if(typeof(callback) !== 'function') {
        throw new TypeError('Promise构造函数入参必须是函数！')
    } else {}
      callback();
    }
  }
  const myPromise = new MyPromise(123);
  const myPromise = new MyPromise(function(resolve, reject) => {

  })
 ```

 #### Proxy


## JS的构造函数
### &emsp;&emsp; 在es6之前，js没有类的概念，js通过引入构造函数来定义对象和对象的属性

## JS中的call apply bind
### 用法
- fn.call(this, 'a','b','b')
- fn.apply(this, ['a','b','c'])
- fn.bind(this, ['a','b',''c])
- bind不会立即执行，而是返回一个函数。这样调用的时候不必重复绑定调用

```js
Function.prototype.myApply = function (context, args = []) {
  context = context || window;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
}

Function.prototype.myBind = function (context, args = []) {
    // context = context || window;
    // const fnSymbol = Symbol();
    // context[fnSymbol] = this;
    // return function(...newArgs) {
    //   return context[fnSymbol](...[...args, ...newArgs])
    // }
    const fn = this;
    return function(...newArgs) {
      return this.myApply(context, [...newArgs, ...args]);
    }
}

let newSilce = [].slice.myBind({ '0': 'java', '1': 'script', '2': 'wujie', length: 3 })
newSilce(0, 2)
```

### 高级应用

## 箭头函数与普通函数的区别
 箭头函数的this指向它定义的环境，而普通函数的this指向它执行的环境

 ## 原始类型和引用类型的区别
 - 赋值的区别 原始类型是直接赋值，引用类型是赋【引用】
 - 比较 原始类型比较是比较值是否相等，引用类型是比较引用是否相等
 - 函数传参 原始类型是值传参，函数是引用传参

 ## 闭包
 ```js
 const fn = () => {
  let count = 0;
  const function fnc() {
    count ++;
  };
  return fnc;
 }
```
  闭包=内层函数+引用的外层函数变量
  ### 作用
  - 封装函数: 如计算圆周率，可以把Π定义在函数内
  - 变量私有化: hooks
  ### 内存泄漏
  const result = fn();
  如果fn里面引用到了变量，而result 作为全局变量是一直存在的(除非关闭页面)，则会导致fn中的变量一直得不到销毁

  ## eventloop(事件循环)
  
   [js机制](https://juejin.cn/post/7002037475874963493)  

   ![这是图片](./public/img/elDis.png)
   ![这是图片](./public/img/eventloop.png)  
   ### 微任务(micro task)(由js引擎发起)
- promise(promise本身是同步，是then、catch为异步任务)
- async
- await
- process.nextTick(node)
- mutationObserver(html5新特性)  
### 宏任务(macro task)(由宿主环境发起，如node、浏览器)
- script(整体代码)
- setTimeout
- setInterval
- setImmediate
- I/O
- UI render

## 防抖(debounce)节流(throttle)
### 防抖应用场景
   - 搜索框输入
   - 文本编辑器保存
### 节流应用场景
   - 鼠标移动、窗口变化、滚动等频繁触发的事件
   - 记录视频播放时间


### 原型、原型链
定义： 每一个函数都有prototype属性，这个属性就是原型; 每个对象都有__proto__属性，它是指向原型对象
```js
const arr = new Array(1,2,3)
arr.__proto__ === Array.prototype
```
 ![这是图片](./public/img/yuanxin.png)  
作用： 
- 存放一些属性和方法
- 在javaScript中实现继承

