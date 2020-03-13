const readline = require('readline');
const chokidar = require('chokidar')
const path = require('path')
const fs = require('fs')
require('shelljs/global');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const doc = './'
let wd = path.resolve(__dirname, doc)
filelist = fs.readdirSync(wd);
let watchlist = []
for (let i = 0; i < filelist.length; i++) {
  if (filelist[i].includes('package') || filelist[i].includes('webpack') || filelist[i].includes('dist')) {
    continue
  }
  if (filelist[i].includes('node_') || filelist[i].includes('git')) {
    continue
  }
  watchlist.push(filelist[i])
}

const watcher = chokidar.watch(watchlist)
let date, time



setInterval(() => {
  date = new Date()
  time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  if (parseInt(date.getSeconds()) == 0) {
    console.log(`---------------------${time}---------------------`)
  }
}, 950);


console.log(`---------------------Is running: ${new Date()}---------------------`)

let timer
watcher.on('change', function () {
  console.log(`save on ${time}`)
  if (timer) {
    return;
  }
  timer = setTimeout(() => {
    exec('npm run build')
    timer = null
  }, 100)
})

rl.on('line', function (input) {
  if (input == 'q') {
    process.exit(0)
  }
  if (input == 'cls') {
    process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H')
    return;
  }
  console.log('Do you want to type in \'q\' to quit?')
});