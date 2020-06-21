/*
promise
*/
// const P = require('./p.js')

// let p2 = new P(function (resolve, reject) {
//   setTimeout(() => {
//     console.log('start')
//     resolve('then1');
//   }, 100)
// }, 1)
// p2
//   .then((e) => {
//     console.log(e)
//     return new P(function (resolve, reject) {
//       setTimeout(() => {
//         // 11
//         resolve('then2')
//       }, 100)
//     }, 2)
//   })
//   .then((e) => {
//     // 22
//     console.log(e)
//     return 'then3'
//   })
//   .then((e) => {
//     setTimeout(() => {
//       // 33
//       console.log(e)
//     }, 100)
//   })
//   .then((e) => {
//     setTimeout(() => {
//       // 44
//       console.log(e)
//     }, 100)
//   })

import './css.lst'
// import './css.css'
/*
vue 3.0
*/

// const Vue = require('./vue.js')
// var app = new Vue({
//   el: '#root',
//   data: {
//     msg: 12,
//     msg2: '98',
//     show:true
//   },
//   methods: {
//     press(){
//       console.log('press')
//       this.msg=13
//     }
//   }
// })
let src = `.a1
{ font-size:20px;color:#f0f;.b{font-color:#ff0;
  }
}`
p(src)
function p(src) {
  let source = [], dist = [];
  source = src.replace('/\r\n*/', '')
  source = source.split(';')
  let dept = 0
  source.forEach(ele => {
    let o = ele
    while (o.length > 0) {
      let name = o.match(/([\&0-9a-zA-Z\-_\.#\s]|{)+/)
      name = null || (name&&name[0])
      o = o.slice(name.length)
      dist.push(name)
    }
  });
  // while (src.length > 0) {
  //   let slice = src.match(/[\&0-9a-zA-Z\-_\.#]+/)
  //   arr.push(slice)
  // }
  return '.a1{font-size:20px}'
}






// const Vue1 = require('./svue.js')
// var app1 = new Vue1({
//   el: '#source',
//   data: {
//     msg: 'Hello Vue!'
//   }
// })
// console.log(app1)