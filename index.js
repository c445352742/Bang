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


/*
vue 3.0
*/

const Vue = require('./vue.js')
var app = new Vue({
  el: '#root',
  data: {
    msg: 12,
    msg2: '98',
    show:true
  },
  methods: {
    press(){
      console.log('press')
      this.msg=13
    }
  }
})

// const Vue1 = require('./svue.js')
// var app1 = new Vue1({
//   el: '#source',
//   data: {
//     msg: 'Hello Vue!'
//   }
// })
// console.log(app1)