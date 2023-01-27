require('dotenv').config()

const limiter = require('express-rate-limit')
const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)

const authorization = process.env.AUTH

app.use(limiter({
  windowMs: 300,
  max: 20,
  message: "Too many requests, please try again later"
}))
app.use('/desktop', express.json())
app.use('/desktop/Guilds', (req, res, next) => {
  if(!req.headers.authorization || !(req.headers.authorization == authorization)) return res.status(403).json({message: "403: Unauthorized"})
  else next()
})
app.use('/desktop', express.static(path.normalize(path.join(__dirname, '../public'))))

app.use('/desktop/Guilds', require('./controllers/guilds'))

server.listen(5500, () => console.log('server running...'))