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
  setTimeout(() => {
    console.log('start')
    resolve('then1');
  }, 100)
}, 1)
p2
.then((e) => {
  console.log(e)
  return new P(function (resolve, reject) {
    setTimeout(() => {
      // 11
      resolve('then2')
    }, 100)
  }, 2)
})
.then((e) => {
  // 22
  console.log(e)
  return 'then3'
})
.then((e) => {
  setTimeout(() => {
    // 33
    console.log(e)
  }, 100)
})
.then((e) => {
  setTimeout(() => {
    // 44
    console.log(e)
  }, 100)
})