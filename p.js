P = function (fnc, v) {
  let self = this;
  self.stat = 'pending'
  self.v = v || 0
  self.value = ''

  self = new Proxy(self, {
    set(target, key, value) {
      target[key] = value
      if (key == 'stat') {
        for (let i = 0; i < self.resolvelist.length; i++) {
          let temp = self.resolvelist[0].call(self, self.value);
          self.resolvelist.splice(0, 1);
          i--
          if (temp instanceof P) {
            break;
          }
          else { self.value = temp }
        }
      }
    }
  })

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
  if (self.stat == 'pending') {
    self.resolvelist.push(e)
  } else {
    let ret = e(self.value)
    if (ret instanceof P) {
      return ret;
    }
    self.value = ret || undefined
  }
  return self;
}

P.prototype.resolvelist = []



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