// init packages
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

// set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// handle middleware
app.use(function showTime (req, res, next) {
  const requestTime = Date.now()
  res.on('finish', () => {
    const respondTime = Date.now()
    const duration = respondTime - requestTime
    const formatRequestTime = new Date(requestTime).toLocaleString('zh', { timeZone: 'Asia/Taipei', hour12: false })
    const middleware = `${formatRequestTime} | ${req.method} from ${req.originalUrl} | total time: ${duration}ms`
    console.log(middleware)
  })
  next()
})

// get from /
app.get('/', (req, res) => {
  const message = '列出全部 Todo'
  res.render('index', { message })
})

// get from /new
app.get('/new', (req, res) => {
  const message = '新增 Todo 頁面'
  res.render('index', { message })
})

// get from /:id
app.get('/:id', (req, res) => {
  const message = '顯示一筆 Todo'
  res.render('index', { message })
})

// post to /
app.post('/', (req, res) => {
  const message = '新增一筆  Todo'
  res.render('index', { message })
})

// listen on port
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
