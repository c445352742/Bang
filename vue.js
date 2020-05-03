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