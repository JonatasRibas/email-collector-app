const express = require('express')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(
  session({ secret: 'mysecret', resave: false, saveUninitialized: false })
)

app.get('/', (req, res) => {
  if (req.session.emailSent === undefined) {
    req.session.emailSent = false
  }

  res.sendFile(__dirname + '/public/index.html')
})

app.post('/submit', (req, res) => {
  const email = req.body.email
  console.log('Email recebido:', email)

  req.session.emailSent = true

  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
