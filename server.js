// load the things we need
const express = require('express')
const app = express()
const cp = require('child_process')
const fs = require('fs')
const reportFile = './dist/report.json'

// build our vue project on first run if report.json can't be found
// TODO: We could create a Promise and make the first request(s) wait for that Promise to be fulfilled.
if (!fs.existsSync(reportFile)) {
  console.log('Building Vue project in background.')
  cp.exec('npm run build', { env: process.env })
}

// set the view engine to ejs
app.set('view engine', 'ejs')

// static assets
app.use(express.static('static'))
for (const type of ['js', 'img', 'css']) {
  app.use(`/${type}`, express.static(`./dist/${type}`))
}

app.use((req, res, next) => {
  // invalidate cache for report.json
  // TODO: Only do this if timestamp has changed?
  delete require.cache[require.resolve(reportFile)]
  const report = require(reportFile)
  // assemble assets
  const assets = {}
  for (const name of Object.keys(report.assetsByChunkName)) {
    assets[name] = {}
    for (const type of ['js', 'css']) {
      assets[name][type] = report.assetsByChunkName[name].filter(a => a.endsWith(`.${type}`))
    }
  }
  // build context
  const name = req.path.slice(req.path.lastIndexOf('/') + 1)
  const context = {
    name
  }
  for (const type of ['js', 'css']) {
    context[type] = []
    for (const chunk of ['chunk-vendors', 'component', name]) {
      if (assets[chunk]) {
        context[type] = context[type].concat(assets[chunk][type] || [])
      }
    }
  }
  req.context = context
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
