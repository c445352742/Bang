var app = new Vue({
  el: '#app',
  data: {
    select: '',
    options: [],
    coinList: [],
    showtable: true,
    hislist: {},
    table: [],
    rank: 0
  },
  mounted() {
    this.getlist()
  },
  methods: {
    refresh() {
      this.getlist()

    },
    toggle() {
      this.showtable = !this.showtable
      if (!this.showtable) {
        this.draw();
      }
    },
    changeCoin(e) {
      this.select = e.target.value
      this.draw();
    },
    sort() {
      let data = JSON.parse(JSON.stringify(this.hislist));
      this.table = []
      for (let i in data) {
        delete data[i].history
        this.table.push({
          name: data[i].name,
          rate: data[i].rate,
          max: data[i].max,
          min: data[i].min,
          now: data[i].now,
        })
      }
      this.table.sort(function (a, b) {
        return a.rate - b.rate
      })
    },
    getlist() {
      let self = this;
      window.ajax({
        url: 'https://api.coincap.io/v2/assets', success: (res) => {
          self.coinList = res.data.slice(self.rank, self.rank + 20);
          self.options = []
          self.select = self.coinList[0].id
          self.hislist={}
          for (let i in self.coinList) {
            if (self.coinList[i].name == 'Tether') { continue; }
            self.options.push({ id: self.coinList[i].id, label: self.coinList[i].name })
            self.gethistory(self.coinList[i].id,self.coinList[i].name)
          }
        }
      })
    },
    gethistory(id,name) {
      let self = this;
      self.hislist[id] = {}
      window.ajax({
        url: `https://api.coincap.io/v2/assets/${id}/history?interval=d1&start=${Date.parse(new Date()) - 1000 * 3600 * 24 * 365}&end=${Date.parse(new Date())}`,
        success: (res) => {
          let data = JSON.parse(JSON.stringify(res.data))
          self.changeflag = false;
          for (let i in data) {
            data[i].priceUsd = parseFloat(data[i].priceUsd)
          }
          self.hislist[id].id = id
          self.hislist[id].name = name
          self.hislist[id].history = data
          self.hislist[id].max = data[0].priceUsd
          self.hislist[id].min = data[0].priceUsd
          for (let i in res.data) {
            if (data[i].priceUsd > self.hislist[id].max) { self.hislist[id].max = data[i].priceUsd }
            if (data[i].priceUsd < self.hislist[id].min) { self.hislist[id].min = data[i].priceUsd }
          }
          self.hislist[id].now = data[data.length - 1].priceUsd
          self.hislist[id].rate = Math.round(10000 * (self.hislist[id].now - self.hislist[id].min) / (self.hislist[id].max - self.hislist[id].min)) / 100;
          self.sort();
        }
      })
    },
    inputrank(e) {
      this.rank = parseInt(e.target.value)
    },
    draw() {
      let c = document.getElementById('c');
      let ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.beginPath();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 4
      ctx.moveTo(150, 200);
      ctx.lineTo(150, 2900);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 4
      ctx.moveTo(150, 200);
      ctx.lineTo(180, 200);
      ctx.stroke();
      ctx.moveTo(150, 2900);
      ctx.lineTo(180, 2900);
      ctx.stroke();
      ctx.closePath();

      let item = this.hislist[this.select];
      let history = this.hislist[this.select].history
      let res = (/[1-9]/).exec(item.max + '')
      let vol = res[0]
      let num = 0;
      if (item.max < 1) {
        num = (item.max + '').slice(0, res.index + 1)
      } else {
        let pow = (item.max + '').split('.')[0].length - 1;
        num = Math.floor(item.max / Math.pow(10, pow)) * Math.pow(10, pow)
      }
      vol = 1 + parseInt(vol)
      let stepmoney = num / (vol - 1)
      for (let i = 0; i < vol + 1; i++) {
        let step = 2700 / vol
        ctx.beginPath();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 4
        ctx.moveTo(150, 200 + step * i);
        ctx.lineTo(180, 200 + step * i);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.font = "55px Arial";
        ctx.fillText(`${parseFloat(((stepmoney * (vol - i)) + '').slice(0, 10))}`, 200, 180 + step * i)
        ctx.closePath();
      }
      ctx.beginPath();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 4
      ctx.moveTo(150, 2900);
      ctx.lineTo(3800, 2900);
      ctx.stroke();
      ctx.closePath();
      for (let i = 0; i < history.length - 1; i++) {
        ctx.beginPath();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 4
        //水平 200-3800 垂直200-2900
        ctx.moveTo(200 + i * 3600 / history.length, 2900 - 2700 * (history[i].priceUsd / (stepmoney * vol)));
        ctx.lineTo(200 + (i + 1) * 3600 / history.length, 2900 - 2700 * (history[i + 1].priceUsd / (stepmoney * vol)));
        ctx.stroke();
        ctx.closePath();
      }
    },
    r1eq() {
      // window.ajax({
      //   url:'https://api.coincap.io/v2/assets',
      //   // url:'api.coincap.io/v2/assets/bitcoin/history?interval=d1',
      //   success: e => { console.log(e) },
      //   error: e => { console.error(e) }
      // })
    },
    // xhr() {
    //   var xhr = new XMLHttpRequest();
    //   xhr.withCredentials = true;
    //   xhr.responseType = 'json'
    //   xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //       console.log(this.responseText);
    //     }
    //   });

    //   xhr.open("GET", "https://api.coincap.io/v2/assets");
    //   // xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
    //   xhr.setRequestHeader('Accept', 'application/json; charset=utf-8')
    //   // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    //   xhr.send();
    // },

  }
})

