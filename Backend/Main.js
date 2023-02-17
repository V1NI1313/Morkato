const { readJSONSync } = require('fs-extra')
const  { Client } = require('./utils/dist/Client')
const express = require('express')

const { Settings } = require('./utils/dist/@types/Settings')

const Guild = require('./controllers/Guild')

/**
 * @type { Settings } 
 * 
 */ const settings = readJSONSync('../settings.json', { encoding: 'utf-8' })

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const client = new Client(settings)

app.use(Guild('/desktop/Guilds', client, io))

server.listen(5500, () => console.log('server running...'))
