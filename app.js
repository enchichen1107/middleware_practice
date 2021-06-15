// init packages
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
let middleware = ''

// set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// testing routers
// middleware
app.use(function (req, res, next) {
  const time = new Date().toLocaleString('zh', { timeZone: 'Asia/Taipei', hour12: false })
  middleware = `${time} | ${req.method} from ${req.originalUrl}`
  console.log(middleware)
  next()
})

app.get('/', (req, res) => {
  res.render('index', { middleware })
})

app.get('/new', (req, res) => {
  res.render('index', { middleware })
})

app.get('/:id', (req, res) => {
  res.render('index', { middleware })
})

app.post('/', (req, res) => {
  res.render('index', { middleware })
})

// listen on port
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
