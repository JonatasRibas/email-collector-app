const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({ secret: 'mysecret', resave: false, saveUninitialized: false })
)

app.get('/', (req, res) => {
  res.render('index', { emailSent: req.session.emailSent })
})

app.post('/submit', (req, res) => {
  const email = req.body.email

  if (isValidEmail(email)) {
    req.session.emailSent = true
    res.redirect('/')
  } else {
    res.status(400).send('Endereço de e-mail inválido.')
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
}
