const P = require('./p.js')

// let p1 = new Promise(function (resolve, reject) {
//   resolve('then1');
// })

// p1.then((e) => {
//   console.log(e)
//   return new Promise(function (resolve, reject) {
//     resolve('then2')
//   })
// }).then((e) => {
//   console.log(e)
//   return 'then3'
// }).then((e) => {
//   console.log(e)
// })


let p2 = new P(function (resolve, reject) {
  console.log('start')
  resolve('then1');
},1)
p2.then((e) => {
  console.log(e)
  return new P(function (resolve, reject) {
    resolve('then2')
  },2)
})
.then((e) => {
  console.log(e)
  return 'then3'
})
.then((e) => {
  console.log(e)
})
.then((e) => {
  console.log(e)
})