const { Router } = require('express')
const { readJSON, writeJSON } = require(`fs-extra`)
const { newGuld } = require('../utils')
const path = require('path')

const route = Router()
const local = path.normalize(path.join(__dirname, '../../private'))

route.use('/:id', async (req, res, next) => {
  req.Guilds = await readJSON(`${local}/Guilds.json`, { encoding: 'utf-8' })
  req.Guild = (req.Guilds.find(guild => guild['id'] === req.params.id)) || null
  req.GuildIndex = (req.Guilds.findIndex(guild => guild['id'] === req.params.id)) || null
  return next()
})
route.get('/:id', async  (req, res) => {
  if(req.Guild === null) {
    return res.status(404).json({ message: "404: GuildNotExists" })
  } else {
    return res.status(200).json(req.Guild)
  }
})
route.post('/:id', async (req, res) => {
  if (req.Guild === null) {
    req.Guild = await newGuld(req.params.id)
    req.GuildIndex = req.Guilds.length
    req.Guilds.push(req.Guild)
    await writeJSON(`${local}/Guilds.json`, req.Guilds, { encoding: 'utf-8' })
    return res.status(200).json(req.Guild)
  } else {
    return res.status(403).json({ message: "GuildAlreadyExists" })
  }
})
route.delete('/:id', async (req, res) => {
  if(req.Guild === null) {
    return res.status(404).json({ message: "404: GuildNotExists" })
  } else {
    req.Guilds.splice(req.GuildIndex, 1)
    req.Guild = null
    req.GuildIndex = null
    return await writeJSON(`${local}/Guilds.json`, req.Guilds, { encoding: 'utf-8' })
  }
})

route.use('/:id/Hability', require(`./habilitys`))

module.exports = route

