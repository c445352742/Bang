P = function (fnc, v) {
  let self = this;
  self.stat = 'pending'
  self.v = v || 0
  self.value = ''
  self.resolve = function (e) {
    if (self.stat !== 'pending')
      return;
    self.value = e;
    self.stat = 'resolve'
  }
  self.reject = function () { }

  fnc(self.resolve, self.reject);
  return self;
}


P.prototype.then = function (e) {
  let self = this;
  let ret = e(self.value)
  if (ret instanceof P) {
    return ret;
  }
  self.value = ret || undefined
  return self;
}



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

module.exports = P