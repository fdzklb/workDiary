// function MyPromise(callback) {
//     function constructor() {
//         if(typeof(callback) !== 'function') {
//             throw new TypeError('Promise构造函数入参必须是函数！')
//         } else {
//           callback(); 
//         }
//     }
//   } 


// Array.prototype.slice.call(likeArray),
  // 实现 call 方法
//   Function.prototype.myCall = function (context, ...args) {

//   };

//   let arr = [1,2,3,4]
//   console.log(' arr.slice()',  arr.slice());
      // 构造函数
      function Preson(name, age) {
        this.name = name;
        this.age = age;
      }
    //   所有实例共享的公共方法
      Preson.prototype.say = function (word) {
        console.log(`${this.name}说：${word}`);
        console.log(this)
      }
  
      const p1 = new Preson('张三', 18); // 创建一个Person实例对象
    //   const p2 = new Preson('李四', 28); // 创建一个Person实例对象
    //   p1.say('dd');
    //   p2.say('ss');
      Function.prototype.myCall = function(context, ...args) {
        context['func'] = this;
        return context['func'](...args);

      };
      [].slice.myCall([1,2,3,4], 1,2)

    //   Array.prototype.slice.myCall(likeArray),
      Preson.prototype.say.prototype === Function
      const p3 = {name: '王五'}
      p1.say.myCall(p3, 'kk')


      Function.prototype.myBind = function (context, ...args) {
        // 将 this 存储在 fn 变量中
        const fn = this;
        // 返回一个新的函数，该函数将传入的参数与新函数的参数合并，并在新的上下文中使用 apply 调用原始函数
        return function (...newArgs) {
          return fn.apply(context, [...args, ...newArgs]);
        };
      };
let obj = {
        obj1: {
            name: 'li si',
            add: () => {
                console.log('this.name', this.name);
            }

        }
      }
    
