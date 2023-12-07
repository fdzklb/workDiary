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