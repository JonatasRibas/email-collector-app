const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/submit', (req, res) => {
  const email = req.body.email
  console.log('Email recebido:', email)
  // Aqui você pode salvar o email em um banco de dados ou fazer qualquer outra operação desejada
  res.send('Email recebido com sucesso!')
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
