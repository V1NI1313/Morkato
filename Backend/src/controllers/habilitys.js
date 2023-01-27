const { getHability, newHability, shema } = require('../utils').habilitys
const { writeJSON } = require('fs-extra')
const { Router } = require('express')
const path = require('path')

const route = Router()
/* Local directory "~/.../Backend/" */const local = path.normalize(path.join(__dirname, '../../private'))

route.use('/', async (req, res, next) => {
  if(req.Guild === null)   {
    return res.status(404).json({ message: "404: GuildNotExists" })
  }; req.Habilitys = await getHability(`${local}/Hability`, req.Guild.id)
  return next()
})

route.get('/', async (req, res) => {
  return res.status(200).json(req.Habilitys)
})
route.get('/:id', async (req, res) => {
  const Hability = req.Habilitys.find(hability => hability['id'] === req.params.id) || null
  if(Hability === null) {
    return res.status(404).json({ message: "404: HabilityNotExists" })
  } else {
    return res.status(200).json(Hability)
  }
})
route.post('/', async (req, res) => {
  const { error } = shema.validate(req.body)
  if(error) {
    return res.status(401).json({ message: "401: NotBodyParams" })
  } else if(!((req.Habilitys.find(hability => hability['name'] === req.body.name || hability['role'] === req.body.role) || null) === null)) {
    return res.status(403).json({ message: "403: HabilityAlreadyExists" })
  } else {
    const Hability = await newHability(req.body.name, req.body.role, req.body.rarity, req.body.require)
    req.Habilitys.push(Hability)
    await writeJSON(`${local}/Hability/${req.Guild.id}.json`, req.Habilitys, { encoding: 'utf-8' })
    return res.status(200).json(Hability)
  }
})

module.exports = route