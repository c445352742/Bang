/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

const Vue = __webpack_require__(/*! ./vue.js */ "./vue.js")
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

/***/ }),

/***/ "./vue.js":
/*!****************!*\
  !*** ./vue.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports) {

function Vue(param) {
  let self = this;

  if (self.beforeCreate) {
    self.beforeCreate();
  }

  // 'this' get data's region
  for (let i in param.data) {
    self[i] = param.data[i]
  }
  // 'this' get methods' region
  for (let i in param.methods) {
    if (self[i]) {
      console.warn('[Vue warn]: Method "msg" has already been defined as a data property.')
    } else
      self[i] = param.methods[i]
  }

  //set proxy for varable-write
  self = new Proxy(self, {
    set(target, key, value) {
      let self = target;
      self[key] = value
      let nodeList1 = [];
      for (let i in self.varNodeList) {
        if (self.varNodeList[i].key == key) {
          nodeList1 = self.varNodeList[i].map
        }
      }
      for (let i in nodeList1) {
        nodeList1[i].node.data = self.fillValue(nodeList1[i].orgtext)
      }
    },
    get(target, key) {
      return target[key]
    }
  })

  if (self.created) {
    self.created();
  }

  // varable-node list
  self.varNodeList = (function () {
    let o = []
    for (let i in param.data) {
      o.push({ key: i, map: [] })
    }
    return o
  })()

  if (self.beforeMount) {
    self.beforeMount();
  }

  self.$el = (function (param) {
    if (param.el.substr(0, 1) == '#') {
      $el = document.getElementById(param.el.substr(1))
    }
    if (param.el.substr(0, 1) == '.') {
      $el = document.getElementsByClassName(param.el.substr(1))[0]
    }
    if (self.template) {
      // $el.innerHTML = self.template
    }
    return $el
  })(param)

  // virtural dom
  self.vDom = (function () {
    let o = {}
    function getTree(root) {
      let des = {
        name: root.localName,
        attribute: (function () {
          let attr = root.attributes
          let o = {}
          if (!attr) {
            return null
          }
          for (let i = 0; i < attr.length; i++) {
            o[attr[i].name] = attr[i].value
          }
          return o;
        })(),
        node: null,
        children: [],
      }
      //record final nodes and recursion middle nodes
      if (root.childNodes.length > 0) {
        for (let i = 0; i < root.childNodes.length; i++) {
          if (root.childNodes && root.childNodes[i].nodeType == 3) {
            let text = root.childNodes[i].wholeText
            des.children.push({ name: 'text', node: root.childNodes[i], orgtext: text })
          } else if (root.childNodes && root.childNodes[i].nodeType == 8) {
            des.children.push({ name: 'comment', node: null, orgtext: root.childNodes[i].textContent })
          } else {
            des.children.push(getTree(root.childNodes[i]))
          }
        }
      }
      return des;
    }
    o = getTree(self.$el);
    console.log(o)
    return o
  })()

  // set html from vDom
  let c = self.toDom(self.vDom)
  let p = self.$el.parentElement
  p.replaceChild(c, self.$el)

  //delete repeated nodes in varable map
  for (let i in self.varNodeList) {
    let arr = self.varNodeList[i].map
    for (let k = 0; k < arr.length; k++) {
      for (let j = k + 1; j < arr.length; j++) {
        if (arr[k].node == arr[j].node) {
          arr.splice(j, 1);
          j--;
        }
      }
    }
  }

  // $el.style.cssText = 'display:"none"'

  if (self.mounted) {
    self.mounted();
  }
}

Vue.prototype.update = function () {
  this.toDom()
}

// virtural dom to dom
Vue.prototype.toDom = function (root) {
  let self = this;
  root.node = document.createElement(root.name)
  if (root.children && root.children.length > 0) {
    for (let i in root.children) {
      root.node.append(self.toDom(root.children[i]))
    }
  }

  if (root.attribute) {
    for (let i in root.attribute) {
      // load event
      if (i.indexOf('v-on') !== -1) {
        let evt = i.split(':')[1]
        root.node.addEventListener(evt, function (e) {
          self[root.attribute[i]](e)
        })
        continue;
      }
      if (i == 'v-if') {
        let varable = root.attribute[i]
        let res = false;
        (function () {
          let P_$_self = self;
          let P_$_root = root
          for (let P_$_i in self) {
            if (typeof (P_$_self[P_$_i]) !== 'function') {
              eval('let ' + P_$_i + '="' + P_$_self[P_$_i] + '"')
            }
          }
          eval('res=' + P_$_varable)
          if (P_$_res) {
            
          } else {
            P_$_root.node.remove()
          };
        })()
      }
      root.node.setAttribute(i, root.attribute[i])
    }
  } else {
    if (root.name == 'comment') {
      root.node = document.createComment(root.orgtext)
    }
    if (root.name == 'text') {
      root.node = document.createTextNode(self.fillValue(root.orgtext))
      // bbb
      let varList = self.getVarable(root.orgtext)
      for (let k in self.varNodeList) {
        for (let j in varList) {
          if (self.varNodeList[k].key == varList[j]) {
            if (root.orgtext.indexOf(varList[j]) != -1) {
              self.varNodeList[k].map.push({
                node: root.node,
                orgtext: root.orgtext
              })
            }
          }
        }
      }
    }
  }
  return root.node
}

Vue.prototype.fillValue = function (orgtext) {
  let result = ''
  let self = this
  let arr = orgtext.split('{{')
  for (let i in self) {
    if (typeof (self[i]) !== 'function') {
      eval('var ' + i + '="' + self[i] + '"')
    }
  }
  for (let i in arr) {
    if (arr[i].indexOf('}}') == -1) {
      result += arr[i]
      continue;
    }
    let subarr = arr[i].split('}}')
    let exp = subarr[0]
    eval('result+=' + exp)
    result += subarr[1]
  }
  return result
}

Vue.prototype.getVarable = function (P_$_text) {
  // let P_$_text = P_$_textOrg.orgtext
  if (P_$_text.indexOf('}}') == -1) {
    return [];
  }
  let P_$_strs = []
  let P_$_buff = []
  let P_$_arr = P_$_text.split('}}')
  for (let P_$_i in P_$_arr) {
    if (P_$_arr[P_$_i].indexOf('{{') != -1) {
      P_$_buff.push(P_$_arr[P_$_i].split('{{')[1])
    }
  }
  P_$_arr = P_$_buff   //the Array ready for analysis
  for (let P_$_i in P_$_arr) {
    let P_$_o = P_$_arr[P_$_i]
    let P_$_msg, P_$_p = 0, P_$_errorFlag = false;
    do {
      P_$_msg = '', P_$_errorFlag = false
      try {
        eval('let a=(' + P_$_o + ')')
      } catch (e) {
        P_$_msg = e.message
        P_$_strs.push(P_$_msg.split(' is not')[0])
        P_$_errorFlag = true
      }
      let reg = new RegExp(P_$_strs[P_$_strs.length - 1], "g")
      P_$_o = (P_$_o).replace(reg, 12)
      if (P_$_p > 10) break;
      P_$_p++;
    } while (P_$_errorFlag)
  }
  return P_$_strs;
}

module.exports = Vue

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vdnVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsUUFBUTtBQUNSLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsTUFBTTs7O0FBR047QUFDQTtBQUNBOztBQUVBLFlBQVksbUJBQU8sQ0FBQywwQkFBVTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0I7Ozs7Ozs7Ozs7O0FDbkVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxrQkFBa0I7QUFDaEM7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixpQkFBaUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNEJBQTRCO0FBQ25EO0FBQ0E7QUFDQSwrQkFBK0Isd0RBQXdEO0FBQ3ZGLFdBQVc7QUFDWCwrQkFBK0IsdUVBQXVFO0FBQ3RHLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkMseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0Esa0NBQWtDO0FBQ2xDLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxvQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsIi8qXHJcbnByb21pc2VcclxuKi9cclxuLy8gY29uc3QgUCA9IHJlcXVpcmUoJy4vcC5qcycpXHJcblxyXG4vLyBsZXQgcDIgPSBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbi8vICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbi8vICAgICBjb25zb2xlLmxvZygnc3RhcnQnKVxyXG4vLyAgICAgcmVzb2x2ZSgndGhlbjEnKTtcclxuLy8gICB9LCAxMDApXHJcbi8vIH0sIDEpXHJcbi8vIHAyXHJcbi8vICAgLnRoZW4oKGUpID0+IHtcclxuLy8gICAgIGNvbnNvbGUubG9nKGUpXHJcbi8vICAgICByZXR1cm4gbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4vLyAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuLy8gICAgICAgICAvLyAxMVxyXG4vLyAgICAgICAgIHJlc29sdmUoJ3RoZW4yJylcclxuLy8gICAgICAgfSwgMTAwKVxyXG4vLyAgICAgfSwgMilcclxuLy8gICB9KVxyXG4vLyAgIC50aGVuKChlKSA9PiB7XHJcbi8vICAgICAvLyAyMlxyXG4vLyAgICAgY29uc29sZS5sb2coZSlcclxuLy8gICAgIHJldHVybiAndGhlbjMnXHJcbi8vICAgfSlcclxuLy8gICAudGhlbigoZSkgPT4ge1xyXG4vLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbi8vICAgICAgIC8vIDMzXHJcbi8vICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbi8vICAgICB9LCAxMDApXHJcbi8vICAgfSlcclxuLy8gICAudGhlbigoZSkgPT4ge1xyXG4vLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbi8vICAgICAgIC8vIDQ0XHJcbi8vICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbi8vICAgICB9LCAxMDApXHJcbi8vICAgfSlcclxuXHJcblxyXG4vKlxyXG52dWUgMy4wXHJcbiovXHJcblxyXG5jb25zdCBWdWUgPSByZXF1aXJlKCcuL3Z1ZS5qcycpXHJcbnZhciBhcHAgPSBuZXcgVnVlKHtcclxuICBlbDogJyNyb290JyxcclxuICBkYXRhOiB7XHJcbiAgICBtc2c6IDEyLFxyXG4gICAgbXNnMjogJzk4JyxcclxuICAgIHNob3c6dHJ1ZVxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgcHJlc3MoKXtcclxuICAgICAgY29uc29sZS5sb2coJ3ByZXNzJylcclxuICAgICAgdGhpcy5tc2c9MTNcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG4vLyBjb25zdCBWdWUxID0gcmVxdWlyZSgnLi9zdnVlLmpzJylcclxuLy8gdmFyIGFwcDEgPSBuZXcgVnVlMSh7XHJcbi8vICAgZWw6ICcjc291cmNlJyxcclxuLy8gICBkYXRhOiB7XHJcbi8vICAgICBtc2c6ICdIZWxsbyBWdWUhJ1xyXG4vLyAgIH1cclxuLy8gfSlcclxuLy8gY29uc29sZS5sb2coYXBwMSkiLCJmdW5jdGlvbiBWdWUocGFyYW0pIHtcclxuICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gIGlmIChzZWxmLmJlZm9yZUNyZWF0ZSkge1xyXG4gICAgc2VsZi5iZWZvcmVDcmVhdGUoKTtcclxuICB9XHJcblxyXG4gIC8vICd0aGlzJyBnZXQgZGF0YSdzIHJlZ2lvblxyXG4gIGZvciAobGV0IGkgaW4gcGFyYW0uZGF0YSkge1xyXG4gICAgc2VsZltpXSA9IHBhcmFtLmRhdGFbaV1cclxuICB9XHJcbiAgLy8gJ3RoaXMnIGdldCBtZXRob2RzJyByZWdpb25cclxuICBmb3IgKGxldCBpIGluIHBhcmFtLm1ldGhvZHMpIHtcclxuICAgIGlmIChzZWxmW2ldKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignW1Z1ZSB3YXJuXTogTWV0aG9kIFwibXNnXCIgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkIGFzIGEgZGF0YSBwcm9wZXJ0eS4nKVxyXG4gICAgfSBlbHNlXHJcbiAgICAgIHNlbGZbaV0gPSBwYXJhbS5tZXRob2RzW2ldXHJcbiAgfVxyXG5cclxuICAvL3NldCBwcm94eSBmb3IgdmFyYWJsZS13cml0ZVxyXG4gIHNlbGYgPSBuZXcgUHJveHkoc2VsZiwge1xyXG4gICAgc2V0KHRhcmdldCwga2V5LCB2YWx1ZSkge1xyXG4gICAgICBsZXQgc2VsZiA9IHRhcmdldDtcclxuICAgICAgc2VsZltrZXldID0gdmFsdWVcclxuICAgICAgbGV0IG5vZGVMaXN0MSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpIGluIHNlbGYudmFyTm9kZUxpc3QpIHtcclxuICAgICAgICBpZiAoc2VsZi52YXJOb2RlTGlzdFtpXS5rZXkgPT0ga2V5KSB7XHJcbiAgICAgICAgICBub2RlTGlzdDEgPSBzZWxmLnZhck5vZGVMaXN0W2ldLm1hcFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0MSkge1xyXG4gICAgICAgIG5vZGVMaXN0MVtpXS5ub2RlLmRhdGEgPSBzZWxmLmZpbGxWYWx1ZShub2RlTGlzdDFbaV0ub3JndGV4dClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldCh0YXJnZXQsIGtleSkge1xyXG4gICAgICByZXR1cm4gdGFyZ2V0W2tleV1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICBpZiAoc2VsZi5jcmVhdGVkKSB7XHJcbiAgICBzZWxmLmNyZWF0ZWQoKTtcclxuICB9XHJcblxyXG4gIC8vIHZhcmFibGUtbm9kZSBsaXN0XHJcbiAgc2VsZi52YXJOb2RlTGlzdCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgbyA9IFtdXHJcbiAgICBmb3IgKGxldCBpIGluIHBhcmFtLmRhdGEpIHtcclxuICAgICAgby5wdXNoKHsga2V5OiBpLCBtYXA6IFtdIH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb1xyXG4gIH0pKClcclxuXHJcbiAgaWYgKHNlbGYuYmVmb3JlTW91bnQpIHtcclxuICAgIHNlbGYuYmVmb3JlTW91bnQoKTtcclxuICB9XHJcblxyXG4gIHNlbGYuJGVsID0gKGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgaWYgKHBhcmFtLmVsLnN1YnN0cigwLCAxKSA9PSAnIycpIHtcclxuICAgICAgJGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW0uZWwuc3Vic3RyKDEpKVxyXG4gICAgfVxyXG4gICAgaWYgKHBhcmFtLmVsLnN1YnN0cigwLCAxKSA9PSAnLicpIHtcclxuICAgICAgJGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShwYXJhbS5lbC5zdWJzdHIoMSkpWzBdXHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZi50ZW1wbGF0ZSkge1xyXG4gICAgICAvLyAkZWwuaW5uZXJIVE1MID0gc2VsZi50ZW1wbGF0ZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICRlbFxyXG4gIH0pKHBhcmFtKVxyXG5cclxuICAvLyB2aXJ0dXJhbCBkb21cclxuICBzZWxmLnZEb20gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IG8gPSB7fVxyXG4gICAgZnVuY3Rpb24gZ2V0VHJlZShyb290KSB7XHJcbiAgICAgIGxldCBkZXMgPSB7XHJcbiAgICAgICAgbmFtZTogcm9vdC5sb2NhbE5hbWUsXHJcbiAgICAgICAgYXR0cmlidXRlOiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgbGV0IGF0dHIgPSByb290LmF0dHJpYnV0ZXNcclxuICAgICAgICAgIGxldCBvID0ge31cclxuICAgICAgICAgIGlmICghYXR0cikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG9bYXR0cltpXS5uYW1lXSA9IGF0dHJbaV0udmFsdWVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvO1xyXG4gICAgICAgIH0pKCksXHJcbiAgICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgIH1cclxuICAgICAgLy9yZWNvcmQgZmluYWwgbm9kZXMgYW5kIHJlY3Vyc2lvbiBtaWRkbGUgbm9kZXNcclxuICAgICAgaWYgKHJvb3QuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb290LmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChyb290LmNoaWxkTm9kZXMgJiYgcm9vdC5jaGlsZE5vZGVzW2ldLm5vZGVUeXBlID09IDMpIHtcclxuICAgICAgICAgICAgbGV0IHRleHQgPSByb290LmNoaWxkTm9kZXNbaV0ud2hvbGVUZXh0XHJcbiAgICAgICAgICAgIGRlcy5jaGlsZHJlbi5wdXNoKHsgbmFtZTogJ3RleHQnLCBub2RlOiByb290LmNoaWxkTm9kZXNbaV0sIG9yZ3RleHQ6IHRleHQgfSlcclxuICAgICAgICAgIH0gZWxzZSBpZiAocm9vdC5jaGlsZE5vZGVzICYmIHJvb3QuY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSA9PSA4KSB7XHJcbiAgICAgICAgICAgIGRlcy5jaGlsZHJlbi5wdXNoKHsgbmFtZTogJ2NvbW1lbnQnLCBub2RlOiBudWxsLCBvcmd0ZXh0OiByb290LmNoaWxkTm9kZXNbaV0udGV4dENvbnRlbnQgfSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlcy5jaGlsZHJlbi5wdXNoKGdldFRyZWUocm9vdC5jaGlsZE5vZGVzW2ldKSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGRlcztcclxuICAgIH1cclxuICAgIG8gPSBnZXRUcmVlKHNlbGYuJGVsKTtcclxuICAgIGNvbnNvbGUubG9nKG8pXHJcbiAgICByZXR1cm4gb1xyXG4gIH0pKClcclxuXHJcbiAgLy8gc2V0IGh0bWwgZnJvbSB2RG9tXHJcbiAgbGV0IGMgPSBzZWxmLnRvRG9tKHNlbGYudkRvbSlcclxuICBsZXQgcCA9IHNlbGYuJGVsLnBhcmVudEVsZW1lbnRcclxuICBwLnJlcGxhY2VDaGlsZChjLCBzZWxmLiRlbClcclxuXHJcbiAgLy9kZWxldGUgcmVwZWF0ZWQgbm9kZXMgaW4gdmFyYWJsZSBtYXBcclxuICBmb3IgKGxldCBpIGluIHNlbGYudmFyTm9kZUxpc3QpIHtcclxuICAgIGxldCBhcnIgPSBzZWxmLnZhck5vZGVMaXN0W2ldLm1hcFxyXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBhcnIubGVuZ3RoOyBrKyspIHtcclxuICAgICAgZm9yIChsZXQgaiA9IGsgKyAxOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgaWYgKGFycltrXS5ub2RlID09IGFycltqXS5ub2RlKSB7XHJcbiAgICAgICAgICBhcnIuc3BsaWNlKGosIDEpO1xyXG4gICAgICAgICAgai0tO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gJGVsLnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTpcIm5vbmVcIidcclxuXHJcbiAgaWYgKHNlbGYubW91bnRlZCkge1xyXG4gICAgc2VsZi5tb3VudGVkKCk7XHJcbiAgfVxyXG59XHJcblxyXG5WdWUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLnRvRG9tKClcclxufVxyXG5cclxuLy8gdmlydHVyYWwgZG9tIHRvIGRvbVxyXG5WdWUucHJvdG90eXBlLnRvRG9tID0gZnVuY3Rpb24gKHJvb3QpIHtcclxuICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgcm9vdC5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChyb290Lm5hbWUpXHJcbiAgaWYgKHJvb3QuY2hpbGRyZW4gJiYgcm9vdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICBmb3IgKGxldCBpIGluIHJvb3QuY2hpbGRyZW4pIHtcclxuICAgICAgcm9vdC5ub2RlLmFwcGVuZChzZWxmLnRvRG9tKHJvb3QuY2hpbGRyZW5baV0pKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKHJvb3QuYXR0cmlidXRlKSB7XHJcbiAgICBmb3IgKGxldCBpIGluIHJvb3QuYXR0cmlidXRlKSB7XHJcbiAgICAgIC8vIGxvYWQgZXZlbnRcclxuICAgICAgaWYgKGkuaW5kZXhPZigndi1vbicpICE9PSAtMSkge1xyXG4gICAgICAgIGxldCBldnQgPSBpLnNwbGl0KCc6JylbMV1cclxuICAgICAgICByb290Lm5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICBzZWxmW3Jvb3QuYXR0cmlidXRlW2ldXShlKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGkgPT0gJ3YtaWYnKSB7XHJcbiAgICAgICAgbGV0IHZhcmFibGUgPSByb290LmF0dHJpYnV0ZVtpXVxyXG4gICAgICAgIGxldCByZXMgPSBmYWxzZTtcclxuICAgICAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgbGV0IFBfJF9zZWxmID0gc2VsZjtcclxuICAgICAgICAgIGxldCBQXyRfcm9vdCA9IHJvb3RcclxuICAgICAgICAgIGZvciAobGV0IFBfJF9pIGluIHNlbGYpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoUF8kX3NlbGZbUF8kX2ldKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgIGV2YWwoJ2xldCAnICsgUF8kX2kgKyAnPVwiJyArIFBfJF9zZWxmW1BfJF9pXSArICdcIicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGV2YWwoJ3Jlcz0nICsgUF8kX3ZhcmFibGUpXHJcbiAgICAgICAgICBpZiAoUF8kX3Jlcykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFBfJF9yb290Lm5vZGUucmVtb3ZlKClcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKVxyXG4gICAgICB9XHJcbiAgICAgIHJvb3Qubm9kZS5zZXRBdHRyaWJ1dGUoaSwgcm9vdC5hdHRyaWJ1dGVbaV0pXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmIChyb290Lm5hbWUgPT0gJ2NvbW1lbnQnKSB7XHJcbiAgICAgIHJvb3Qubm9kZSA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQocm9vdC5vcmd0ZXh0KVxyXG4gICAgfVxyXG4gICAgaWYgKHJvb3QubmFtZSA9PSAndGV4dCcpIHtcclxuICAgICAgcm9vdC5ub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc2VsZi5maWxsVmFsdWUocm9vdC5vcmd0ZXh0KSlcclxuICAgICAgLy8gYmJiXHJcbiAgICAgIGxldCB2YXJMaXN0ID0gc2VsZi5nZXRWYXJhYmxlKHJvb3Qub3JndGV4dClcclxuICAgICAgZm9yIChsZXQgayBpbiBzZWxmLnZhck5vZGVMaXN0KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiBpbiB2YXJMaXN0KSB7XHJcbiAgICAgICAgICBpZiAoc2VsZi52YXJOb2RlTGlzdFtrXS5rZXkgPT0gdmFyTGlzdFtqXSkge1xyXG4gICAgICAgICAgICBpZiAocm9vdC5vcmd0ZXh0LmluZGV4T2YodmFyTGlzdFtqXSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgICBzZWxmLnZhck5vZGVMaXN0W2tdLm1hcC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5vZGU6IHJvb3Qubm9kZSxcclxuICAgICAgICAgICAgICAgIG9yZ3RleHQ6IHJvb3Qub3JndGV4dFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJvb3Qubm9kZVxyXG59XHJcblxyXG5WdWUucHJvdG90eXBlLmZpbGxWYWx1ZSA9IGZ1bmN0aW9uIChvcmd0ZXh0KSB7XHJcbiAgbGV0IHJlc3VsdCA9ICcnXHJcbiAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgbGV0IGFyciA9IG9yZ3RleHQuc3BsaXQoJ3t7JylcclxuICBmb3IgKGxldCBpIGluIHNlbGYpIHtcclxuICAgIGlmICh0eXBlb2YgKHNlbGZbaV0pICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGV2YWwoJ3ZhciAnICsgaSArICc9XCInICsgc2VsZltpXSArICdcIicpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgaW4gYXJyKSB7XHJcbiAgICBpZiAoYXJyW2ldLmluZGV4T2YoJ319JykgPT0gLTEpIHtcclxuICAgICAgcmVzdWx0ICs9IGFycltpXVxyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICAgIGxldCBzdWJhcnIgPSBhcnJbaV0uc3BsaXQoJ319JylcclxuICAgIGxldCBleHAgPSBzdWJhcnJbMF1cclxuICAgIGV2YWwoJ3Jlc3VsdCs9JyArIGV4cClcclxuICAgIHJlc3VsdCArPSBzdWJhcnJbMV1cclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdFxyXG59XHJcblxyXG5WdWUucHJvdG90eXBlLmdldFZhcmFibGUgPSBmdW5jdGlvbiAoUF8kX3RleHQpIHtcclxuICAvLyBsZXQgUF8kX3RleHQgPSBQXyRfdGV4dE9yZy5vcmd0ZXh0XHJcbiAgaWYgKFBfJF90ZXh0LmluZGV4T2YoJ319JykgPT0gLTEpIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcbiAgbGV0IFBfJF9zdHJzID0gW11cclxuICBsZXQgUF8kX2J1ZmYgPSBbXVxyXG4gIGxldCBQXyRfYXJyID0gUF8kX3RleHQuc3BsaXQoJ319JylcclxuICBmb3IgKGxldCBQXyRfaSBpbiBQXyRfYXJyKSB7XHJcbiAgICBpZiAoUF8kX2FycltQXyRfaV0uaW5kZXhPZigne3snKSAhPSAtMSkge1xyXG4gICAgICBQXyRfYnVmZi5wdXNoKFBfJF9hcnJbUF8kX2ldLnNwbGl0KCd7eycpWzFdKVxyXG4gICAgfVxyXG4gIH1cclxuICBQXyRfYXJyID0gUF8kX2J1ZmYgICAvL3RoZSBBcnJheSByZWFkeSBmb3IgYW5hbHlzaXNcclxuICBmb3IgKGxldCBQXyRfaSBpbiBQXyRfYXJyKSB7XHJcbiAgICBsZXQgUF8kX28gPSBQXyRfYXJyW1BfJF9pXVxyXG4gICAgbGV0IFBfJF9tc2csIFBfJF9wID0gMCwgUF8kX2Vycm9yRmxhZyA9IGZhbHNlO1xyXG4gICAgZG8ge1xyXG4gICAgICBQXyRfbXNnID0gJycsIFBfJF9lcnJvckZsYWcgPSBmYWxzZVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGV2YWwoJ2xldCBhPSgnICsgUF8kX28gKyAnKScpXHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBQXyRfbXNnID0gZS5tZXNzYWdlXHJcbiAgICAgICAgUF8kX3N0cnMucHVzaChQXyRfbXNnLnNwbGl0KCcgaXMgbm90JylbMF0pXHJcbiAgICAgICAgUF8kX2Vycm9yRmxhZyA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICBsZXQgcmVnID0gbmV3IFJlZ0V4cChQXyRfc3Ryc1tQXyRfc3Rycy5sZW5ndGggLSAxXSwgXCJnXCIpXHJcbiAgICAgIFBfJF9vID0gKFBfJF9vKS5yZXBsYWNlKHJlZywgMTIpXHJcbiAgICAgIGlmIChQXyRfcCA+IDEwKSBicmVhaztcclxuICAgICAgUF8kX3ArKztcclxuICAgIH0gd2hpbGUgKFBfJF9lcnJvckZsYWcpXHJcbiAgfVxyXG4gIHJldHVybiBQXyRfc3RycztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBWdWUiXSwic291cmNlUm9vdCI6IiJ9