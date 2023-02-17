const { Router } = require('express')

const { Client } = require('../utils/dist/Client')

/**
 * @param { string } local
 * @param { Client } client
 *
 * @returns { Router } 
 * 
 */
const callback = (local, client, io) => {
  const settings = client.settings
  
  const errors = { ...settings.api.exceptions, ...settings.api.guilds.exceptions }
  const socket = io.of(local)
  const route = Router()
  const localID = `${local}/:id`

  route.use(local, async (req, res, next) => {
    if( !(req.headers.authorization === settings.api.access_token) )
      { return res
        .status(errors['notAccess'].status)
        .json(`${errors['notAccess'].status}: ${errors['notAccess'].message}`); }
    return next();
  })
  route.use(localID, async (req, res, next) => {
    if(await client.verify(`/guilds/${req.params.id}`))
      { return next(); }
    return res
      .status(errors['botNotInGuild'].status)
      .json({ message:`${errors['botNotInGuild'].status}: ${errors['botNotInGuild'].message}` });
  })
  route.use(localID, async (req, res, next) => {
    const [ Guild, GuildIndex ] = [ await client.getGuild(req.params.id), await client.getGuildIndex(req.params.id) ]
    
    req.Guild = Guild
    req.GuildIndex = GuildIndex

    return next();
  })
  route.get(localID, async (req, res) => {
    if(!req.Guild)
      { return res
        .status(errors['notExists'].status)
        .json({ message: `${errors['notExists'].status}: ${errors['notExists'].message}` }); }
    return res
      .status(200)
      .json(req.Guild);
  })
  route.post(localID, async (req, res) => {
    const guild = await client.newGuild(req.params.id)
    if(req.Guild || !guild)
      { return res
        .status(errors['alreadyExists'].status)
        .json({ message: `${errors['alreadyExists'].status}: ${errors['alreadyExists'].message}` }); }
    return res
      .status(200)
      .json(guild);
  })
  route.patch(localID, async (req, res) => {
    if(!req.body)
      { return res
        .status(errors['body'].status)
        .json({ message: `${errors['body'].status}: ${errors['body'].message}` }); }
    if(!req.Guild)
      { return res
        .status(errors['notExists'].status)
        .json({ message: `${errors['notExists'].status}: ${errors['notExists'].message}` }); }
    const guild = await client.editGuild(req.Guild, req.body)
    return res
      .status(!guild ? 500 : 200)
      .json(!guild ? { message: "InternalError" } : guild);
  })

  return route;
}

module.exports = callback;