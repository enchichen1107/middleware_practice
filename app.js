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
  // set request time
  const requestTime = Date.now()

  // fired when entering finish state
  res.on('finish', () => {
    // set respond time
    const respondTime = Date.now()

    // calculate elapse duration
    const duration = respondTime - requestTime

    // transfer request time to required format
    const formatRequestTime = new Date(requestTime).toLocaleString('zh', { timeZone: 'Asia/Taipei', hour12: false })

    // build server log
    const middleware = `${formatRequestTime} | ${req.method} from ${req.originalUrl} | total time: ${duration}ms`

    // send server log
    console.log(middleware)
  })

  // continue to enter one of the below routes
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
