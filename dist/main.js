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

const P = __webpack_require__(/*! ./p.js */ "./p.js")

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

/***/ }),

/***/ "./p.js":
/*!**************!*\
  !*** ./p.js ***!
  \**************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsVUFBVSxtQkFBTyxDQUFDLHNCQUFROztBQUUxQjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7OztBQUdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDLEM7Ozs7Ozs7Ozs7O0FDbkREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNkJBQTZCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJOztBQUVKLGtCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiY29uc3QgUCA9IHJlcXVpcmUoJy4vcC5qcycpXHJcblxyXG4vLyBsZXQgcDEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbi8vICAgcmVzb2x2ZSgndGhlbjEnKTtcclxuLy8gfSlcclxuXHJcbi8vIHAxLnRoZW4oKGUpID0+IHtcclxuLy8gICBjb25zb2xlLmxvZyhlKVxyXG4vLyAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbi8vICAgICByZXNvbHZlKCd0aGVuMicpXHJcbi8vICAgfSlcclxuLy8gfSkudGhlbigoZSkgPT4ge1xyXG4vLyAgIGNvbnNvbGUubG9nKGUpXHJcbi8vICAgcmV0dXJuICd0aGVuMydcclxuLy8gfSkudGhlbigoZSkgPT4ge1xyXG4vLyAgIGNvbnNvbGUubG9nKGUpXHJcbi8vIH0pXHJcblxyXG5cclxubGV0IHAyID0gbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ3N0YXJ0JylcclxuICAgIHJlc29sdmUoJ3RoZW4xJyk7XHJcbiAgfSwgMTAwKVxyXG59LCAxKVxyXG5wMlxyXG4udGhlbigoZSkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKGUpXHJcbiAgcmV0dXJuIG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAvLyAxMVxyXG4gICAgICByZXNvbHZlKCd0aGVuMicpXHJcbiAgICB9LCAxMDApXHJcbiAgfSwgMilcclxufSlcclxuLnRoZW4oKGUpID0+IHtcclxuICAvLyAyMlxyXG4gIGNvbnNvbGUubG9nKGUpXHJcbiAgcmV0dXJuICd0aGVuMydcclxufSlcclxuLnRoZW4oKGUpID0+IHtcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIC8vIDMzXHJcbiAgICBjb25zb2xlLmxvZyhlKVxyXG4gIH0sIDEwMClcclxufSlcclxuLnRoZW4oKGUpID0+IHtcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIC8vIDQ0XHJcbiAgICBjb25zb2xlLmxvZyhlKVxyXG4gIH0sIDEwMClcclxufSkiLCJQID0gZnVuY3Rpb24gKGZuYywgdikge1xyXG4gIGxldCBzZWxmID0gdGhpcztcclxuICBzZWxmLnN0YXQgPSAncGVuZGluZydcclxuICBzZWxmLnYgPSB2IHx8IDBcclxuICBzZWxmLnZhbHVlID0gJydcclxuXHJcbiAgc2VsZiA9IG5ldyBQcm94eShzZWxmLCB7XHJcbiAgICBzZXQodGFyZ2V0LCBrZXksIHZhbHVlKSB7XHJcbiAgICAgIHRhcmdldFtrZXldID0gdmFsdWVcclxuICAgICAgaWYgKGtleSA9PSAnc3RhdCcpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYucmVzb2x2ZWxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGxldCB0ZW1wID0gc2VsZi5yZXNvbHZlbGlzdFswXS5jYWxsKHNlbGYsIHNlbGYudmFsdWUpO1xyXG4gICAgICAgICAgc2VsZi5yZXNvbHZlbGlzdC5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgICBpLS1cclxuICAgICAgICAgIGlmICh0ZW1wIGluc3RhbmNlb2YgUCkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgeyBzZWxmLnZhbHVlID0gdGVtcCB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgc2VsZi5yZXNvbHZlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmIChzZWxmLnN0YXQgIT09ICdwZW5kaW5nJylcclxuICAgICAgcmV0dXJuO1xyXG4gICAgc2VsZi52YWx1ZSA9IGU7XHJcbiAgICBzZWxmLnN0YXQgPSAncmVzb2x2ZSdcclxuICB9XHJcbiAgc2VsZi5yZWplY3QgPSBmdW5jdGlvbiAoKSB7IH1cclxuXHJcbiAgZm5jKHNlbGYucmVzb2x2ZSwgc2VsZi5yZWplY3QpO1xyXG4gIHJldHVybiBzZWxmO1xyXG59XHJcblxyXG5cclxuUC5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gIGlmIChzZWxmLnN0YXQgPT0gJ3BlbmRpbmcnKSB7XHJcbiAgICBzZWxmLnJlc29sdmVsaXN0LnB1c2goZSlcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IHJldCA9IGUoc2VsZi52YWx1ZSlcclxuICAgIGlmIChyZXQgaW5zdGFuY2VvZiBQKSB7XHJcbiAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBzZWxmLnZhbHVlID0gcmV0IHx8IHVuZGVmaW5lZFxyXG4gIH1cclxuICByZXR1cm4gc2VsZjtcclxufVxyXG5cclxuUC5wcm90b3R5cGUucmVzb2x2ZWxpc3QgPSBbXVxyXG5cclxuXHJcblxyXG4vLyBsZXQgcDEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbi8vICAgcmVzb2x2ZSgndGhlbjEnKTtcclxuLy8gfSlcclxuXHJcbi8vIHAxLnRoZW4oKGUpID0+IHtcclxuLy8gICBjb25zb2xlLmxvZyhlKVxyXG4vLyAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbi8vICAgICByZXNvbHZlKCd0aGVuMicpXHJcbi8vICAgfSlcclxuLy8gfSkudGhlbigoZSkgPT4ge1xyXG4vLyAgIGNvbnNvbGUubG9nKGUpXHJcbi8vICAgcmV0dXJuICd0aGVuMydcclxuLy8gfSkudGhlbigoZSkgPT4ge1xyXG4vLyAgIGNvbnNvbGUubG9nKGUpXHJcbi8vIH0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFAiXSwic291cmNlUm9vdCI6IiJ9