// load the things we need
const express = require('express')
const app = express()
const cp = require('child_process')
const fs = require('fs')
const reportFile = './dist/report.json'
const isDev = process.env.NODE_ENV === 'development'
// TODO: Should be retrieved from config
const vuePort = 8122
if (isDev) {
  console.log('Running in development mode')
}

// build our vue project on first run if report.json can't be found
// TODO: We could create a Promise and make the first request(s) wait for that Promise to be fulfilled.
if (isDev && !fs.existsSync(reportFile)) {
  console.log('Building Vue project in background.')
  cp.exec('npm run vue:build', { env: process.env })
}

// set the view engine to ejs
app.set('view engine', 'ejs')

// static assets
app.use(express.static('static'))
for (const type of ['js', 'img', 'css']) {
  app.use(`/${type}`, express.static(`./dist/${type}`))
}

app.use((req, res, next) => {
  req.context = {
    name: req.path.slice(req.path.lastIndexOf('/') + 1),
    isDev,
    assetPrefix: isDev ? `http://localhost:${vuePort}/` : ''
  }
  next()
})

// index page
app.get('/', function (req, res) {
  res.render('pages/index', req.context)
})

app.get('/app1', function (req, res) {
  res.render('pages/app1', req.context)
})
app.get('/app2', function (req, res) {
  res.render('pages/app2', req.context)
})

app.listen(8123)
console.log('8123 is the magic port')
