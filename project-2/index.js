const express = require('express')
const app = express()
const port = 3000

var cors = require('cors')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors())
app.use(jsonParser)
app.use(urlencodedParser);

app.get('/', (req, res) => {
  res.json('Hello World!')
})

app.post('/login', (req, res) => {

const username = 'ARIF'
const password = '12345'


if (req.body.username !== username) {
    res.json({status: 'error, username not found'})
}

if (req.body.password !== password) {
    res.json({status: 'error, wrong password'})
}

res.json({status: 'success'})
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})